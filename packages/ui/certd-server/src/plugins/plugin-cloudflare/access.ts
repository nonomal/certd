import { IsAccess, AccessInput, BaseAccess } from '@certd/pipeline';

/**
 * 这个注解将注册一个授权配置
 * 在certd的后台管理系统中，用户可以选择添加此类型的授权
 */
@IsAccess({
  name: 'cloudflare',
  title: 'cloudflare授权',
  icon: 'simple-icons:cloudflare',
  desc: '',
})
export class CloudflareAccess extends BaseAccess {
  /**
   * 授权属性配置
   */
  @AccessInput({
    title: 'API Token',
    component: {
      placeholder: 'api token，用户 API 令牌',
    },
    helper:
      '前往 [获取API令牌](https://dash.cloudflare.com/profile/api-tokens)，注意是令牌，不是密钥。\n token权限必须包含：[Zone区域-Zone区域-Edit编辑], [Zone区域-DNS-Edit编辑]',
    required: true,
    encrypt: true,
  })
  apiToken = '';
}

new CloudflareAccess();
