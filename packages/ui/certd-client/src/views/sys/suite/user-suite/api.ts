import { request } from "/src/api/service";

const apiPrefix = "/sys/suite/user-suite";
export const sysUserSuiteApi = {
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
  async ListAll() {
    return await request({
      url: apiPrefix + "/all",
      method: "post"
    });
  },

  async GetSimpleUserByIds(ids: number[]) {
    return await request({
      url: "/sys/authority/user/getSimpleUserByIds",
      method: "post",
      data: { ids }
    });
  },
  async PresentSuite(form: any) {
    return await request({
      url: apiPrefix + "/presentSuite",
      method: "post",
      data: form
    });
  }
};
