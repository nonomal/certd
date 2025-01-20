import { AbstractTaskPlugin, IsTaskPlugin, pluginGroups, RunStrategy, TaskInput } from '@certd/pipeline';
import { CertInfo } from '@certd/plugin-cert';
import { AliyunAccess, AliyunClient, AliyunSslClient, createCertDomainGetterInputDefine, createRemoteSelectInputDefine } from '@certd/plugin-lib';

@IsTaskPlugin({
  name: 'AliyunDeployCertToNLB',
  title: '阿里云-部署至NLB（网络负载均衡）',
  icon: 'ant-design:aliyun-outlined',
  group: pluginGroups.aliyun.key,
  desc: 'NLB,网络负载均衡,更新监听器的默认证书',
  needPlus: false,
  default: {
    strategy: {
      runStrategy: RunStrategy.SkipWhenSucceed,
    },
  },
})
export class AliyunDeployCertToNLB extends AbstractTaskPlugin {
  @TaskInput({
    title: '域名证书',
    helper: '请选择证书申请任务输出的域名证书\n或者选择前置任务“上传证书到阿里云”任务的证书ID，可以减少上传到阿里云的证书数量',
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

  @TaskInput(
    createRemoteSelectInputDefine({
      title: 'NLB所在地区',
      typeName: 'AliyunDeployCertToNLB',
      multi: false,
      action: AliyunDeployCertToNLB.prototype.onGetRegionList.name,
      watches: ['accessId'],
    })
  )
  regionId: string;

  @TaskInput(
    createRemoteSelectInputDefine({
      title: '负载均衡列表',
      helper: '要部署证书的负载均衡ID',
      typeName: 'AliyunDeployCertToNLB',
      action: AliyunDeployCertToNLB.prototype.onGetLoadBalanceList.name,
      watches: ['regionId'],
    })
  )
  loadBalancers!: string[];

  @TaskInput(
    createRemoteSelectInputDefine({
      title: '监听器列表',
      helper: '要部署证书的监听器列表',
      typeName: 'AliyunDeployCertToNLB',
      action: AliyunDeployCertToNLB.prototype.onGetListenerList.name,
      watches: ['loadBalancers'],
    })
  )
  listeners!: string[];

  @TaskInput({
    title: '证书接入点',
    helper: '不会选就保持默认即可',
    value: 'cas.aliyuncs.com',
    component: {
      name: 'a-select',
      options: [
        { value: 'cas.aliyuncs.com', label: '中国大陆' },
        { value: 'cas.ap-southeast-1.aliyuncs.com', label: '新加坡' },
        { value: 'cas.eu-central-1.aliyuncs.com', label: '德国（法兰克福）' },
      ],
    },
    required: true,
  })
  casEndpoint!: string;

  async onInstance() {}

  async getLBClient(access: AliyunAccess, region: string) {
    const client = new AliyunClient({ logger: this.logger });

    const version = '2022-04-30';
    await client.init({
      accessKeyId: access.accessKeyId,
      accessKeySecret: access.accessKeySecret,
      //https://wafopenapi.cn-hangzhou.aliyuncs.com
      endpoint: `https://nlb.${region}.aliyuncs.com`,
      apiVersion: version,
    });
    return client;
  }

  async execute(): Promise<void> {
    this.logger.info(`开始部署证书到阿里云(nlb)`);
    const access = await this.accessService.getById<AliyunAccess>(this.accessId);
    const certId = await this.getAliyunCertId(access);

    const client = await this.getLBClient(access, this.regionId);

    for (const listener of this.listeners) {
      //查询原来的证书
      const params: any = {
        RegionId: this.regionId,
        ListenerId: listener,
        CertificateIds: [certId],
      };

      const res = await client.request('UpdateListenerAttribute', params);
      this.checkRet(res);
      this.logger.info(`部署${listener}监听器证书成功`, JSON.stringify(res));

      //删除旧证书关联
    }
    this.logger.info('执行完成');
  }

  async getAliyunCertId(access: AliyunAccess) {
    let certId: any = this.cert;
    if (typeof this.cert === 'object') {
      const sslClient = new AliyunSslClient({
        access,
        logger: this.logger,
        endpoint: this.casEndpoint,
      });

      certId = await sslClient.uploadCert({
        name: this.appendTimeSuffix('certd'),
        cert: this.cert,
      });
    }
    return certId;
  }

  async onGetRegionList(data: any) {
    if (!this.accessId) {
      throw new Error('请选择Access授权');
    }
    const access = await this.accessService.getById<AliyunAccess>(this.accessId);
    const client = await this.getLBClient(access, 'cn-shanghai');

    const res = await client.request('DescribeRegions', {});
    this.checkRet(res);
    if (!res?.Regions || res?.Regions.length === 0) {
      throw new Error('没有找到Regions列表');
    }

    return res.Regions.map((item: any) => {
      return {
        label: item.LocalName,
        value: item.RegionId,
        endpoint: item.RegionEndpoint,
      };
    });
  }

  async onGetLoadBalanceList(data: any) {
    if (!this.accessId) {
      throw new Error('请先选择Access授权');
    }
    if (!this.regionId) {
      throw new Error('请先选择地区');
    }
    const access = await this.accessService.getById<AliyunAccess>(this.accessId);
    const client = await this.getLBClient(access, this.regionId);

    const params = {
      MaxResults: 100,
    };
    const res = await client.request('ListLoadBalancers', params);
    this.checkRet(res);
    if (!res?.LoadBalancers || res?.LoadBalancers.length === 0) {
      throw new Error('没有找到LoadBalancers');
    }

    return res.LoadBalancers.map((item: any) => {
      const label = `${item.LoadBalancerId}<${item.LoadBalancerName}}>`;
      return {
        label: label,
        value: item.LoadBalancerId,
      };
    });
  }

  async onGetListenerList(data: any) {
    if (!this.accessId) {
      throw new Error('请先选择Access授权');
    }
    if (!this.regionId) {
      throw new Error('请先选择地区');
    }
    const access = await this.accessService.getById<AliyunAccess>(this.accessId);
    const client = await this.getLBClient(access, this.regionId);

    const params: any = {
      MaxResults: 100,
    };
    if (this.loadBalancers && this.loadBalancers.length > 0) {
      params.LoadBalancerIds = this.loadBalancers;
    }
    const res = await client.request('ListListeners', params);
    this.checkRet(res);
    if (!res?.Listeners || res?.Listeners.length === 0) {
      throw new Error('没有找到TCPSSL监听器');
    }

    return res.Listeners.map((item: any) => {
      const label = `${item.ListenerId}<${item.ListenerDescription}@${item.LoadBalancerId}>`;
      return {
        label: label,
        value: item.ListenerId,
        lbid: item.LoadBalancerId,
      };
    });
  }

  checkRet(ret: any) {
    if (ret.Code != null) {
      throw new Error(ret.Message);
    }
  }
}

new AliyunDeployCertToNLB();
