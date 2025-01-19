<template>
  <div class="flex-col h-100 tutorial-steps">
    <a-steps v-model:current="current" class="mt-10" :percent="percent" size="small" :items="steps" @change="stepChanged"></a-steps>

    <div class="step-item overflow-hidden">
      <div class="text">
        <h3 class="title">{{ number }} {{ currentStepItem.title }}</h3>
        <div class="description mt-5">
          <div v-for="desc of currentStepItem.descriptions">{{ desc }}</div>
        </div>
        <div v-if="currentStepItem.body">
          <fs-render :render-func="currentStepItem.body" />
        </div>
      </div>
      <template v-if="currentStepItem.image">
        <div class="image-box">
          <a-image :src="currentStepItem.image" :preview-mask="previewMask" />
        </div>
      </template>
    </div>

    <div class="flex-center actions">
      <fs-button class="m-10" icon="ion:arrow-back-outline" @click="prev()">上一步</fs-button>
      <fs-button class="m-10" type="primary" icon-right="ion:arrow-forward-outline" @click="next()">下一步</fs-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { FsRender } from "@fast-crud/fast-crud";
import SimpleSteps from "./simple-steps.vue";
type Step = {
  title: string;
  subTitle?: string;
  description?: string;
  items: StepItems[];
};
type StepItems = {
  image?: string;
  title: string;
  descriptions?: string[];
  body?: () => JSX.Element;
};

import { computed, nextTick, ref } from "vue";

const steps = ref<Step[]>([
  {
    title: "创建证书申请流水线",
    description: "演示证书申请任务如何配置",
    items: [
      {
        title: "教程演示内容",
        descriptions: ["本教程演示如何自动申请证书并部署到Nginx上", "仅需3步，全自动申请部署证书"],
        body: () => {
          return <SimpleSteps></SimpleSteps>;
        }
      },
      {
        image: "/static/doc/images/1-add.png",
        title: "创建证书流水线",
        descriptions: ["点击添加证书流水线，填写证书申请信息"]
      },
      {
        image: "/static/doc/images/3-add-success.png",
        title: "流水线创建成功",
        descriptions: ["点击手动触发即可申请证书"]
      },
      {
        title: "接下来演示如何自动部署证书",
        descriptions: ["如果您只需要申请证书，那么到这一步就可以了"]
      }
    ]
  },
  {
    title: "添加部署证书任务",
    description: "这里演示部署证书到Nginx",
    items: [
      {
        image: "/static/doc/images/5-1-add-host.png",
        title: "添加证书部署任务",
        descriptions: ["这里演示自动部署证书到nginx", "本系统提供海量部署插件，满足您的各种部署需求"]
      },
      {
        image: "/static/doc/images/5-2-add-host.png",
        title: "填写任务参数",
        descriptions: ["填写主机上证书文件的路径", "选择主机ssh登录授权"]
      },
      {
        image: "/static/doc/images/5-3-add-host.png",
        title: "让新证书生效",
        descriptions: ["执行重启脚本", "让证书生效"]
      },
      {
        image: "/static/doc/images/5-4-add-host.png",
        title: "部署任务添加成功",
        descriptions: ["现在可以运行"]
      },
      {
        image: "/static/doc/images/5-5-plugin-list.png",
        title: "本系统提供茫茫多的部署插件",
        descriptions: ["您可以根据自身需求将证书部署到各种应用和平台"]
      }
    ]
  },
  {
    title: "运行与测试",
    description: "演示流水线运行,查看日志，成功后跳过等",
    items: [
      {
        image: "/static/doc/images/9-start.png",
        title: "运行测试一下",
        descriptions: ["点击手动触发按钮，即可测试运行"]
      },
      {
        image: "/static/doc/images/10-1-log.png",
        title: "查看日志",
        descriptions: ["点击任务可以查看状态和日志"]
      },
      {
        image: "/static/doc/images/11-1-error.png",
        title: "执行失败如何排查",
        descriptions: ["查看错误日志"]
      },
      {
        image: "/static/doc/images/11-2-error.png",
        title: "执行失败如何排查",
        descriptions: ["查看错误日志", "这里报的是nginx容器不存在，修改命令，改成正确的nginx容器名称即可"]
      },
      {
        image: "/static/doc/images/12-1-log-success.png",
        title: "执行成功",
        descriptions: ["修改正确后，重新点击手动触发，重新运行一次，执行成功"]
      },
      {
        image: "/static/doc/images/12-2-skip-log.png",
        title: "成功后自动跳过",
        descriptions: ["可以看到成功过的将会自动跳过，不会重复执行，只有当参数变更或者证书更新了，才会重新运行"]
      },
      {
        image: "/static/doc/images/13-1-result.png",
        title: "查看证书部署成功",
        descriptions: ["访问nginx上的网站，可以看到证书已经部署成功"]
      },
      {
        image: "/static/doc/images/13-3-download.png",
        title: "还可以下载证书，手动部署",
        descriptions: ["如果还没有好用的部署插件，没办法自动部署，你还可以下载证书，手动部署"]
      }
    ]
  },
  {
    title: "设置定时执行和邮件通知",
    description: "自动运行",
    items: [
      {
        image: "/static/doc/images/14-timer.png",
        title: "设置定时执行",
        descriptions: [
          "流水线测试成功，接下来配置定时触发，以后每天定时执行就不用管了",
          "推荐配置每天运行一次，在到期前35天才会重新申请新证书并部署，没到期前会自动跳过，不会重复申请。"
        ]
      },
      {
        image: "/static/doc/images/15-1-email.png",
        title: "设置邮件通知",
        descriptions: ["建议选择监听'错误时'和'错误转成功'两种即可，在意外失败时可以尽快去排查问题，（基础版需要配置邮件服务器）"]
      },
      {
        title: "教程结束",
        descriptions: ["感谢观看，希望对你有所帮助"]
      }
    ]
  }
]);

const current = ref(0);
const currentItem = ref(0);

const number = computed(() => {
  return `${current.value + 1}-${currentItem.value + 1}. `;
});
const currentStep = computed(() => {
  return steps.value[current.value];
});
const currentStepItem = computed(() => {
  return currentStep.value.items[currentItem.value];
});

const percent = computed(() => {
  return ((currentItem.value + 1) / currentStep.value.items.length) * 100;
});

function stepNext() {
  if (current.value < steps.value.length - 1) {
    current.value++;
    return true;
  }
  return false;
}

function stepPrev() {
  if (current.value > 0) {
    current.value--;
    return true;
  } else {
    return false;
  }
}

function next() {
  if (currentItem.value < currentStep.value.items.length - 1) {
    currentItem.value++;
  } else {
    if (stepNext()) {
      currentItem.value = 0;
    }
  }
}
function prev() {
  if (currentItem.value > 0) {
    currentItem.value--;
  } else {
    if (stepPrev()) {
      nextTick(() => {
        currentItem.value = currentStep.value.items.length - 1;
      });
    }
  }
}

function stepChanged(index: number) {
  current.value = index;
  currentItem.value = 0;
}
function previewMask() {
  return (
    <div title="点击放大" class="h-100 w-100">
      {" "}
    </div>
  );
}
</script>

<style lang="less">
.tutorial-steps {
  .step-item {
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 20px;
    .text {
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .image-box {
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #eee;
      width: 100%;
      height: 100%;
      .ant-image-mask {
        background: rgba(255, 255, 255, 0);
      }
      .ant-image {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .desc {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .actions {
    .fs-icon {
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .ant-steps .ant-steps-item-description {
    font-size: 12px !important;
    color: #999 !important;
  }

  .description {
    text-align: center;
  }
}
</style>
