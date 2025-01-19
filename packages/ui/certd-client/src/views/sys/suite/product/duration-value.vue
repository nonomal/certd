<template>
  <a-tag color="green"> {{ durationDict.dataMap[modelValue]?.label }}</a-tag>
</template>

<script lang="ts" setup>
import { durationDict } from "/@/views/certd/suite/api";

defineOptions({
  name: "DurationValue"
});
const props = defineProps<{
  modelValue: number;
}>();
</script>
