import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { BaseService, CodeException, CommonException, Constants, PageReq } from '@certd/lib-server';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CertInfoEntity } from '../entity/cert-info.js';
import { utils } from '@certd/basic';
import { CertInfo, CertReader } from '@certd/plugin-cert';

export type UploadCertReq = {
  id?: number;
  certReader: CertReader;
  fromType?: string;
};

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class CertInfoService extends BaseService<CertInfoEntity> {
  @InjectEntityModel(CertInfoEntity)
  repository: Repository<CertInfoEntity>;

  //@ts-ignore
  getRepository() {
    return this.repository;
  }

  async page(pageReq: PageReq<CertInfoEntity>) {
    return await super.page(pageReq);
  }

  async getUserDomainCount(userId: number) {
    if (!userId) {
      throw new Error('userId is required');
    }
    return await this.repository.sum('domainCount', {
      userId,
    });
  }

  async updateDomains(pipelineId: number, userId: number, domains: string[]) {
    const found = await this.repository.findOne({
      where: {
        pipelineId,
        userId,
      },
    });
    const bean = new CertInfoEntity();
    if (found) {
      //bean
      bean.id = found.id;
    } else {
      //create
      bean.pipelineId = pipelineId;
      bean.userId = userId;
      if (!domains || domains.length === 0) {
        return;
      }
    }

    if (!domains || domains.length === 0) {
      bean.domain = '';
      bean.domains = '';
      bean.domainCount = 0;
    } else {
      bean.domain = domains[0];
      bean.domains = domains.join(',');
      bean.domainCount = domains.length;
    }

    await this.addOrUpdate(bean);
  }

  async deleteByPipelineId(id: number) {
    if (!id) {
      return;
    }
    await this.repository.delete({
      pipelineId: id,
    });
  }

  async getCertInfo(params: { domains?: string; certId?: number; userId: number }) {
    const { domains, certId, userId } = params;
    if (certId) {
      return await this.getCertInfoById({ id: certId, userId });
    }
    return await this.getCertInfoByDomains({
      domains,
      userId,
    });
  }

  private async getCertInfoByDomains(params: { domains: string; userId: number }) {
    const { domains, userId } = params;
    if (!domains) {
      throw new CodeException(Constants.res.openCertNotFound);
    }
    const domainArr = domains.split(',');

    const list = await this.find({
      select: {
        id: true,
        domains: true,
      },
      where: {
        userId,
      },
    });
    //遍历查找
    const matched = list.find(item => {
      const itemDomains = item.domains.split(',');
      return utils.domain.match(domainArr, itemDomains);
    });
    if (!matched) {
      throw new CodeException(Constants.res.openCertNotFound);
    }

    return await this.getCertInfoById({ id: matched.id, userId: userId });
  }

  async getCertInfoById(req: { id: number; userId: number }) {
    const entity = await this.info(req.id);
    if (!entity || entity.userId !== req.userId) {
      throw new CodeException(Constants.res.openCertNotFound);
    }

    if (!entity.certInfo) {
      throw new CodeException(Constants.res.openCertNotReady);
    }
    const certInfo = JSON.parse(entity.certInfo) as CertInfo;
    const certReader = new CertReader(certInfo);
    return certReader.toCertInfo();
  }

  async updateCertByPipelineId(pipelineId: number, certReader: CertReader, fromType = 'pipeline') {
    const found = await this.repository.findOne({
      where: {
        pipelineId,
      },
    });
    const bean = await this.updateCert({
      id: found?.id,
      certReader,
      fromType,
    });
    return bean;
  }

  private async updateCert(req: UploadCertReq) {
    const bean = new CertInfoEntity();
    const { id, fromType, certReader } = req;
    if (id) {
      bean.id = id;
    } else {
      bean.fromType = fromType;
    }
    const certInfo = certReader.toCertInfo();
    bean.certInfo = JSON.stringify(certInfo);
    bean.applyTime = new Date().getTime();
    const domains = certReader.detail.domains.altNames;
    bean.domains = domains.join(',');
    bean.domain = domains[0];
    bean.domainCount = domains.length;
    bean.expiresTime = certReader.expires;
    bean.certProvider = certReader.detail.issuer.commonName;

    await this.addOrUpdate(bean);
    return bean;
  }

  async upload(body: { id?: number; cert: CertInfo }) {
    const { id, cert } = body;
    if (!cert) {
      throw new CommonException("cert can't be empty");
    }
    const res = await this.updateCert({
      id,
      certReader: new CertReader(cert),
      fromType: 'upload',
    });
    return res.id;
  }
}
