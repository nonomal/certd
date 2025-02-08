# 部署到1Panel面板


## 一、安装1Panel

https://1panel.cn/docs/installation/online_installation/

## 二、部署certd


1. 打开`docker-compose.yaml`，整个内容复制下来    
   https://gitee.com/certd/certd/raw/v2/docker/run/docker-compose.yaml


2. 然后到 `1Panel->容器->编排->新建编排`
   输入名称，粘贴`docker-compose.yaml`原文内容
   ![](./images/1.png)

3. 点击确定，启动容器   
   ![](./images/2.png)

> 默认使用sqlite数据库，数据保存在`/data/certd`目录下，您可以手动备份该目录   
> certd还支持`mysql`和`postgresql`数据库，[点我了解如何切换其他数据库](../../database/)

3. 访问测试

http://ip:7001   
https://ip:7002   
默认账号密码      
admin/123456     
登录后请及时修改密码  

## 三、升级

1. 找到容器，点击更多->升级
   ![](./images/upgrade-1.png)

2. 选择强制拉取镜像，点击确认即可
![img.png](./images/upgrade-2.png)


## 四、数据备份

> 默认数据保存在`/data/certd`目录下，可以手动备份    
> 建议配置一条 [数据库备份流水线](../../use/backup/)，自动备份

## 五、备份恢复

将备份的`db.sqlite`及同目录下的其他文件一起覆盖到原来的位置，重启certd即可
