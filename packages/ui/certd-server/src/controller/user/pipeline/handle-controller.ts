import { ALL, Body, Controller, Inject, Post, Provide } from '@midwayjs/core';
import { BaseController, Constants } from '@certd/lib-server';
import {
  AccessRequestHandleReq,
  ITaskPlugin,
  newAccess,
  newNotification,
  NotificationRequestHandleReq,
  pluginRegistry,
  PluginRequestHandleReq,
  TaskInstanceContext,
} from '@certd/pipeline';
import { AccessService, AccessGetter } from '@certd/lib-server';
import { EmailService } from '../../../modules/basic/service/email-service.js';
import { http, HttpRequestConfig, logger, mergeUtils, utils } from '@certd/basic';
import { NotificationService } from '../../../modules/pipeline/service/notification-service.js';

@Provide()
@Controller('/api/pi/handle')
export class HandleController extends BaseController {
  @Inject()
  accessService: AccessService;

  @Inject()
  emailService: EmailService;

  @Inject()
  notificationService: NotificationService;

  @Post('/access', { summary: Constants.per.authOnly })
  async accessRequest(@Body(ALL) body: AccessRequestHandleReq) {
    let inputAccess = body.input.access;
    if (body.input.id > 0) {
      const oldEntity = await this.accessService.info(body.input.id);
      if (oldEntity) {
        if (oldEntity.userId !== this.getUserId()) {
          throw new Error('access not found');
        }
        const param: any = {
          type: body.typeName,
          setting: JSON.stringify(body.input.access),
        };
        this.accessService.encryptSetting(param, oldEntity);
        inputAccess = this.accessService.decryptAccessEntity(param);
      }
    }

    const access = newAccess(body.typeName, inputAccess);

    const res = await access.onRequest(body);

    return this.ok(res);
  }

  @Post('/notification', { summary: Constants.per.authOnly })
  async notificationRequest(@Body(ALL) body: NotificationRequestHandleReq) {
    const input = body.input.body;

    const notification = await newNotification(body.typeName, input, {
      http,
      logger,
      utils,
      emailService: this.emailService,
    });

    const res = await notification.onRequest(body);

    return this.ok(res);
  }

  @Post('/plugin', { summary: Constants.per.authOnly })
  async pluginRequest(@Body(ALL) body: PluginRequestHandleReq) {
    const userId = this.getUserId();
    const pluginDefine = pluginRegistry.get(body.typeName);
    const pluginCls = pluginDefine.target;
    if (pluginCls == null) {
      throw new Error(`plugin ${body.typeName} not found`);
    }
    //实例化access
    //@ts-ignore
    const plugin: PluginRequestHandler = new pluginCls();
    //@ts-ignore
    const instance = plugin as ITaskPlugin;

    const accessGetter = new AccessGetter(userId, this.accessService.getById.bind(this.accessService));

    const download = async (config: HttpRequestConfig, savePath: string) => {
      await utils.download({
        http,
        logger,
        config,
        savePath,
      });
    };
    //@ts-ignore
    const taskCtx: TaskInstanceContext = {
      pipeline: undefined,
      step: undefined,
      lastStatus: undefined,
      http,
      download,
      logger: logger,
      inputChanged: true,
      accessService: accessGetter,
      emailService: this.emailService,
      pipelineContext: undefined,
      userContext: undefined,
      fileStore: undefined,
      signal: undefined,
      // pipelineContext: this.pipelineContext,
      // userContext: this.contextFactory.getContext('user', this.options.userId),
      // fileStore: new FileStore({
      //   scope: this.pipeline.id,
      //   parent: this.runtime.id,
      //   rootDir: this.options.fileRootDir,
      // }),
      // signal: this.abort.signal,
      utils,
    };
    instance.setCtx(taskCtx);
    mergeUtils.merge(plugin, body.input);
    await instance.onInstance();
    const res = await plugin.onRequest(body);

    return this.ok(res);
  }
}
