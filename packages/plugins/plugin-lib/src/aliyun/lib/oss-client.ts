import { AliyunAccess } from "../access";

export class AliossClient {
  access: AliyunAccess;

  region: string;
  bucket: string;
  client: any;
  constructor(opts: { access: AliyunAccess; bucket: string; region: string }) {
    this.access = opts.access;
    this.bucket = opts.bucket;
    this.region = opts.region;
  }

  async init() {
    if (this.client) {
      return;
    }
    // @ts-ignore
    const OSS = await import("ali-oss");
    const ossClient = new OSS.default({
      accessKeyId: this.access.accessKeyId,
      accessKeySecret: this.access.accessKeySecret,
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: this.region,
      //@ts-ignore
      authorizationV4: true,
      // yourBucketName填写Bucket名称。
      bucket: this.bucket,
    });
    // oss

    this.client = ossClient;
  }

  async doRequest(bucket: string, xml: string, params: any) {
    await this.init();
    params = this.client._bucketRequestParams("POST", bucket, {
      ...params,
    });
    params.content = xml;
    params.mime = "xml";
    params.successStatuses = [200];
    const res = await this.client.request(params);
    this.checkRet(res);
    return res;
  }

  checkRet(ret: any) {
    if (ret.Code != null) {
      throw new Error("执行失败：" + ret.Message);
    }
  }

  async uploadFile(filePath: string, content: Buffer) {
    await this.init();
    return await this.client.put(filePath, content);
  }

  async removeFile(filePath: string) {
    await this.init();
    return await this.client.delete(filePath);
  }
}
