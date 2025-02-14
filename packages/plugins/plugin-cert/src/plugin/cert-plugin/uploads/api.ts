import { IAccessService } from "@certd/pipeline";
import { ILogger, utils } from "@certd/basic";

export type HttpChallengeUploader = {
  upload: (fileName: string, fileContent: Buffer) => Promise<void>;
  remove: (fileName: string) => Promise<void>;
};

export type HttpChallengeUploadContext = {
  accessService: IAccessService;
  logger: ILogger;
  utils: typeof utils;
};

export abstract class BaseHttpChallengeUploader<A> implements HttpChallengeUploader {
  rootDir: string;
  access: A = null;
  logger: ILogger;
  utils: typeof utils;
  ctx: HttpChallengeUploadContext;
  protected constructor(opts: { rootDir: string; access: A }) {
    this.rootDir = opts.rootDir;
    this.access = opts.access;
  }

  async setCtx(ctx: any) {
    // set context
    this.ctx = ctx;
    this.logger = ctx.logger;
    this.utils = ctx.utils;
  }

  abstract remove(fileName: string): Promise<void>;
  abstract upload(fileName: string, fileContent: Buffer): Promise<void>;
}
