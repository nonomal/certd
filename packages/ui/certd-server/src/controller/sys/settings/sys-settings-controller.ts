import { ALL, Body, Controller, Inject, Post, Provide, Query } from '@midwayjs/core';
import { CrudController, SysPrivateSettings, SysPublicSettings, SysSettingsEntity, SysSettingsService } from '@certd/lib-server';
import * as _ from 'lodash-es';
import { merge } from 'lodash-es';
import { PipelineService } from '../../../modules/pipeline/service/pipeline-service.js';
import { UserSettingsService } from '../../../modules/mine/service/user-settings-service.js';
import { getEmailSettings } from '../../../modules/sys/settings/fix.js';
import { http, logger, simpleNanoId } from '@certd/basic';
import { CodeService } from '../../../modules/basic/service/code-service.js';
import { SmsServiceFactory } from '../../../modules/basic/sms/factory.js';

/**
 */
@Provide()
@Controller('/api/sys/settings')
export class SysSettingsController extends CrudController<SysSettingsService> {
  @Inject()
  service: SysSettingsService;
  @Inject()
  userSettingsService: UserSettingsService;
  @Inject()
  pipelineService: PipelineService;
  @Inject()
  codeService: CodeService;

  getService() {
    return this.service;
  }

  @Post('/page', { summary: 'sys:settings:view' })
  async page(@Body(ALL) body) {
    return super.page(body);
  }

  @Post('/list', { summary: 'sys:settings:view' })
  async list(@Body(ALL) body) {
    return super.list(body);
  }

  @Post('/add', { summary: 'sys:settings:edit' })
  async add(@Body(ALL) bean) {
    return super.add(bean);
  }

  @Post('/update', { summary: 'sys:settings:edit' })
  async update(@Body(ALL) bean) {
    await this.service.checkUserId(bean.id, this.getUserId());
    return super.update(bean);
  }
  @Post('/info', { summary: 'sys:settings:view' })
  async info(@Query('id') id: number) {
    await this.service.checkUserId(id, this.getUserId());
    return super.info(id);
  }

  @Post('/delete', { summary: 'sys:settings:edit' })
  async delete(@Query('id') id: number) {
    await this.service.checkUserId(id, this.getUserId());
    return super.delete(id);
  }

  @Post('/save', { summary: 'sys:settings:edit' })
  async save(@Body(ALL) bean: SysSettingsEntity) {
    await this.service.save(bean);
    return this.ok({});
  }

  @Post('/get', { summary: 'sys:settings:view' })
  async get(@Query('key') key: string) {
    const entity = await this.service.getByKey(key);
    return this.ok(entity);
  }

  // savePublicSettings
  @Post('/getEmailSettings', { summary: 'sys:settings:edit' })
  async getEmailSettings(@Body(ALL) body) {
    const conf = await getEmailSettings(this.service, this.userSettingsService);
    return this.ok(conf);
  }

  @Post('/saveEmailSettings', { summary: 'sys:settings:edit' })
  async saveEmailSettings(@Body(ALL) body) {
    const conf = await getEmailSettings(this.service, this.userSettingsService);
    merge(conf, body);
    await this.service.saveSetting(conf);
    return this.ok(conf);
  }

  @Post('/getSysSettings', { summary: 'sys:settings:edit' })
  async getSysSettings() {
    const publicSettings = await this.service.getPublicSettings();
    let privateSettings = await this.service.getPrivateSettings();
    privateSettings = privateSettings.removeSecret();
    return this.ok({ public: publicSettings, private: privateSettings });
  }

  // savePublicSettings
  @Post('/saveSysSettings', { summary: 'sys:settings:edit' })
  async saveSysSettings(@Body(ALL) body: { public: SysPublicSettings; private: SysPrivateSettings }) {
    const publicSettings = await this.service.getPublicSettings();
    const privateSettings = await this.service.getPrivateSettings();
    _.merge(publicSettings, body.public);
    _.merge(privateSettings, body.private);
    await this.service.savePublicSettings(publicSettings);
    await this.service.savePrivateSettings(privateSettings);
    return this.ok({});
  }
  @Post('/stopOtherUserTimer', { summary: 'sys:settings:edit' })
  async stopOtherUserTimer(@Body(ALL) body) {
    await this.pipelineService.stopOtherUserPipeline(1);
    return this.ok({});
  }

  @Post('/testProxy', { summary: 'sys:settings:edit' })
  async testProxy(@Body(ALL) body) {
    const google = 'https://www.google.com/';
    const baidu = 'https://www.baidu.com/';
    let googleRes = false;
    try {
      await http.request({
        url: google,
        method: 'GET',
        timeout: 5000,
        logRes: false,
        logParams: false,
      });
      googleRes = true;
    } catch (e) {
      googleRes = e.message;
      logger.info('test google error:', e);
    }
    let baiduRes = false;
    try {
      await http.request({
        url: baidu,
        method: 'GET',
        timeout: 5000,
        logRes: false,
        logParams: false,
      });
      baiduRes = true;
    } catch (e) {
      baiduRes = e.message;
      logger.info('test baidu error:', e);
    }
    return this.ok({
      google: googleRes,
      baidu: baiduRes,
    });
  }

  @Post('/testSms', { summary: 'sys:settings:edit' })
  async testSms(@Body(ALL) body) {
    await this.codeService.sendSmsCode(body.phoneCode, body.mobile, simpleNanoId());
    return this.ok({});
  }

  @Post('/getSmsTypeDefine', { summary: 'sys:settings:view' })
  async getSmsTypeDefine(@Body('type') type: string) {
    return this.ok(SmsServiceFactory.getDefine(type));
  }
}
