<template>
  <fs-dict-select style="width: 200px" :value="selectedValue" :dict="suiteDictRef" @selected-change="onSelectedChange"></fs-dict-select>
</template>
<script setup lang="ts">
import { durationDict } from "/@/views/certd/suite/api";
import { ref, watch } from "vue";
import { dict } from "@fast-crud/fast-crud";
import { request } from "/@/api/service";

defineOptions({
  name: "SuiteDurationSelector"
});

const props = defineProps<{
  modelValue?: {
    productId?: number;
    duration?: number;
  };
}>();

const suiteDictRef = dict({
  async getData() {
    const res = await request({
      url: "/sys/suite/product/list",
      method: "post"
    });
    const options: any = [
      {
        value: "",
        label: "不赠送"
      }
    ];
    res.forEach((item: any) => {
      const durationPrices = JSON.parse(item.durationPrices);
      for (const dp of durationPrices) {
        const value = item.id + "_" + dp.duration;
        options.push({
          label: `${item.title}<${durationDict.dataMap[dp.duration]?.label}>`,
          value: value,
          target: {
            productId: item.id,
            duration: dp.duration
          }
        });
      }
    });
    return options;
  }
});

const selectedValue = ref();
watch(
  () => {
    return props.modelValue;
  },
  (value) => {
    if (value && value.productId && value.duration) {
      selectedValue.value = value.productId + "_" + value.duration;
    } else {
      selectedValue.value = "";
    }
  },
  {
    immediate: true
  }
);

const emit = defineEmits(["update:modelValue"]);
const onSelectedChange = (value: any) => {
  selectedValue.value = value;
  if (!value) {
    emit("update:modelValue", undefined);
    return;
  }
  const arr = value.value.split("_");
  emit("update:modelValue", {
    productId: parseInt(arr[0]),
    duration: parseInt(arr[1])
  });
};

defineExpose({
  refresh() {
    suiteDictRef.reloadDict();
  }
});
</script>

<style lang="less"></style>
