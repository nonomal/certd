import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { BaseService, SysInstallInfo, SysSettingsService, SysSiteInfo, ValidateException } from '@certd/lib-server';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../entity/notification.js';
import { NotificationInstanceConfig, notificationRegistry, NotificationSendReq, sendNotification } from '@certd/pipeline';
import { http, utils } from '@certd/basic';
import { EmailService } from '../../basic/service/email-service.js';
import { isComm } from '@certd/plus-core';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class NotificationService extends BaseService<NotificationEntity> {
  @InjectEntityModel(NotificationEntity)
  repository: Repository<NotificationEntity>;

  @Inject()
  emailService: EmailService;

  @Inject()
  sysSettingsService: SysSettingsService;

  //@ts-ignore
  getRepository() {
    return this.repository;
  }

  async getSimpleInfo(id: number) {
    const entity = await this.info(id);
    if (entity == null) {
      throw new ValidateException('该通知配置不存在,请确认是否已被删除');
    }
    return {
      id: entity.id,
      name: entity.name,
      userId: entity.userId,
    };
  }

  getDefineList() {
    return notificationRegistry.getDefineList();
  }

  getDefineByType(type: string) {
    return notificationRegistry.getDefine(type);
  }

  async getById(id: number, userId: number): Promise<NotificationInstanceConfig> {
    if (!id) {
      throw new ValidateException('id不能为空');
    }
    if (!userId) {
      throw new ValidateException('userId不能为空');
    }
    const res = await this.repository.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!res) {
      throw new ValidateException(`通知配置不存在<${id}>`);
    }
    return this.buildNotificationInstanceConfig(res);
  }

  private buildNotificationInstanceConfig(res: NotificationEntity) {
    const setting = JSON.parse(res.setting);
    return {
      id: res.id,
      type: res.type,
      name: res.name,
      userId: res.userId,
      setting,
    };
  }

  async getDefault(userId: number): Promise<NotificationInstanceConfig> {
    const res = await this.repository.findOne({
      where: {
        userId,
      },
      order: {
        isDefault: 'DESC',
      },
    });
    if (!res) {
      return null;
    }
    return this.buildNotificationInstanceConfig(res);
  }

  async setDefault(id: number, userId: number) {
    if (!id) {
      throw new ValidateException('id不能为空');
    }
    if (!userId) {
      throw new ValidateException('userId不能为空');
    }
    await this.repository.update(
      {
        userId,
      },
      {
        isDefault: false,
      }
    );
    await this.repository.update(
      {
        id,
        userId,
      },
      {
        isDefault: true,
      }
    );
  }

  async getOrCreateDefault(email: string, userId: any) {
    const defaultConfig = await this.getDefault(userId);
    if (defaultConfig) {
      return defaultConfig;
    }
    const setting = {
      receivers: [email],
    };
    const res = await this.repository.save({
      userId,
      type: 'email',
      name: '邮件通知',
      setting: JSON.stringify(setting),
      isDefault: true,
    });
    return this.buildNotificationInstanceConfig(res);
  }

  async send(req: NotificationSendReq, userId?: number) {
    const logger = req.logger;
    let notifyConfig: NotificationInstanceConfig = null;
    if (req.id && req.id > 0) {
      notifyConfig = await this.getById(req.id, userId);
      if (!notifyConfig) {
        logger.warn(`未找到通知配置<${req.id}>`);
      }
    }
    if (!notifyConfig) {
      if (req.id === 0 || req.useDefault) {
        notifyConfig = await this.getDefault(userId);
        if (!notifyConfig) {
          logger.warn(`未找到默认通知配置`);
        }
      }
    }

    if (notifyConfig) {
      //发送通知
      logger.info('发送通知, 使用通知渠道：' + notifyConfig.name);

      if (notifyConfig.type != 'email') {
        //非邮件通知，需要加上站点名称
        let siteTitle = 'Certd';
        if (isComm()) {
          const siteInfo = await this.sysSettingsService.getSetting<SysSiteInfo>(SysSiteInfo);
          siteTitle = siteInfo?.title || siteTitle;
        }
        req.body.title = `【${siteTitle}】${req.body.title}`;
      }

      await sendNotification({
        config: notifyConfig,
        ctx: {
          http: http,
          logger: logger,
          utils: utils,
          emailService: this.emailService,
        },
        body: req.body,
      });
    } else {
      if (req.useEmail && req.emailAddress) {
        logger.info('使用邮件通知');
        await this.emailService.send({
          receivers: [req.emailAddress],
          subject: req.body.title,
          content: req.body.content,
        });
      }
    }
  }

  async getBindUrl(path: string) {
    const installInfo = await this.sysSettingsService.getSetting<SysInstallInfo>(SysInstallInfo);
    const bindUrl = installInfo.bindUrl || 'http://127.0.0.1:7001';
    return bindUrl + path;
  }
}
