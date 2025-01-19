import { request } from "/src/api/service";

const apiPrefix = "/payment";
export async function Notify(type: string, query: any) {
  return await request({
    url: apiPrefix + `/notify/${type}`,
    method: "post",
    data: query,
    unpack: false
  });
}
