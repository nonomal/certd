/**
 * 异常基类
 */
export class BaseException extends Error {
  code: number;
  constructor(name, code, message) {
    super(message);
    this.name = name;
    this.code = code;
  }
}
