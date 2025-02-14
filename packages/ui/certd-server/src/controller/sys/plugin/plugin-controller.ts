import { ALL, Body, Controller, Inject, Post, Provide, Query } from '@midwayjs/core';
import { merge } from 'lodash-es';
import { CrudController } from '@certd/lib-server';
import { PluginService } from '../../../modules/plugin/service/plugin-service.js';
import { CommPluginConfig, PluginConfigService } from '../../../modules/plugin/service/plugin-config-service.js';

/**
 * 插件
 */
@Provide()
@Controller('/api/sys/plugin')
export class PluginController extends CrudController<PluginService> {
  @Inject()
  service: PluginService;

  @Inject()
  pluginConfigService: PluginConfigService;

  getService() {
    return this.service;
  }

  @Post('/page', { summary: 'sys:settings:view' })
  async page(@Body(ALL) body: any) {
    body.query = body.query ?? {};
    return await super.page(body);
  }

  @Post('/list', { summary: 'sys:settings:view' })
  async list(@Body(ALL) body: any) {
    return super.list(body);
  }

  @Post('/add', { summary: 'sys:settings:edit' })
  async add(@Body(ALL) bean: any) {
    const def: any = {
      isDefault: false,
      disabled: false,
    };
    merge(bean, def);
    return super.add(bean);
  }

  @Post('/update', { summary: 'sys:settings:edit' })
  async update(@Body(ALL) bean: any) {
    return super.update(bean);
  }

  @Post('/info', { summary: 'sys:settings:view' })
  async info(@Query('id') id: number) {
    return super.info(id);
  }

  @Post('/delete', { summary: 'sys:settings:edit' })
  async delete(@Query('id') id: number) {
    return super.delete(id);
  }

  @Post('/deleteByIds', { summary: 'sys:settings:edit' })
  async deleteByIds(@Body('ids') ids: number[]) {
    const res = await this.service.delete(ids);
    return this.ok(res);
  }

  @Post('/setDisabled', { summary: 'sys:settings:edit' })
  async setDisabled(@Body(ALL) body: { id: number; name: string; type: string; disabled: boolean }) {
    await this.service.setDisabled(body);
    return this.ok();
  }
  @Post('/getCommPluginConfigs', { summary: 'sys:settings:edit' })
  async getCommPluginConfigs() {
    const res = await this.pluginConfigService.getCommPluginConfig();
    return this.ok(res);
  }

  @Post('/saveCommPluginConfigs', { summary: 'sys:settings:edit' })
  async saveCommPluginConfigs(@Body(ALL) body: CommPluginConfig) {
    const res = await this.pluginConfigService.saveCommPluginConfig(body);
    return this.ok(res);
  }
}
