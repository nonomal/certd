import { useSettingStore } from "/@/store/modules/settings";

export const certdResources = [
  {
    title: "证书自动化",
    name: "CertdRoot",
    path: "/certd",
    redirect: "/certd/pipeline",
    meta: {
      icon: "ion:key-outline",
      auth: true
    },
    children: [
      {
        title: "证书自动化流水线",
        name: "PipelineManager",
        path: "/certd/pipeline",
        component: "/certd/pipeline/index.vue",
        meta: {
          icon: "ion:analytics-sharp",
          cache: true
        }
      },
      {
        title: "编辑流水线",
        name: "PipelineEdit",
        path: "/certd/pipeline/detail",
        component: "/certd/pipeline/detail.vue",
        meta: {
          isMenu: false
        }
      },
      {
        title: "执行历史记录",
        name: "PipelineHistory",
        path: "/certd/history",
        component: "/certd/history/index.vue",
        meta: {
          icon: "ion:timer-outline",
          cache: true
        }
      },
      {
        title: "证书仓库",
        name: "CertStore",
        path: "/certd/monitor/cert",
        component: "/certd/monitor/cert/index.vue",
        meta: {
          icon: "ion:shield-checkmark-outline",
          auth: true,
          isMenu: true
        }
      },
      {
        title: "站点证书监控",
        name: "SiteCertMonitor",
        path: "/certd/monitor/site",
        component: "/certd/monitor/site/index.vue",
        meta: {
          icon: "ion:videocam-outline",
          auth: true
        }
      },
      {
        title: "设置",
        name: "MineSetting",
        path: "/certd/mine",
        meta: {
          icon: "ion:settings-outline",
          auth: true,
          cache: true
        },
        children: [
          {
            title: "CNAME记录管理",
            name: "CnameRecord",
            path: "/certd/cname/record",
            component: "/certd/cname/record/index.vue",
            meta: {
              icon: "ion:link-outline",
              auth: true
            }
          },
          {
            title: "流水线分组管理",
            name: "PipelineGroupManager",
            path: "/certd/pipeline/group",
            component: "/certd/pipeline/group/index.vue",
            meta: {
              icon: "mdi:format-list-group",
              auth: true
            }
          },
          {
            title: "授权管理",
            name: "AccessManager",
            path: "/certd/access",
            component: "/certd/access/index.vue",
            meta: {
              icon: "ion:disc-outline",
              auth: true,
              cache: true
            }
          },
          {
            title: "OpenKey",
            name: "OpenKey",
            path: "/certd/open/openkey",
            component: "/certd/open/openkey/index.vue",
            meta: {
              icon: "hugeicons:api",
              auth: true,
              cache: true
            }
          },
          {
            title: "通知设置",
            name: "NotificationManager",
            path: "/certd/notification",
            component: "/certd/notification/index.vue",
            meta: {
              icon: "ion:megaphone-outline",
              auth: true,
              cache: true
            }
          },
          {
            title: "账号信息",
            name: "UserProfile",
            path: "/certd/mine/user-profile",
            component: "/certd/mine/user-profile.vue",
            meta: {
              icon: "ion:person-outline",
              auth: true,
              isMenu: false
            }
          }
        ]
      },

      {
        title: "套餐",
        name: "SuiteProduct",
        path: "/certd/suite",
        meta: {
          show: () => {
            const settingStore = useSettingStore();
            return settingStore.isComm && settingStore.isSuiteEnabled;
          },
          icon: "ion:cart-outline",
          auth: true
        },
        children: [
          {
            title: "我的套餐",
            name: "MySuite",
            path: "/certd/suite/mine",
            component: "/certd/suite/mine/index.vue",
            meta: {
              show: () => {
                const settingStore = useSettingStore();
                return settingStore.isComm;
              },
              icon: "ion:gift-outline",
              auth: true
            }
          },
          {
            title: "套餐购买",
            name: "SuiteProductBuy",
            path: "/certd/suite/buy",
            component: "/certd/suite/buy.vue",
            meta: {
              show: () => {
                const settingStore = useSettingStore();
                return settingStore.isComm;
              },
              icon: "ion:cart-outline",
              auth: true
            }
          },
          {
            title: "我的订单",
            name: "MyTrade",
            path: "/certd/trade",
            component: "/certd/trade/index.vue",
            meta: {
              show: () => {
                const settingStore = useSettingStore();
                return settingStore.isComm;
              },
              icon: "ion:bag-check-outline",
              auth: true
            }
          },
          {
            title: "支付返回",
            name: "PaymentReturn",
            path: "/certd/payment/return/:type",
            component: "/certd/payment/return.vue",
            meta: {
              icon: "ant-design:pay-circle-outlined",
              auth: false,
              isMenu: false
            }
          }
        ]
      }

      // {
      //   title: "邮箱设置",
      //   name: "EmailSetting",
      //   path: "/sys/settings/email",
      //   component: "/sys/settings/email-setting.vue",
      //   meta: {
      //     icon: "ion:mail-outline",
      //     auth: true
      //   }
      // },
    ]
  }
];
