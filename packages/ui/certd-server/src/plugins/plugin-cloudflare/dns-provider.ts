import { AbstractDnsProvider, CreateRecordOptions, IsDnsProvider, RemoveRecordOptions } from '@certd/plugin-cert';

import { CloudflareAccess } from './access.js';

export type CloudflareRecord = {
  id: string;
  type: string;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
  zone_id: string;
  zone_name: string;
  created_on: string;
  modified_on: string;
};

// 这里通过IsDnsProvider注册一个dnsProvider
@IsDnsProvider({
  name: 'cloudflare',
  title: 'cloudflare',
  desc: 'cloudflare dns provider',
  icon: 'simple-icons:cloudflare',
  // 这里是对应的 cloudflare的access类型名称
  accessType: 'cloudflare',
})
export class CloudflareDnsProvider extends AbstractDnsProvider<CloudflareRecord> {
  // 通过Autowire传递context
  access!: CloudflareAccess;
  async onInstance() {
    //一些初始化的操作
    // 也可以通过ctx成员变量传递context， 与Autowire效果一样
    this.access = this.ctx.access as CloudflareAccess;
  }

  async getZoneId(domain: string) {
    this.logger.info('获取zoneId:', domain);
    const url = `https://api.cloudflare.com/client/v4/zones?name=${domain}`;
    const res = await this.doRequestApi(url, null, 'get');
    if (res.result.length === 0) {
      throw new Error(`未找到域名${domain}的zoneId`);
    }
    return res.result[0].id;
  }

  private async doRequestApi(url: string, data: any = null, method = 'post') {
    try {
      const res = await this.http.request<any, any>({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.access.apiToken}`,
        },
        data,
      });

      if (!res.success) {
        throw new Error(`${JSON.stringify(res.errors)}`);
      }
      return res;
    } catch (e: any) {
      const data = e.response?.data;
      if (data && data.success === false && data.errors && data.errors.length > 0) {
        if (data.errors[0].code === 81058) {
          this.logger.info('dns解析记录重复');
          return null;
        }
      }
      throw e;
    }
  }

  /**
   * 创建dns解析记录，用于验证域名所有权
   */
  async createRecord(options: CreateRecordOptions): Promise<CloudflareRecord> {
    /**
     * fullRecord: '_acme-challenge.test.example.com',
     * value: 一串uuid
     * type: 'TXT',
     * domain: 'example.com'
     */
    const { fullRecord, value, type, domain } = options;
    this.logger.info('添加域名解析：', fullRecord, value, type, domain);

    const zoneId = await this.getZoneId(domain);
    this.logger.info('获取zoneId成功:', zoneId);

    // 给domain下创建txt类型的dns解析记录，fullRecord
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
    const res = await this.doRequestApi(url, {
      content: value,
      name: fullRecord,
      type: type,
      ttl: 60,
    });
    let record: any = null;
    if (res == null) {
      //重复的记录
      this.logger.info(`dns解析记录重复，无需重复添加`);
      record = await this.findRecord(zoneId, options);
    } else {
      record = res.result as CloudflareRecord;
      this.logger.info(`添加域名解析成功:fullRecord=${fullRecord},value=${value}`);
      this.logger.info(`dns解析记录:${JSON.stringify(record)}`);
    }
    //本接口需要返回本次创建的dns解析记录，这个记录会在删除的时候用到
    record.zone_id = zoneId;
    return record;
  }

  async findRecord(zoneId: string, options: CreateRecordOptions): Promise<CloudflareRecord | null> {
    const { fullRecord, value } = options;
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=TXT&name=${fullRecord}&content=${value}`;
    const res = await this.doRequestApi(url, null, 'get');
    if (res.result.length === 0) {
      return null;
    }
    return res.result[0] as CloudflareRecord;
  }

  /**
   *  删除dns解析记录,清理申请痕迹
   * @param options
   */
  async removeRecord(options: RemoveRecordOptions<CloudflareRecord>): Promise<void> {
    const { fullRecord, value } = options.recordReq;
    const record = options.recordRes;
    this.logger.info('删除域名解析：', fullRecord, value);
    if (!record) {
      this.logger.info('record为空，不执行删除');
      return;
    }
    //这里调用删除txt dns解析记录接口
    const zoneId = record.zone_id;
    const recordId = record.id;
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`;
    await this.doRequestApi(url, null, 'delete');
    this.logger.info(`删除域名解析成功:fullRecord=${fullRecord},value=${value}`);
  }
}

//实例化这个provider，将其自动注册到系统中
new CloudflareDnsProvider();
