<template>
  <div class="remote-select">
    <div class="flex flex-row">
      <a-select
        class="remote-select-input"
        show-search
        :filter-option="filterOption"
        :options="optionsRef"
        :value="value"
        v-bind="attrs"
        @click="onClick"
        @update:value="emit('update:value', $event)"
      />
      <div class="ml-5">
        <fs-button :loading="loading" title="刷新选项" icon="ion:refresh-outline" @click="refreshOptions"></fs-button>
      </div>
    </div>
    <div class="helper" :class="{ error: hasError }">
      {{ message }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ComponentPropsType, doRequest } from "/@/components/plugins/lib";
import { inject, ref, useAttrs, watch } from "vue";
import { PluginDefine } from "@certd/pipeline";

defineOptions({
  name: "RemoteSelect"
});

const props = defineProps<
  {
    watches: string[];
  } & ComponentPropsType
>();

const emit = defineEmits<{
  "update:value": any;
}>();

const attrs = useAttrs();

const getCurrentPluginDefine: any = inject("getCurrentPluginDefine");
const getScope: any = inject("get:scope");
const getPluginType: any = inject("get:plugin:type");

const optionsRef = ref([]);
const message = ref("");
const hasError = ref(false);
const loading = ref(false);
const getOptions = async () => {
  if (loading.value) {
    return;
  }

  if (!getCurrentPluginDefine) {
    return;
  }

  const define: PluginDefine = getCurrentPluginDefine()?.value;
  if (!define) {
    return;
  }
  for (let key in define.input) {
    const inWatches = props.watches.includes(key);
    const inputDefine = define.input[key];
    if (inWatches && inputDefine.required) {
      const value = props.form[key];
      if (value == null || value === "") {
        console.log("remote-select required", key);
        return;
      }
    }
  }

  message.value = "";
  hasError.value = false;
  loading.value = true;
  optionsRef.value = [];
  const { form } = getScope();
  const pluginType = getPluginType();

  try {
    const res = await doRequest(
      {
        type: pluginType,
        typeName: form.type,
        action: props.action,
        input: pluginType === "plugin" ? form.input : form
      },
      {
        onError(err: any) {
          hasError.value = true;
          message.value = `获取选项出错：${err.message}`;
        },
        showErrorNotify: false
      }
    );
    if (res && res.length > 0) {
      message.value = "获取数据成功，请从下拉框中选择";
    }
    optionsRef.value = res;
    return res;
  } finally {
    loading.value = false;
  }
};

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || String(option.value).toLowerCase().indexOf(input.toLowerCase());
};

async function onClick() {
  if (optionsRef.value?.length === 0) {
    await refreshOptions();
  }
}

async function refreshOptions() {
  await getOptions();
}

watch(
  () => {
    const values = [];
    for (const item of props.watches) {
      values.push(props.form[item]);
    }
    return {
      form: props.form,
      watched: values
    };
  },
  async () => {
    await getOptions();
  },
  {
    immediate: true
  }
);
</script>

<style lang="less"></style>
