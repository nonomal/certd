import * as api from "./api";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes, useUi } from "@fast-crud/fast-crud";
import { statusUtil } from "/@/views/certd/pipeline/pipeline/utils/util.status";
import { nanoid } from "nanoid";
import { message, Modal, notification } from "ant-design-vue";
import { env } from "/@/utils/util.env";
import { useUserStore } from "/@/store/modules/user";
import dayjs from "dayjs";
import { useSettingStore } from "/@/store/modules/settings";
import * as _ from "lodash-es";
import { useModal } from "/@/use/use-modal";
import CertView from "./cert-view.vue";
import { eachStages } from "./utils";
import { createNotificationApi as createNotificationApi } from "../notification/api";
import { mySuiteApi } from "/@/views/certd/suite/mine/api";
export default function ({ crudExpose, context: { certdFormRef, groupDictRef, selectedRowKeys } }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const router = useRouter();
  const { t } = useI18n();
  const lastResRef = ref();

  function setRunnableIds(pipeline: any) {
    const idMap: any = {};
    function createId(oldId: any) {
      if (oldId == null) {
        return nanoid();
      }
      const newId = nanoid();
      idMap[oldId] = newId;
      return newId;
    }
    if (pipeline.stages) {
      for (const stage of pipeline.stages) {
        stage.id = createId(stage.id);
        if (stage.tasks) {
          for (const task of stage.tasks) {
            task.id = createId(task.id);
            if (task.steps) {
              for (const step of task.steps) {
                step.id = createId(step.id);
              }
            }
          }
        }
      }
    }

    for (const trigger of pipeline.triggers) {
      trigger.id = nanoid();
    }
    for (const notification of pipeline.notifications) {
      notification.id = nanoid();
    }

    let content = JSON.stringify(pipeline);
    for (const key in idMap) {
      content = content.replaceAll(key, idMap[key]);
    }
    return JSON.parse(content);
  }
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    form.id = row.id;
    const res = await api.UpdateObj(form);
    lastResRef.value = res;
    return res;
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
    if (form.content == null) {
      form.content = JSON.stringify({
        title: form.title
      });
    } else {
      //复制的流水线
      delete form.status;
      delete form.lastHistoryTime;
      delete form.lastVars;
      delete form.createTime;
      delete form.id;
      let pipeline = JSON.parse(form.content);
      pipeline.title = form.title;
      pipeline = setRunnableIds(pipeline);
      form.content = JSON.stringify(pipeline);
    }

    const res = await api.AddObj(form);
    lastResRef.value = res;
    return res;
  };

  const settingsStore = useSettingStore();
  async function addCertdPipeline() {
    //检查是否流水线数量超出限制
    if (settingsStore.isComm && settingsStore.suiteSetting.enabled) {
      //检查数量是否超限

      const suiteDetail = await mySuiteApi.SuiteDetailGet();
      const max = suiteDetail.pipelineCount.max;
      if (max != -1 && max <= suiteDetail.pipelineCount.used) {
        notification.error({
          message: `对不起，您最多只能创建${max}条流水线，请购买或升级套餐`
        });
        return;
      }
    }

    certdFormRef.value.open(async ({ form }: any) => {
      // 添加certd pipeline
      const triggers = [];
      if (form.triggerCron) {
        triggers.push({ title: "定时触发", type: "timer", props: { cron: form.triggerCron } });
      }
      const notifications = [];
      if (form.notification != null) {
        notifications.push({
          type: "custom",
          when: ["error", "turnToSuccess", "success"],
          notificationId: form.notification,
          title: form.notificationTarget?.name || "自定义通知"
        });
      }
      let pipeline = {
        title: form.domains[0] + "证书自动化",
        runnableType: "pipeline",
        stages: [
          {
            title: "证书申请阶段",
            maxTaskCount: 1,
            runnableType: "stage",
            tasks: [
              {
                title: "证书申请任务",
                runnableType: "task",
                steps: [
                  {
                    title: "申请证书",
                    runnableType: "step",
                    input: {
                      renewDays: 35,
                      ...form
                    },
                    strategy: {
                      runStrategy: 0 // 正常执行
                    },
                    type: form.certApplyPlugin
                  }
                ]
              }
            ]
          }
        ],
        triggers,
        notifications
      };
      pipeline = setRunnableIds(pipeline);

      /**
       *  // cert: 证书; backup: 备份; custom:自定义;
       *   type: string;
       *   // custom: 自定义; monitor: 监控;
       *   from: string;
       */
      const id = await api.Save({
        title: pipeline.title,
        content: JSON.stringify(pipeline),
        keepHistoryCount: 30,
        type: "cert",
        from: "custom"
      });
      message.success("创建成功,请添加证书部署任务");
      router.push({ path: "/certd/pipeline/detail", query: { id, editMode: "true" } });
    });
  }

  const model = useModal();
  const viewCert = async (row: any) => {
    const cert = await api.GetCert(row.id);
    if (!cert) {
      notification.error({ message: "请先运行一次流水线" });
      return;
    }

    model.success({
      title: "查看证书",
      maskClosable: true,
      okText: "关闭",
      width: 800,
      content: () => {
        return <CertView cert={cert}></CertView>;
      }
    });
  };

  const downloadCert = async (row: any) => {
    const files = await api.GetFiles(row.id);
    model.success({
      title: "点击链接下载",
      maskClosable: true,
      okText: "关闭",
      content: () => {
        const children = [];
        for (const file of files) {
          const downloadUrl = `${env.API}/pi/history/download?pipelineId=${row.id}&fileId=${file.id}`;
          children.push(
            <div>
              <div class={"flex-o m-5"}>
                <fs-icon icon={"ant-design:cloud-download-outlined"} class={"mr-5 fs-16"}></fs-icon>
                <a href={downloadUrl} target={"_blank"}>
                  {file.filename}
                </a>
              </div>
            </div>
          );
        }

        if (children.length === 0) {
          return <div>暂无文件下载</div>;
        }

        return (
          <div class={"mt-3"}>
            <div> {children}</div>
          </div>
        );
      }
    });
  };
  const userStore = useUserStore();
  const settingStore = useSettingStore();

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      settings: {
        plugins: {
          //行选择插件，内置插件
          rowSelection: {
            //是否启用本插件
            enabled: true,
            order: -2,
            //合并在用户配置crudOptions之前还是之后
            before: true,
            props: {
              multiple: true,
              crossPage: false,
              selectedRowKeys,
              onSelectedChanged(selected) {
                console.log("已选择变化：", selected);
              }
            }
          }
        }
      },
      actionbar: {
        buttons: {
          add: {
            order: 5,
            text: "自定义流水线"
          },
          addCertd: {
            order: 1,
            text: "创建证书流水线",
            type: "primary",
            click() {
              addCertdPipeline();
            }
          }
        }
      },
      form: {
        afterSubmit({ form, res, mode }) {
          if (mode === "add") {
            router.push({ path: "/certd/pipeline/detail", query: { id: res.id, editMode: "true" } });
          }
        }
      },
      table: {
        scroll: { x: 1500 }
      },
      tabs: {
        name: "groupId",
        show: true
      },
      rowHandle: {
        width: 200,
        fixed: "right",
        dropdown: {
          show: true
        },
        buttons: {
          play: {
            order: -999,
            title: "运行流水线",
            type: "link",
            icon: "ant-design:play-circle-outlined",
            click({ row }) {
              Modal.confirm({
                title: "确认",
                content: `确定要触发运行吗？`,
                async onOk() {
                  await api.Trigger(row.id);
                  notification.success({ message: "管道已经开始运行" });
                }
              });
            }
          },
          view: {
            show: false,
            click({ row }) {
              router.push({ path: "/certd/pipeline/detail", query: { id: row.id, editMode: "false" } });
            }
          },
          copy: {
            click: async (context) => {
              settingStore.checkPlus();
              const { ui } = useUi();
              // @ts-ignore
              let row = context[ui.tableColumn.row];
              row = _.cloneDeep(row);
              row.title = row.title + "_copy";
              await crudExpose.openCopy({
                row: row,
                index: context.index
              });
            },
            class: "need-plus"
          },
          config: {
            order: 1,
            title: "编辑流水线",
            type: "link",
            dropdown: true,
            icon: "ant-design:edit-outlined",
            click({ row }) {
              router.push({ path: "/certd/pipeline/detail", query: { id: row.id, editMode: "true" } });
            }
          },
          edit: {
            order: 2,
            title: "修改配置/分组",
            icon: "ant-design:setting-outlined",
            dropdown: true
          },
          viewCert: {
            order: 3,
            title: "查看证书",
            type: "link",
            icon: "ph:certificate",
            async click({ row }) {
              await viewCert(row);
            }
          },
          download: {
            order: 4,
            type: "link",
            title: "下载证书",
            icon: "ant-design:download-outlined",
            async click({ row }) {
              await downloadCert(row);
            }
          },
          remove: {
            order: 5,
            dropdown: true
          }
        }
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          search: {
            show: true
          },
          column: {
            width: 100
          },
          form: {
            show: false
          }
        },
        userId: {
          title: "用户Id",
          type: "number",
          search: {
            show: computed(() => {
              return userStore.isAdmin && settingStore.sysPublic.managerOtherUserPipeline;
            })
          },
          form: {
            show: false
          },
          column: {
            show: computed(() => {
              return userStore.isAdmin && settingStore.sysPublic.managerOtherUserPipeline;
            }),
            width: 100
          }
        },
        title: {
          title: "流水线名称",
          type: "link",
          search: {
            show: true,
            title: "关键字",
            component: {
              name: "a-input"
            }
          },
          form: {
            rules: [{ required: true, message: "此项必填" }]
          },
          column: {
            width: 350,
            sorter: true,
            component: {
              on: {
                // 注意：必须要on前缀
                onClick({ row }) {
                  router.push({ path: "/certd/pipeline/detail", query: { id: row.id, editMode: "false" } });
                }
              }
            }
          }
        },
        content: {
          title: "流水线内容",
          form: { show: false },
          column: {
            show: false
          },
          valueBuilder({ row }) {
            if (row.content) {
              row.content = JSON.parse(row.content);
              const pipeline = row.content;
              let stepCount = 0;
              eachStages(pipeline.stages, (item, runnableType) => {
                if (runnableType === "step") {
                  stepCount++;
                }
              });
              row._stepCount = stepCount;
              if (pipeline.triggers) {
                row._triggerCount = pipeline.triggers?.length > 0 ? pipeline.triggers.length : "-";
              }
            }
          },
          valueResolve({ row }) {
            if (row.content) {
              row.content = JSON.stringify(row.content);
            }
          }
        },
        _triggerCount: {
          title: "定时任务数",
          type: "number",
          column: {
            align: "center",
            width: 100
          },
          form: {
            show: false
          }
        },
        _stepCount: {
          title: "部署任务数",
          type: "number",
          form: { show: false },
          column: {
            align: "center",
            width: 100
          }
        },
        lastVars: {
          title: "到期剩余",
          type: "number",
          form: {
            show: false
          },
          column: {
            cellRender({ row }) {
              if (!row.lastVars?.certExpiresTime) {
                return "-";
              }
              const leftDays = dayjs(row.lastVars.certExpiresTime).diff(dayjs(), "day");
              const color = leftDays < 20 ? "red" : "#389e0d";
              const percent = (leftDays / 90) * 100;
              return <a-progress percent={percent} strokeColor={color} format={(percent: number) => `${leftDays} 天`} />;
            },
            width: 150
          }
        },
        status: {
          title: "状态",
          type: "dict-select",
          search: {
            show: true
          },
          dict: dict({
            data: statusUtil.getOptions()
          }),
          form: {
            show: false
          },
          column: {
            sorter: true,
            width: 120,
            align: "center"
          }
        },
        lastHistoryTime: {
          title: "最后运行",
          type: "datetime",
          form: {
            show: false
          },
          column: {
            sorter: true,
            width: 150,
            align: "center"
          }
        },
        disabled: {
          title: "启用",
          type: "dict-switch",
          dict: dict({
            data: [
              { value: false, label: "启用" },
              { value: true, label: "禁用" }
            ]
          }),
          form: {
            value: false,
            show: false
          },
          column: {
            sorter: true,
            width: 80,
            align: "center",
            component: {
              name: "fs-dict-switch",
              vModel: "checked"
            },
            async valueChange({ row, key, value }) {
              return await api.UpdateObj({
                id: row.id,
                disabled: row[key]
              });
            }
          }
        },
        groupId: {
          title: "分组",
          type: "dict-select",
          search: {
            show: true
          },
          dict: groupDictRef,
          column: {
            width: 130,
            align: "center",
            component: {
              color: "auto"
            }
          }
        },
        order: {
          title: "排序号",
          type: "number",
          column: {
            sorter: true,
            align: "center",
            width: 80
          },
          form: {
            value: 0
          }
        },
        keepHistoryCount: {
          title: "历史记录保持数",
          type: "number",
          form: {
            value: 20,
            helper: "历史记录保持条数，多余的会被删除"
          },
          column: {
            width: 130,
            show: false
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
            width: 155,
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
            width: 125,
            show: false
          }
        }
      }
    }
  };
}
