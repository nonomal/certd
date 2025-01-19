import { BaseHttpChallengeUploader } from "../api.js";
import { TencentAccess, TencentCosAccess, TencentCosClient } from "@certd/plugin-lib";

export class TencentCosHttpChallengeUploader extends BaseHttpChallengeUploader<TencentCosAccess> {
  async upload(filePath: string, fileContent: Buffer) {
    const access = await this.ctx.accessService.getById<TencentAccess>(this.access.accessId);
    const client = new TencentCosClient({
      access: access,
      logger: this.logger,
      region: this.access.region,
      bucket: this.access.bucket,
    });
    const key = this.rootDir + filePath;
    await client.uploadFile(key, fileContent);
  }

  async remove(filePath: string) {
    const access = await this.ctx.accessService.getById<TencentAccess>(this.access.accessId);
    const client = new TencentCosClient({
      access: access,
      logger: this.logger,
      region: this.access.region,
      bucket: this.access.bucket,
    });
    const key = this.rootDir + filePath;
    await client.removeFile(key);
  }
}
