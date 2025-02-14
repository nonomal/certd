<template>
  <div class="cd-price-edit">
    <div v-if="edit" class="duration-list flex-o">
      <div v-for="item of durationDict.data" :key="item.value" :class="{ active: isActive(item) }" class="duration-item" @click="onDurationClicked(item)">
        {{ item.label }}
      </div>
    </div>
    <div class="price-group-list">
      <div v-for="item of modelValue" :key="item.duration" class="flex-o price-group-item">
        <div style="width: 50px">{{ durationDict.dataMap[item.duration]?.label }}:</div>
        <price-input v-model="item.price" style="width: 150px" :edit="edit" class="mr-10" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form } from "ant-design-vue";
import { PriceItem } from "./api";
import PriceInput from "./price-input.vue";
import { durationDict } from "../../../certd/suite/api";
const props = withDefaults(
  defineProps<{
    modelValue?: PriceItem[];
    edit: boolean;
  }>(),
  {
    modelValue: () => {
      return [];
    }
  }
);

const formItemContext = Form.useInjectFormItemContext();

const emit = defineEmits(["update:modelValue"]);

function doEmit(value: PriceItem[]) {
  emit("update:modelValue", value);
  formItemContext.onFieldChange();
}

function isActive(item: any) {
  return props.modelValue.some((v) => v.duration === item.value);
}

function onDurationClicked(item: any) {
  const has = props.modelValue.some((v) => v.duration === item.value);
  if (has) {
    // remove
    const newValue = props.modelValue.filter((v) => v.duration !== item.value);
    doEmit(newValue);
  } else {
    // add
    const newValue = [...props.modelValue, { duration: item.value, price: 0.0 }];
    //sort
    newValue.sort((a, b) => a.duration - b.duration);
    if (newValue.length > 0) {
      const first = newValue[0];
      if (first.duration === -1) {
        //挪到后面去
        newValue.shift();
        newValue.push(first);
      }
    }
    doEmit(newValue);
  }
}
</script>
<style lang="less">
.cd-price-edit {
  .duration-item {
    border: 1px solid #eee;
    padding: 2px;
    width: 35px;
    text-align: center;
    cursor: pointer;

    &.active {
      background: #1890ff;
      color: #fff;
    }
  }

  .price-group-list {
    display: flex;
    flex-wrap: wrap;
    .price-group-item {
      margin-right: 10px;
      margin-top: 10px;
    }
  }
}
</style>
