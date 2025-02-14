import { BaseHttpChallengeUploader } from "../api.js";
import { QiniuOssAccess, QiniuClient, QiniuAccess } from "@certd/plugin-lib";

export class QiniuOssHttpChallengeUploader extends BaseHttpChallengeUploader<QiniuOssAccess> {
  async upload(filePath: string, fileContent: Buffer) {
    const qiniuAccess = await this.ctx.accessService.getById<QiniuAccess>(this.access.accessId);
    const client = new QiniuClient({
      access: qiniuAccess,
      logger: this.logger,
      http: this.ctx.utils.http,
    });
    if (this.rootDir.endsWith("/")) {
      this.rootDir = this.rootDir.slice(0, -1);
    }
    await client.uploadFile(this.access.bucket, this.rootDir + filePath, fileContent);
  }

  async remove(filePath: string) {
    const qiniuAccess = await this.ctx.accessService.getById<QiniuAccess>(this.access.accessId);
    const client = new QiniuClient({
      access: qiniuAccess,
      logger: this.logger,
      http: this.ctx.utils.http,
    });

    if (this.rootDir.endsWith("/")) {
      this.rootDir = this.rootDir.slice(0, -1);
    }
    await client.removeFile(this.access.bucket, this.rootDir + filePath);
  }
}
