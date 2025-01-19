import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import SuiteValue from "./suite-value.vue";
import SuiteValueEdit from "./suite-value-edit.vue";
import PriceEdit from "./price-edit.vue";
import DurationPriceValue from "/@/views/sys/suite/product/duration-price-value.vue";

export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const emit = context.emit;
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

  return {
    crudOptions: {
      table: {
        onRefreshed: () => {
          emit("refreshed");
        }
      },
      search: {
        show: false
      },
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      pagination: {
        show: false,
        pageSize: 999999
      },
      rowHandle: {
        minWidth: 200,
        fixed: "right"
      },
      form: {
        group: {
          groups: {
            base: {
              header: "基础信息",
              columns: ["title", "type", "disabled", "order", "supportBuy", "intro"]
            },
            content: {
              header: "套餐内容",
              columns: ["content.maxDomainCount", "content.maxPipelineCount", "content.maxDeployCount", "content.maxMonitorCount"]
            },
            price: {
              header: "价格",
              columns: ["durationPrices"]
            }
          }
        }
      },
      columns: {
        // id: {
        //   title: "ID",
        //   key: "id",
        //   type: "number",
        //   column: {
        //     width: 100
        //   },
        //   form: {
        //     show: false
        //   }
        // },
        title: {
          title: "套餐名称",
          type: "text",
          search: {
            show: true
          },
          form: {
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            width: 200
          }
        },
        type: {
          title: "类型",
          type: "dict-select",
          editForm: {
            component: {
              disabled: true
            }
          },
          dict: dict({
            data: [
              { label: "套餐", value: "suite" },
              { label: "加量包", value: "addon" }
            ]
          }),
          form: {
            value: "suite",
            rules: [{ required: true, message: "此项必填" }],
            helper: "套餐：同一时间只有最新购买的一个生效\n加量包：可购买多个，购买后立即生效，不影响套餐\n套餐和加量包数量可叠加"
          },
          column: {
            width: 80,
            align: "center"
          },
          valueBuilder: ({ row }) => {
            if (row.content) {
              row.content = JSON.parse(row.content);
            }
            if (row.durationPrices) {
              row.durationPrices = JSON.parse(row.durationPrices);
            }
          },
          valueResolve: ({ form }) => {
            if (form.content) {
              form.content = JSON.stringify(form.content);
            }
            if (form.durationPrices) {
              form.durationPrices = JSON.stringify(form.durationPrices);
            }
          }
        },
        "content.maxDomainCount": {
          title: "域名数量",
          type: "text",
          form: {
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
            }
          }
        },
        "content.maxPipelineCount": {
          title: "流水线数量",
          type: "text",
          form: {
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
            }
          }
        },
        "content.maxDeployCount": {
          title: "部署次数",
          type: "text",
          form: {
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
              unit: "次"
            }
          }
        },
        "content.maxMonitorCount": {
          title: "证书监控数量",
          type: "text",
          form: {
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
            }
          }
        },
        durationPrices: {
          title: "时长及价格",
          type: "text",
          form: {
            title: "选择时长",
            component: {
              name: PriceEdit,
              vModel: "modelValue",
              edit: true,
              style: {
                minHeight: "120px"
              }
            },
            col: {
              span: 24
            },
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            component: {
              name: DurationPriceValue,
              vModel: "modelValue"
            },
            width: 350
          }
        },
        supportBuy: {
          title: "支持购买",
          type: "dict-switch",
          dict: dict({
            data: [
              { label: "支持购买", value: true, color: "success" },
              { label: "不能购买", value: false, color: "gray" }
            ]
          }),
          form: {
            value: true
          },
          column: {
            width: 120
          }
        },
        disabled: {
          title: "上下架",
          type: "dict-radio",
          dict: dict({
            data: [
              { value: false, label: "上架", color: "green" },
              { value: true, label: "下架", color: "gray" }
            ]
          }),
          form: {
            value: false
          },
          column: {
            width: 100
          }
        },
        order: {
          title: "排序",
          type: "number",
          form: {
            helper: "越小越靠前",
            value: 0
          },
          column: {
            width: 100
          }
        },
        intro: {
          title: "说明",
          type: "textarea",
          column: {
            width: 200
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
