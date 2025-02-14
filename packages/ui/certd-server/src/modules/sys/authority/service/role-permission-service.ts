import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@certd/lib-server';
import { RolePermissionEntity } from '../entity/role-permission.js';

/**
 * 角色->权限
 */
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class RolePermissionService extends BaseService<RolePermissionEntity> {
  @InjectEntityModel(RolePermissionEntity)
  repository: Repository<RolePermissionEntity>;

  //@ts-ignore
  getRepository() {
    return this.repository;
  }
}
