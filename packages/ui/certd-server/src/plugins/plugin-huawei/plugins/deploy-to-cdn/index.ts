import { AbstractTaskPlugin, IsTaskPlugin, pluginGroups, RunStrategy, TaskInput } from '@certd/pipeline';
import { HuaweiAccess } from '../../access/index.js';
import { CertInfo } from '@certd/plugin-cert';
import { createCertDomainGetterInputDefine, createRemoteSelectInputDefine } from '@certd/plugin-lib';
import { resetLogConfigure } from '@certd/basic';

@IsTaskPlugin({
  name: 'HauweiDeployCertToCDN',
  title: '华为云-部署证书至CDN',
  icon: 'svg:icon-huawei',
  group: pluginGroups.huawei.key,
  desc: '',
  default: {
    strategy: {
      runStrategy: RunStrategy.SkipWhenSucceed,
    },
  },
})
export class HauweiDeployCertToCDN extends AbstractTaskPlugin {
  @TaskInput({
    title: '域名证书',
    helper: '请选择前置任务输出的域名证书',
    component: {
      name: 'output-selector',
      from: ['CertApply', 'CertApplyLego'],
    },
    required: true,
  })
  cert!: CertInfo;

  @TaskInput(createCertDomainGetterInputDefine({ props: { required: false } }))
  certDomains!: string[];

  @TaskInput({
    title: 'Access授权',
    helper: '华为云授权AccessKeyId、AccessKeySecret',
    component: {
      name: 'access-selector',
      type: 'huawei',
    },
    required: true,
  })
  accessId!: string;

  @TaskInput(
    createRemoteSelectInputDefine({
      title: 'CDN域名',
      helper: '请选择域名或输入域名',
      typeName: 'HauweiDeployCertToCDN',
      action: HauweiDeployCertToCDN.prototype.onGetDomainList.name,
    })
  )
  domains!: string[];

  async execute(): Promise<void> {
    this.logger.info('开始部署证书到华为云cdn');
    const { cdn, client } = await this.getCdnClient();
    const httpsConfig = new cdn.HttpPutBody()
      .withHttpsStatus('on')
      .withCertificateType('server')
      .withCertificateName(this.appendTimeSuffix('certd'))
      .withCertificateValue(this.cert.crt)
      .withPrivateKey(this.cert.key);

    const config = new cdn.Configs().withHttps(httpsConfig);
    const body = new cdn.ModifyDomainConfigRequestBody().withConfigs(config);
    if (!this.domains || this.domains.length === 0) {
      throw new Error('您还未配置CDN域名');
    }
    this.logger.info('部署域名：', JSON.stringify(this.domains));
    for (const domain of this.domains) {
      this.logger.info('部署到域名:', domain);
      const req = new cdn.UpdateDomainFullConfigRequest().withDomainName(domain).withBody(body);
      await client.updateDomainFullConfig(req);
      this.logger.info(`部署到域名${domain}完成:`);
    }

    this.logger.info('部署证书到华为云cdn完成');
  }

  async getCdnClient() {
    const access = await this.accessService.getById<HuaweiAccess>(this.accessId);
    const { BasicCredentials } = await import('@huaweicloud/huaweicloud-sdk-core');
    const cdn = await import('@huaweicloud/huaweicloud-sdk-cdn/v2/public-api.js');
    //恢复华为云把log4j的config改了的问题
    resetLogConfigure();
    const credentials = new BasicCredentials().withAk(access.accessKeyId).withSk(access.accessKeySecret);
    const client = cdn.CdnClient.newBuilder().withCredential(credentials).withEndpoint('https://cdn.myhuaweicloud.com').build();
    return {
      client,
      cdn,
    };
  }

  async onGetDomainList(data: any) {
    const { client, cdn } = await this.getCdnClient();

    const request = new cdn.ListDomainsRequest();
    request.pageNumber = 1;
    request.pageSize = 1000;
    const result: any = await client.listDomains(request);
    if (!result || !result.domains || result.domains.length === 0) {
      throw new Error('未找到CDN域名，您可以手动输入');
    }

    const domains = result.domains.map(domain => {
      return {
        value: domain.domain_name,
        label: domain.domain_name,
        domain: domain.domain_name,
      };
    });

    return this.ctx.utils.options.buildGroupOptions(domains, this.certDomains);
  }
}
new HauweiDeployCertToCDN();
