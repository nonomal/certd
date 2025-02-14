import { Rule, RuleType } from '@midwayjs/validate';
import { ALL, Body, Controller, Get, Inject, Post, Provide, Query } from '@midwayjs/core';
import { BaseController, Constants } from '@certd/lib-server';
import { CodeService } from '../../modules/basic/service/code-service.js';
import { EmailService } from '../../modules/basic/service/email-service.js';

export class SmsCodeReq {
  @Rule(RuleType.string().required())
  phoneCode: string;

  @Rule(RuleType.string().required())
  mobile: string;

  @Rule(RuleType.string().required().max(10))
  randomStr: string;

  @Rule(RuleType.string().required().max(4))
  imgCode: string;
}

export class EmailCodeReq {
  @Rule(RuleType.string().required())
  email: string;

  @Rule(RuleType.string().required().max(10))
  randomStr: string;

  @Rule(RuleType.string().required().max(4))
  imgCode: string;
}

/**
 */
@Provide()
@Controller('/api/basic/code')
export class BasicController extends BaseController {
  @Inject()
  codeService: CodeService;

  @Inject()
  emailService: EmailService;

  @Post('/sendSmsCode', { summary: Constants.per.guest })
  public async sendSmsCode(
    @Body(ALL)
    body: SmsCodeReq
  ) {
    await this.codeService.checkCaptcha(body.randomStr, body.imgCode);
    await this.codeService.sendSmsCode(body.phoneCode, body.mobile, body.randomStr);
    return this.ok(null);
  }

  @Post('/sendEmailCode', { summary: Constants.per.guest })
  public async sendEmailCode(
    @Body(ALL)
    body: EmailCodeReq
  ) {
    await this.codeService.checkCaptcha(body.randomStr, body.imgCode);
    await this.codeService.sendEmailCode(body.email, body.randomStr);
    // 设置缓存内容
    return this.ok(null);
  }

  @Get('/captcha', { summary: Constants.per.guest })
  public async getCaptcha(@Query('randomStr') randomStr: any) {
    const captcha = await this.codeService.generateCaptcha(randomStr);
    this.ctx.res.setHeader('Content-Type', 'image/svg+xml');
    return captcha.data;
  }
}
