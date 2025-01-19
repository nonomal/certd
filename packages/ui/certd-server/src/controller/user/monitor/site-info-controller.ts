import { ALL, Body, Controller, Inject, Post, Provide, Query } from '@midwayjs/core';
import { Constants, CrudController } from '@certd/lib-server';
import { AuthService } from '../../../modules/sys/authority/service/auth-service.js';
import { SiteInfoService } from '../../../modules/monitor/service/site-info-service.js';

/**
 */
@Provide()
@Controller('/api/monitor/site')
export class SiteInfoController extends CrudController<SiteInfoService> {
  @Inject()
  service: SiteInfoService;
  @Inject()
  authService: AuthService;

  getService(): SiteInfoService {
    return this.service;
  }

  @Post('/page', { summary: Constants.per.authOnly })
  async page(@Body(ALL) body: any) {
    body.query = body.query ?? {};
    body.query.userId = this.getUserId();
    const res = await this.service.page({
      query: body.query,
      page: body.page,
      sort: body.sort,
    });
    return this.ok(res);
  }

  @Post('/list', { summary: Constants.per.authOnly })
  async list(@Body(ALL) body: any) {
    body.query = body.query ?? {};
    body.query.userId = this.getUserId();
    return await super.list(body);
  }

  @Post('/add', { summary: Constants.per.authOnly })
  async add(@Body(ALL) bean: any) {
    bean.userId = this.getUserId();
    const res = await this.service.add(bean);
    await this.service.check(res.id, false, 0);
    return this.ok(res);
  }

  @Post('/update', { summary: Constants.per.authOnly })
  async update(@Body(ALL) bean) {
    await this.service.checkUserId(bean.id, this.getUserId());
    delete bean.userId;
    await this.service.update(bean);
    await this.service.check(bean.id, false, 0);
    return this.ok();
  }
  @Post('/info', { summary: Constants.per.authOnly })
  async info(@Query('id') id: number) {
    await this.service.checkUserId(id, this.getUserId());
    return await super.info(id);
  }

  @Post('/delete', { summary: Constants.per.authOnly })
  async delete(@Query('id') id: number) {
    await this.service.checkUserId(id, this.getUserId());
    return await super.delete(id);
  }

  @Post('/check', { summary: Constants.per.authOnly })
  async check(@Body('id') id: number) {
    await this.service.checkUserId(id, this.getUserId());
    await this.service.check(id, false, 0);
    return this.ok();
  }

  @Post('/checkAll', { summary: Constants.per.authOnly })
  async checkAll() {
    const userId = this.getUserId();
    await this.service.checkAllByUsers(userId);
    return this.ok();
  }
}
