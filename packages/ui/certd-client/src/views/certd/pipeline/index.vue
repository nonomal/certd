<template>
  <fs-page class="page-cert">
    <template #header>
      <div class="title">我的流水线</div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <div v-if="selectedRowKeys.length > 0" class="batch-actions">
        <div class="batch-actions-inner">
          <span> 已选择 {{ selectedRowKeys.length }} 项 </span>
          <fs-button icon="ion:trash-outline" class="color-green" type="link" text="批量删除" @click="batchDelete"></fs-button>
          <change-group class="color-green" :selected-row-keys="selectedRowKeys" @change="groupChanged"></change-group>
        </div>
      </div>
      <template #actionbar-right> </template>
      <template #form-bottom>
        <div>申请证书</div>
      </template>
      <pi-certd-form ref="certdFormRef"></pi-certd-form>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts" setup>
import { onActivated, onMounted, ref } from "vue";
import { dict, useFs } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import PiCertdForm from "./certd-form/index.vue";
import ChangeGroup from "./components/change-group.vue";
import { Modal, notification } from "ant-design-vue";
import * as api from "./api";

defineOptions({
  name: "PipelineManager"
});

const certdFormRef = ref();
const groupDictRef = dict({
  url: "/pi/pipeline/group/all",
  value: "id",
  label: "name"
});
const selectedRowKeys = ref([]);
const context: any = {
  certdFormRef,
  groupDictRef,
  selectedRowKeys
};
const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions, context });

// 页面打开后获取列表数据
onMounted(() => {
  crudExpose.doRefresh();
});

onActivated(async () => {
  await groupDictRef.reloadDict();
  await crudExpose.doRefresh();
});

function groupChanged() {
  crudExpose.doRefresh();
  selectedRowKeys.value = [];
}
function batchDelete() {
  Modal.confirm({
    title: "确认删除",
    content: "确定要删除选中的数据吗？",
    async onOk() {
      await api.BatchDelete(selectedRowKeys.value);
      notification.success({ message: "删除成功" });
      await crudExpose.doRefresh();
      selectedRowKeys.value = [];
    }
  });
}
</script>
<style lang="less">
.batch-actions {
  position: absolute;
  z-index: 100;
  line-height: 40px;
  display: flex;
  align-items: center;
  height: 37.86px;
  width: 100%;
  overflow: hidden;
  margin-top: 1px;
  padding-left: 48px;
  pointer-events: none;

  .batch-actions-inner {
    pointer-events: auto;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fafafa;
    padding-left: 10px;
  }
}
</style>
