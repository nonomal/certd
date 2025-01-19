export const Constants = {
  dataDir: './data',
  role: {
    defaultUser: 3,
  },
  per: {
    //无需登录
    guest: '_guest_',
    //无需登录
    anonymous: '_guest_',
    //仅需要登录
    authOnly: '_authOnly_',
    //仅需要登录
    loginOnly: '_authOnly_',

    open: '_open_',
  },
  res: {
    serverError(message: string) {
      return {
        code: 1,
        message,
      };
    },
    error: {
      code: 1,
      message: 'Internal server error',
    },
    success: {
      code: 0,
      message: 'success',
    },
    validation: {
      code: 10,
      message: '参数错误',
    },
    needvip: {
      code: 88,
      message: '需要VIP',
    },
    needsuite: {
      code: 89,
      message: '需要购买或升级套餐',
    },
    loginError: {
      code: 2,
      message: '登录失败',
    },
    codeError: {
      code: 3,
      message: '验证码错误',
    },
    auth: {
      code: 401,
      message: '您还未登录或token已过期',
    },
    permission: {
      code: 402,
      message: '您没有权限',
    },
    param: {
      code: 400,
      message: '参数错误',
    },
    notFound: {
      code: 404,
      message: '页面/文件/资源不存在',
    },
    preview: {
      code: 10001,
      message: '对不起，预览环境不允许修改此数据',
    },
    openKeyError: {
      code: 20000,
      message: 'ApiToken错误',
    },
    openKeySignError: {
      code: 20001,
      message: 'ApiToken签名错误',
    },
    openKeyExpiresError: {
      code: 20002,
      message: 'ApiToken时间戳错误',
    },
    openKeySignTypeError: {
      code: 20003,
      message: 'ApiToken签名类型不支持',
    },
    openParamError: {
      code: 20010,
      message: '请求参数错误',
    },
    openCertNotFound: {
      code: 20011,
      message: '证书不存在',
    },
    openCertNotReady: {
      code: 20012,
      message: '证书还未生成',
    },
  },
};
