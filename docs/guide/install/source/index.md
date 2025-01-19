# 源码部署
不推荐
## 一、源码安装

### 环境要求
- nodejs 20 及以上
### 源码启动
```shell
# 克隆代码
git clone https://github.com/certd/certd
# git checkout v1.x.x  # 当v2主干分支代码无法正常启动时，可以尝试此命令，1.x.x换成最新版本号
cd certd
# 启动服务
./start.sh  

```
>如果是windows，请先安装`git for windows` ，然后右键，选择`open git bash here`打开终端，再执行`./start.sh`命令

> 数据默认保存在 `./packages/ui/certd-server/data` 目录下，注意数据备份

### 访问测试

http://your_server_ip:7001  
https://your_server_ip:7002   
默认账号密码：admin/123456    
记得修改密码


## 二、升级

```shell

cd certd
# 确保数据安全，备份一下数据
cp -rf ./packages/ui/certd-server/data ../certd-data-backup

git pull
# 如果提示pull失败，可以尝试强制更新
# git checkout v2 -f && git pull 

# 先停止旧的服务,7001是certd的默认端口
kill -9 $(lsof -t -i:7001)
# 重新编译启动
./start.sh
```

## 三、数据备份
> 数据默认保存在 `./packages/ui/certd-server/data` 目录下    
> 建议配置一条[数据库备份流水线](../../use/backup/)  自动备份


## 四、备份恢复

将备份的`db.sqlite`及同目录下的其他文件覆盖到原来的位置，重启certd即可
