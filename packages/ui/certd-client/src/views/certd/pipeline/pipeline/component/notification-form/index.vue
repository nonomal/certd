<template>
  <a-drawer
    v-model:open="notificationDrawerVisible"
    placement="right"
    :closable="true"
    width="600px"
    class="pi-notification-form"
    @after-open-change="notificationDrawerOnAfterVisibleChange"
  >
    <template #title>
      <div>
        编辑通知
        <a-button v-if="mode === 'edit'" @click="notificationDelete()">
          <template #icon><DeleteOutlined /></template>
        </a-button>
      </div>
    </template>
    <template v-if="currentNotification">
      <pi-container>
        <a-form ref="notificationFormRef" class="notification-form" :model="currentNotification" :label-col="labelCol" :wrapper-col="wrapperCol">
          <fs-form-item
            v-if="currentNotification.type === 'email'"
            v-model="currentNotification.type"
            :item="{
              title: '类型',
              key: 'type',
              value: 'email',
              component: {
                name: 'a-select',
                vModel: 'value',
                disabled: !editMode,
                options: [
                  { value: 'email', label: '邮件' },
                  { value: 'other', label: '其他通知方式' }
                ]
              },
              rules: [{ required: true, message: '此项必填' }]
            }"
          />
          <fs-form-item
            v-model="currentNotification.when"
            :item="{
              title: '触发时机',
              key: 'type',
              value: ['error'],
              component: {
                name: 'a-select',
                vModel: 'value',
                disabled: !editMode,
                mode: 'multiple',
                options: [
                  { value: 'start', label: '开始时' },
                  { value: 'success', label: '成功时' },
                  { value: 'turnToSuccess', label: '失败转成功时' },
                  { value: 'error', label: '失败时' }
                ]
              },
              helper: `建议仅选择'失败时'和'失败转成功'两种即可`,
              rules: [{ required: true, message: '此项必填' }]
            }"
          />
          <pi-notification-form-email
            v-if="currentNotification.type === 'email'"
            ref="optionsRef"
            v-model:options="currentNotification.options"
          ></pi-notification-form-email>

          <fs-form-item
            v-else
            v-model="currentNotification.notificationId"
            :item="{
              title: '通知配置',
              key: 'type',
              component: {
                disabled: !editMode,
                name: NotificationSelector,
                onSelectedChange
              },
              helper: '请选择通知方式',
              rules: [{ required: true, message: '此项必填' }]
            }"
          />
        </a-form>

        <template #footer>
          <a-form-item v-if="editMode" :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="notificationSave"> 确定 </a-button>
          </a-form-item>
        </template>
      </pi-container>
    </template>
  </a-drawer>
</template>

<script lang="ts">
import { Modal } from "ant-design-vue";
import { ref, Ref } from "vue";
import * as _ from "lodash-es";
import { nanoid } from "nanoid";
import PiNotificationFormEmail from "./pi-notification-form-email.vue";
import NotificationSelector from "/@/views/certd/notification/notification-selector/index.vue";

export default {
  name: "PiNotificationForm",
  // eslint-disable-next-line vue/no-unused-components
  components: { NotificationSelector, PiNotificationFormEmail },
  props: {
    editMode: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update"],
  setup(props: any, context: any) {
    /**
     *  notification drawer
     * @returns
     */
    function useNotificationForm() {
      const mode = ref("add");
      const callback = ref();
      const currentNotification: Ref<any> = ref({ type: undefined, when: [], options: {}, notificationId: undefined, title: "" });
      const currentPlugin = ref({});
      const notificationFormRef = ref(null);
      const notificationDrawerVisible = ref(false);
      const optionsRef = ref();
      const rules = ref({
        type: [
          {
            type: "string",
            required: true,
            message: "请选择类型"
          }
        ],
        when: [
          {
            type: "string",
            required: true,
            message: "请选择通知时机"
          }
        ],
        notificationId: [
          {
            type: "number",
            required: true,
            message: "请选择通知配置"
          }
        ]
      });

      const notificationDrawerShow = () => {
        notificationDrawerVisible.value = true;
      };
      const notificationDrawerClose = () => {
        notificationDrawerVisible.value = false;
      };

      const notificationDrawerOnAfterVisibleChange = (val: any) => {
        console.log("notificationDrawerOnAfterVisibleChange", val);
      };

      const notificationOpen = (notification: any, emit: any) => {
        callback.value = emit;
        currentNotification.value = _.cloneDeep(notification);
        console.log("currentNotificationOpen", currentNotification.value);
        notificationDrawerShow();
      };

      const notificationAdd = (emit: any) => {
        mode.value = "add";
        const notification = { id: nanoid(), type: "custom", when: ["error", "turnToSuccess"] };
        notificationOpen(notification, emit);
      };

      const notificationEdit = (notification: any, emit: any) => {
        mode.value = "edit";
        notificationOpen(notification, emit);
      };

      const notificationView = (notification: any, emit: any) => {
        mode.value = "view";
        notificationOpen(notification, emit);
      };

      const notificationSave = async (e: any) => {
        if (optionsRef.value) {
          currentNotification.value.options = await optionsRef.value.getValue();
        }

        console.log("currentNotificationSave", currentNotification.value);
        try {
          await notificationFormRef.value.validate();
        } catch (e) {
          console.error("表单验证失败:", e);
          return;
        }

        callback.value("save", currentNotification.value);
        notificationDrawerClose();
      };

      const notificationDelete = () => {
        Modal.confirm({
          title: "确认",
          content: `确定要删除此触发器吗？`,
          async onOk() {
            callback.value("delete");
            notificationDrawerClose();
          }
        });
      };

      const blankFn = () => {
        return {};
      };

      function onSelectedChange(node: any) {
        currentNotification.value.title = node?.name || null;
      }
      return {
        notificationFormRef,
        onSelectedChange,
        mode,
        notificationAdd,
        notificationEdit,
        notificationView,
        notificationDrawerShow,
        notificationDrawerVisible,
        notificationDrawerOnAfterVisibleChange,
        currentNotification,
        currentPlugin,
        notificationSave,
        notificationDelete,
        rules,
        blankFn,
        optionsRef
      };
    }

    return {
      ...useNotificationForm(),
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    };
  },
  computed: {
    NotificationSelector() {
      return NotificationSelector;
    }
  }
};
</script>

<style lang="less">
.pi-notification-form {
}
</style>
