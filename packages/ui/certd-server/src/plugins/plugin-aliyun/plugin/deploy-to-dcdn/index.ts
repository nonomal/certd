import { AbstractTaskPlugin, IsTaskPlugin, pluginGroups, RunStrategy, TaskInput } from '@certd/pipeline';
import dayjs from 'dayjs';
import { AliyunAccess, AliyunClient, createCertDomainGetterInputDefine } from '@certd/plugin-lib';
import { CertInfo } from '@certd/plugin-cert';

@IsTaskPlugin({
  name: 'DeployCertToAliyunDCDN',
  title: '阿里云-部署证书至DCDN',
  icon: 'ant-design:aliyun-outlined',
  group: pluginGroups.aliyun.key,
  desc: '依赖证书申请前置任务，自动部署域名证书至阿里云DCDN',
  default: {
    strategy: {
      runStrategy: RunStrategy.SkipWhenSucceed,
    },
  },
})
export class DeployCertToAliyunDCDN extends AbstractTaskPlugin {
  @TaskInput({
    title: '域名证书',
    helper: '请选择前置任务输出的域名证书',
    component: {
      name: 'output-selector',
      from: ['CertApply', 'CertApplyLego', 'uploadCertToAliyun'],
    },
    required: true,
  })
  cert!: CertInfo | number;

  @TaskInput(createCertDomainGetterInputDefine({ props: { required: false } }))
  certDomains!: string[];

  @TaskInput({
    title: 'Access授权',
    helper: '阿里云授权AccessKeyId、AccessKeySecret',
    component: {
      name: 'access-selector',
      type: 'aliyun',
    },
    required: true,
  })
  accessId!: string;

  @TaskInput({
    title: 'DCDN加速域名',
    helper: '你在阿里云上配置的CDN加速域名，比如:certd.docmirror.cn',
    required: true,
  })
  domainName!: string;

  @TaskInput({
    title: '证书名称',
    helper: '上传后将以此名称作为前缀备注',
  })
  certName!: string;

  async onInstance() {}
  async execute(): Promise<void> {
    this.logger.info('开始部署证书到阿里云DCDN');
    const access = (await this.accessService.getById(this.accessId)) as AliyunAccess;
    const client = await this.getClient(access);
    const params = await this.buildParams();
    await this.doRequest(client, params);
    this.logger.info('部署完成');
  }

  async getClient(access: AliyunAccess) {
    const client = new AliyunClient({ logger: this.logger });
    await client.init({
      accessKeyId: access.accessKeyId,
      accessKeySecret: access.accessKeySecret,
      endpoint: 'https://dcdn.aliyuncs.com',
      apiVersion: '2018-01-15',
    });
    return client;
  }

  async buildParams() {
    const CertName = (this.certName ?? 'certd') + '-' + dayjs().format('YYYYMMDDHHmmss');

    if (typeof this.cert !== 'object') {
      const certId = this.cert;
      this.logger.info('使用已上传的证书:', certId);
      return {
        DomainName: this.domainName,
        SSLProtocol: 'on',
        CertType: 'cas',
        CertName: CertName,
        CertId: certId,
      };
    }

    this.logger.info('上传证书:', CertName);
    const cert: any = this.cert;
    return {
      DomainName: this.domainName,
      SSLProtocol: 'on',
      CertName: CertName,
      CertType: 'upload',
      SSLPub: cert.crt,
      SSLPri: cert.key,
    };
  }

  async doRequest(client: any, params: any) {
    const requestOption = {
      method: 'POST',
      formatParams: false,
    };
    const ret: any = await client.request('SetDcdnDomainSSLCertificate', params, requestOption);
    this.checkRet(ret);
    this.logger.info('设置Dcdn证书成功:', ret.RequestId);
  }

  checkRet(ret: any) {
    if (ret.Code != null) {
      throw new Error('执行失败：' + ret.Message);
    }
  }
}
new DeployCertToAliyunDCDN();
