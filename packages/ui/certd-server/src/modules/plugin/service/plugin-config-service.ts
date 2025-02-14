import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { PluginService } from './plugin-service.js';

export type PluginConfig = {
  name: string;
  disabled: boolean;
  sysSetting: {
    input?: Record<string, any>;
  };
};

export type CommPluginConfig = {
  CertApply?: PluginConfig;
};

export type PluginFindReq = {
  id?: number;
  name?: string;
  type: string;
};
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class PluginConfigService {
  @Inject()
  pluginService: PluginService;

  async getCommPluginConfig() {
    const configs: CommPluginConfig = {};

    configs.CertApply = await this.getPluginConfig({
      name: 'CertApply',
      type: 'builtIn',
    });
    return configs;
  }

  async saveCommPluginConfig(config: CommPluginConfig) {
    await this.savePluginConfig('CertApply', config.CertApply);
  }

  async savePluginConfig(name: string, config: PluginConfig) {
    const sysSetting = config?.sysSetting;
    if (!sysSetting) {
      throw new Error(`${name}.sysSetting is required`);
    }
    const pluginEntity = await this.pluginService.getRepository().findOne({
      where: { name },
    });
    if (!pluginEntity) {
      await this.pluginService.add({
        name,
        sysSetting: JSON.stringify(sysSetting),
        type: 'builtIn',
        disabled: false,
      });
    } else {
      await this.pluginService.getRepository().update({ name }, { sysSetting: JSON.stringify(sysSetting) });
    }
  }

  async get(req: PluginFindReq) {
    if (!req.name && !req.id) {
      throw new Error('plugin s name or id is required');
    }
    return await this.pluginService.getRepository().findOne({
      where: {
        id: req.id,
        name: req.name,
        type: req.type,
      },
    });
  }

  async getPluginConfig(req: PluginFindReq) {
    const plugin = await this.get(req);
    let sysSetting: any = {};
    if (!plugin) {
      return {
        name: req.name,
        disabled: false,
        type: req.type,
        sysSetting,
      };
    }
    if (plugin && plugin.sysSetting) {
      sysSetting = JSON.parse(plugin.sysSetting);
    }
    return {
      name: plugin.name,
      disabled: plugin.disabled,
      sysSetting,
    };
  }
}
