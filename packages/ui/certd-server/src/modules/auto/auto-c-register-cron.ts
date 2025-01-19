import { Autoload, Config, Init, Inject, Scope, ScopeEnum } from '@midwayjs/core';
import { PipelineService } from '../pipeline/service/pipeline-service.js';
import { logger } from '@certd/basic';
import { SysSettingsService } from '@certd/lib-server';
import { SiteInfoService } from '../monitor/index.js';
import { Cron } from '../cron/cron.js';

@Autoload()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class AutoCRegisterCron {
  @Inject()
  pipelineService: PipelineService;

  @Config('cron.onlyAdminUser')
  private onlyAdminUser: boolean;

  @Config('cron.immediateTriggerOnce')
  private immediateTriggerOnce = false;

  @Config('cron.immediateTriggerSiteMonitor')
  private immediateTriggerSiteMonitor = false;

  @Inject()
  sysSettingsService: SysSettingsService;

  @Inject()
  siteInfoService: SiteInfoService;

  @Inject()
  cron: Cron;

  @Init()
  async init() {
    logger.info('加载定时trigger开始');
    await this.pipelineService.onStartup(this.immediateTriggerOnce, this.onlyAdminUser);
    logger.info('加载定时trigger完成');
    //
    // const meta = getClassMetadata(CLASS_KEY, this.echoPlugin);
    // console.log('meta', meta);
    // const metas = listPropertyDataFromClass(CLASS_KEY, this.echoPlugin);
    // console.log('metas', metas);
    this.registerSiteMonitorCron();
  }

  registerSiteMonitorCron() {
    const job = async () => {
      logger.info('站点证书检查开始执行');

      let offset = 0;
      const limit = 50;
      while (true) {
        const res = await this.siteInfoService.page({
          query: { disabled: false },
          page: { offset, limit },
        });
        const { records } = res;

        if (records.length === 0) {
          break;
        }
        offset += records.length;
        await this.siteInfoService.checkList(records);
      }

      logger.info('站点证书检查完成');
    };

    this.cron.register({
      name: 'siteMonitor',
      cron: '0 0 0 * * *',
      job,
    });
    if (this.immediateTriggerSiteMonitor) {
      job();
    }
  }
}
