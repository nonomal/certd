<template>
  <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, ref } from "vue";
import { useFs } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

defineOptions({
  name: "ProductManager"
});
const emit = defineEmits(["refreshed"]);

const context: any = { emit };
const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions, context });

// 页面打开后获取列表数据
onMounted(() => {
  crudExpose.doRefresh();
});
</script>
<style lang="less"></style>
