import { logger, utils } from './index.js';

export class Locker {
  locked: Record<string, any> = {};

  async execute(lockStr: string, callback: any) {
    await this.lock(lockStr);
    const timeoutId = setTimeout(() => {
      logger.warn('Lock timeout,自动解锁', lockStr);
      this.unlock(lockStr);
    }, 20000);
    try {
      return await callback();
    } finally {
      clearTimeout(timeoutId);
      this.unlock(lockStr);
    }
  }

  async lock(str: string) {
    const isLocked = this.isLocked(str);
    if (isLocked) {
      let count = 0;
      while (true) {
        await utils.sleep(100);
        if (!this.isLocked(str)) {
          break;
        }
        count++;
        if (count > 20) {
          throw new Error('Lock timeout');
        }
      }
    }
    this.locked[str] = true;
  }

  unlock(str: string) {
    delete this.locked[str];
  }

  isLocked(str: string) {
    return this.locked[str] ?? false;
  }
}

export const locker = new Locker();
