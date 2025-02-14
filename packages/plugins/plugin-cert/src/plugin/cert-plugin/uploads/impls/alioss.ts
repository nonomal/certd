import { BaseHttpChallengeUploader } from "../api.js";
import { AliossAccess, AliyunAccess } from "@certd/plugin-lib";
import { AliossClient } from "@certd/plugin-lib";

export class AliossHttpChallengeUploader extends BaseHttpChallengeUploader<AliossAccess> {
  async upload(filePath: string, fileContent: Buffer) {
    const aliyunAccess = await this.ctx.accessService.getById<AliyunAccess>(this.access.accessId);
    const client = new AliossClient({
      access: aliyunAccess,
      bucket: this.access.bucket,
      region: this.access.region,
    });

    const key = this.rootDir + filePath;
    this.logger.info(`开始上传文件: ${key}`);
    await client.uploadFile(key, fileContent);

    this.logger.info(`校验文件上传成功: ${filePath}`);
  }

  async remove(filePath: string) {
    const key = this.rootDir + filePath;
    // remove file from alioss
    const client = await this.getAliossClient();
    await client.removeFile(key);
    this.logger.info(`文件删除成功: ${key}`);
  }

  private async getAliossClient() {
    const aliyunAccess = await this.ctx.accessService.getById<AliyunAccess>(this.access.accessId);
    const client = new AliossClient({
      access: aliyunAccess,
      bucket: this.access.bucket,
      region: this.access.region,
    });
    await client.init();
    return client;
  }
}
