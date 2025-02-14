import { ALL, Body, Controller, Inject, Post, Provide } from '@midwayjs/core';
import { BaseController, PlusService, SysInstallInfo, SysSettingsService } from '@certd/lib-server';

export type PreBindUserReq = {
  userId: number;
};
export type BindUserReq = {
  userId: number;
};
/**
 */
@Provide()
@Controller('/api/sys/account')
export class BasicController extends BaseController {
  @Inject()
  plusService: PlusService;

  @Inject()
  sysSettingsService: SysSettingsService;

  @Post('/preBindUser', { summary: 'sys:settings:edit' })
  public async preBindUser(@Body(ALL) body: PreBindUserReq) {
    // 设置缓存内容
    await this.plusService.userPreBind(body.userId);
    return this.ok({});
  }

  @Post('/bindUser', { summary: 'sys:settings:edit' })
  public async bindUser(@Body(ALL) body: BindUserReq) {
    const installInfo: SysInstallInfo = await this.sysSettingsService.getSetting(SysInstallInfo);
    installInfo.bindUserId = body.userId;
    await this.sysSettingsService.saveSetting(installInfo);
    return this.ok({});
  }

  @Post('/unbindUser', { summary: 'sys:settings:edit' })
  public async unbindUser() {
    const installInfo: SysInstallInfo = await this.sysSettingsService.getSetting(SysInstallInfo);
    installInfo.bindUserId = null;
    await this.sysSettingsService.saveSetting(installInfo);
    return this.ok({});
  }

  @Post('/updateLicense', { summary: 'sys:settings:edit' })
  public async updateLicense(@Body(ALL) body: { license: string }) {
    await this.plusService.updateLicense(body.license);
    return this.ok(true);
  }
}
