import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseService } from '@certd/lib-server';
import { HistoryLogEntity } from '../entity/history-log.js';

/**
 * 证书申请
 */
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class HistoryLogService extends BaseService<HistoryLogEntity> {
  @InjectEntityModel(HistoryLogEntity)
  repository: Repository<HistoryLogEntity>;

  //@ts-ignore
  getRepository() {
    return this.repository;
  }

  async save(bean: HistoryLogEntity) {
    if (bean.id > 0) {
      await this.update(bean);
    } else {
      await this.add(bean);
    }
  }

  async deleteByHistoryIds(numbers: number[]) {
    if (numbers.length === 0) {
      return;
    }
    await this.repository.delete({ historyId: In(numbers) });
  }

  async deleteByPipelineId(id: number) {
    await this.repository.delete({ pipelineId: id });
  }
}
