import { Autoload, Init, Inject, Scope, ScopeEnum } from '@midwayjs/core';
import { CertInfoService } from '../monitor/index.js';
import { pipelineEmitter } from '@certd/pipeline';
import { CertReader, EVENT_CERT_APPLY_SUCCESS } from '@certd/plugin-cert';
import { PipelineEvent } from '@certd/pipeline/dist/service/emit.js';

@Autoload()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class AutoEPipelineEmitterRegister {
  @Inject()
  certInfoService: CertInfoService;

  @Init()
  async init() {
    await this.onCertApplySuccess();
  }
  async onCertApplySuccess() {
    pipelineEmitter.on(EVENT_CERT_APPLY_SUCCESS, async (event: PipelineEvent<CertReader>) => {
      await this.certInfoService.updateCertByPipelineId(event.pipeline.id, event.event);
    });
  }
}
