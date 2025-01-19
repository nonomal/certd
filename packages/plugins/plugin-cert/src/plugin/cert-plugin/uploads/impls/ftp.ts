import { BaseHttpChallengeUploader } from "../api.js";
import { FtpAccess, FtpClient } from "@certd/plugin-lib";
import path from "path";
import os from "os";
import fs from "fs";

export class FtpHttpChallengeUploader extends BaseHttpChallengeUploader<FtpAccess> {
  async upload(filePath: string, fileContent: Buffer) {
    const client = new FtpClient({
      access: this.access,
      logger: this.logger,
    });
    await client.connect(async (client) => {
      const tmpFilePath = path.join(os.tmpdir(), "cert", "http", filePath);
      const dir = path.dirname(tmpFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(tmpFilePath, fileContent);
      try {
        // Write file to temp path
        const path = this.rootDir + filePath;
        await client.upload(path, tmpFilePath);
      } finally {
        // Remove temp file
        fs.unlinkSync(tmpFilePath);
      }
    });
  }

  async remove(filePath: string) {
    const client = new FtpClient({
      access: this.access,
      logger: this.logger,
    });
    await client.connect(async (client) => {
      const path = this.rootDir + filePath;
      await client.client.remove(path);
    });
  }
}
