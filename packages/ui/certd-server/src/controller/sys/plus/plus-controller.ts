import { ALL, Body, Controller, Inject, Post, Provide } from '@midwayjs/core';
import { BaseController, PlusService, SysInstallInfo, SysSettingsService } from '@certd/lib-server';

/**
 */
@Provide()
@Controller('/api/sys/plus')
export class SysPlusController extends BaseController {
  @Inject()
  sysSettingsService: SysSettingsService;

  @Inject()
  plusService: PlusService;

  @Post('/active', { summary: 'sys:settings:edit' })
  async active(@Body(ALL) body) {
    const { code, inviteCode } = body;

    await this.plusService.active(code, inviteCode);

    return this.ok(true);
  }
  @Post('/bindUrl', { summary: 'sys:settings:edit' })
  async bindUrl(@Body(ALL) body: { url: string }) {
    const { url } = body;

    await this.plusService.register();
    const installInfo: SysInstallInfo = await this.sysSettingsService.getSetting(SysInstallInfo);
    await this.plusService.bindUrl(url);

    installInfo.bindUrl = url;
    await this.sysSettingsService.saveSetting(installInfo);

    //重新验证配置
    await this.plusService.verify();

    return this.ok(true);
  }

  @Post('/getVipTrial', { summary: 'sys:settings:edit' })
  async getVipTrial(@Body(ALL) body) {
    const res = await this.plusService.getVipTrial();
    return this.ok(res);
  }
  //
  // @Get('/test', { summary: Constants.per.guest })
  // async test() {
  //   const subjectId = 'xxxxxx';
  //   const license = '';
  //   const timestamps = 1728365013899;
  //   const bindUrl = 'http://127.0.0.1:7001/';
  //   const service = new PlusRequestService({
  //     subjectId: subjectId,
  //     plusServerBaseUrls: ['https://api.ai.handsfree.work'],
  //   });
  //   const body = { subjectId, appKey: 'kQth6FHM71IPV3qdWc', url: bindUrl };
  //
  //   async function test() {
  //     await verify({
  //       subjectId: subjectId,
  //       license: license,
  //       plusRequestService: service,
  //     });
  //
  //     const res = await service.sign(body, timestamps);
  //     console.log('sign:', res);
  //
  //     const res2 = await service.request({
  //       url: '/activation/subject/vip/check',
  //       data: {
  //         url: 'http://127.0.0.1:7001/',
  //       },
  //     });
  //
  //     console.log('res2:', res2);
  //   }
  //   console.log('2222');
  //   await test();
  //   console.log('3333');
  //
  //   return this.ok(true);
  // }
}
