<template>
  <fs-form-wrapper v-if="formWrapperOptions" ref="formWrapperRef" />
</template>

<script lang="ts">
import { useColumns, useExpose } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud.jsx";
import { ref } from "vue";
import * as _ from "lodash-es";
import * as api from "../api.plugin";
import { PluginGroup, PluginGroups } from "/@/views/certd/pipeline/pipeline/type";
import { GetPluginDefine } from "../api.plugin";
import { createNotificationApi } from "/@/views/certd/notification/api";
export default {
  name: "PiCertdForm",
  setup(props: any, ctx: any) {
    const formWrapperRef = ref();
    const formWrapperOptions = ref();
    const doSubmitRef = ref();
    async function buildFormOptions() {
      const pluginGroups: { [key: string]: PluginGroup } = await api.GetGroups({});
      const certPluginGroup = pluginGroups.cert;

      const certPlugins = [];
      for (const plugin of certPluginGroup.plugins) {
        const detail: any = await api.GetPluginDefine(plugin.name);
        certPlugins.push(detail);
      }

      // 自定义表单配置
      const { buildFormOptions } = useColumns();
      //使用crudOptions结构来构建自定义表单配置
      let { crudOptions } = createCrudOptions(certPlugins, formWrapperRef);

      const formOptions = buildFormOptions(
        _.merge(crudOptions, {
          form: {
            async doSubmit({ form }: any) {
              // 创建certd 的pipeline
              await doSubmitRef.value({ form });

              if (form.email) {
                //创建一个默认的邮件通知
                const notificationApi = createNotificationApi();
                await notificationApi.GetOrCreateDefault({ email: form.email });
              }
            }
          }
        }) as any
      );

      formWrapperOptions.value = formOptions;
    }
    buildFormOptions();
    function open(doSubmit: any) {
      doSubmitRef.value = doSubmit;
      formWrapperRef.value.open(formWrapperOptions.value);
    }

    return {
      formWrapperRef,
      open,
      formWrapperOptions
    };
  }
};
</script>

<style scoped></style>
