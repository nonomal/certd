<template>
  <div v-if="target" class="cd-suite-value">
    <a-tag :color="target.color" class="m-0">
      <span v-if="used != null">{{ used }} /</span>
      {{ target.label }}
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  unit?: string;
  used?: number;
}>();

const target = computed(() => {
  if (props.modelValue == null) {
    return {};
  }
  if (props.modelValue === -1) {
    return {
      value: -1,
      label: "无限制",
      color: "green"
    };
  } else if (props.modelValue === 0) {
    return {
      value: 0,
      label: "0" + (props.unit || ""),
      color: "red"
    };
  } else {
    let color = "blue";
    if (props.used != null) {
      color = props.used >= props.modelValue ? "red" : "green";
    }
    return {
      value: props.modelValue,
      label: props.modelValue + (props.unit || ""),
      color: color
    };
  }
});
</script>
