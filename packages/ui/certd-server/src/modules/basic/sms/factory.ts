import { AliyunSmsService } from './aliyun-sms.js';
import { YfySmsService } from './yfy-sms.js';

export class SmsServiceFactory {
  static createSmsService(type: string) {
    const cls = this.GetClassByType(type);
    return new cls();
  }

  static GetClassByType(type: string) {
    switch (type) {
      case 'aliyun':
        return AliyunSmsService;
      case 'yfysms':
        return YfySmsService;
      default:
        throw new Error('不支持的短信服务类型');
    }
  }

  static getDefine(type: string) {
    const cls = this.GetClassByType(type);
    return cls.getDefine();
  }
}
