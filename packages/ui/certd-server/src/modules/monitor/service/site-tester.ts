import { logger, utils } from '@certd/basic';
import { merge } from 'lodash-es';
import https from 'https';
import { PeerCertificate } from 'tls';
export type SiteTestReq = {
  host: string; // 只用域名部分
  port?: number;
  method?: string;
  retryTimes?: number;
};

export type SiteTestRes = {
  certificate?: PeerCertificate;
};
export class SiteTester {
  async test(req: SiteTestReq): Promise<SiteTestRes> {
    logger.info('测试站点:', JSON.stringify(req));
    const maxRetryTimes = req.retryTimes ?? 3;
    let tryCount = 0;
    let result: SiteTestRes = {};
    while (true) {
      try {
        result = await this.doTestOnce(req);
        return result;
      } catch (e) {
        tryCount++;
        if (tryCount > maxRetryTimes) {
          logger.error(`测试站点出错，重试${maxRetryTimes}次。`, e.message);
          throw e;
        }
        //指数退避
        const time = 2 ** tryCount;
        logger.error(`测试站点出错，${time}s后重试`, e);
        await utils.sleep(time * 1000);
      }
    }
  }

  async doTestOnce(req: SiteTestReq): Promise<SiteTestRes> {
    const agent = new https.Agent({ keepAlive: false });

    const options: any = merge(
      {
        port: 443,
        method: 'GET',
        rejectUnauthorized: false,
      },
      req
    );
    options.agent = agent;
    // 创建 HTTPS 请求
    const requestPromise = new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        // 获取证书
        // @ts-ignore
        const certificate = res.socket.getPeerCertificate();
        // logger.info('证书信息', certificate);
        if (certificate.subject == null) {
          logger.warn('证书信息为空');
          resolve({
            certificate: null,
          });
        }
        resolve({
          certificate,
        });
        res.socket.end();
        // 关闭响应
        res.destroy();
      });

      req.on('error', e => {
        reject(e);
      });
      req.end();
    });

    return await requestPromise;
  }
}

export const siteTester = new SiteTester();
