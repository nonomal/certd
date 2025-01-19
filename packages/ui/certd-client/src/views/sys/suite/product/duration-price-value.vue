<template>
  <div class="cd-duration-price-value">
    <a-tag v-for="item of modelValue" :key="item.duration" class="flex-o price-group-item m-2">
      <div style="width: 40px">{{ durationDict.dataMap[item.duration]?.label }}:</div>
      <price-input v-model="item.price" :edit="false" class="mr-5" />
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import { PriceItem } from "./api";
import PriceInput from "./price-input.vue";
import { durationDict } from "../../../certd/suite/api";

defineOptions({
  name: "DurationPriceValue"
});

const props = withDefaults(
  defineProps<{
    modelValue?: PriceItem[];
  }>(),
  {
    modelValue: () => {
      return [];
    }
  }
);
</script>
<style lang="less">
.cd-duration-price-value {
  display: flex;
  flex-wrap: wrap;
  item-align: center;
}
</style>
