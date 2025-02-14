import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { AppKey, PlusRequestService } from '@certd/plus-core';
import { cache, http, HttpRequestConfig, logger } from '@certd/basic';
import { SysInstallInfo, SysLicenseInfo, SysSettingsService } from '../../settings/index.js';
import { merge } from 'lodash-es';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class PlusService {
  @Inject()
  sysSettingsService: SysSettingsService;

  plusRequestService: PlusRequestService;

  async getPlusRequestService() {
    if (this.plusRequestService) {
      return this.plusRequestService;
    }
    const installInfo: SysInstallInfo = await this.sysSettingsService.getSetting(SysInstallInfo);

    const subjectId = installInfo.siteId;
    const bindUrl = installInfo.bindUrl;
    const installTime = installInfo.installTime;
    const saveLicense = async (license: string) => {
      let licenseInfo: SysLicenseInfo = await this.sysSettingsService.getSetting(SysLicenseInfo);
      if (!licenseInfo) {
        licenseInfo = new SysLicenseInfo();
      }
      licenseInfo.license = license;
      await this.sysSettingsService.saveSetting(licenseInfo);
    };

    return new PlusRequestService({ subjectId, bindUrl, installTime, saveLicense });
  }

  async getSubjectId() {
    const installInfo: SysInstallInfo = await this.sysSettingsService.getSetting(SysInstallInfo);
    return installInfo.siteId;
  }

  async active(code: string, inviteCode?: string) {
    const plusRequestService = await this.getPlusRequestService();
    return await plusRequestService.active(code, inviteCode);
  }

  async updateLicense(license: string) {
    const plusRequestService = await this.getPlusRequestService();
    await plusRequestService.updateLicense({ license });
  }
  async verify() {
    const plusRequestService = await this.getPlusRequestService();
    const licenseInfo: SysLicenseInfo = await this.sysSettingsService.getSetting(SysLicenseInfo);
    await plusRequestService.verify({ license: licenseInfo.license });
  }

  async bindUrl(url: string) {
    const plusRequestService = await this.getPlusRequestService();
    const res = await plusRequestService.bindUrl(url);
    this.plusRequestService = null;
    return res;
  }

  async register() {
    const plusRequestService = await this.getPlusRequestService();
    const licenseInfo: SysLicenseInfo = await this.sysSettingsService.getSetting(SysLicenseInfo);
    if (!licenseInfo.license) {
      await plusRequestService.register();
      logger.info('站点注册成功');
      this.plusRequestService = null;
    }
  }

  async userPreBind(userId: number) {
    const plusRequestService = await this.getPlusRequestService();
    await plusRequestService.requestWithoutSign({
      url: '/activation/subject/preBind',
      method: 'POST',
      data: {
        userId,
        appKey: AppKey,
        subjectId: plusRequestService.getSubjectId(),
      },
    });
  }

  async sendEmail(email: any) {
    const plusRequestService = await this.getPlusRequestService();
    await plusRequestService.request({
      url: '/activation/emailSend',
      data: {
        subject: email.subject,
        text: email.content,
        to: email.receivers,
      },
    });
  }

  async getAccessToken() {
    const cacheKey = 'certd:subject:access_token';
    const token = cache.get(cacheKey);
    if (token) {
      return token;
    }
    const plusRequestService = await this.getPlusRequestService();
    await this.register();
    const res = await plusRequestService.getAccessToken();
    const ttl = res.expiresIn * 1000 - Date.now().valueOf();
    cache.set(cacheKey, res.accessToken, {
      ttl,
    });
    return res.accessToken;
  }

  async getVipTrial() {
    await this.register();
    const plusRequestService = await this.getPlusRequestService();
    const res = await plusRequestService.request({
      url: '/activation/subject/vip/trialGet',
      method: 'POST',
    });
    if (res.license) {
      await this.updateLicense(res.license);
      return {
        duration: res.duration,
      };
    } else {
      throw new Error('您已经领取过VIP试用了');
    }
  }

  async requestWithToken(config: HttpRequestConfig) {
    const plusRequestService = await this.getPlusRequestService();
    const token = await this.getAccessToken();
    merge(config, {
      baseURL: plusRequestService.getBaseURL(),
      method: 'post',
      headers: {
        Authorization: `Berear ${token}`,
      },
    });
    const res = await http.request(config);
    if (res.code !== 0) {
      throw new Error(res.message);
    }
    return res.data;
  }
}
