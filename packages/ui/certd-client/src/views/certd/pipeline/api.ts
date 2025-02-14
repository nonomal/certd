import { request } from "/src/api/service";

const apiPrefix = "/pi/pipeline";
const historyApiPrefix = "/pi/history";
const certApiPrefix = "/pi/cert";

export async function GetList(query: any) {
  return await request({
    url: apiPrefix + "/page",
    method: "post",
    data: query
  });
}

export async function AddObj(obj: any) {
  return await request({
    url: apiPrefix + "/add",
    method: "post",
    data: obj
  });
}

export async function UpdateObj(obj: any) {
  return await request({
    url: apiPrefix + "/update",
    method: "post",
    data: obj
  });
}

export async function DelObj(id: any) {
  return await request({
    url: apiPrefix + "/delete",
    method: "post",
    params: { id }
  });
}

export async function GetObj(id: any) {
  return await request({
    url: apiPrefix + "/info",
    method: "post",
    params: { id }
  });
}

export async function GetDetail(id: any) {
  return await request({
    url: apiPrefix + "/detail",
    method: "post",
    params: { id }
  });
}

export async function Save(pipelineEntity: any) {
  return await request({
    url: apiPrefix + "/save",
    method: "post",
    data: pipelineEntity
  });
}

export async function Trigger(id: any, stepId?: string) {
  return await request({
    url: apiPrefix + "/trigger",
    method: "post",
    params: { id, stepId }
  });
}

export async function Cancel(historyId: any) {
  return await request({
    url: apiPrefix + "/cancel",
    method: "post",
    params: { historyId }
  });
}

export async function BatchUpdateGroup(pipelineIds: number[], groupId: number): Promise<CertInfo> {
  return await request({
    url: apiPrefix + "/batchUpdateGroup",
    method: "post",
    data: { ids: pipelineIds, groupId }
  });
}

export async function BatchDelete(pipelineIds: number[]): Promise<CertInfo> {
  return await request({
    url: apiPrefix + "/batchDelete",
    method: "post",
    data: { ids: pipelineIds }
  });
}

export async function GetFiles(pipelineId: number) {
  return await request({
    url: historyApiPrefix + "/files",
    method: "post",
    params: { pipelineId }
  });
}

export async function GetCount() {
  return await request({
    url: apiPrefix + "/count",
    method: "post"
  });
}

export type CertInfo = {
  crt: string;
  key: string;
  ic: string;
  der: string;
  pfx: string;
};

export async function GetCert(pipelineId: number): Promise<CertInfo> {
  return await request({
    url: certApiPrefix + "/get",
    method: "post",
    params: { id: pipelineId }
  });
}
