import { FtpAccess } from "./access";
import { ILogger } from "@certd/basic";
import path from "node:path";

export class FtpClient {
  access: FtpAccess = null;
  logger: ILogger = null;
  client: any;
  constructor(opts: { access: FtpAccess; logger: ILogger }) {
    this.access = opts.access;
    this.logger = opts.logger;
  }

  async connect(callback: (client: FtpClient) => Promise<void>) {
    const ftp = await import("basic-ftp");
    const Client = ftp.Client;
    const client = new Client();
    client.ftp.verbose = true;
    this.logger.info("开始连接FTP");
    await client.access(this.access as any);
    this.logger.info("FTP连接成功");
    this.client = client;
    try {
      await callback(this);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async upload(filePath: string, remotePath: string): Promise<void> {
    if (!remotePath) {
      return;
    }
    const dirname = path.dirname(remotePath);
    this.logger.info(`确保目录存在：${dirname}`);
    await this.client.ensureDir(dirname);
    this.logger.info(`开始上传文件${filePath} -> ${remotePath}`);
    await this.client.uploadFrom(filePath, remotePath);
  }

  async remove(filePath: string): Promise<void> {
    this.logger.info(`开始删除文件${filePath}`);
    await this.client.remove(filePath, true);
  }
}
