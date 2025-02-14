import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pi_pipeline')
export class PipelineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;

  @Column({ name: 'title', comment: '标题' })
  title: string;

  @Column({ comment: '配置', length: 40960 })
  content: string;

  @Column({ name: 'keep_history_count', comment: '历史记录保持数量', nullable: true })
  keepHistoryCount: number;

  @Column({ name: 'group_id', comment: '分组id', nullable: true })
  groupId: number;

  @Column({ comment: '备注', length: 100, nullable: true })
  remark: string;

  @Column({ comment: '状态', length: 100, nullable: true })
  status: string;

  @Column({ comment: '启用/禁用', nullable: true, default: false })
  disabled: boolean;

  // cert: 证书; backup: 备份; custom:自定义;
  @Column({ comment: '类型', nullable: true, default: 'cert' })
  type: string;

  // custom: 自定义; monitor: 监控;
  @Column({ comment: '来源', nullable: true, default: 'custom' })
  from: string;

  @Column({
    name: 'last_history_time',
    comment: '最后一次执行时间',
    nullable: true,
  })
  lastHistoryTime: number;

  // 变量
  lastVars: any;

  @Column({
    name: 'order',
    comment: '排序',
    nullable: true,
  })
  order: number;

  @Column({
    name: 'create_time',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @Column({
    name: 'update_time',
    comment: '修改时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
