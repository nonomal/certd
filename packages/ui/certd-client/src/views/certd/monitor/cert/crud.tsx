// @ts-ignore
import { useI18n } from "vue-i18n";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, EditReq, useFormWrapper, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { certInfoApi } from "./api";
import dayjs from "dayjs";
import { useUserStore } from "/@/store/modules/user";
import { useRouter } from "vue-router";

export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const { t } = useI18n();
  const api = certInfoApi;
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
    const res = await api.AddObj(form);
    return res;
  };
  const { openCrudFormDialog } = useFormWrapper();
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
        show: true,
        buttons: {
          add: {
            text: "上传自定义证书",
            type: "primary",
            show: false,
            async click() {
              function createCrudOptions() {
                return {
                  crudOptions: {
                    request: {
                      addRequest: async (form: any) => {
                        return await api.Upload(form);
                      },
                      editRequest: async (form: any) => {
                        return await api.Upload(form);
                      }
                    },
                    columns: {
                      id: {
                        title: "ID",
                        type: "number",
                        form: {
                          show: false
                        }
                      },
                      "cert.crt": {
                        title: "证书",
                        type: "textarea",
                        form: {
                          component: {
                            rows: 4
                          },
                          rules: [{ required: true, message: "此项必填" }]
                        }
                      },
                      "cert.key": {
                        title: "私钥",
                        type: "textarea",
                        form: {
                          component: {
                            rows: 4
                          },
                          rules: [{ required: true, message: "此项必填" }]
                        }
                      }
                    },
                    form: {
                      wrapper: {
                        title: "上传自定义证书"
                      }
                    }
                  }
                };
              }
              const { crudOptions } = createCrudOptions();
              const wrapperRef = await openCrudFormDialog({ crudOptions });
            }
          }
        }
      },
      rowHandle: {
        width: 200,
        fixed: "right",
        buttons: {
          view: { show: false },
          copy: { show: false },
          edit: { show: false },
          remove: { show: false }
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
        // domain: {
        //   title: "主域名",
        //   search: {
        //     show: true
        //   },
        //   type: "text",
        //   form: {
        //     show: false
        //   },
        //   column: {
        //     width: 180,
        //     sorter: true,
        //     component: {
        //       name: "fs-values-format"
        //     }
        //   }
        // },
        domains: {
          title: "全部域名",
          search: {
            show: true
          },
          type: "text",
          form: {
            rules: [{ required: true, message: "请输入域名" }]
          },
          column: {
            width: 450,
            sorter: true,
            component: {
              name: "fs-values-format",
              color: "auto"
            }
          }
        },
        domainCount: {
          title: "域名数量",
          type: "number",
          form: {
            show: false
          },
          column: {
            width: 120,
            sorter: true,
            show: false
          }
        },
        expiresTime: {
          title: "过期时间",
          search: {
            show: false
          },
          type: "date",
          form: {
            show: false
          },
          column: {
            sorter: true,
            cellRender({ value }) {
              if (!value) {
                return "-";
              }
              const expireDate = dayjs(value).format("YYYY-MM-DD");
              const leftDays = dayjs(value).diff(dayjs(), "day");
              const color = leftDays < 20 ? "red" : "#389e0d";
              const percent = (leftDays / 90) * 100;
              return <a-progress title={expireDate + "过期"} percent={percent} strokeColor={color} format={(percent: number) => `${leftDays}天`} />;
            }
          }
        },
        certProvider: {
          title: "证书颁发机构",
          search: {
            show: false
          },
          type: "text",
          form: {
            show: false
          },
          column: {
            width: 200
          }
        },
        applyTime: {
          title: "申请时间",
          search: {
            show: false
          },
          type: "datetime",
          form: {
            show: false
          },
          column: {
            sorter: true
          }
        },
        "pipeline.title": {
          title: "关联流水线",
          search: { show: false },
          type: "link",
          form: {
            show: false
          },
          column: {
            width: 350,
            sorter: true,
            component: {
              on: {
                onClick({ row }) {
                  router.push({ path: "/certd/pipeline/detail", query: { id: row.pipelineId, editMode: "false" } });
                }
              }
            }
          }
        }
      }
    }
  };
}
