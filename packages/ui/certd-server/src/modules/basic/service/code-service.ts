import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { cache, isDev, randomNumber } from '@certd/basic';
import { SysSettingsService, SysSiteInfo } from '@certd/lib-server';
import { SmsServiceFactory } from '../sms/factory.js';
import { ISmsService } from '../sms/api.js';
import { CodeErrorException } from '@certd/lib-server/dist/basic/exception/code-error-exception.js';
import { EmailService } from './email-service.js';
import { AccessService } from '@certd/lib-server';
import { AccessSysGetter } from '@certd/lib-server';
import { isComm } from '@certd/plus-core';

// {data: '<svg.../svg>', text: 'abcd'}
/**
 */
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class CodeService {
  @Inject()
  sysSettingsService: SysSettingsService;
  @Inject()
  emailService: EmailService;

  @Inject()
  accessService: AccessService;

  /**
   */
  async generateCaptcha(randomStr) {
    const svgCaptcha = await import('svg-captcha');
    const c = svgCaptcha.create();
    //{data: '<svg.../svg>', text: 'abcd'}
    const imgCode = c.text; // = RandomUtil.randomStr(4, true);
    cache.set('imgCode:' + randomStr, imgCode, {
      ttl: 2 * 60 * 1000, //过期时间 2分钟
    });
    return c;
  }

  async getCaptchaText(randomStr) {
    return cache.get('imgCode:' + randomStr);
  }

  async removeCaptcha(randomStr) {
    cache.delete('imgCode:' + randomStr);
  }

  async checkCaptcha(randomStr: string, userCaptcha: string) {
    const code = await this.getCaptchaText(randomStr);
    if (code == null) {
      throw new Error('验证码已过期');
    }
    if (code.toLowerCase() !== userCaptcha.toLowerCase()) {
      throw new Error('验证码不正确');
    }
    await this.removeCaptcha(randomStr);
    return true;
  }
  /**
   */
  async sendSmsCode(phoneCode = '86', mobile: string, randomStr: string) {
    if (!mobile) {
      throw new Error('手机号不能为空');
    }
    if (!randomStr) {
      throw new Error('randomStr不能为空');
    }

    const sysSettings = await this.sysSettingsService.getPrivateSettings();
    if (!sysSettings.sms?.config?.accessId) {
      throw new Error('当前站点还未配置短信');
    }
    const smsType = sysSettings.sms.type;
    const smsConfig = sysSettings.sms.config;
    const sender: ISmsService = SmsServiceFactory.createSmsService(smsType);
    const accessGetter = new AccessSysGetter(this.accessService);
    sender.setCtx({
      accessService: accessGetter,
      config: smsConfig,
    });
    const smsCode = randomNumber(4);
    await sender.sendSmsCode({
      mobile,
      code: smsCode,
      phoneCode,
    });

    const key = this.buildSmsCodeKey(phoneCode, mobile, randomStr);
    cache.set(key, smsCode, {
      ttl: 5 * 60 * 1000, //5分钟
    });
    return smsCode;
  }

  /**
   */
  async sendEmailCode(email: string, randomStr: string) {
    if (!email) {
      throw new Error('Email不能为空');
    }
    if (!randomStr) {
      throw new Error('randomStr不能为空');
    }

    let siteTitle = 'Certd';
    if (isComm()) {
      const siteInfo = await this.sysSettingsService.getSetting<SysSiteInfo>(SysSiteInfo);
      if (siteInfo) {
        siteTitle = siteInfo.title || siteTitle;
      }
    }

    const code = randomNumber(4);
    await this.emailService.send({
      subject: `【${siteTitle}】验证码`,
      content: `您的验证码是${code}，请勿泄露`,
      receivers: [email],
    });

    const key = this.buildEmailCodeKey(email, randomStr);
    cache.set(key, code, {
      ttl: 5 * 60 * 1000, //5分钟
    });
    return code;
  }

  /**
   * checkSms
   */
  async checkSmsCode(opts: { mobile: string; phoneCode: string; smsCode: string; randomStr: string; throwError: boolean }) {
    const key = this.buildSmsCodeKey(opts.phoneCode, opts.mobile, opts.randomStr);
    if (isDev()) {
      return true;
    }
    return this.checkValidateCode(key, opts.smsCode, opts.throwError);
  }

  buildSmsCodeKey(phoneCode: string, mobile: string, randomStr: string) {
    return `sms:${phoneCode}${mobile}:${randomStr}`;
  }

  buildEmailCodeKey(email: string, randomStr: string) {
    return `email:${email}:${randomStr}`;
  }
  checkValidateCode(key: string, userCode: string, throwError = true) {
    //验证图片验证码
    const code = cache.get(key);
    if (code == null || code !== userCode) {
      if (throwError) {
        throw new CodeErrorException('验证码错误');
      }
      return false;
    }
    cache.delete(key);
    return true;
  }

  checkEmailCode(opts: { randomStr: string; validateCode: string; email: string; throwError: boolean }) {
    const key = this.buildEmailCodeKey(opts.email, opts.randomStr);
    return this.checkValidateCode(key, opts.validateCode, opts.throwError);
  }
}
