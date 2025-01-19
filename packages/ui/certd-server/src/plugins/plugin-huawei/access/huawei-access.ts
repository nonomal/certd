import { IsAccess, AccessInput, BaseAccess } from '@certd/pipeline';

@IsAccess({
  name: 'huawei',
  title: '华为云授权',
  desc: '',
  icon: 'svg:icon-huawei',
})
export class HuaweiAccess extends BaseAccess {
  @AccessInput({
    title: 'accessKeyId',
    component: {
      placeholder: 'accessKeyId',
    },
    helper: '证书申请需要有dns解析权限，前往[我的凭证-访问密钥](https://console.huaweicloud.com/iam/?region=cn-east-3#/mine/accessKey)获取',
    required: true,
  })
  accessKeyId = '';
  @AccessInput({
    title: 'accessKeySecret',
    component: {
      placeholder: 'accessKeySecret',
    },
    required: true,
    encrypt: true,
  })
  accessKeySecret = '';
}

new HuaweiAccess();
