import { IsTaskPlugin, pluginGroups, RunStrategy, TaskInput } from '@certd/pipeline';
import { AbstractPlusTaskPlugin } from '@certd/plugin-plus';

@IsTaskPlugin({
  name: 'DeployCertToTencentAll',
  title: '腾讯云-部署证书到任意云资源',
  needPlus: true,
  icon: 'svg:icon-tencentcloud',
  group: pluginGroups.tencent.key,
  desc: '需要【上传到腾讯云】作为前置任务',
  default: {
    strategy: {
      runStrategy: RunStrategy.SkipWhenSucceed,
    },
  },
})
export class DeployCertToTencentAll extends AbstractPlusTaskPlugin {
  /**
   * AccessProvider的key,或者一个包含access的具体的对象
   */
  @TaskInput({
    title: 'Access授权',
    helper: 'access授权',
    component: {
      name: 'access-selector',
      type: 'tencent',
    },
    required: true,
  })
  accessId!: string;

  @TaskInput({
    title: '腾讯云证书id',
    helper: '请选择“上传证书到腾讯云”前置任务的输出',
    component: {
      name: 'output-selector',
      from: 'UploadCertToTencent',
    },
    required: true,
  })
  tencentCertId!: string;

  @TaskInput({
    title: '云资源实例Id列表',
    component: {
      name: 'a-select',
      vModel: 'value',
      open: false,
      mode: 'tags',
    },
    helper: '',
  })
  instanceIdList!: string[];

  async onInstance() {}
  async execute(): Promise<void> {
    const accessProvider = await this.accessService.getById(this.accessId);

    const sdk = await import('tencentcloud-sdk-nodejs/tencentcloud/services/ssl/v20191205/index.js');
    const Client = sdk.v20191205.Client;
    const client = new Client({
      credential: {
        secretId: accessProvider.secretId,
        secretKey: accessProvider.secretKey,
      },
      region: '',
      profile: {
        httpProfile: {
          endpoint: 'ssl.tencentcloudapi.com',
        },
      },
    });

    const params = {
      CertificateId: this.tencentCertId,
      InstanceIdList: this.instanceIdList,
    };

    const res = await client.DeployCertificateInstance(params);
    this.checkRet(res);
    this.logger.info('部署成功');
  }

  checkRet(ret: any) {
    if (!ret || ret.Error) {
      throw new Error('执行失败：' + ret.Error.Code + ',' + ret.Error.Message);
    }
  }
}
