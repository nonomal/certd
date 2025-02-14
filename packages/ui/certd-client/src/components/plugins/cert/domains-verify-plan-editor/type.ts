import { CnameRecord } from "@certd/pipeline";

export type HttpRecord = {
  domain: string;
  httpUploaderType: string;
  httpUploaderAccess: number;
  httpUploadRootDir: string;
};

export type DomainVerifyPlanInput = {
  domain: string;
  domains: string[];
  type: "cname" | "dns" | "http";
  dnsProviderType?: string;
  dnsProviderAccessId?: number;
  cnameVerifyPlan?: Record<string, CnameRecord>;
  httpVerifyPlan?: Record<string, HttpRecord>;
};
export type DomainsVerifyPlanInput = {
  [key: string]: DomainVerifyPlanInput;
};
