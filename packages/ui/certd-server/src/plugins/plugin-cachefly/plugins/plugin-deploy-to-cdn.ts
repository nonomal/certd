import { AbstractTaskPlugin, IsTaskPlugin, pluginGroups, RunStrategy, TaskInput } from '@certd/pipeline';
import { CertInfo } from '@certd/plugin-cert';
import { CacheflyAccess } from '../access.js';

@IsTaskPlugin({
  name: 'CacheFly',
  title: 'CacheFly-部署证书到CacheFly',
  desc: '部署证书到 CacheFly',
  icon: 'clarity:plugin-line',
  group: pluginGroups.cdn.key,
  default: {
    strategy: {
      runStrategy: RunStrategy.SkipWhenSucceed,
    },
  },
})
export class CacheFlyPlugin extends AbstractTaskPlugin {
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
    helper: 'CacheFly 的授权',
    component: {
      name: 'access-selector',
      type: 'CacheFly',
    },
    required: true,
  })
  accessId!: string;
  private readonly baseApi = 'https://api.cachefly.com';

  async onInstance() {}

  private async doRequestApi(url: string, data: any = null, method = 'post', token: string | null = null) {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'x-cf-authorization': `Bearer ${token}` } : {}),
    };
    const res = await this.http.request<any, any>({
      url,
      method,
      data,
      headers,
    });

    return res;
  }

  async execute(): Promise<void> {
    const { cert, accessId } = this;
    const access = (await this.accessService.getById(accessId)) as CacheflyAccess;
    let otp = null;
    if (access.otpkey) {
      const response = await this.http.request<any, any>({
        url: `https://cn-api.my-api.cn/api/totp/?key=${access.otpkey}`,
        method: 'get',
      });
      otp = response;
      this.logger.info('获取到otp:', otp);
    }
    const loginResponse = await this.doRequestApi(`${this.baseApi}/api/2.6/auth/login`, {
      username: access.username,
      password: access.password,
      ...(otp && { otp }),
    });
    const token = loginResponse.token;
    this.logger.info('Token 获取成功');
    // 更新证书
    await this.doRequestApi(
      `${this.baseApi}/api/2.6/certificates`,
      {
        certificate: cert.crt,
        certificateKey: cert.key,
      },
      'post',
      token
    );
    this.logger.info('证书更新成功');
  }
}

new CacheFlyPlugin();
