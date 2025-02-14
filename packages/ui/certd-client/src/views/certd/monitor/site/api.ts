import { request } from "/src/api/service";

const apiPrefix = "/monitor/site";

export const siteInfoApi = {
  async GetList(query: any) {
    return await request({
      url: apiPrefix + "/page",
      method: "post",
      data: query
    });
  },

  async AddObj(obj: any) {
    return await request({
      url: apiPrefix + "/add",
      method: "post",
      data: obj
    });
  },

  async UpdateObj(obj: any) {
    return await request({
      url: apiPrefix + "/update",
      method: "post",
      data: obj
    });
  },

  async DelObj(id: number) {
    return await request({
      url: apiPrefix + "/delete",
      method: "post",
      params: { id }
    });
  },

  async GetObj(id: number) {
    return await request({
      url: apiPrefix + "/info",
      method: "post",
      params: { id }
    });
  },
  async DoCheck(id: number) {
    return await request({
      url: apiPrefix + "/check",
      method: "post",
      data: { id }
    });
  },
  async CheckAll() {
    return await request({
      url: apiPrefix + "/checkAll",
      method: "post"
    });
  }
};
