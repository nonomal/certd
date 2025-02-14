<template>
  <div class="cd-suite-value-edit flex-o">
    <div class="flex- 1"><a-checkbox :checked="modelValue === -1" @update:checked="onCheckedChange">无限制</a-checkbox><span class="ml-5"></span></div>
    <div class="ml-10 w-50%">
      <a-input-number v-if="modelValue == null || modelValue >= 0" :value="modelValue" class="ml-5" @update:value="onValueChange">
        <template v-if="unit" #addonAfter>{{ unit }}</template>
      </a-input-number>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form } from "ant-design-vue";

const props = defineProps<{
  modelValue?: number;
  unit?: string;
}>();
const formItemContext = Form.useInjectFormItemContext();

const emit = defineEmits(["update:modelValue"]);

const onCheckedChange = (checked: boolean) => {
  const value = checked ? -1 : 1;
  onValueChange(value);
};

function onValueChange(value: number) {
  emit("update:modelValue", value);
  formItemContext.onFieldChange();
}
</script>
