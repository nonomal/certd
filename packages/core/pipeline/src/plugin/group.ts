import { PluginDefine } from "./api";

export class PluginGroup {
  key: string;
  title: string;
  desc?: string;
  order: number;
  plugins: PluginDefine[];
  constructor(key: string, title: string, order = 0, desc = "") {
    this.key = key;
    this.title = title;
    this.order = order;
    this.desc = desc;
    this.plugins = [];
  }
}

export const pluginGroups = {
  cert: new PluginGroup("cert", "证书申请", 1),
  aliyun: new PluginGroup("aliyun", "阿里云", 2),
  huawei: new PluginGroup("huawei", "华为云", 3),
  tencent: new PluginGroup("tencent", "腾讯云", 4),
  qiniu: new PluginGroup("qiniu", "七牛云", 5),
  aws: new PluginGroup("aws", "亚马逊云", 6),
  host: new PluginGroup("host", "主机", 7),
  cdn: new PluginGroup("cdn", "CDN", 8),
  panel: new PluginGroup("panel", "面板", 9),
  other: new PluginGroup("other", "其他", 10),
};
