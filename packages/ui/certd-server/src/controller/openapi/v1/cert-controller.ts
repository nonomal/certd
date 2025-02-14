import { ALL, Body, Controller, Get, Inject, Post, Provide, Query } from '@midwayjs/core';
import { CodeException, Constants, EncryptService } from '@certd/lib-server';
import { CertInfoService } from '../../../modules/monitor/service/cert-info-service.js';
import { CertInfo } from '@certd/plugin-cert';
import { OpenKey } from '../../../modules/open/service/open-key-service.js';
import { BaseOpenController } from '../base-open-controller.js';

export type CertGetReq = {
  domains?: string;
  certId: number;
};

/**
 */
@Provide()
@Controller('/api/v1/cert')
export class OpenCertController extends BaseOpenController {
  @Inject()
  certInfoService: CertInfoService;
  @Inject()
  encryptService: EncryptService;

  @Get('/get', { summary: Constants.per.open })
  @Post('/get', { summary: Constants.per.open })
  async get(@Body(ALL) bean: CertGetReq, @Query(ALL) query: CertGetReq) {
    const openKey: OpenKey = this.ctx.openKey;
    const userId = openKey.userId;
    if (!userId) {
      throw new CodeException(Constants.res.openKeyError);
    }

    const res: CertInfo = await this.certInfoService.getCertInfo({
      userId,
      domains: bean.domains || query.domains,
      certId: bean.certId || query.certId,
    });
    return this.ok(res);
  }
}
