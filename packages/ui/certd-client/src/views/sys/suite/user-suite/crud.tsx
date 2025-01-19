import { AddReq, compute, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { sysUserSuiteApi } from "./api";
import { useRouter } from "vue-router";
import SuiteValueEdit from "/@/views/sys/suite/product/suite-value-edit.vue";
import SuiteValue from "/@/views/sys/suite/product/suite-value.vue";
import DurationValue from "/@/views/sys/suite/product/duration-value.vue";
import createCrudOptionsUser from "/@/views/sys/authority/user/crud";
import UserSuiteStatus from "/@/views/certd/suite/mine/user-suite-status.vue";
import SuiteDurationSelector from "../setting/suite-duration-selector.vue";
import dayjs from "dayjs";
export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const api = sysUserSuiteApi;
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async (req: EditReq) => {
    const { form, row } = req;
    form.id = row.id;
    const res = await api.UpdateObj(form);
    return res;
  };
  const delRequest = async (req: DelReq) => {
    const { row } = req;
    return await api.DelObj(row.id);
  };

  const addRequest = async (req: AddReq) => {
    const { form } = req;
    const res = await api.PresentSuite(form);
    return res;
  };

  const router = useRouter();

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      form: {
        labelCol: {
          //固定label宽度
          span: null,
          style: {
            width: "100px"
          }
        },
        col: {
          span: 22
        },
        wrapper: {
          width: 600
        }
      },
      actionbar: {
        buttons: {
          add: { text: "赠送套餐" }
        }
      },
      toolbar: { show: false },
      rowHandle: {
        width: 200,
        fixed: "right",
        buttons: {
          view: { show: true },
          copy: { show: false },
          edit: { show: false },
          remove: { show: true }
          // continue:{
          //   text:"续期",
          //   type:"link",
          //   click(){
          //     console.log("续期");
          //   }
          // }
        }
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          search: {
            show: false
          },
          column: {
            width: 100,
            editable: {
              disabled: true
            }
          },
          form: {
            show: false
          }
        },
        title: {
          title: "套餐名称",
          type: "text",
          search: {
            show: true
          },
          form: {
            show: false
          },
          column: {
            width: 200
          }
        },
        userId: {
          title: "用户",
          type: "table-select",
          search: {
            show: true
          },
          dict: dict({
            async getNodesByValues(ids: number[]) {
              return await api.GetSimpleUserByIds(ids);
            },
            value: "id",
            label: "nickName"
          }),
          form: {
            component: {
              crossPage: true,
              multiple: false,
              select: {
                placeholder: "点击选择"
              },
              createCrudOptions: createCrudOptionsUser
              // crudOptionsOverride: crudOptionsOverride
            }
          }
        },
        //赠送
        presentSuiteId: {
          title: "赠送套餐",
          type: "dict-select",
          column: { show: false },
          addForm: {
            show: true,
            component: {
              name: SuiteDurationSelector,
              vModel: "modelValue"
            },
            rules: [
              {
                validator: async (rule, value) => {
                  if (value && value.productId) {
                    return true;
                  }
                  throw new Error("请选择套餐");
                }
              }
            ]
          },
          valueResolve({ form, value }) {
            if (value && value.productId) {
              form.productId = value.productId;
              form.duration = value.duration;
            }
          },
          form: { show: false }
        },
        productType: {
          title: "类型",
          type: "dict-select",
          editForm: {
            component: {
              disabled: true
            }
          },
          dict: dict({
            data: [
              { label: "套餐", value: "suite", color: "green" },
              { label: "加量包", value: "addon", color: "blue" }
            ]
          }),
          form: {
            show: false
          },
          column: {
            width: 80,
            align: "center"
          },
          valueBuilder: ({ row }) => {
            if (row.content) {
              row.content = JSON.parse(row.content);
            }
          },
          valueResolve: ({ form }) => {
            if (form.content) {
              form.content = JSON.stringify(form.content);
            }
          }
        },
        "content.maxDomainCount": {
          title: "域名数量",
          type: "text",
          form: {
            show: false,
            key: ["content", "maxDomainCount"],
            component: {
              name: SuiteValueEdit,
              vModel: "modelValue",
              unit: "个"
            },
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            width: 100,
            component: {
              name: SuiteValue,
              vModel: "modelValue",
              unit: "个"
            },
            align: "center"
          }
        },
        "content.maxPipelineCount": {
          title: "流水线数量",
          type: "text",
          form: {
            show: false,
            key: ["content", "maxPipelineCount"],
            component: {
              name: SuiteValueEdit,
              vModel: "modelValue",
              unit: "条"
            },
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            width: 100,
            component: {
              name: SuiteValue,
              vModel: "modelValue",
              unit: "条"
            },
            align: "center"
          }
        },
        "content.maxDeployCount": {
          title: "部署次数",
          type: "text",
          form: {
            show: false,
            key: ["content", "maxDeployCount"],
            component: {
              name: SuiteValueEdit,
              vModel: "modelValue",
              unit: "次"
            },
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            width: 100,
            component: {
              name: SuiteValue,
              vModel: "modelValue",
              unit: "次",
              used: compute(({ row }) => {
                return row.deployCountUsed;
              })
            },
            align: "center"
          }
        },
        "content.maxMonitorCount": {
          title: "证书监控数量",
          type: "text",
          form: {
            show: false,
            key: ["content", "maxMonitorCount"],
            component: {
              name: SuiteValueEdit,
              vModel: "modelValue",
              unit: "个"
            },
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            width: 120,
            component: {
              name: SuiteValue,
              vModel: "modelValue",
              unit: "个"
            },
            align: "center"
          }
        },
        duration: {
          title: "时长",
          type: "text",
          form: { show: false },
          column: {
            component: {
              name: DurationValue,
              vModel: "modelValue"
            },
            width: 100,
            align: "center"
          }
        },
        status: {
          title: "状态",
          type: "text",
          form: { show: false },
          column: {
            width: 100,
            align: "center",
            component: {
              name: UserSuiteStatus,
              userSuite: compute(({ row }) => {
                return row;
              })
            },
            conditionalRender: {
              match() {
                return false;
              }
            }
          }
        },
        activeTime: {
          title: "激活时间",
          type: "date",
          column: {
            width: 150
          },
          form: {
            show: false
          }
        },
        expiresTime: {
          title: "过期时间",
          type: "date",
          form: {
            show: false
          },
          column: {
            width: 150,
            component: {
              name: "expires-time-text",
              vModel: "value",
              mode: "tag",
              title: compute(({ value }) => {
                return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
              })
            }
          }
        },
        isPresent: {
          title: "是否赠送",
          type: "dict-switch",
          dict: dict({
            data: [
              { label: "是", value: true, color: "success" },
              { label: "否", value: false, color: "blue" }
            ]
          }),
          form: {
            value: true,
            show: false
          },
          column: {
            width: 100,
            align: "center"
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
            show: true,
            width: 160
          }
        }
      }
    }
  };
}
