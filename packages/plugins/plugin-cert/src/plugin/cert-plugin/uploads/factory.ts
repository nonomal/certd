import { HttpChallengeUploadContext } from "./api";

export class HttpChallengeUploaderFactory {
  async getClassByType(type: string) {
    if (type === "alioss") {
      const module = await import("./impls/alioss.js");
      return module.AliossHttpChallengeUploader;
    } else if (type === "ssh") {
      const module = await import("./impls/ssh.js");
      return module.SshHttpChallengeUploader;
    } else if (type === "sftp") {
      const module = await import("./impls/sftp.js");
      return module.SftpHttpChallengeUploader;
    } else if (type === "ftp") {
      const module = await import("./impls/ftp.js");
      return module.FtpHttpChallengeUploader;
    } else if (type === "tencentcos") {
      const module = await import("./impls/tencentcos.js");
      return module.TencentCosHttpChallengeUploader;
    } else if (type === "qiniuoss") {
      const module = await import("./impls/qiniuoss.js");
      return module.QiniuOssHttpChallengeUploader;
    } else {
      throw new Error(`暂不支持此文件上传方式: ${type}`);
    }
  }
  async createUploaderByType(type: string, opts: { rootDir: string; access: any; ctx: HttpChallengeUploadContext }) {
    const cls = await this.getClassByType(type);
    if (cls) {
      // @ts-ignore
      const instance = new cls(opts);
      await instance.setCtx(opts.ctx);
      return instance;
    }
  }
}

export const httpChallengeUploaderFactory = new HttpChallengeUploaderFactory();
