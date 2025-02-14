import { request } from "/src/api/service";
const apiPrefix = "/sys/suite/product";
export type PriceItem = {
  duration: number;
  price: number;
};

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

export async function DeleteBatch(ids: any[]) {
  return await request({
    url: apiPrefix + "/deleteByIds",
    method: "post",
    data: { ids }
  });
}

export async function SetDefault(id: any) {
  return await request({
    url: apiPrefix + "/setDefault",
    method: "post",
    data: { id }
  });
}

export async function SetDisabled(id: any, disabled: boolean) {
  return await request({
    url: apiPrefix + "/setDisabled",
    method: "post",
    data: { id, disabled }
  });
}
