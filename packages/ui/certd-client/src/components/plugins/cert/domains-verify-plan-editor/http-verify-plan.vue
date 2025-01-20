<template>
  <table class="http-verify-plan">
    <thead>
      <tr>
        <td style="width: 160px">网站域名</td>
        <td style="width: 100px; text-align: center">上传方式</td>
        <td style="width: 150px">上传授权</td>
        <td style="width: 200px">网站根目录路径</td>
      </tr>
    </thead>
    <tbody v-if="records" class="http-record-body">
      <template v-for="(item, key) of records" :key="key">
        <tr>
          <td class="domain">
            {{ item.domain }}
          </td>
          <td>
            <fs-dict-select v-model:value="item.httpUploaderType" :dict="uploaderTypeDict" @change="onRecordChange"></fs-dict-select>
          </td>
          <td>
            <access-selector v-model="item.httpUploaderAccess" :type="item.httpUploaderType" @change="onRecordChange"></access-selector>
          </td>
          <td>
            <a-input v-model:value="item.httpUploadRootDir" placeholder="网站根目录，如：/www/wwwroot" @change="onRecordChange"></a-input>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { Ref, ref, watch, nextTick } from "vue";
import { HttpRecord } from "/@/components/plugins/cert/domains-verify-plan-editor/type";
import { dict } from "@fast-crud/fast-crud";

defineOptions({
  name: "HttpVerifyPlan"
});

const emit = defineEmits(["update:modelValue", "change"]);

const props = defineProps<{
  modelValue: Record<string, any>;
}>();

const records: Ref<Record<string, HttpRecord>> = ref({});

watch(
  () => {
    return props.modelValue;
  },
  (value: any) => {
    if (value) {
      records.value = {
        ...value
      };
    }
  },
  {
    immediate: true
  }
);

async function onRecordChange() {
  await nextTick();
  emit("update:modelValue", records.value);
  emit("change", records.value);
}

const uploaderTypeDict = dict({
  data: [
    { label: "SFTP", value: "sftp" },
    { label: "FTP", value: "ftp" },
    { label: "阿里云OSS", value: "alioss" },
    { label: "腾讯云COS", value: "tencentcos" },
    { label: "七牛OSS", value: "qiniuoss" },
    { label: "SSH(已废弃，请选择SFTP方式)", value: "ssh", disabled: true }
  ]
});
</script>

<style lang="less">
.http-verify-plan {
  width: 100%;
  table-layout: fixed;
  tbody tr td {
    border-top: 1px solid #e8e8e8 !important;
  }
  tr {
    td {
      border: 0 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.center {
        text-align: center;
      }
    }
    //&:last-child {
    //  td {
    //    border-bottom: 0 !important;
    //  }
    //}
  }
}
</style>
