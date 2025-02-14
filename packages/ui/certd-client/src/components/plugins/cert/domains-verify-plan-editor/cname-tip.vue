<template>
  <a-tooltip :overlay-style="{ maxWidth: '400px' }">
    <template #title>
      <div>
        <div>多试几次，如果仍然无法验证通过，请按如下步骤排查问题：</div>
        <div>1. 解析记录应该添加在{{ record.domain }}域名下</div>
        <div>2. 要添加的是CNAME类型的记录，不是TXT</div>
        <div>3. 核对记录值是否是:{{ record.recordValue }}</div>
        <div>4. 运行下面的命令,查看解析是否正确 <fs-copyable :style="{ color: '#52c41a' }" :model-value="nslookupCmd"></fs-copyable></div>
        <div>5. 如果以上检查都没有问题，则可能是DNS解析生效时间比较慢，某些提供商延迟可能高达几个小时</div>
      </div>
    </template>
    <fs-icon class="ml-5 pointer" icon="mingcute:question-line"></fs-icon>
  </a-tooltip>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps<{
  record: any;
}>();

const nslookupCmd = computed(() => {
  return `nslookup -qa=txt _acme-challenge.${props.record.domain}`;
});
</script>
