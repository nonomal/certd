import Validator from "async-validator";
import { DomainsVerifyPlanInput } from "./type";

function checkDomainVerifyPlan(rule: any, value: DomainsVerifyPlanInput) {
  if (value == null) {
    return true;
  }
  for (const domain in value) {
    const type = value[domain].type;
    if (type === "cname") {
      const subDomains = Object.keys(value[domain].cnameVerifyPlan);
      if (subDomains.length > 0) {
        for (const subDomain of subDomains) {
          const plan = value[domain].cnameVerifyPlan[subDomain];
          if (plan.status !== "valid") {
            throw new Error(`域名${subDomain}的CNAME未验证通过，请先设置CNAME记录，点击验证按钮`);
          }
        }
      }
    } else if (type === "http") {
      const domains = value[domain].domains || [];
      for (const item of domains) {
        //如果有通配符域名则不允许使用http校验
        if (item.startsWith("*.")) {
          throw new Error(`域名${item}为通配符域名，不支持HTTP校验`);
        }
      }

      const subDomains = Object.keys(value[domain].httpVerifyPlan);
      if (subDomains.length > 0) {
        for (const subDomain of subDomains) {
          const plan = value[domain].httpVerifyPlan[subDomain];
          if (!plan.httpUploaderType) {
            throw new Error(`域名${subDomain}的上传方式必须填写`);
          }
          if (!plan.httpUploaderAccess) {
            throw new Error(`域名${subDomain}的上传授权信息必须填写`);
          }
          if (!plan.httpUploadRootDir) {
            throw new Error(`域名${subDomain}的网站根路径必须填写`);
          }
        }
      }
    } else if (type === "dns") {
      if (!value[domain].dnsProviderType || !value[domain].dnsProviderAccessId) {
        throw new Error(`DNS模式下，域名${domain}的DNS类型和授权信息必须填写`);
      }
    }
  }
  return true;
}
// 注册自定义验证器
Validator.register("checkDomainVerifyPlan", checkDomainVerifyPlan);
