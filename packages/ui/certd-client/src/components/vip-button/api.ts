import { request } from "/src/api/service";

export async function doActive(form: any) {
  return await request({
    url: "/sys/plus/active",
    method: "post",
    data: form
  });
}

export async function getVipTrial() {
  return await request({
    url: "/sys/plus/getVipTrial",
    method: "post",
    data: {}
  });
}
