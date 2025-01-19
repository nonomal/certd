<script setup lang="ts">
import { ref } from "vue";
import TutorialSteps from "/@/components/tutorial/tutorial-steps.vue";
import { useSettingStore } from "/@/store/modules/settings";
const openedRef = ref(false);
function open() {
  openedRef.value = true;
}
const slots = defineSlots();
</script>

<template>
  <div class="tutorial-button pointer" @click="open">
    <template v-if="!slots.default">
      <fs-icon icon="ant-design:question-circle-outlined"></fs-icon>
      <div class="ml-5">使用教程</div>
    </template>
    <slot></slot>
    <a-modal v-model:open="openedRef" class="tutorial-modal" width="90%">
      <template #title> 使用教程 </template>
      <tutorial-steps v-if="openedRef" />
      <template #footer></template>
    </a-modal>
  </div>
</template>

<style lang="less">
.tutorial-modal {
  top: 50px;
  .ant-modal-body {
    height: 80vh;
  }
}
</style>
