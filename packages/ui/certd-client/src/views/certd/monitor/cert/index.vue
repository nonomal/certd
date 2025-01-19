<template>
  <fs-page>
    <template #header>
      <div class="title">
        证书仓库
        <span class="sub">从流水线生成的证书，后续将支持手动上传证书并部署</span>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts" setup>
import { defineComponent, onActivated, onMounted } from "vue";
import { useFs } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { createApi } from "./api";
defineOptions({
  name: "CertStore"
});
const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions, context: {} });

// 页面打开后获取列表数据
onMounted(() => {
  crudExpose.doRefresh();
});
onActivated(() => {
  crudExpose.doRefresh();
});
</script>
