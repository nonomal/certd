# 自定义脚本插件

## 1. 介绍

自定义脚本插件是一个通用的插件，可以通过编写脚本来实现各种功能，例如：调用第三方API、执行系统命令、发送邮件等。

## 2. 使用示例
```js
const certPem = ctx.self.cert.crt
const certKey = ctx.self.cert.key

//axios发起http请求上传证书
const res = await ctx.http.request({
  url:"your_cert_deploy_url",
  method:"post",
  data:{
    crt : certPem,
    key : certKey
  }
})
if(!res || res.code !== 0){
    //抛异常才能让任务失败
    throw new Error("上传失败")
}
//不能用console.log，需要用ctx.logger 才能把日志打印在ui上
ctx.logger.info("上传成功",res.data)


```
## 3. API
下面是`ctx`对象的`typescript`类型定义

```ts

type ctx = {
  CertReader: typeof CertReader;
  self: CustomScriptPlugin;
  //流水线定义
  pipeline: Pipeline;
  //步骤定义
  step: Step;
  //日志
  logger: Logger;
  //当前步骤输入参数跟上一次执行比较是否有变化
  inputChanged: boolean;
  //授权获取服务 
  accessService: IAccessService;
  //邮件服务
  emailService: IEmailService;
  //cname记录服务
  cnameProxyService: ICnameProxyService;
  //插件配置服务
  pluginConfigService: IPluginConfigService;
  //流水线上下文
  pipelineContext: IContext;
  //用户上下文
  userContext: IContext;
  //http请求客户端 
  http: HttpClient; // http.request(AxiosConfig)
  //文件存储
  fileStore: FileStore;
  //上一次执行结果状态
  lastStatus?: Runnable;
  //用户取消信号
  signal: AbortSignal;
  //工具类
  utils: typeof utils;
  //用户信息
  user: UserInfo;
}

type CertInfo = {
  crt:string; //fullchain证书，即 cert.pem， cert.crt
  key:string; // 私钥
  ic: string; //中间证书
  pfx: string;//PFX证书，base64编码
  der: string;//DER证书，base64编码
}

type CustomScriptPlugin = {
  //可以获取证书
  cert: CertInfo
}

```

