import { AbstractTaskPlugin, IsTaskPlugin, pluginGroups, RunStrategy, TaskInput, TaskOutput } from '@certd/pipeline';
import { CertInfo } from '@certd/plugin-cert';
import { AwsAccess, AwsRegions } from '../access.js';
import { AwsAcmClient } from '../libs/aws-acm-client.js';

@IsTaskPlugin({
  name: 'AwsUploadToACM',
  title: 'AWS-上传证书到ACM',
  desc: '上传证书 AWS ACM',
  icon: 'clarity:plugin-line',
  group: pluginGroups.aws.key,
  default: {
    strategy: {
      runStrategy: RunStrategy.SkipWhenSucceed,
    },
  },
})
export class AwsUploadToACM extends AbstractTaskPlugin {
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

  @TaskInput({
    title: 'Access授权',
    helper: 'aws的授权',
    component: {
      name: 'access-selector',
      type: 'aws',
    },
    required: true,
  })
  accessId!: string;
  @TaskInput({
    title: '区域',
    helper: '证书上传区域',
    component: {
      name: 'a-auto-complete',
      vModel: 'value',
      options: AwsRegions,
    },
    required: true,
  })
  region!: string;

  @TaskOutput({
    title: '证书ARN',
  })
  awsCertARN = '';

  async onInstance() {}

  async execute(): Promise<void> {
    const { cert, accessId, region } = this;
    const access = await this.accessService.getById<AwsAccess>(accessId);
    const acmClient = new AwsAcmClient({
      access,
      region,
    });
    this.awsCertARN = await acmClient.importCertificate(cert);
    this.logger.info('证书上传成功,id=', this.awsCertARN);
  }
}

new AwsUploadToACM();
