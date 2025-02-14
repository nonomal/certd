import * as api from "./api";
import { useI18n } from "vue-i18n";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { useUserStore } from "/@/store/modules/user";
import { useSettingStore } from "/@/store/modules/settings";
import { message } from "ant-design-vue";
import CnameTip from "/@/components/plugins/cert/domains-verify-plan-editor/cname-tip.vue";
export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const router = useRouter();
  const { t } = useI18n();
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    form.id = row.id;
    const res = await api.UpdateObj(form);
    return res;
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
    const res = await api.AddObj(form);
    return res;
  };

  const userStore = useUserStore();
  const settingStore = useSettingStore();
  const selectedRowKeys: Ref<any[]> = ref([]);
  context.selectedRowKeys = selectedRowKeys;

  return {
    crudOptions: {
      settings: {
        plugins: {
          //这里使用行选择插件，生成行选择crudOptions配置，最终会与crudOptions合并
          rowSelection: {
            enabled: true,
            order: -2,
            before: true,
            // handle: (pluginProps,useCrudProps)=>CrudOptions,
            props: {
              multiple: true,
              crossPage: true,
              selectedRowKeys
            }
          }
        }
      },
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      tabs: {
        name: "status",
        show: true
      },
      rowHandle: {
        minWidth: 200,
        fixed: "right"
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          column: {
            width: 80
          },
          form: {
            show: false
          }
        },
        domain: {
          title: "被代理域名",
          type: "text",
          search: {
            show: true
          },
          editForm: {
            component: {
              disabled: true
            }
          }
        },
        hostRecord: {
          title: "主机记录",
          type: "text",
          form: {
            show: false
          },
          column: {
            width: 250,
            cellRender: ({ value }) => {
              return <fs-copyable v-model={value} />;
            }
          }
        },
        recordValue: {
          title: "请设置CNAME",
          type: "copyable",
          form: {
            show: false
          },
          column: {
            width: 500
          }
        },
        cnameProviderId: {
          title: "CNAME服务",
          type: "dict-select",
          dict: dict({
            url: "/cname/provider/list",
            value: "id",
            label: "domain"
          }),
          form: {
            component: {
              onDictChange: ({ form, dict }: any) => {
                if (!form.cnameProviderId) {
                  const list = dict.data.filter((item: any) => {
                    return !item.disabled;
                  });
                  let item = list.find((item: any) => item.isDefault);
                  if (!item && list.length > 0) {
                    item = list[0];
                  }
                  if (item) {
                    form.cnameProviderId = item.id;
                  }
                }
              },
              renderLabel(item: any) {
                if (item.title) {
                  return `${item.domain}<${item.title}>`;
                } else {
                  return item.domain;
                }
              }
            },
            helper: {
              render() {
                const closeForm = () => {
                  crudExpose.getFormWrapperRef().close();
                };
                return (
                  <div>
                    默认提供公共CNAME服务，您还可以
                    <router-link to={"/sys/cname/provider"} onClick={closeForm}>
                      自定义CNAME服务
                    </router-link>
                  </div>
                );
              }
            }
          },
          column: {
            width: 120,
            align: "center",
            cellRender({ value }) {
              if (value < 0) {
                return <a-tag color={"green"}>公共CNAME</a-tag>;
              } else {
                return <a-tag color={"blue"}>自定义CNAME</a-tag>;
              }
            }
          }
        },
        status: {
          title: "状态",
          type: "dict-select",
          dict: dict({
            data: [
              { label: "待设置CNAME", value: "cname", color: "warning" },
              { label: "验证中", value: "validating", color: "blue" },
              { label: "验证成功", value: "valid", color: "green" },
              { label: "验证失败", value: "failed", color: "red" },
              { label: "验证超时", value: "timeout", color: "red" }
            ]
          }),
          addForm: {
            show: false
          },
          column: {
            width: 120,
            align: "center"
          }
        },
        triggerValidate: {
          title: "验证",
          type: "text",
          form: {
            show: false
          },
          column: {
            conditionalRenderDisabled: true,
            width: 130,
            align: "center",
            cellRender({ row, value }) {
              if (row.status === "valid") {
                return "-";
              }

              async function doVerify() {
                row._validating_ = true;
                try {
                  const res = await api.DoVerify(row.id);
                  if (res === true) {
                    message.success("验证成功");
                    row.status = "valid";
                  } else if (res === false) {
                    message.success("验证超时");
                    row.status = "timeout";
                  } else {
                    message.success("开始验证，请耐心等待");
                  }
                  await crudExpose.doRefresh();
                } catch (e: any) {
                  console.error(e);
                  message.error(e.message);
                } finally {
                  row._validating_ = false;
                }
              }
              return (
                <div>
                  <a-button onClick={doVerify} loading={row._validating_} size={"small"} type={"primary"}>
                    点击验证
                  </a-button>
                  <CnameTip record={row} />
                </div>
              );
            }
          }
        },
        createTime: {
          title: "创建时间",
          type: "datetime",
          form: {
            show: false
          },
          column: {
            sorter: true,
            width: 160,
            align: "center"
          }
        },
        updateTime: {
          title: "更新时间",
          type: "datetime",
          form: {
            show: false
          },
          column: {
            show: true
          }
        }
      }
    }
  };
}
