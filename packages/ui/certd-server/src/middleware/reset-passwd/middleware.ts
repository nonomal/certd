import { Autoload, Config, Init, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { IMidwayKoaContext, IWebMiddleware, NextFunction } from '@midwayjs/koa';
import { CommonException } from '@certd/lib-server';
import { UserService } from '../../modules/sys/authority/service/user-service.js';
import { logger } from '@certd/basic';

/**
 * 重置密码模式
 */
@Provide()
@Autoload()
@Scope(ScopeEnum.Singleton)
export class ResetPasswdMiddleware implements IWebMiddleware {
  @Inject()
  userService: UserService;
  @Config('system.resetAdminPasswd')
  private resetAdminPasswd: boolean;
  resolve() {
    return async (ctx: IMidwayKoaContext, next: NextFunction) => {
      if (this.resetAdminPasswd === true) {
        throw new CommonException('1号管理员密码已修改为123456，当前为重置密码模式，无法响应请求，请关闭重置密码模式恢复正常服务');
      }
      await next();
    };
  }

  @Init()
  async init() {
    if (this.resetAdminPasswd === true) {
      logger.info('开始重置1号管理员用户的密码');
      const newPasswd = '123456';
      await this.userService.resetPassword(1, newPasswd);
      await this.userService.updateStatus(1, 1);
      const user = await this.userService.info(1);
      logger.info(`重置1号管理员用户的密码完成，用户名：${user.username},新密码：${newPasswd}`);
    }
  }
}
