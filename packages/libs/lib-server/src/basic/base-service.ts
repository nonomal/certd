import { PermissionException, ValidateException } from './exception/index.js';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Inject } from '@midwayjs/core';
import { TypeORMDataSourceManager } from '@midwayjs/typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager.js';
import { FindManyOptions } from 'typeorm';

export type PageReq<T = any> = {
  page?: { offset: number; limit: number };
} & ListReq<T>;

export type ListReq<T = any> = {
  query?: Partial<T>;
  sort?: {
    prop: string;
    asc: boolean;
  };
  buildQuery?: (bq: SelectQueryBuilder<any>) => void;
  select?: any;
};

/**
 * 服务基类
 */
export abstract class BaseService<T> {
  @Inject()
  dataSourceManager: TypeORMDataSourceManager;

  abstract getRepository(): Repository<T>;

  async transaction(callback: (entityManager: EntityManager) => Promise<any>) {
    const dataSource = this.dataSourceManager.getDataSource('default');
    await dataSource.transaction(callback as any);
  }

  /**
   * 获得单个ID
   * @param id ID
   * @param infoIgnoreProperty 忽略返回属性
   */
  async info(id, infoIgnoreProperty?): Promise<T | null> {
    if (!id) {
      throw new ValidateException('id不能为空');
    }
    const info = await this.getRepository().findOneBy({ id } as any);
    if (info && infoIgnoreProperty) {
      for (const property of infoIgnoreProperty) {
        delete info[property];
      }
    }
    return info;
  }

  /**
   * 非分页查询
   * @param options
   */
  async find(options: FindManyOptions<T>) {
    return await this.getRepository().find(options);
  }

  /**
   *
   * @param where
   */
  async deleteWhere(where: any) {
    await this.getRepository().delete({
      ...where,
    });
  }

  /**
   * 删除
   * @param ids 删除的ID集合 如：[1,2,3] 或者 1,2,3
   * @param where
   */
  async delete(ids: string | any[], where?: any) {
    const idArr = this.resolveIdArr(ids);
    if (idArr.length === 0) {
      return;
    }
    await this.getRepository().delete({
      id: In(idArr),
      ...where,
    });
    await this.modifyAfter(idArr);
  }

  resolveIdArr(ids: string | any[]) {
    if (!ids) {
      throw new ValidateException('ids不能为空');
    }
    if (typeof ids === 'string') {
      return ids.split(',');
    } else {
      return ids;
    }
  }

  /**
   * 新增|修改
   * @param param 数据
   */
  async addOrUpdate(param: any) {
    await this.getRepository().save(param);
  }

  /**
   * 新增
   * @param param 数据
   */
  async add(param: any) {
    const now = new Date();
    param.createTime = now;
    param.updateTime = now;
    await this.addOrUpdate(param);
    await this.modifyAfter(param);
    return {
      id: param.id,
    };
  }

  /**
   * 修改
   * @param param 数据
   */
  async update(param: any) {
    if (!param.id) throw new ValidateException('id 不能为空');
    param.updateTime = new Date();
    await this.addOrUpdate(param);
    await this.modifyAfter(param);
  }

  /**
   * 新增|修改|删除 之后的操作
   * @param data 对应数据
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async modifyAfter(data: any) {}

  /**
   * 分页查询
   */
  async page(pageReq: PageReq<T>) {
    const { page } = pageReq;
    if (page.offset == null) {
      page.offset = 0;
    }
    if (page.limit == null) {
      page.limit = 20;
    }
    const qb = this.buildListQuery(pageReq);

    qb.offset(page.offset).limit(page.limit);
    const list = await qb.getMany();
    const total = await qb.getCount();
    return {
      records: list,
      total,
      offset: page.offset,
      limit: page.limit,
    };
  }

  private buildListQuery(listReq: ListReq<T>) {
    const { query, sort, buildQuery } = listReq;
    const qb = this.getRepository().createQueryBuilder('main');
    if (query) {
      const keys = Object.keys(query);
      for (const key of keys) {
        const value = query[key];
        if (value == null) {
          delete query[key];
        }
      }
      qb.where(query);
    }
    if (sort && sort.prop) {
      const found = this.getRepository().metadata.columns.find(column => {
        if (column.propertyName === sort.prop) {
          return true;
        }
      });
      if (found) {
        qb.addOrderBy('main.' + sort.prop, sort.asc ? 'ASC' : 'DESC');
      }
    }
    qb.addOrderBy('id', 'DESC');
    //自定义query
    if (buildQuery) {
      buildQuery(qb);
    }
    return qb;
  }

  /**
   * 分页查询
   */
  async list(listReq: ListReq<T>) {
    const qb = this.buildListQuery(listReq);
    return await qb.getMany();
  }

  async checkUserId(id: any = 0, userId: number, userKey = 'userId') {
    const res = await this.getRepository().findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      select: { [userKey]: true },
      where: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        id,
      },
    });
    if (!res || res[userKey] === userId) {
      return;
    }
    throw new PermissionException('权限不足');
  }
}
