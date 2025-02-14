import { IsAccess, AccessInput, BaseAccess } from '@certd/pipeline';

/**
 * 这个注解将注册一个授权配置
 * 在certd的后台管理系统中，用户可以选择添加此类型的授权
 */
@IsAccess({
  name: 'proxmox',
  title: 'proxmox',
  desc: '',
  icon: 'svg:icon-dogecloud',
})
export class ProxmoxAccess extends BaseAccess {
  /**
   * 授权属性配置
   */
  @AccessInput({
    title: 'host',
    component: {
      placeholder: 'IP或域名',
    },
    required: true,
    encrypt: false,
  })
  host = '';

  @AccessInput({
    title: '端口',
    component: {
      placeholder: '端口',
      component: {
        name: 'a-input-number',
      },
    },
    required: true,
    encrypt: false,
  })
  port: number;
  /**
   * 授权属性配置
   */
  @AccessInput({
    title: '用户名',
    component: {
      placeholder: 'username',
    },
    required: true,
    encrypt: false,
  })
  username = '';

  @AccessInput({
    title: '密码',
    component: {
      placeholder: 'password',
    },
    required: true,
    encrypt: true,
  })
  password = '';
}

new ProxmoxAccess();
