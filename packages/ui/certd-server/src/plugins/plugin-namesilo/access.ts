import { IsAccess, AccessInput, BaseAccess } from '@certd/pipeline';

/**
 * 这个注解将注册一个授权配置
 * 在certd的后台管理系统中，用户可以选择添加此类型的授权
 */
@IsAccess({
  name: 'namesilo',
  title: 'namesilo授权',
  desc: '',
  icon: 'simple-icons:namesilo',
})
export class NamesiloAccess extends BaseAccess {
  /**
   * 授权属性配置
   */
  @AccessInput({
    title: 'API Key',
    component: {
      placeholder: 'api key',
    },
    helper:
      '前往 [获取API Key](https://www.namesilo.com/account/api-manager)\n不要勾选第一项（Generate key for read-only access）\n勾选第二项（Submitting this form...）\n然后点击Generate按钮',
    required: true,
    encrypt: true,
  })
  apiKey = '';
}

new NamesiloAccess();
