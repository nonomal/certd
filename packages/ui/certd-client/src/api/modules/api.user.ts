import { request, requestForMock } from "../service";
import { env } from "/@/utils/util.env";

export interface RegisterReq {
  username: string;
  password: string;
  confirmPassword: string;
}
/**
 * @description: Login interface parameters
 */
export interface LoginReq {
  username: string;
  password: string;
}

export interface SmsLoginReq {
  mobile: string;
  phoneCode: string;
  smsCode: string;
  randomStr: string;
}

export interface UserInfoRes {
  id: string | number;
  username: string;
  nickName: string;
  avatar: string;
  roleIds: number[];
  isWeak?: boolean;
}

export interface LoginRes {
  token: string;
  expire: number;
}

export async function register(user: RegisterReq): Promise<UserInfoRes> {
  return await request({
    url: "/register",
    method: "post",
    data: user
  });
}

export async function login(data: LoginReq): Promise<LoginRes> {
  if (env.PM_ENABLED === "false") {
    //没有开启权限模块，模拟登录
    return await requestForMock({
      url: "/login",
      method: "post",
      data
    });
  }
  //如果开启了登录与权限模块，则真实登录
  return await request({
    url: "/login",
    method: "post",
    data
  });
}

export async function loginBySms(data: SmsLoginReq): Promise<LoginRes> {
  //如果开启了登录与权限模块，则真实登录
  return await request({
    url: "/loginBySms",
    method: "post",
    data
  });
}

export async function mine(): Promise<UserInfoRes> {
  if (env.PM_ENABLED === "false") {
    //没有开启权限模块，模拟登录
    return await requestForMock({
      url: "/sys/authority/user/mine",
      method: "post"
    });
  }
  return await request({
    url: "/mine/info",
    method: "post"
  });
}
