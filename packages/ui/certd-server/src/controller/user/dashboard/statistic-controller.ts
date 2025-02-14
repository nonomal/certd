import { Controller, Inject, Post, Provide } from '@midwayjs/core';
import { BaseController, Constants } from '@certd/lib-server';
import { UserService } from '../../../modules/sys/authority/service/user-service.js';
import { RoleService } from '../../../modules/sys/authority/service/role-service.js';
import { PipelineService } from '../../../modules/pipeline/service/pipeline-service.js';
import { HistoryService } from '../../../modules/pipeline/service/history-service.js';

export type ChartItem = {
  name: string;
  value: number;
};
export type UserStatisticCount = {
  pipelineCount?: number;
  pipelineStatusCount?: ChartItem[];
  historyCountPerDay: ChartItem[];
  expiringList: any[];
};
/**
 */
@Provide()
@Controller('/api/statistic/')
export class StatisticController extends BaseController {
  @Inject()
  userService: UserService;
  @Inject()
  roleService: RoleService;

  @Inject()
  pipelineService: PipelineService;
  @Inject()
  historyService: HistoryService;

  @Post('/count', { summary: Constants.per.authOnly })
  public async count() {
    const pipelineCount = await this.pipelineService.count({ userId: this.getUserId() });
    const pipelineStatusCount = await this.pipelineService.statusCount({ userId: this.getUserId() });
    const historyCount = await this.historyService.countPerDay({ userId: this.getUserId(), days: 7 });
    const expiringList = await this.pipelineService.latestExpiringList({ userId: this.getUserId(), count: 5 });
    const count: UserStatisticCount = {
      pipelineCount,
      pipelineStatusCount,
      historyCountPerDay: historyCount,
      expiringList,
    };
    return this.ok(count);
  }
}
