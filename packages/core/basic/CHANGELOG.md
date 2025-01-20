# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.30.1](https://github.com/certd/certd/compare/v1.30.0...v1.30.1) (2025-01-20)

**Note:** Version bump only for package @certd/basic

# [1.30.0](https://github.com/certd/certd/compare/v1.29.5...v1.30.0) (2025-01-19)

**Note:** Version bump only for package @certd/basic

## [1.29.5](https://github.com/certd/certd/compare/v1.29.4...v1.29.5) (2025-01-07)

**Note:** Version bump only for package @certd/basic

## [1.29.4](https://github.com/certd/certd/compare/v1.29.3...v1.29.4) (2025-01-06)

**Note:** Version bump only for package @certd/basic

## [1.29.3](https://github.com/certd/certd/compare/v1.29.2...v1.29.3) (2025-01-04)

**Note:** Version bump only for package @certd/basic

## [1.29.2](https://github.com/certd/certd/compare/v1.29.1...v1.29.2) (2024-12-25)

**Note:** Version bump only for package @certd/basic

## [1.29.1](https://github.com/certd/certd/compare/v1.29.0...v1.29.1) (2024-12-25)

### Bug Fixes

* 修复某处金额转换丢失精度的bug ([d2d6f12](https://github.com/certd/certd/commit/d2d6f12218cbe7bd55f4ae082b93084be85f0a7b))

# [1.29.0](https://github.com/certd/certd/compare/v1.28.4...v1.29.0) (2024-12-24)

### Features

* 用户套餐，用户支付功能 ([a019956](https://github.com/certd/certd/commit/a019956698acaf2c4beb620b5ad8c18918ead6a1))
* 支持微信支付 ([45d6347](https://github.com/certd/certd/commit/45d6347f5b6199493b11aabdd74177f6dca2cea4))

### Performance Improvements

* 站点证书监控通知发送，每天定时检查 ([bb4910f](https://github.com/certd/certd/commit/bb4910f4e57234e42b44505f4620ae7af66025c5))
* 支持plesk网站证书部署 ([eda45c1](https://github.com/certd/certd/commit/eda45c1528199648b3970505e87f492d398226cd))

## [1.28.4](https://github.com/certd/certd/compare/v1.28.3...v1.28.4) (2024-12-12)

**Note:** Version bump only for package @certd/basic

## [1.28.3](https://github.com/certd/certd/compare/v1.28.2...v1.28.3) (2024-12-12)

**Note:** Version bump only for package @certd/basic

## [1.28.2](https://github.com/certd/certd/compare/v1.28.1...v1.28.2) (2024-12-09)

**Note:** Version bump only for package @certd/basic

## [1.28.1](https://github.com/certd/certd/compare/v1.28.0...v1.28.1) (2024-12-08)

### Performance Improvements

* 通知选择器优化 ([2c0cbdd](https://github.com/certd/certd/commit/2c0cbdd29ecb74cc939b2ae7ee86b8d40f70ba31))

# [1.28.0](https://github.com/certd/certd/compare/v1.27.9...v1.28.0) (2024-11-30)

### Performance Improvements

* 优化证书申请成功通知发送方式 ([8002a56](https://github.com/certd/certd/commit/8002a56efc5998aa03db5711ae87f9eb4bc9e160))
* 支持短信验证码登录 ([387bcc5](https://github.com/certd/certd/commit/387bcc5fa418cdeea81a06da5e3f8cd6b43cd082))

## [1.27.9](https://github.com/certd/certd/compare/v1.27.8...v1.27.9) (2024-11-26)

**Note:** Version bump only for package @certd/basic

## [1.27.8](https://github.com/certd/certd/compare/v1.27.7...v1.27.8) (2024-11-25)

**Note:** Version bump only for package @certd/basic

## [1.27.7](https://github.com/certd/certd/compare/v1.27.6...v1.27.7) (2024-11-25)

**Note:** Version bump only for package @certd/basic

## [1.27.6](https://github.com/certd/certd/compare/v1.27.5...v1.27.6) (2024-11-19)

**Note:** Version bump only for package @certd/basic

## [1.27.5](https://github.com/certd/certd/compare/v1.27.4...v1.27.5) (2024-11-18)

### Performance Improvements

* 系统设置中的代理设置优化为可全局生效，环境变量中的https_proxy设置将无效 ([381a37f](https://github.com/certd/certd/commit/381a37fbaa6b61c887eda743897ae00afb825bdf))
* 新手导航在非编辑模式下不显示 ([18bfcc2](https://github.com/certd/certd/commit/18bfcc24ad0bde57bb04db8a4209861ec6b8ff1d))
* 优化腾讯云 cloudflare 重复解析记录时的返回值 ([90d1b68](https://github.com/certd/certd/commit/90d1b68bd6cf232fbe085234efe07d29b7690044))

## [1.27.4](https://github.com/certd/certd/compare/v1.27.3...v1.27.4) (2024-11-14)

**Note:** Version bump only for package @certd/basic

## [1.27.3](https://github.com/certd/certd/compare/v1.27.2...v1.27.3) (2024-11-13)

### Bug Fixes

* 修复ipv6未开启情况下，请求带有ipv6地址域名报ETIMEDOUT的bug ([a9a0967](https://github.com/certd/certd/commit/a9a0967a6f1d0bd27e69f3ec52c31d90d470bc23))

## [1.27.2](https://github.com/certd/certd/compare/v1.27.1...v1.27.2) (2024-11-08)

### Performance Improvements

* 支持公共cname服务 ([3c919ee](https://github.com/certd/certd/commit/3c919ee5d1aef5d26cf3620a7c49d920786bc941))

## [1.27.1](https://github.com/certd/certd/compare/v1.27.0...v1.27.1) (2024-11-04)

### Performance Improvements

* cname 域名映射记录可读性优化 ([b1117ed](https://github.com/certd/certd/commit/b1117ed54a3ef015752999324ff72b821ef5e4b9))

# [1.27.0](https://github.com/certd/certd/compare/v1.26.16...v1.27.0) (2024-10-31)

**Note:** Version bump only for package @certd/basic

## [1.26.16](https://github.com/certd/certd/compare/v1.26.15...v1.26.16) (2024-10-30)

### Performance Improvements

* 支持华为云cdn ([81a3fdb](https://github.com/certd/certd/commit/81a3fdbc29b71f380762008cc151493ec97458f9))

## [1.26.15](https://github.com/certd/certd/compare/v1.26.14...v1.26.15) (2024-10-28)

**Note:** Version bump only for package @certd/basic

## [1.26.14](https://github.com/certd/certd/compare/v1.26.13...v1.26.14) (2024-10-26)

### Bug Fixes

* 修复启动时自签证书无法保存的bug ([526c484](https://github.com/certd/certd/commit/526c48450bcd37b3ccded9b448f17de8140bdc6e))

## [1.26.13](https://github.com/certd/certd/compare/v1.26.12...v1.26.13) (2024-10-26)

**Note:** Version bump only for package @certd/basic

## [1.26.12](https://github.com/certd/certd/compare/v1.26.11...v1.26.12) (2024-10-25)

### Performance Improvements

* 新增部署到百度云CDN插件 ([f126f9f](https://github.com/certd/certd/commit/f126f9f932d37fa01fff1accc7bdd17d349f8db5))

## [1.26.11](https://github.com/certd/certd/compare/v1.26.10...v1.26.11) (2024-10-23)

### Bug Fixes

* 申请证书没有使用到系统设置的http代理的bug ([3db216f](https://github.com/certd/certd/commit/3db216f515ba404cb4330fdab452971b22a50f08))

## [1.26.10](https://github.com/certd/certd/compare/v1.26.9...v1.26.10) (2024-10-20)

**Note:** Version bump only for package @certd/basic

## [1.26.9](https://github.com/certd/certd/compare/v1.26.8...v1.26.9) (2024-10-19)

**Note:** Version bump only for package @certd/basic

## [1.26.8](https://github.com/certd/certd/compare/v1.26.7...v1.26.8) (2024-10-15)

**Note:** Version bump only for package @certd/basic

## [1.26.7](https://github.com/certd/certd/compare/v1.26.6...v1.26.7) (2024-10-14)

**Note:** Version bump only for package @certd/basic

## [1.26.6](https://github.com/certd/certd/compare/v1.26.5...v1.26.6) (2024-10-14)

**Note:** Version bump only for package @certd/basic

## [1.26.5](https://github.com/certd/certd/compare/v1.26.4...v1.26.5) (2024-10-14)

**Note:** Version bump only for package @certd/basic

## [1.26.4](https://github.com/certd/certd/compare/v1.26.3...v1.26.4) (2024-10-14)

### Performance Improvements

* 新增代理设置功能 ([273ab61](https://github.com/certd/certd/commit/273ab6139f5807f4d7fe865cc353b97f51b9a668))

## [1.26.3](https://github.com/certd/certd/compare/v1.26.2...v1.26.3) (2024-10-12)

**Note:** Version bump only for package @certd/basic

## [1.26.2](https://github.com/certd/certd/compare/v1.26.1...v1.26.2) (2024-10-11)

**Note:** Version bump only for package @certd/basic

## [1.26.1](https://github.com/certd/certd/compare/v1.26.0...v1.26.1) (2024-10-10)

**Note:** Version bump only for package @certd/basic

# [1.26.0](https://github.com/certd/certd/compare/v1.25.9...v1.26.0) (2024-10-10)

### Performance Improvements

* 检查cname是否正确配置 ([b5d8935](https://github.com/certd/certd/commit/b5d8935159374fbe7fc7d4c48ae0ed9396861bdd))
