import { ILogger } from "@certd/basic";
import { TencentAccess } from "../access.js";

export type TencentCertInfo = {
  key: string;
  crt: string;
};
export class TencentSslClient {
  access: TencentAccess;
  logger: ILogger;
  region?: string;
  constructor(opts: { access: TencentAccess; logger: ILogger; region?: string }) {
    this.access = opts.access;
    this.logger = opts.logger;
    this.region = opts.region;
  }
  async getSslClient(): Promise<any> {
    const sdk = await import("tencentcloud-sdk-nodejs/tencentcloud/services/ssl/v20191205/index.js");
    const SslClient = sdk.v20191205.Client;

    const clientConfig = {
      credential: {
        secretId: this.access.secretId,
        secretKey: this.access.secretKey,
      },
      region: this.region,
      profile: {
        httpProfile: {
          endpoint: "ssl.tencentcloudapi.com",
        },
      },
    };

    return new SslClient(clientConfig);
  }

  checkRet(ret: any) {
    if (!ret || ret.Error) {
      throw new Error("请求失败：" + ret.Error.Code + "," + ret.Error.Message);
    }
  }

  async uploadToTencent(opts: { certName: string; cert: TencentCertInfo }): Promise<string> {
    const client = await this.getSslClient();
    const params = {
      CertificatePublicKey: opts.cert.crt,
      CertificatePrivateKey: opts.cert.key,
      Alias: opts.certName,
    };
    const ret = await client.UploadCertificate(params);
    this.checkRet(ret);
    this.logger.info("证书上传成功：tencentCertId=", ret.CertificateId);
    return ret.CertificateId;
  }

  async deployCertificateInstance(params: any) {
    const client = await this.getSslClient();
    const res = await client.DeployCertificateInstance(params);
    this.checkRet(res);
    return res;
  }

  async DescribeCertificates(params: any) {
    const client = await this.getSslClient();
    const res = await client.DescribeCertificates(params);
    this.checkRet(res);
    return res;
  }

  async doRequest(action: string, params: any) {
    const client = await this.getSslClient();
    if (!client[action]) {
      throw new Error(`action ${action} not found`);
    }
    const res = await client[action](params);
    this.checkRet(res);
    return res;
  }
}
