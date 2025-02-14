import PiContainer from "./container.vue";
import TextEditable from "./editable.vue";
import vip from "./vip-button/install.js";
import { CheckCircleOutlined, InfoCircleOutlined, UndoOutlined } from "@ant-design/icons-vue";
import CronEditor from "./cron-editor/index.vue";
import FoldBox from "./fold-box.vue";
import { CronLight } from "@vue-js-cron/light";
import "@vue-js-cron/light/dist/light.css";
import Plugins from "./plugins/index";
import LoadingButton from "./loading-button.vue";
import IconSelect from "./icon-select.vue";
import ExpiresTimeText from "./expires-time-text.vue";
export default {
  install(app: any) {
    app.component("PiContainer", PiContainer);
    app.component("TextEditable", TextEditable);

    app.component("CronLight", CronLight);
    app.component("CronEditor", CronEditor);

    app.component("FoldBox", FoldBox);

    app.component("CheckCircleOutlined", CheckCircleOutlined);
    app.component("InfoCircleOutlined", InfoCircleOutlined);
    app.component("UndoOutlined", UndoOutlined);

    app.component("LoadingButton", LoadingButton);
    app.component("IconSelect", IconSelect);
    app.component("ExpiresTimeText", ExpiresTimeText);
    app.use(vip);
    app.use(Plugins);
  }
};
