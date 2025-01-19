import { HttpClient, ILogger } from "@certd/basic";
import { QiniuAccess } from "../access.js";

export type QiniuCertInfo = {
  key: string;
  crt: string;
};
export class QiniuClient {
  http: HttpClient;
  access: QiniuAccess;
  logger: ILogger;
  constructor(opts: { http: HttpClient; access: QiniuAccess; logger: ILogger }) {
    this.http = opts.http;
    this.access = opts.access;
    this.logger = opts.logger;
  }

  async uploadCert(cert: QiniuCertInfo, certName?: string) {
    const url = "https://api.qiniu.com/sslcert";

    const body = {
      name: certName,
      common_name: "certd",
      pri: cert.key,
      ca: cert.crt,
    };

    const res = await this.doRequest(url, "post", body);

    return res.certID;
  }

  async bindCert(body: { certid: string; domain: string }) {
    const url = "https://api.qiniu.com/cert/bind";
    return await this.doRequest(url, "post", body);
  }

  async getCertBindings() {
    const url = "https://api.qiniu.com/cert/bindings";
    const res = await this.doRequest(url, "get");
    return res;
  }

  async doRequest(url: string, method: string, body?: any) {
    const { generateAccessToken } = await import("qiniu/qiniu/util.js");
    const token = generateAccessToken(this.access, url);
    const res = await this.http.request({
      url,
      method: method,
      headers: {
        Authorization: token,
      },
      data: body,
      logRes: false,
    });
    if (res && res.error) {
      if (res.error.includes("domaintype")) {
        throw new Error("请求失败：" + res.error + ",该域名属于CDN域名，请使用部署到七牛云CDN插件");
      }
      throw new Error("请求失败：" + res.error);
    }
    console.log("res", res);
    return res;
  }

  async doRequestV2(opts: { url: string; method: string; body?: any; contentType: string }) {
    const { HttpClient } = await import("qiniu/qiniu/httpc/client.js");
    const { QiniuAuthMiddleware } = await import("qiniu/qiniu/httpc/middleware/qiniuAuth.js");
    // X-Qiniu-Date: 20060102T150405Z
    const auth = new QiniuAuthMiddleware({
      mac: {
        ...this.access,
        options: {},
      },
    });
    const http = new HttpClient({ timeout: 10000, middlewares: [auth] });
    console.log("http", http);

    return new Promise((resolve, reject) => {
      try {
        http.get({
          url: opts.url,
          headers: {
            "Content-Type": opts.contentType,
          },
          callback: (nullable, res) => {
            console.log("nullable", nullable, "res", res);
            if (res?.error) {
              reject(res);
            } else {
              resolve(res);
            }
          },
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async uploadFile(bucket: string, key: string, content: Buffer) {
    const sdk = await import("qiniu");
    const qiniu = sdk.default;
    const mac = new qiniu.auth.digest.Mac(this.access.accessKey, this.access.secretKey);
    const options = {
      scope: bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    const { data, resp } = await formUploader.put(uploadToken, key, content, putExtra);
    if (resp.statusCode === 200) {
      this.logger.info("文件上传成功：" + key);
      return data;
    } else {
      console.log(resp.statusCode);
      throw new Error("上传失败:" + JSON.stringify(resp));
    }
  }

  async removeFile(bucket: string, key: string) {
    const sdk = await import("qiniu");
    const qiniu = sdk.default;
    const mac = new qiniu.auth.digest.Mac(this.access.accessKey, this.access.secretKey);
    const config = new qiniu.conf.Config();
    config.useHttpsDomain = true;
    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    const { resp } = await bucketManager.delete(bucket, key);

    if (resp.statusCode === 200) {
      this.logger.info("文件删除成功：" + key);
      return;
    } else {
      throw new Error("删除失败:" + JSON.stringify(resp));
    }
  }
}
