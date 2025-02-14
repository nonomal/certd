import { Registrable } from "../registry/index.js";
import { FormItemProps } from "../dt/index.js";
import { HttpClient, ILogger, utils } from "@certd/basic";
import * as _ from "lodash-es";
import { PluginRequestHandleReq } from "../plugin/index.js";

export type AccessRequestHandleReqInput<T = any> = {
  id?: number;
  title?: string;
  access: T;
};

export type AccessRequestHandleReq<T = any> = PluginRequestHandleReq<AccessRequestHandleReqInput<T>>;

export type AccessInputDefine = FormItemProps & {
  title: string;
  required?: boolean;
  encrypt?: boolean;
};
export type AccessDefine = Registrable & {
  icon?: string;
  input?: {
    [key: string]: AccessInputDefine;
  };
};
export interface IAccessService {
  getById<T = any>(id: any): Promise<T>;
  getCommonById<T = any>(id: any): Promise<T>;
}

export interface IAccess {
  ctx: AccessContext;
  [key: string]: any;
}

export type AccessContext = {
  http: HttpClient;
  logger: ILogger;
  utils: typeof utils;
};

export abstract class BaseAccess implements IAccess {
  ctx!: AccessContext;

  setCtx(ctx: AccessContext) {
    this.ctx = ctx;
  }

  async onRequest(req: AccessRequestHandleReq) {
    if (!req.action) {
      throw new Error("action is required");
    }

    let methodName = req.action;
    if (!req.action.startsWith("on")) {
      methodName = `on${_.upperFirst(req.action)}`;
    }

    // @ts-ignore
    const method = this[methodName];
    if (method) {
      // @ts-ignore
      return await this[methodName](req.data);
    }
    throw new Error(`action ${req.action} not found`);
  }
}
