# 连接windows主机

远程主机基于ssh协议，通过ssh连接远程主机，执行命令。

## windows开启OpenSSH Server
### 1. 安装OpenSSH Server    

* 下载安装包安装： https://github.com/PowerShell/Win32-OpenSSH/releases  OpenSSH-Win64-vxx.xx.x.msi

* 前往Microsoft官方文档查看如何开启openSSH，以及其他设置    
https://learn.microsoft.com/zh-cn/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui#install-openssh-for-windows

### 2. 启动OpenSSH Server服务
```
win+R  弹出运行对话框，输入 services.msc 打开服务管理器
找到 OpenSSH SSH Server 
启动ssh server服务，并且设置为自动启动
```

### 3. 测试ssh登录
使用你常用的ssh客户端，连接你的windows主机，进行测试 

```cmd
# 如何确定你用户名
C:\Users\xxxxx>
          ↑↑↑↑---------这个就是windows ssh的登录用户名
```

### 4. 切换默认shell终端
安装openssh后，默认终端是cmd，建议切换成powershell
```shell
# powershell中执行如下命令切换
# 设置默认shell为powershell 【推荐】
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force

# 恢复默认shell为cmd 【不推荐】
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\cmd.exe" -PropertyType String -Force

```