import { Constants } from '../constants.js';
import { BaseException } from './base-exception.js';
/**
 * 通用异常
 */
export class CommonException extends BaseException {
  constructor(message) {
    super('CommonException', Constants.res.error.code, message ? message : Constants.res.error.message);
  }
}

export class CodeException extends BaseException {
  constructor(res: { code: number; message: string }) {
    super('CodeException', res.code, res.message);
  }
}
