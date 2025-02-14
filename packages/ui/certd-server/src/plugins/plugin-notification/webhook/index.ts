import { BaseNotification, IsNotification, NotificationBody, NotificationInput } from '@certd/pipeline';
import qs from 'qs';
@IsNotification({
  name: 'webhook',
  title: '自定义webhook',
  desc: '根据模版自定义http请求',
})
export class WebhookNotification extends BaseNotification {
  @NotificationInput({
    title: 'webhook地址',
    component: {
      placeholder: 'https://xxxxx.com/xxxx',
    },
    col: {
      span: 24,
    },
    required: true,
  })
  webhook = '';

  @NotificationInput({
    title: '请求方式',
    value: 'POST',
    component: {
      name: 'a-select',
      placeholder: 'post/put/get',
      options: [
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'GET', label: 'GET' },
      ],
    },
    required: true,
  })
  method = '';

  @NotificationInput({
    title: 'ContentType',
    value: 'application/json',
    component: {
      name: 'a-auto-complete',
      options: [
        { value: 'application/json', label: 'application/json' },
        { value: 'application/x-www-form-urlencoded', label: 'application/x-www-form-urlencoded' },
      ],
    },
    helper: '也可以自定义填写',
    required: true,
  })
  contentType = '';

  @NotificationInput({
    title: 'Headers',
    component: {
      name: 'a-textarea',
      vModel: 'value',
      rows: 2,
    },
    col: {
      span: 24,
    },
    helper: '一行一个，格式为key=value',
    required: false,
  })
  headers = '';

  @NotificationInput({
    title: '消息body模版',
    value: `{
    "title":"{title}",
    "content":"{content}\\n[查看详情]({url})"
}`,
    component: {
      name: 'a-textarea',
      rows: 4,
    },
    col: {
      span: 24,
    },
    helper: `根据实际的webhook接口，构建一个json对象作为参数，支持变量：{title}、{content}、{url}，变量用{}包裹，字符串需要双引号\n如果是get方式，将作为query参数拼接到url上`,
    required: true,
  })
  template = '';

  @NotificationInput({
    title: '忽略证书校验',
    value: false,
    component: {
      name: 'a-switch',
      vModel: 'checked',
    },
    required: false,
  })
  skipSslVerify: boolean;

  replaceTemplate(target: string, body: any, urlEncode = false) {
    let bodyStr = target;
    const keys = Object.keys(body);
    for (const key of keys) {
      const value = urlEncode ? encodeURIComponent(body[key]) : body[key];
      bodyStr = bodyStr.replaceAll(`{${key}}`, value);
    }
    return bodyStr;
  }

  async send(body: NotificationBody) {
    if (!this.template) {
      throw new Error('模版不能为空');
    }
    if (!this.webhook) {
      throw new Error('webhook不能为空');
    }

    const replaceBody = {
      title: body.title,
      content: body.content,
      url: body.url,
    };
    const bodyStr = this.replaceTemplate(this.template, replaceBody);
    let data = JSON.parse(bodyStr);

    let url = this.webhook;
    if (this.method.toLowerCase() === 'get') {
      const query = qs.stringify(data);
      if (url.includes('?')) {
        url = `${url}&${query}`;
      } else {
        url = `${url}?${query}`;
      }
      data = null;
    }

    const headers: any = {};
    if (this.headers && this.headers.trim()) {
      this.headers.split('\n').forEach(item => {
        item = item.trim();
        if (item) {
          const arr = item.split('=');
          if (arr.length !== 2) {
            this.logger.warn('header格式错误,请使用=号', item);
            return;
          }
          headers[arr[0]] = arr[1];
        }
      });
    }

    try {
      await this.http.request({
        url: url,
        method: this.method,
        headers: {
          'Content-Type': `${this.contentType}; charset=UTF-8`,
          ...headers,
        },
        data: data,
        skipSslVerify: this.skipSslVerify,
      });
    } catch (e) {
      if (e.response?.data) {
        throw new Error(e.message + ',' + JSON.stringify(e.response.data));
      }
      throw e;
    }
  }
}
