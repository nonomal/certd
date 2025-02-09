# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.30.2](https://github.com/certd/certd/compare/v1.30.1...v1.30.2) (2025-02-09)

**Note:** Version bump only for package @certd/pipeline

## [1.30.1](https://github.com/certd/certd/compare/v1.30.0...v1.30.1) (2025-01-20)

### Bug Fixes

* 修复tg消息内容中存在.和*就会发送失败的bug ([ae5dfc3](https://github.com/certd/certd/commit/ae5dfc3bee950267123ae2fbd1c11e7ce36626ea))

# [1.30.0](https://github.com/certd/certd/compare/v1.29.5...v1.30.0) (2025-01-19)

### Performance Improvements

* 证书仓库 ([91e7f45](https://github.com/certd/certd/commit/91e7f45a1c5ea1e0ec0aa3236b80028f03a6d0aa))

## [1.29.5](https://github.com/certd/certd/compare/v1.29.4...v1.29.5) (2025-01-07)

**Note:** Version bump only for package @certd/pipeline

## [1.29.4](https://github.com/certd/certd/compare/v1.29.3...v1.29.4) (2025-01-06)

**Note:** Version bump only for package @certd/pipeline

## [1.29.3](https://github.com/certd/certd/compare/v1.29.2...v1.29.3) (2025-01-04)

### Performance Improvements

* 支持http校验方式申请证书 ([405591c](https://github.com/certd/certd/commit/405591c5d08fa1a3b228ee3980199e7731cfec4a))

## [1.29.2](https://github.com/certd/certd/compare/v1.29.1...v1.29.2) (2024-12-25)

**Note:** Version bump only for package @certd/pipeline

## [1.29.1](https://github.com/certd/certd/compare/v1.29.0...v1.29.1) (2024-12-25)

### Performance Improvements

* 用户创建证书流水线没有购买套餐或者超限时提前报错 ([472f06c](https://github.com/certd/certd/commit/472f06c2d190d0ae48e8b53c18bc278437656a1c))

# [1.29.0](https://github.com/certd/certd/compare/v1.28.4...v1.29.0) (2024-12-24)

### Features

* 套餐购买支持易支付、支付宝支付 ([faa28f8](https://github.com/certd/certd/commit/faa28f88f954cba4c1dd29125562e5acd2fd99af))
* 支持微信支付 ([45d6347](https://github.com/certd/certd/commit/45d6347f5b6199493b11aabdd74177f6dca2cea4))

### Performance Improvements

* 同一时间只允许一个套餐生效 ([8ebf95a](https://github.com/certd/certd/commit/8ebf95a222a900d1707716c7b1f3b39f8a6d8f94))
* 优化证书申请跳过的状态显示，成功通知现在在跳过时不会发送 ([67d762b](https://github.com/certd/certd/commit/67d762b6a520f1fa24719a124e5ae975a81f5f82))
* 支持plesk网站证书部署 ([eda45c1](https://github.com/certd/certd/commit/eda45c1528199648b3970505e87f492d398226cd))

## [1.28.4](https://github.com/certd/certd/compare/v1.28.3...v1.28.4) (2024-12-12)

### Bug Fixes

* 修复证书成功通知发送失败的bug ([0f5c690](https://github.com/certd/certd/commit/0f5c69040ba77340c909813220a26bc7ddada3ea))

## [1.28.3](https://github.com/certd/certd/compare/v1.28.2...v1.28.3) (2024-12-12)

### Performance Improvements

* 通知标题优化 ([ff083ce](https://github.com/certd/certd/commit/ff083ce6848a8bee3c8248e4b881086ae1517c28))
* 支持aws cloudfront ([0ae39f1](https://github.com/certd/certd/commit/0ae39f160a7c6b6696b3bf513d68aa28905810ad))

## [1.28.2](https://github.com/certd/certd/compare/v1.28.1...v1.28.2) (2024-12-09)

**Note:** Version bump only for package @certd/pipeline

## [1.28.1](https://github.com/certd/certd/compare/v1.28.0...v1.28.1) (2024-12-08)

### Performance Improvements

* 通知选择器优化 ([2c0cbdd](https://github.com/certd/certd/commit/2c0cbdd29ecb74cc939b2ae7ee86b8d40f70ba31))
* 新增七牛云插件分组 ([49e7dc5](https://github.com/certd/certd/commit/49e7dc56e1a95fbdea3e30cdeb945b48415b69e3))

# [1.28.0](https://github.com/certd/certd/compare/v1.27.9...v1.28.0) (2024-11-30)

### Features

* 手机号登录、邮箱验证码注册 ([7b55337](https://github.com/certd/certd/commit/7b55337c5edb470cca7aa62201eda8d274784004))

### Performance Improvements

* 首页新增修改密码提示 ([0772d3b](https://github.com/certd/certd/commit/0772d3b3fd24afdde4086d9f09ef19d037b431b4))
* 选项显示图标 ([aedc462](https://github.com/certd/certd/commit/aedc46213571a3bd93809b7af7fa17a08d546237))
* 优化证书申请成功通知发送方式 ([8002a56](https://github.com/certd/certd/commit/8002a56efc5998aa03db5711ae87f9eb4bc9e160))
* 支持短信验证码登录 ([387bcc5](https://github.com/certd/certd/commit/387bcc5fa418cdeea81a06da5e3f8cd6b43cd082))

## [1.27.9](https://github.com/certd/certd/compare/v1.27.8...v1.27.9) (2024-11-26)

### Performance Improvements

* 通知支持自定义webhook、anpush、iyuu、server酱 ([cbccd9e](https://github.com/certd/certd/commit/cbccd9e3d0a4c24aba772af62734666d40b22c57))
* 通知支持vocechat、bark、telegram、discord、slack ([642f57f](https://github.com/certd/certd/commit/642f57ff6d7152a9e14f59c7fc0e32a6b1751fb7))

## [1.27.8](https://github.com/certd/certd/compare/v1.27.7...v1.27.8) (2024-11-25)

**Note:** Version bump only for package @certd/pipeline

## [1.27.7](https://github.com/certd/certd/compare/v1.27.6...v1.27.7) (2024-11-25)

### Performance Improvements

* 通知管理 ([d9a00ee](https://github.com/certd/certd/commit/d9a00eeaf72735ced67c59d7983d84e3c730064a))
* 通知渠道支持测试按钮 ([b54ae27](https://github.com/certd/certd/commit/b54ae272ebc2d31b32b049d44e2299a6be7f153c))
* 优化插件开发，dnsProvider无需写http logger 变量 ([fcbb5e4](https://github.com/certd/certd/commit/fcbb5e46a112174150a62648319b8224fce3b7ed))
* 支持企业微信群聊机器人通知 ([b805a29](https://github.com/certd/certd/commit/b805a2925984144a31575b8aaa622f0c30d41b56))

## [1.27.6](https://github.com/certd/certd/compare/v1.27.5...v1.27.6) (2024-11-19)

**Note:** Version bump only for package @certd/pipeline

## [1.27.5](https://github.com/certd/certd/compare/v1.27.4...v1.27.5) (2024-11-18)

### Performance Improvements

* 新手导航在非编辑模式下不显示 ([18bfcc2](https://github.com/certd/certd/commit/18bfcc24ad0bde57bb04db8a4209861ec6b8ff1d))

## [1.27.4](https://github.com/certd/certd/compare/v1.27.3...v1.27.4) (2024-11-14)

**Note:** Version bump only for package @certd/pipeline

## [1.27.3](https://github.com/certd/certd/compare/v1.27.2...v1.27.3) (2024-11-13)

**Note:** Version bump only for package @certd/pipeline

## [1.27.2](https://github.com/certd/certd/compare/v1.27.1...v1.27.2) (2024-11-08)

### Performance Improvements

* 支持公共cname服务 ([3c919ee](https://github.com/certd/certd/commit/3c919ee5d1aef5d26cf3620a7c49d920786bc941))

## [1.27.1](https://github.com/certd/certd/compare/v1.27.0...v1.27.1) (2024-11-04)

### Performance Improvements

* 优化时间选择器，自动填写分钟和秒钟 ([396dc34](https://github.com/certd/certd/commit/396dc34a841c7d016b033736afdba8366fb2d211))

# [1.27.0](https://github.com/certd/certd/compare/v1.26.16...v1.27.0) (2024-10-31)

**Note:** Version bump only for package @certd/pipeline

## [1.26.16](https://github.com/certd/certd/compare/v1.26.15...v1.26.16) (2024-10-30)

### Performance Improvements

* 支持白山云cdn部署 ([b1b2cd0](https://github.com/certd/certd/commit/b1b2cd088b684eda764962abd61754c26a204d1c))

## [1.26.15](https://github.com/certd/certd/compare/v1.26.14...v1.26.15) (2024-10-28)

### Performance Improvements

* 默认证书更新时间设置为35天，增加腾讯云删除过期证书插件，可以避免腾讯云过期证书邮件 ([51b6fed](https://github.com/certd/certd/commit/51b6fed468eaa6f28ce4497ce303ace1a52abb96))

## [1.26.14](https://github.com/certd/certd/compare/v1.26.13...v1.26.14) (2024-10-26)

**Note:** Version bump only for package @certd/pipeline

## [1.26.13](https://github.com/certd/certd/compare/v1.26.12...v1.26.13) (2024-10-26)

**Note:** Version bump only for package @certd/pipeline

## [1.26.12](https://github.com/certd/certd/compare/v1.26.11...v1.26.12) (2024-10-25)

**Note:** Version bump only for package @certd/pipeline

## [1.26.11](https://github.com/certd/certd/compare/v1.26.10...v1.26.11) (2024-10-23)

### Performance Improvements

* 申请证书启用新的反代地址 ([a705182](https://github.com/certd/certd/commit/a705182b85e51157883e48f23463263793bf3c12))

## [1.26.10](https://github.com/certd/certd/compare/v1.26.9...v1.26.10) (2024-10-20)

### Bug Fixes

* 修复cname服务普通用户access访问权限问题 ([c1e3e2e](https://github.com/certd/certd/commit/c1e3e2ee1f923ee5806479dd5f178c3286a01ae0))

## [1.26.9](https://github.com/certd/certd/compare/v1.26.8...v1.26.9) (2024-10-19)

### Performance Improvements

* 触发证书重新申请input变化对比规则优化，减少升级版本后触发申请证书的情况 ([c46a2a9](https://github.com/certd/certd/commit/c46a2a9a399c2a9a8bb59a48b9fb6e93227cce9b))
* 任务下所有步骤都跳过时，整个任务显示跳过 ([84fd3b2](https://github.com/certd/certd/commit/84fd3b250dd1161ea06c5582fdadece4b29c2e53))

## [1.26.8](https://github.com/certd/certd/compare/v1.26.7...v1.26.8) (2024-10-15)

### Performance Improvements

* 密钥备份 ([1c6028a](https://github.com/certd/certd/commit/1c6028abcf8849163462bb2f8441b6838357e09b))
* 证书直接查看 ([5dde5bd](https://github.com/certd/certd/commit/5dde5bd3f76db3959d411619d29bfb8064e3b307))

## [1.26.7](https://github.com/certd/certd/compare/v1.26.6...v1.26.7) (2024-10-14)

**Note:** Version bump only for package @certd/pipeline

## [1.26.6](https://github.com/certd/certd/compare/v1.26.5...v1.26.6) (2024-10-14)

**Note:** Version bump only for package @certd/pipeline

## [1.26.5](https://github.com/certd/certd/compare/v1.26.4...v1.26.5) (2024-10-14)

**Note:** Version bump only for package @certd/pipeline

## [1.26.4](https://github.com/certd/certd/compare/v1.26.3...v1.26.4) (2024-10-14)

### Performance Improvements

* [comm] 支持插件管理 ([e8b617b](https://github.com/certd/certd/commit/e8b617b80ce882dd63006f0cfc719a80a1cc6acc))
* EAB授权支持绑定邮箱，支持公共EAB设置 ([07043af](https://github.com/certd/certd/commit/07043aff0ca7fd29c56dd3c363002cb15d78b464))

## [1.26.3](https://github.com/certd/certd/compare/v1.26.2...v1.26.3) (2024-10-12)

**Note:** Version bump only for package @certd/pipeline

## [1.26.2](https://github.com/certd/certd/compare/v1.26.1...v1.26.2) (2024-10-11)

**Note:** Version bump only for package @certd/pipeline

## [1.26.1](https://github.com/certd/certd/compare/v1.26.0...v1.26.1) (2024-10-10)

**Note:** Version bump only for package @certd/pipeline

# [1.26.0](https://github.com/certd/certd/compare/v1.25.9...v1.26.0) (2024-10-10)

### Bug Fixes

* 修复某些代理情况下 报 400 The plain HTTP request was sent to HTTPS port use proxy 的bug ([a13203f](https://github.com/certd/certd/commit/a13203fb3f48c427d0d81a504912248dcc07df1a))

### Features

* 域名验证方法支持CNAME间接方式，此方式支持所有域名注册商，且无需提供Access授权，但是需要手动添加cname解析 ([f3d3508](https://github.com/certd/certd/commit/f3d35084ed44f9f33845f7045e520be5c27eed93))
* 站点个性化设置 ([11a9fe9](https://github.com/certd/certd/commit/11a9fe9014d96cba929e5a066e78f2af7ae59d14))

### Performance Improvements

* 调整全部静态资源到static目录 ([a218890](https://github.com/certd/certd/commit/a21889080d6c7ffdf0af526a3a21f0b2d1c77288))
* 检查cname是否正确配置 ([b5d8935](https://github.com/certd/certd/commit/b5d8935159374fbe7fc7d4c48ae0ed9396861bdd))
* cname校验配置增加未校验通过提示 ([77cc3c4](https://github.com/certd/certd/commit/77cc3c4a5cbd81f8233a8e0bb33fab0621c0905f))

## [1.25.9](https://github.com/certd/certd/compare/v1.25.8...v1.25.9) (2024-10-01)

**Note:** Version bump only for package @certd/pipeline

## [1.25.8](https://github.com/certd/certd/compare/v1.25.7...v1.25.8) (2024-09-30)

**Note:** Version bump only for package @certd/pipeline

## [1.25.7](https://github.com/certd/certd/compare/v1.25.6...v1.25.7) (2024-09-29)

### Bug Fixes

* 修复某些地区被屏蔽无法激活专业版的bug ([7532a96](https://github.com/certd/certd/commit/7532a960851b84d4f2cc3dba02353c5235e1a364))

## [1.25.6](https://github.com/certd/certd/compare/v1.25.5...v1.25.6) (2024-09-29)

### Performance Improvements

* 部署支持1Panel ([d047234](https://github.com/certd/certd/commit/d047234d98d31504f2e5a472b66e1b75806af26e))

## [1.25.5](https://github.com/certd/certd/compare/v1.25.4...v1.25.5) (2024-09-26)

**Note:** Version bump only for package @certd/pipeline

## [1.25.4](https://github.com/certd/certd/compare/v1.25.3...v1.25.4) (2024-09-25)

**Note:** Version bump only for package @certd/pipeline

## [1.25.3](https://github.com/certd/certd/compare/v1.25.2...v1.25.3) (2024-09-24)

**Note:** Version bump only for package @certd/pipeline

## [1.25.2](https://github.com/certd/certd/compare/v1.25.1...v1.25.2) (2024-09-24)

**Note:** Version bump only for package @certd/pipeline

## [1.25.1](https://github.com/certd/certd/compare/v1.25.0...v1.25.1) (2024-09-24)

**Note:** Version bump only for package @certd/pipeline

# [1.25.0](https://github.com/certd/certd/compare/v1.24.4...v1.25.0) (2024-09-24)

### Bug Fixes

* 修复首次创建任务运行时不自动设置当前运行情况的bug ([ecd83ee](https://github.com/certd/certd/commit/ecd83ee136abdd3df9ed2f21ec2ff0f24c0ed9d9))

### Performance Improvements

* 群晖支持OTP双重验证登录 ([8b8039f](https://github.com/certd/certd/commit/8b8039f42bbce10a4d0e737cdeeeef9bb17bee5a))
* 任务支持禁用 ([8ed16b3](https://github.com/certd/certd/commit/8ed16b3ea2dfe847357863a0bfa614e4fa5fc041))
* 支持阿里云ACK证书部署 ([d331fea](https://github.com/certd/certd/commit/d331fea47789122650e057ec7c9e85ee8e66f09b))
* 支持七牛云 ([8ecc2f9](https://github.com/certd/certd/commit/8ecc2f9446a9ebd11b9bfbffbb6cf7812a043495))
* 支持k8s ingress secret ([e5a5d0a](https://github.com/certd/certd/commit/e5a5d0a607bb6b4e1a1f7a1a419bada5f2dee59f))
* http请求增加默认超时时间 ([664bd86](https://github.com/certd/certd/commit/664bd863e5b4895aabe2384277c0c65f5902fdb2))
* plugins增加图标 ([a8da658](https://github.com/certd/certd/commit/a8da658a9723342b4f43a579f7805bfef0648efb))

## [1.24.4](https://github.com/certd/certd/compare/v1.24.3...v1.24.4) (2024-09-09)

### Performance Improvements

* 前置任务步骤增加错误提示 ([ae3daa9](https://github.com/certd/certd/commit/ae3daa9bcf4fc363825aad9b77f5d3879aeeff70))
* 群晖部署教程 ([0f0af2f](https://github.com/certd/certd/commit/0f0af2f309390f388e7a272cea3a1dd30c01977d))
* 支持群晖 ([5c270b6](https://github.com/certd/certd/commit/5c270b6b9d45a2152f9fdb3c07bd98b7c803cb8e))

## [1.24.3](https://github.com/certd/certd/compare/v1.24.2...v1.24.3) (2024-09-06)

### Performance Improvements

* 支持多吉云cdn证书部署 ([65ef685](https://github.com/certd/certd/commit/65ef6857296784ca765926e09eafcb6fc8b6ecde))

## [1.24.2](https://github.com/certd/certd/compare/v1.24.1...v1.24.2) (2024-09-06)

### Performance Improvements

* 优化跳过处理逻辑 ([b80210f](https://github.com/certd/certd/commit/b80210f24bf5db1c958d06ab27c9e5d3db452eda))
* 支持pfx、der ([fbeaed2](https://github.com/certd/certd/commit/fbeaed203519f59b6d9396c4e8953353ccb5e723))

## [1.24.1](https://github.com/certd/certd/compare/v1.24.0...v1.24.1) (2024-09-02)

### Performance Improvements

* 部署插件支持宝塔、易盾云等 ([ee61709](https://github.com/certd/certd/commit/ee617095efa1171548cf52fd45f0f98a368555a3))
* 授权配置支持加密 ([42a56b5](https://github.com/certd/certd/commit/42a56b581d754c3e5f9838179d19ab0d004ef2eb))
* 支持阿里云 DCDN ([98b77f8](https://github.com/certd/certd/commit/98b77f80843834616fb26f83b4c42245326abd06))
* 支持已跳过的步骤重新运行 ([ea775ad](https://github.com/certd/certd/commit/ea775adae18d57a04470cfba6b9460d761d74035))

# [1.24.0](https://github.com/certd/certd/compare/v1.23.1...v1.24.0) (2024-08-25)

### Bug Fixes

* 修复成功后跳过之后丢失腾讯云证书id的bug ([37eb762](https://github.com/certd/certd/commit/37eb762afe25c5896b75dee25f32809f8426e7b7))
* 修复执行日志没有清理的bug ([22a3363](https://github.com/certd/certd/commit/22a336370a88a7df2a23c967043bae153da71ed5))

### Features

* 支持google证书申请（需要使用代理） ([a593056](https://github.com/certd/certd/commit/a593056e79e99dd6a74f75b5eab621af7248cfbe))

### Performance Improvements

* 优化成功后跳过的提示 ([7b451bb](https://github.com/certd/certd/commit/7b451bbf6e6337507f4627b5a845f5bd96ab4f7b))
* 优化证书申请成功率 ([968c469](https://github.com/certd/certd/commit/968c4690a07f69c08dcb3d3a494da4e319627345))
* email proxy ([453f1ba](https://github.com/certd/certd/commit/453f1baa0b9eb0f648aa1b71ccf5a95b202ce13f))

## [1.23.1](https://github.com/certd/certd/compare/v1.23.0...v1.23.1) (2024-08-06)

**Note:** Version bump only for package @certd/pipeline

## [1.22.8](https://github.com/certd/certd/compare/v1.22.7...v1.22.8) (2024-08-05)

### Performance Improvements

* 优化pipeline删除时，删除其他history ([b425203](https://github.com/certd/certd/commit/b4252033d56a9ad950f3e204ff021497c3978015))

## [1.22.7](https://github.com/certd/certd/compare/v1.22.6...v1.22.7) (2024-08-04)

**Note:** Version bump only for package @certd/pipeline

## [1.22.6](https://github.com/certd/certd/compare/v1.22.5...v1.22.6) (2024-08-03)

### Bug Fixes

* 修复在相同的cron时偶尔无法触发定时任务的bug ([680941a](https://github.com/certd/certd/commit/680941af119619006b592e3ab6fb112cb5556a8b))

### Performance Improvements

* 流水线支持名称模糊查询 ([59897c4](https://github.com/certd/certd/commit/59897c4ceae992ebe2972ca9e8f9196616ffdfd7))
* 优化前置任务输出为空的提示 ([6ed1e18](https://github.com/certd/certd/commit/6ed1e18c7d9c46d964ecc6abc90f3908297b7632))

## [1.22.5](https://github.com/certd/certd/compare/v1.22.4...v1.22.5) (2024-07-26)

**Note:** Version bump only for package @certd/pipeline

## [1.22.3](https://github.com/certd/certd/compare/v1.22.2...v1.22.3) (2024-07-25)

**Note:** Version bump only for package @certd/pipeline

## [1.22.2](https://github.com/certd/certd/compare/v1.22.1...v1.22.2) (2024-07-23)

**Note:** Version bump only for package @certd/pipeline

## [1.22.1](https://github.com/certd/certd/compare/v1.22.0...v1.22.1) (2024-07-20)

### Performance Improvements

* 创建证书任务可以选择lege插件 ([affef13](https://github.com/certd/certd/commit/affef130378030c517250c58a4e787b0fc85d7d1))

# [1.22.0](https://github.com/certd/certd/compare/v1.21.2...v1.22.0) (2024-07-19)

### Features

* 升级midway，支持esm ([485e603](https://github.com/certd/certd/commit/485e603b5165c28bc08694997726eaf2a585ebe7))
* 支持lego，海量DNS提供商 ([0bc6d0a](https://github.com/certd/certd/commit/0bc6d0a211920fb0084d705e1db67ee1e7262c44))
* 支持postgresql ([3b19bfb](https://github.com/certd/certd/commit/3b19bfb4291e89064b3b407a80dae092d54747d5))

## [1.21.2](https://github.com/certd/certd/compare/v1.21.1...v1.21.2) (2024-07-08)

**Note:** Version bump only for package @certd/pipeline

## [1.21.1](https://github.com/certd/certd/compare/v1.21.0...v1.21.1) (2024-07-08)

**Note:** Version bump only for package @certd/pipeline

# [1.21.0](https://github.com/certd/certd/compare/v1.20.17...v1.21.0) (2024-07-03)

**Note:** Version bump only for package @certd/pipeline

## [1.20.17](https://github.com/certd/certd/compare/v1.20.16...v1.20.17) (2024-07-03)

**Note:** Version bump only for package @certd/pipeline

## [1.20.16](https://github.com/certd/certd/compare/v1.20.15...v1.20.16) (2024-07-01)

**Note:** Version bump only for package @certd/pipeline

## [1.20.15](https://github.com/certd/certd/compare/v1.20.14...v1.20.15) (2024-06-28)

**Note:** Version bump only for package @certd/pipeline

## [1.20.14](https://github.com/certd/certd/compare/v1.20.13...v1.20.14) (2024-06-23)

**Note:** Version bump only for package @certd/pipeline

## [1.20.13](https://github.com/certd/certd/compare/v1.20.12...v1.20.13) (2024-06-18)

**Note:** Version bump only for package @certd/pipeline

## [1.20.12](https://github.com/certd/certd/compare/v1.20.10...v1.20.12) (2024-06-17)

### Performance Improvements

* 支持cloudflare域名 ([fbb9a47](https://github.com/certd/certd/commit/fbb9a47e8f7bb805289b9ee64bd46ffee0f01c06))

## [1.20.10](https://github.com/certd/certd/compare/v1.20.9...v1.20.10) (2024-05-30)

### Performance Improvements

* 优化文件下载包名 ([d9eb927](https://github.com/certd/certd/commit/d9eb927b0a1445feab08b1958aa9ea80637a5ae6))

## [1.20.9](https://github.com/certd/certd/compare/v1.20.8...v1.20.9) (2024-03-22)

**Note:** Version bump only for package @certd/pipeline

## [1.20.8](https://github.com/certd/certd/compare/v1.20.7...v1.20.8) (2024-03-22)

**Note:** Version bump only for package @certd/pipeline

## [1.20.7](https://github.com/certd/certd/compare/v1.20.6...v1.20.7) (2024-03-22)

**Note:** Version bump only for package @certd/pipeline

## [1.20.6](https://github.com/certd/certd/compare/v1.20.5...v1.20.6) (2024-03-21)

### Performance Improvements

* 插件贡献文档及示例 ([72fb20a](https://github.com/certd/certd/commit/72fb20abf3ba5bdd862575d2907703a52fd7eb17))

## [1.20.5](https://github.com/certd/certd/compare/v1.20.2...v1.20.5) (2024-03-11)

**Note:** Version bump only for package @certd/pipeline

## [1.20.2](https://github.com/certd/certd/compare/v1.2.1...v1.20.2) (2024-02-28)

**Note:** Version bump only for package @certd/pipeline

## [1.2.1](https://github.com/certd/certd/compare/v1.2.0...v1.2.1) (2023-12-12)

**Note:** Version bump only for package @certd/pipeline

**Note:** Version bump only for package @certd/pipeline

# [1.2.0](https://github.com/certd/certd/compare/v1.1.6...v1.2.0) (2023-10-27)

**Note:** Version bump only for package @certd/pipeline

## [1.1.6](https://github.com/certd/certd/compare/v1.1.5...v1.1.6) (2023-07-10)

### Bug Fixes

* 修复上传证书到腾讯云失败的bug ([e950322](https://github.com/certd/certd/commit/e950322232e19d1263b8552eefa5b0150fd7864e))

## [1.1.5](https://github.com/certd/certd/compare/v1.1.4...v1.1.5) (2023-07-03)

**Note:** Version bump only for package @certd/pipeline

## [1.1.4](https://github.com/certd/certd/compare/v1.1.3...v1.1.4) (2023-07-03)

### Performance Improvements

* cancel task ([bc65c0a](https://github.com/certd/certd/commit/bc65c0a786360c087fe95cad93ec6a87804cc5ee))
* flush log ([891a43a](https://github.com/certd/certd/commit/891a43ae6716ff98ed06643f7da2e35199ee195c))
* flush logger ([91be682](https://github.com/certd/certd/commit/91be6826b902e0f302b1a6cbdb1d24e15914c18d))
* timeout ([3eeb1f7](https://github.com/certd/certd/commit/3eeb1f77aa2922f3545f3d2067f561d95621d54f))

## [1.1.3](https://github.com/certd/certd/compare/v1.1.2...v1.1.3) (2023-07-03)

**Note:** Version bump only for package @certd/pipeline

## [1.1.2](https://github.com/certd/certd/compare/v1.1.1...v1.1.2) (2023-07-03)

**Note:** Version bump only for package @certd/pipeline

## [1.1.1](https://github.com/certd/certd/compare/v1.1.0...v1.1.1) (2023-06-28)

**Note:** Version bump only for package @certd/pipeline

# [1.1.0](https://github.com/certd/certd/compare/v1.0.6...v1.1.0) (2023-06-28)

### Bug Fixes

* 修复access选择类型trigger ([2851a33](https://github.com/certd/certd/commit/2851a33eb2510f038fadb55da29512597a4ba512))

### Features

* 邮件通知 ([937e3fa](https://github.com/certd/certd/commit/937e3fac19cd03b8aa91db8ba03fda7fcfbacea2))
* cert download ([5a51c14](https://github.com/certd/certd/commit/5a51c14de521cb8075a80d2ae41a16e6d5281259))
* save files ([99522fb](https://github.com/certd/certd/commit/99522fb49adb42c1dfdf7bec3dd52d641158285b))
* save files ([671d273](https://github.com/certd/certd/commit/671d273e2f9136d16896536b0ca127cf372f1619))

## [1.0.6](https://github.com/certd/certd/compare/v1.0.5...v1.0.6) (2023-05-25)

**Note:** Version bump only for package @certd/pipeline

## [1.0.5](https://github.com/certd/certd/compare/v1.0.4...v1.0.5) (2023-05-25)

**Note:** Version bump only for package @certd/pipeline

## [1.0.4](https://github.com/certd/certd/compare/v1.0.3...v1.0.4) (2023-05-25)

**Note:** Version bump only for package @certd/pipeline

## [1.0.3](https://github.com/certd/certd/compare/v1.0.2...v1.0.3) (2023-05-25)

**Note:** Version bump only for package @certd/pipeline

## [1.0.2](https://github.com/certd/certd/compare/v1.0.1...v1.0.2) (2023-05-24)

**Note:** Version bump only for package @certd/pipeline

## [1.0.1](https://github.com/certd/certd/compare/v1.0.0...v1.0.1) (2023-05-24)

**Note:** Version bump only for package @certd/pipeline
