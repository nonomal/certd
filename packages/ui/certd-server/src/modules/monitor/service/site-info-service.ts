import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { BaseService, NeedSuiteException, NeedVIPException, SysSettingsService } from '@certd/lib-server';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SiteInfoEntity } from '../entity/site-info.js';
import { siteTester } from './site-tester.js';
import dayjs from 'dayjs';
import { logger, utils } from '@certd/basic';
import { PeerCertificate } from 'tls';
import { NotificationService } from '../../pipeline/service/notification-service.js';
import { isComm, isPlus } from '@certd/plus-core';
import { UserSuiteService } from '@certd/commercial-core';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class SiteInfoService extends BaseService<SiteInfoEntity> {
  @InjectEntityModel(SiteInfoEntity)
  repository: Repository<SiteInfoEntity>;

  @Inject()
  notificationService: NotificationService;

  @Inject()
  sysSettingsService: SysSettingsService;

  @Inject()
  userSuiteService: UserSuiteService;

  //@ts-ignore
  getRepository() {
    return this.repository;
  }

  async add(data: SiteInfoEntity) {
    if (!data.userId) {
      throw new Error('userId is required');
    }

    if (!isPlus()) {
      const count = await this.getUserMonitorCount(data.userId);
      if (count >= 1) {
        throw new NeedVIPException('站点监控数量已达上限，请升级专业版');
      }
    }
    if (isComm()) {
      const suiteSetting = await this.userSuiteService.getSuiteSetting();
      if (suiteSetting.enabled) {
        const userSuite = await this.userSuiteService.getMySuiteDetail(data.userId);
        if (userSuite.monitorCount.max != -1 && userSuite.monitorCount.max <= userSuite.monitorCount.used) {
          throw new NeedSuiteException('站点监控数量已达上限，请购买或升级套餐');
        }
      }
    }

    data.disabled = false;
    return await super.add(data);
  }

  async update(data: any) {
    if (!data.id) {
      throw new Error('id is required');
    }
    delete data.userId;
    await super.update(data);
  }

  async getUserMonitorCount(userId: number) {
    if (!userId) {
      throw new Error('userId is required');
    }
    return await this.repository.count({
      where: { userId },
    });
  }

  /**
   * 检查站点证书过期时间
   * @param site
   * @param notify
   * @param retryTimes
   */
  async doCheck(site: SiteInfoEntity, notify = true, retryTimes = 3) {
    if (!site?.domain) {
      throw new Error('站点域名不能为空');
    }
    try {
      await this.update({
        id: site.id,
        checkStatus: 'checking',
        lastCheckTime: dayjs,
      });
      const res = await siteTester.test({
        host: site.domain,
        port: site.httpsPort,
        retryTimes,
      });

      const certi: PeerCertificate = res.certificate;
      if (!certi) {
        throw new Error('没有发现证书');
      }
      const expires = certi.valid_to;
      const allDomains = certi.subjectaltname?.replaceAll('DNS:', '').split(',');
      const mainDomain = certi.subject?.CN;
      let domains = allDomains;
      if (!allDomains.includes(mainDomain)) {
        domains = [mainDomain, ...allDomains];
      }
      const issuer = `${certi.issuer.O}<${certi.issuer.CN}>`;
      const isExpired = dayjs().valueOf() > dayjs(expires).valueOf();
      const status = isExpired ? 'expired' : 'ok';
      const updateData = {
        id: site.id,
        certDomains: domains.join(','),
        certStatus: status,
        certProvider: issuer,
        certExpiresTime: dayjs(expires).valueOf(),
        lastCheckTime: dayjs().valueOf(),
        error: null,
        checkStatus: 'ok',
      };

      await this.update(updateData);
      if (!notify) {
        return;
      }
      try {
        await this.sendExpiresNotify(site);
      } catch (e) {
        logger.error('send notify error', e);
      }
    } catch (e) {
      logger.error('check site error', e);
      await this.update({
        id: site.id,
        checkStatus: 'error',
        lastCheckTime: dayjs().valueOf(),
        error: e.message,
      });
      if (!notify) {
        return;
      }
      try {
        await this.sendCheckErrorNotify(site);
      } catch (e) {
        logger.error('send notify error', e);
      }
    }
  }

  /**
   * 检查，但不发邮件
   * @param id
   * @param notify
   * @param retryTimes
   */
  async check(id: number, notify = false, retryTimes = 3) {
    const site = await this.info(id);
    if (!site) {
      throw new Error('站点不存在');
    }
    return await this.doCheck(site, notify, retryTimes);
  }

  async sendCheckErrorNotify(site: SiteInfoEntity) {
    const url = await this.notificationService.getBindUrl('#/certd/monitor/site');
    // 发邮件
    await this.notificationService.send(
      {
        useDefault: true,
        logger: logger,
        body: {
          url,
          title: `站点证书检查出错<${site.name}>`,
          content: `站点名称： ${site.name} \n
站点域名： ${site.domain} \n
错误信息：${site.error}`,
        },
      },
      site.userId
    );
  }
  async sendExpiresNotify(site: SiteInfoEntity) {
    const expires = site.certExpiresTime;
    const validDays = dayjs(expires).diff(dayjs(), 'day');
    const url = await this.notificationService.getBindUrl('#/monitor/site');
    const content = `站点名称： ${site.name} \n
站点域名： ${site.domain} \n
证书域名： ${site.certDomains} \n
证书颁发者： ${site.certProvider} \n
过期时间： ${dayjs(site.certExpiresTime).format('YYYY-MM-DD')} \n`;
    if (validDays >= 0 && validDays < 10) {
      // 发通知
      await this.notificationService.send(
        {
          useDefault: true,
          logger: logger,
          body: {
            title: `站点证书即将过期，剩余${validDays}天，<${site.name}>`,
            content,
            url,
          },
        },
        site.userId
      );
    } else if (validDays < 0) {
      //发过期通知
      await this.notificationService.send(
        {
          useDefault: true,
          logger: logger,
          body: {
            title: `站点证书已过期${-validDays}天<${site.name}>`,
            content,
            url,
          },
        },
        site.userId
      );
    }
  }

  async checkAllByUsers(userId: any) {
    if (!userId) {
      throw new Error('userId is required');
    }
    const sites = await this.repository.find({
      where: { userId },
    });
    this.checkList(sites);
  }

  async checkList(sites: SiteInfoEntity[]) {
    for (const site of sites) {
      this.doCheck(site).catch(e => {
        logger.error(`检查站点证书失败，${site.domain}`, e.message);
      });
      await utils.sleep(200);
    }
  }
}
