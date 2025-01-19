import { TencentAccess } from "../access.js";
import { ILogger } from "@certd/basic";

export class TencentCosClient {
  access: TencentAccess;
  logger: ILogger;
  region: string;
  bucket: string;

  constructor(opts: { access: TencentAccess; logger: ILogger; region: string; bucket: string }) {
    this.access = opts.access;
    this.logger = opts.logger;
    this.bucket = opts.bucket;
    this.region = opts.region;
  }

  async getCosClient() {
    const sdk = await import("cos-nodejs-sdk-v5");
    const clientConfig = {
      SecretId: this.access.secretId,
      SecretKey: this.access.secretKey,
    };
    return new sdk.default(clientConfig);
  }

  async uploadFile(key: string, file: Buffer) {
    const cos = await this.getCosClient();
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket: this.bucket /* 必须 */,
          Region: this.region /* 必须 */,
          Key: key /* 必须 */,
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });
  }

  async removeFile(key: string) {
    const cos = await this.getCosClient();
    return new Promise((resolve, reject) => {
      cos.deleteObject(
        {
          Bucket: this.bucket,
          Region: this.region,
          Key: key,
        },
        function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });
  }
}
