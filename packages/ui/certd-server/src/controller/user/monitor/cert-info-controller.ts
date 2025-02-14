import { ALL, Body, Controller, Inject, Post, Provide, Query } from '@midwayjs/core';
import { Constants, CrudController } from '@certd/lib-server';
import { AuthService } from '../../../modules/sys/authority/service/auth-service.js';
import { CertInfoService } from '../../../modules/monitor/index.js';
import { PipelineService } from '../../../modules/pipeline/service/pipeline-service.js';

/**
 */
@Provide()
@Controller('/api/monitor/cert')
export class CertInfoController extends CrudController<CertInfoService> {
  @Inject()
  service: CertInfoService;
  @Inject()
  authService: AuthService;
  @Inject()
  pipelineService: PipelineService;

  getService(): CertInfoService {
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

    const records = res.records;
    const pipelineIds = records.map(r => r.pipelineId);
    const pipelines = await this.pipelineService.getSimplePipelines(pipelineIds);
    const pMap = new Map();
    for (const p of pipelines) {
      pMap.set(p.id, p);
    }
    for (const record of records) {
      record.pipeline = pMap.get(record.pipelineId);
    }
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
    return await super.add(bean);
  }

  @Post('/update', { summary: Constants.per.authOnly })
  async update(@Body(ALL) bean) {
    await this.service.checkUserId(bean.id, this.getUserId());
    delete bean.userId;
    return await super.update(bean);
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

  @Post('/all', { summary: Constants.per.authOnly })
  async all() {
    const list: any = await this.service.find({
      where: {
        userId: this.getUserId(),
      },
    });
    return this.ok(list);
  }

  @Post('/upload', { summary: Constants.per.authOnly })
  async upload(@Body(ALL) body: any) {
    if (body.id) {
      await this.service.checkUserId(body.id, this.getUserId());
    }

    const res = await this.service.upload(body);

    return this.ok(res);
  }
}
