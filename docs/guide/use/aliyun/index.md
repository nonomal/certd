# 阿里云相关


## 阿里云客户端请求超时配置

配置环境变量
```shell
ALIYUN_CLIENT_CONNECT_TIMEOUT=10000 # 连接超时，单位毫秒
ALIYUN_CLIENT_READ_TIMEOUT=10000 #读取数据超时，单位毫秒

```


## 阿里云Access权限设置


* 申请证书 ：`AliyunDNSFullAccess`
* 上传证书到阿里云： `AliyunYundunCertFullAccess`
* 部署证书到OSS: `AliyunYundunCertFullAccess`、`AliyunOSSFullAccess`
* 部署证书到CDN: `AliyunYundunCertFullAccess`、`AliyunCDNFullAccess`
* 部署证书到DCDN： `AliyunYundunCertFullAccess`、`AliyunDCDNFullAccess`