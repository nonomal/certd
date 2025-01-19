import { ALL, Body, Controller, Inject, Post, Provide } from '@midwayjs/core';
import { LoginService } from '../../../modules/login/service/login-service.js';
import { BaseController, Constants, SysPublicSettings, SysSettingsService } from '@certd/lib-server';
import { CodeService } from '../../../modules/basic/service/code-service.js';
import { checkComm } from '@certd/plus-core';

/**
 */
@Provide()
@Controller('/api/')
export class LoginController extends BaseController {
  @Inject()
  loginService: LoginService;
  @Inject()
  codeService: CodeService;

  @Inject()
  sysSettingsService: SysSettingsService;

  @Post('/login', { summary: Constants.per.guest })
  public async login(
    @Body(ALL)
    user: any
  ) {
    const token = await this.loginService.loginByPassword(user);
    this.ctx.cookies.set('token', token.token, {
      maxAge: 1000 * token.expire,
    });

    return this.ok(token);
  }

  @Post('/loginBySms', { summary: Constants.per.guest })
  public async loginBySms(
    @Body(ALL)
    body: any
  ) {
    const settings = await this.sysSettingsService.getSetting<SysPublicSettings>(SysPublicSettings);
    if (settings.smsLoginEnabled !== true) {
      throw new Error('当前站点禁止短信验证码登录');
    }
    checkComm();

    const token = await this.loginService.loginBySmsCode({
      phoneCode: body.phoneCode,
      mobile: body.mobile,
      smsCode: body.smsCode,
      randomStr: body.randomStr,
    });

    this.ctx.cookies.set('token', token.token, {
      maxAge: 1000 * token.expire,
    });

    return this.ok(token);
  }

  @Post('/logout', { summary: Constants.per.authOnly })
  public logout() {}
}
