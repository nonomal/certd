<template>
  <div v-if="detail.enabled" class="my-suite-card">
    <div class="flex-o">
      <a-popover>
        <template #content>
          <div>
            <div class="flex-between mt-5">
              <div class="flex-o"><fs-icon icon="ant-design:check-outlined" class="color-green mr-5" /> 流水线条数：</div>
              <suite-value :model-value="detail.pipelineCount.max" :used="detail.pipelineCount.used" unit="条" />
            </div>
            <div class="flex-between mt-5">
              <div class="flex-o">
                <fs-icon icon="ant-design:check-outlined" class="color-green mr-5" />
                域名数量：
              </div>
              <suite-value :model-value="detail.domainCount.max" :used="detail.domainCount.used" unit="个" />
            </div>
            <div class="flex-between mt-5">
              <div class="flex-o">
                <fs-icon icon="ant-design:check-outlined" class="color-green mr-5" />
                部署次数：
              </div>
              <suite-value :model-value="detail.deployCount.max" :used="detail.deployCount.used" unit="次" />
            </div>
            <div class="flex-between mt-5">
              <div class="flex-o"><fs-icon icon="ant-design:check-outlined" class="color-green mr-5" /> 监控站点数：</div>
              <suite-value :model-value="detail.monitorCount.max" :used="detail.monitorCount.used" unit="次" />
            </div>
          </div>
        </template>
        <div class="flex-o">
          <fs-icon icon="ant-design:gift-outlined" class="color-green mr-5" />
          <a-tag v-for="(item, index) of detail.suites" :key="index" color="green" class="pointer flex-o">
            <span class="mr-5">
              {{ item.title }}
            </span>
            <span>(<expires-time-text :value="item.expiresTime" />)</span>
          </a-tag>
          <div v-if="detail.suites?.length === 0" class="flex-o ml-5">
            暂无套餐 <a-button class="ml-5" type="primary" size="small" @click="goBuy">去购买</a-button>
          </div>
        </div>
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SuiteValue from "/@/views/sys/suite/product/suite-value.vue";
import { ref } from "vue";
import ExpiresTimeText from "/@/components/expires-time-text.vue";
import { mySuiteApi, SuiteDetail } from "/@/views/certd/suite/mine/api";
import { FsIcon } from "@fast-crud/fast-crud";
import { useRouter } from "vue-router";

defineOptions({
  name: "SuiteCard"
});

const detail = ref<SuiteDetail>({});

async function loadSuiteDetail() {
  detail.value = await mySuiteApi.SuiteDetailGet();
}

loadSuiteDetail();

const router = useRouter();
function goBuy() {
  router.push({
    path: "/certd/suite/buy"
  });
}
</script>
