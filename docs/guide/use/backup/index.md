# 数据库自动备份

## 一、手动备份
数据库文件根据不同的部署方式保存的位置不一样，您可以手动复制出来进行备份

* docker： 默认保存在`/data/certd/db.sqlite`
* 源码： 默认保存在 `./packages/ui/certd-server/data/db.sqlite`
* 宝塔： [手动数据备份位置](https://certd.docmirror.cn/guide/install/baota/#%E5%9B%9B%E3%80%81%E6%95%B0%E6%8D%AE%E5%A4%87%E4%BB%BD) 
* 1panel:  默认保存在`/data/certd/db.sqlite`


## 二、自动备份
通过配置数据库自动备份流水线实现数据备份

## 1. 创建自动备份流水线
![](./images/1.png)

## 2. 添加备份任务
![](./images/2.png)

## 3. 选择备份方法
![](./images/3.png)

## 4. 配置定时和失败通知
![](./images/4.png)


## 三、备份恢复

将备份的`db.sqlite`覆盖到原来的位置，重启certd即可