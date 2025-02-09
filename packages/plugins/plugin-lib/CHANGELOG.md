# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.30.2](https://github.com/certd/certd/compare/v1.30.1...v1.30.2) (2025-02-09)

**Note:** Version bump only for package @certd/plugin-lib

## [1.30.1](https://github.com/certd/certd/compare/v1.30.0...v1.30.1) (2025-01-20)

### Performance Improvements

* http方式校验，选择sftp时，支持修改文件访问权限比如777 ([15d6eaf](https://github.com/certd/certd/commit/15d6eaf5532ed25acd4f8d58c429353a2f44206c))

# [1.30.0](https://github.com/certd/certd/compare/v1.29.5...v1.30.0) (2025-01-19)

### Bug Fixes

* 修复查看任务日志偶发性无法自动滚动底部的bug ([7e482f7](https://github.com/certd/certd/commit/7e482f798c0142bce1866f84676cb40210f9638a))

### Performance Improvements

* 支持部署到阿里云ALB ([653940a](https://github.com/certd/certd/commit/653940a0ca64fc380178c1b0b58ae0af64dfaf07))
* 支持部署到阿里云NLB、SLB ([c085bac](https://github.com/certd/certd/commit/c085bac5d877c4250a8a79e17eb8673b8e4fc89c))

## [1.29.5](https://github.com/certd/certd/compare/v1.29.4...v1.29.5) (2025-01-07)

**Note:** Version bump only for package @certd/plugin-lib

## [1.29.4](https://github.com/certd/certd/compare/v1.29.3...v1.29.4) (2025-01-06)

**Note:** Version bump only for package @certd/plugin-lib

## [1.29.3](https://github.com/certd/certd/compare/v1.29.2...v1.29.3) (2025-01-04)

### Performance Improvements

* 优化acme sdk ([54db744](https://github.com/certd/certd/commit/54db74428259de64d12230c2ab7353ae11197bbc))
* 支持http校验方式申请证书 ([405591c](https://github.com/certd/certd/commit/405591c5d08fa1a3b228ee3980199e7731cfec4a))
* http校验方式，支持七牛云oss、阿里云oss、腾讯云cos ([3f74d4d](https://github.com/certd/certd/commit/3f74d4d9e5f5d0e629b44cff1895b3f7a8fbcafc))

## [1.29.2](https://github.com/certd/certd/compare/v1.29.1...v1.29.2) (2024-12-25)

**Note:** Version bump only for package @certd/plugin-lib

## [1.29.1](https://github.com/certd/certd/compare/v1.29.0...v1.29.1) (2024-12-25)

**Note:** Version bump only for package @certd/plugin-lib

# [1.29.0](https://github.com/certd/certd/compare/v1.28.4...v1.29.0) (2024-12-24)

**Note:** Version bump only for package @certd/plugin-lib

## [1.28.4](https://github.com/certd/certd/compare/v1.28.3...v1.28.4) (2024-12-12)

**Note:** Version bump only for package @certd/plugin-lib

## [1.28.3](https://github.com/certd/certd/compare/v1.28.2...v1.28.3) (2024-12-12)

**Note:** Version bump only for package @certd/plugin-lib

## [1.28.2](https://github.com/certd/certd/compare/v1.28.1...v1.28.2) (2024-12-09)

**Note:** Version bump only for package @certd/plugin-lib

## [1.28.1](https://github.com/certd/certd/compare/v1.28.0...v1.28.1) (2024-12-08)

**Note:** Version bump only for package @certd/plugin-lib

# [1.28.0](https://github.com/certd/certd/compare/v1.27.9...v1.28.0) (2024-11-30)

### Features

* 手机号登录、邮箱验证码注册 ([7b55337](https://github.com/certd/certd/commit/7b55337c5edb470cca7aa62201eda8d274784004))

### Performance Improvements

* 部署到IIS插件 ([1534f45](https://github.com/certd/certd/commit/1534f4523633265d219d7b3a249a9ea1af99c512))
* 选项显示图标 ([aedc462](https://github.com/certd/certd/commit/aedc46213571a3bd93809b7af7fa17a08d546237))

## [1.27.9](https://github.com/certd/certd/compare/v1.27.8...v1.27.9) (2024-11-26)

**Note:** Version bump only for package @certd/plugin-cert

## [1.27.8](https://github.com/certd/certd/compare/v1.27.7...v1.27.8) (2024-11-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.27.7](https://github.com/certd/certd/compare/v1.27.6...v1.27.7) (2024-11-25)

### Performance Improvements

* 谷歌EAB绑定邮箱改成必填 ([81a8123](https://github.com/certd/certd/commit/81a8123725d7bf4bd6a32a64a066bd760b7b6a7f))
* 优化插件开发，dnsProvider无需写http logger 变量 ([fcbb5e4](https://github.com/certd/certd/commit/fcbb5e46a112174150a62648319b8224fce3b7ed))
* 支持企业微信群聊机器人通知 ([b805a29](https://github.com/certd/certd/commit/b805a2925984144a31575b8aaa622f0c30d41b56))

## [1.27.6](https://github.com/certd/certd/compare/v1.27.5...v1.27.6) (2024-11-19)

**Note:** Version bump only for package @certd/plugin-cert

## [1.27.5](https://github.com/certd/certd/compare/v1.27.4...v1.27.5) (2024-11-18)

### Bug Fixes

* 修复1Panel面板本身证书更新导致判定执行失败的问题 ([2689e6d](https://github.com/certd/certd/commit/2689e6d6c03aba21da90d5d45232c6ba08696be1))

### Performance Improvements

* 新手导航在非编辑模式下不显示 ([18bfcc2](https://github.com/certd/certd/commit/18bfcc24ad0bde57bb04db8a4209861ec6b8ff1d))
* 支持namesilo ([80159ec](https://github.com/certd/certd/commit/80159ecca895103d0495f3217311199e66056572))
* 专业版试用，无需绑定账号 ([c7c4318](https://github.com/certd/certd/commit/c7c4318c11b65a76089787aa58939832d338a232))

## [1.27.4](https://github.com/certd/certd/compare/v1.27.3...v1.27.4) (2024-11-14)

### Bug Fixes

* 修复未设置pfx密码，导致jks转换报错的bug ([c3cfbd8](https://github.com/certd/certd/commit/c3cfbd8474155aed4379f91075de37d5d8c73ef0))

## [1.27.3](https://github.com/certd/certd/compare/v1.27.2...v1.27.3) (2024-11-13)

### Performance Improvements

* 支持jks ([889eaae](https://github.com/certd/certd/commit/889eaaea92818f628b922dae540c026630611707))

## [1.27.2](https://github.com/certd/certd/compare/v1.27.1...v1.27.2) (2024-11-08)

### Performance Improvements

* 支持公共cname服务 ([3c919ee](https://github.com/certd/certd/commit/3c919ee5d1aef5d26cf3620a7c49d920786bc941))

## [1.27.1](https://github.com/certd/certd/compare/v1.27.0...v1.27.1) (2024-11-04)

**Note:** Version bump only for package @certd/plugin-cert

# [1.27.0](https://github.com/certd/certd/compare/v1.26.16...v1.27.0) (2024-10-31)

### Bug Fixes

* pfx兼容windows server 2016 ([e5e468a](https://github.com/certd/certd/commit/e5e468a463f66d02f235de54b7c1e09ace5f1cb1))

### Features

* 首页全新改版 ([63ec5b5](https://github.com/certd/certd/commit/63ec5b5519c760a3330569c0da6dac157302a330))

### Performance Improvements

* lego 升级到 4.19.2 ([129bf53](https://github.com/certd/certd/commit/129bf53edc9bbb001fe49fbd7e239bd1d09cc128))

## [1.26.16](https://github.com/certd/certd/compare/v1.26.15...v1.26.16) (2024-10-30)

### Bug Fixes

* 修复lego No help topic for 错误 ([aaaf8d7](https://github.com/certd/certd/commit/aaaf8d7db34896cf8f2ff8f12eec1ab0cae58f0f))

## [1.26.15](https://github.com/certd/certd/compare/v1.26.14...v1.26.15) (2024-10-28)

### Performance Improvements

* 默认证书更新时间设置为35天，增加腾讯云删除过期证书插件，可以避免腾讯云过期证书邮件 ([51b6fed](https://github.com/certd/certd/commit/51b6fed468eaa6f28ce4497ce303ace1a52abb96))

## [1.26.14](https://github.com/certd/certd/compare/v1.26.13...v1.26.14) (2024-10-26)

**Note:** Version bump only for package @certd/plugin-cert

## [1.26.13](https://github.com/certd/certd/compare/v1.26.12...v1.26.13) (2024-10-26)

### Bug Fixes

* deprecated的运行时不要报错，只报警告 ([bcbefaa](https://github.com/certd/certd/commit/bcbefaaa35cf6d0eec085b3a2c5bfc7c6a8de9e1))

## [1.26.12](https://github.com/certd/certd/compare/v1.26.11...v1.26.12) (2024-10-25)

### Performance Improvements

* 支持配置公共ZeroSSL授权 ([a90d1e6](https://github.com/certd/certd/commit/a90d1e68ee9cbc3705223457b8a86f071b150968))

## [1.26.11](https://github.com/certd/certd/compare/v1.26.10...v1.26.11) (2024-10-23)

### Performance Improvements

* 申请证书启用新的反代地址 ([a705182](https://github.com/certd/certd/commit/a705182b85e51157883e48f23463263793bf3c12))
* 优化证书申请速度和成功率，反代地址优化，google基本可以稳定请求。增加请求重试。 ([41d9c3a](https://github.com/certd/certd/commit/41d9c3ac8398def541e65351cbe920d4a927182d))
* 优化pfx密码密码输入框，让浏览器不自动填写密码 ([ffeede3](https://github.com/certd/certd/commit/ffeede38afa70c5ff6f2015516bead23d2c4df87))

## [1.26.10](https://github.com/certd/certd/compare/v1.26.9...v1.26.10) (2024-10-20)

### Bug Fixes

* 修复cname服务普通用户access访问权限问题 ([c1e3e2e](https://github.com/certd/certd/commit/c1e3e2ee1f923ee5806479dd5f178c3286a01ae0))

## [1.26.9](https://github.com/certd/certd/compare/v1.26.8...v1.26.9) (2024-10-19)

### Performance Improvements

* 触发证书重新申请input变化对比规则优化，减少升级版本后触发申请证书的情况 ([c46a2a9](https://github.com/certd/certd/commit/c46a2a9a399c2a9a8bb59a48b9fb6e93227cce9b))

## [1.26.8](https://github.com/certd/certd/compare/v1.26.7...v1.26.8) (2024-10-15)

### Performance Improvements

* 密钥备份 ([1c6028a](https://github.com/certd/certd/commit/1c6028abcf8849163462bb2f8441b6838357e09b))
* 证书直接查看 ([5dde5bd](https://github.com/certd/certd/commit/5dde5bd3f76db3959d411619d29bfb8064e3b307))
* sqlite数据库备份插件 ([77f1631](https://github.com/certd/certd/commit/77f163144f7dcfb0431475c55508fecfd6d969f8))

## [1.26.7](https://github.com/certd/certd/compare/v1.26.6...v1.26.7) (2024-10-14)

**Note:** Version bump only for package @certd/plugin-cert

## [1.26.6](https://github.com/certd/certd/compare/v1.26.5...v1.26.6) (2024-10-14)

**Note:** Version bump only for package @certd/plugin-cert

## [1.26.5](https://github.com/certd/certd/compare/v1.26.4...v1.26.5) (2024-10-14)

**Note:** Version bump only for package @certd/plugin-cert

## [1.26.4](https://github.com/certd/certd/compare/v1.26.3...v1.26.4) (2024-10-14)

### Performance Improvements

* [comm] 支持插件管理 ([e8b617b](https://github.com/certd/certd/commit/e8b617b80ce882dd63006f0cfc719a80a1cc6acc))
* 新增代理设置功能 ([273ab61](https://github.com/certd/certd/commit/273ab6139f5807f4d7fe865cc353b97f51b9a668))
* EAB授权支持绑定邮箱，支持公共EAB设置 ([07043af](https://github.com/certd/certd/commit/07043aff0ca7fd29c56dd3c363002cb15d78b464))

## [1.26.3](https://github.com/certd/certd/compare/v1.26.2...v1.26.3) (2024-10-12)

**Note:** Version bump only for package @certd/plugin-cert

## [1.26.2](https://github.com/certd/certd/compare/v1.26.1...v1.26.2) (2024-10-11)

**Note:** Version bump only for package @certd/plugin-cert

## [1.26.1](https://github.com/certd/certd/compare/v1.26.0...v1.26.1) (2024-10-10)

**Note:** Version bump only for package @certd/plugin-cert

# [1.26.0](https://github.com/certd/certd/compare/v1.25.9...v1.26.0) (2024-10-10)

### Features

* 域名验证方法支持CNAME间接方式，此方式支持所有域名注册商，且无需提供Access授权，但是需要手动添加cname解析 ([f3d3508](https://github.com/certd/certd/commit/f3d35084ed44f9f33845f7045e520be5c27eed93))

### Performance Improvements

* 调整静态资源到static目录 ([0584b36](https://github.com/certd/certd/commit/0584b3672b40f9042a2ed87e5627022606d046cd))
* 检查cname是否正确配置 ([b5d8935](https://github.com/certd/certd/commit/b5d8935159374fbe7fc7d4c48ae0ed9396861bdd))
* 域名输入增加校验提示，避免输入错误的域名 ([0c8e83e](https://github.com/certd/certd/commit/0c8e83e1254a9ce4d5a4e7888eb1710394a4b77c))
* cname校验配置增加未校验通过提示 ([77cc3c4](https://github.com/certd/certd/commit/77cc3c4a5cbd81f8233a8e0bb33fab0621c0905f))
* google eab授权支持自动获取，不过要配置代理 ([592791d](https://github.com/certd/certd/commit/592791d1356fc252fbb70d7f168567aee9585507))

## [1.25.9](https://github.com/certd/certd/compare/v1.25.8...v1.25.9) (2024-10-01)

### Bug Fixes

* 修复西部数码账户级别apikey不可用的bug ([f8f3e8b](https://github.com/certd/certd/commit/f8f3e8b43fd5d815887bcb53b95f46dc96424b79))

## [1.25.8](https://github.com/certd/certd/compare/v1.25.7...v1.25.8) (2024-09-30)

### Bug Fixes

* 修复pfxPassword无效的bug ([251e450](https://github.com/certd/certd/commit/251e450fabfe62405bac13e39f2153736c081ef0))

## [1.25.7](https://github.com/certd/certd/compare/v1.25.6...v1.25.7) (2024-09-29)

**Note:** Version bump only for package @certd/plugin-cert

## [1.25.6](https://github.com/certd/certd/compare/v1.25.5...v1.25.6) (2024-09-29)

### Performance Improvements

* 部署支持1Panel ([d047234](https://github.com/certd/certd/commit/d047234d98d31504f2e5a472b66e1b75806af26e))

## [1.25.5](https://github.com/certd/certd/compare/v1.25.4...v1.25.5) (2024-09-26)

**Note:** Version bump only for package @certd/plugin-cert

## [1.25.4](https://github.com/certd/certd/compare/v1.25.3...v1.25.4) (2024-09-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.25.3](https://github.com/certd/certd/compare/v1.25.2...v1.25.3) (2024-09-24)

**Note:** Version bump only for package @certd/plugin-cert

## [1.25.2](https://github.com/certd/certd/compare/v1.25.1...v1.25.2) (2024-09-24)

**Note:** Version bump only for package @certd/plugin-cert

## [1.25.1](https://github.com/certd/certd/compare/v1.25.0...v1.25.1) (2024-09-24)

**Note:** Version bump only for package @certd/plugin-cert

# [1.25.0](https://github.com/certd/certd/compare/v1.24.4...v1.25.0) (2024-09-24)

### Features

* 支持中间证书 ([e86756e](https://github.com/certd/certd/commit/e86756e4c65a53dd23106d7ecbfe2fa987cc13f3))

### Performance Improvements

* 证书支持旧版RSA，pkcs1 ([3d9c3ec](https://github.com/certd/certd/commit/3d9c3ecb3eb604b2458154f608bde0f01915d116))
* plugins增加图标 ([a8da658](https://github.com/certd/certd/commit/a8da658a9723342b4f43a579f7805bfef0648efb))

## [1.24.4](https://github.com/certd/certd/compare/v1.24.3...v1.24.4) (2024-09-09)

### Performance Improvements

* 支持群晖 ([5c270b6](https://github.com/certd/certd/commit/5c270b6b9d45a2152f9fdb3c07bd98b7c803cb8e))

## [1.24.3](https://github.com/certd/certd/compare/v1.24.2...v1.24.3) (2024-09-06)

**Note:** Version bump only for package @certd/plugin-cert

## [1.24.2](https://github.com/certd/certd/compare/v1.24.1...v1.24.2) (2024-09-06)

### Performance Improvements

* 任务配置不需要的字段可以自动隐藏 ([192d9dc](https://github.com/certd/certd/commit/192d9dc7e36737d684c769f255f407c28b1152ac))
* 修复windows下无法执行第二条命令的bug ([d5bfcdb](https://github.com/certd/certd/commit/d5bfcdb6de1dcc1702155442e2e00237d0bbb6e5))
* 优化跳过处理逻辑 ([b80210f](https://github.com/certd/certd/commit/b80210f24bf5db1c958d06ab27c9e5d3db452eda))
* 支持pfx、der ([fbeaed2](https://github.com/certd/certd/commit/fbeaed203519f59b6d9396c4e8953353ccb5e723))

## [1.24.1](https://github.com/certd/certd/compare/v1.24.0...v1.24.1) (2024-09-02)

### Performance Improvements

* 授权配置支持加密 ([42a56b5](https://github.com/certd/certd/commit/42a56b581d754c3e5f9838179d19ab0d004ef2eb))

# [1.24.0](https://github.com/certd/certd/compare/v1.23.1...v1.24.0) (2024-08-25)

### Bug Fixes

* 修复成功后跳过之后丢失腾讯云证书id的bug ([37eb762](https://github.com/certd/certd/commit/37eb762afe25c5896b75dee25f32809f8426e7b7))
* 修复创建流水线后立即运行时报no id错误的bug ([17ead54](https://github.com/certd/certd/commit/17ead547aab25333603980304aa3aad3db1f73d5))
* 修复使用代理的情况下申请证书失败的bug ([95122e2](https://github.com/certd/certd/commit/95122e28609333f4df55c266e5434897954c0fb3))

### Features

* 支持ECC类型 ([a7424e0](https://github.com/certd/certd/commit/a7424e02f5c7e02ac1688791040785920ce67473))

### Performance Improvements

* 更新k8s底层api库 ([746bb9d](https://github.com/certd/certd/commit/746bb9d385e2f397daef4976eca1d4782a2f5ebd))
* 优化成功后跳过的提示 ([7b451bb](https://github.com/certd/certd/commit/7b451bbf6e6337507f4627b5a845f5bd96ab4f7b))
* 优化证书申请成功率 ([968c469](https://github.com/certd/certd/commit/968c4690a07f69c08dcb3d3a494da4e319627345))

## [1.23.1](https://github.com/certd/certd/compare/v1.23.0...v1.23.1) (2024-08-06)

### Performance Improvements

* 优化插件字段的default value ([24c7be2](https://github.com/certd/certd/commit/24c7be2c9cb39c14f7a97b674127c88033280b02))

## [1.22.8](https://github.com/certd/certd/compare/v1.22.7...v1.22.8) (2024-08-05)

**Note:** Version bump only for package @certd/plugin-cert

## [1.22.7](https://github.com/certd/certd/compare/v1.22.6...v1.22.7) (2024-08-04)

**Note:** Version bump only for package @certd/plugin-cert

## [1.22.6](https://github.com/certd/certd/compare/v1.22.5...v1.22.6) (2024-08-03)

### Performance Improvements

* 流水线支持名称模糊查询 ([59897c4](https://github.com/certd/certd/commit/59897c4ceae992ebe2972ca9e8f9196616ffdfd7))

## [1.22.5](https://github.com/certd/certd/compare/v1.22.4...v1.22.5) (2024-07-26)

**Note:** Version bump only for package @certd/plugin-cert

## [1.22.4](https://github.com/certd/certd/compare/v1.22.3...v1.22.4) (2024-07-26)

### Performance Improvements

* 证书申请支持反向代理，letsencrypt无法访问时的备用方案 ([b7b5df0](https://github.com/certd/certd/commit/b7b5df0587e0f7ea288c1b2af6f87211f207395f))

## [1.22.3](https://github.com/certd/certd/compare/v1.22.2...v1.22.3) (2024-07-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.22.2](https://github.com/certd/certd/compare/v1.22.1...v1.22.2) (2024-07-23)

**Note:** Version bump only for package @certd/plugin-cert

## [1.22.1](https://github.com/certd/certd/compare/v1.22.0...v1.22.1) (2024-07-20)

### Performance Improvements

* 创建证书任务可以选择lege插件 ([affef13](https://github.com/certd/certd/commit/affef130378030c517250c58a4e787b0fc85d7d1))

# [1.22.0](https://github.com/certd/certd/compare/v1.21.2...v1.22.0) (2024-07-19)

### Features

* 升级midway，支持esm ([485e603](https://github.com/certd/certd/commit/485e603b5165c28bc08694997726eaf2a585ebe7))
* 支持lego，海量DNS提供商 ([0bc6d0a](https://github.com/certd/certd/commit/0bc6d0a211920fb0084d705e1db67ee1e7262c44))

## [1.21.2](https://github.com/certd/certd/compare/v1.21.1...v1.21.2) (2024-07-08)

### Performance Improvements

* 申请证书时可以选择跳过本地dns校验 ([fe91d94](https://github.com/certd/certd/commit/fe91d94090d22ed0a3ea753ba74dfaa1bf057c17))

## [1.21.1](https://github.com/certd/certd/compare/v1.21.0...v1.21.1) (2024-07-08)

### Performance Improvements

* 说明优化，默认值优化 ([970c7fd](https://github.com/certd/certd/commit/970c7fd8a0f557770e973d8462ee5684ef742810))

# [1.21.0](https://github.com/certd/certd/compare/v1.20.17...v1.21.0) (2024-07-03)

### Features

* 支持zero ssl ([eade2c2](https://github.com/certd/certd/commit/eade2c2b681569f03e9cd466e7d5bcd6703ed492))

## [1.20.17](https://github.com/certd/certd/compare/v1.20.16...v1.20.17) (2024-07-03)

### Performance Improvements

* 优化cname verify ([eba333d](https://github.com/certd/certd/commit/eba333de7a5b5ef4b0b7eaa904f578720102fa61))

## [1.20.16](https://github.com/certd/certd/compare/v1.20.15...v1.20.16) (2024-07-01)

### Bug Fixes

* 修复配置了cdn cname后申请失败的bug ([4a5fa76](https://github.com/certd/certd/commit/4a5fa767edc347d03d29a467e86c9a4d70b0220c))

## [1.20.15](https://github.com/certd/certd/compare/v1.20.14...v1.20.15) (2024-06-28)

### Performance Improvements

* 腾讯云dns provider 支持腾讯云的accessId ([e0eb3a4](https://github.com/certd/certd/commit/e0eb3a441384d474fe2923c69b25318264bdc9df))

## [1.20.14](https://github.com/certd/certd/compare/v1.20.13...v1.20.14) (2024-06-23)

**Note:** Version bump only for package @certd/plugin-cert

## [1.20.13](https://github.com/certd/certd/compare/v1.20.12...v1.20.13) (2024-06-18)

**Note:** Version bump only for package @certd/plugin-cert

## [1.20.12](https://github.com/certd/certd/compare/v1.20.10...v1.20.12) (2024-06-17)

### Bug Fixes

* 修复aliyun域名超过100个找不到域名的bug ([5b1494b](https://github.com/certd/certd/commit/5b1494b3ce93d1026dc56ee741342fbb8bf7be24))

### Performance Improvements

* 支持cloudflare域名 ([fbb9a47](https://github.com/certd/certd/commit/fbb9a47e8f7bb805289b9ee64bd46ffee0f01c06))

## [1.20.10](https://github.com/certd/certd/compare/v1.20.9...v1.20.10) (2024-05-30)

### Performance Improvements

* 上传到主机插件支持复制到本机路径 ([92446c3](https://github.com/certd/certd/commit/92446c339936f98f08f654b8971a7393d8435224))
* 优化文件下载包名 ([d9eb927](https://github.com/certd/certd/commit/d9eb927b0a1445feab08b1958aa9ea80637a5ae6))

## [1.20.9](https://github.com/certd/certd/compare/v1.20.8...v1.20.9) (2024-03-22)

**Note:** Version bump only for package @certd/plugin-cert

## [1.20.8](https://github.com/certd/certd/compare/v1.20.7...v1.20.8) (2024-03-22)

**Note:** Version bump only for package @certd/plugin-cert

## [1.20.7](https://github.com/certd/certd/compare/v1.20.6...v1.20.7) (2024-03-22)

**Note:** Version bump only for package @certd/plugin-cert

## [1.20.6](https://github.com/certd/certd/compare/v1.20.5...v1.20.6) (2024-03-21)

### Performance Improvements

* 插件贡献文档及示例 ([72fb20a](https://github.com/certd/certd/commit/72fb20abf3ba5bdd862575d2907703a52fd7eb17))

## [1.20.5](https://github.com/certd/certd/compare/v1.20.2...v1.20.5) (2024-03-11)

**Note:** Version bump only for package @certd/plugin-cert

## [1.20.2](https://github.com/certd/certd/compare/v1.2.1...v1.20.2) (2024-02-28)

**Note:** Version bump only for package @certd/plugin-cert

## [1.2.1](https://github.com/certd/certd/compare/v1.2.0...v1.2.1) (2023-12-12)

**Note:** Version bump only for package @certd/plugin-cert

**Note:** Version bump only for package @certd/plugin-cert

# [1.2.0](https://github.com/certd/certd/compare/v1.1.6...v1.2.0) (2023-10-27)

**Note:** Version bump only for package @certd/plugin-cert

## [1.1.6](https://github.com/certd/certd/compare/v1.1.5...v1.1.6) (2023-07-10)

**Note:** Version bump only for package @certd/plugin-cert

## [1.1.5](https://github.com/certd/certd/compare/v1.1.4...v1.1.5) (2023-07-03)

**Note:** Version bump only for package @certd/plugin-cert

## [1.1.4](https://github.com/certd/certd/compare/v1.1.3...v1.1.4) (2023-07-03)

### Performance Improvements

* timeout ([3eeb1f7](https://github.com/certd/certd/commit/3eeb1f77aa2922f3545f3d2067f561d95621d54f))

## [1.1.3](https://github.com/certd/certd/compare/v1.1.2...v1.1.3) (2023-07-03)

**Note:** Version bump only for package @certd/plugin-cert

## [1.1.2](https://github.com/certd/certd/compare/v1.1.1...v1.1.2) (2023-07-03)

**Note:** Version bump only for package @certd/plugin-cert

## [1.1.1](https://github.com/certd/certd/compare/v1.1.0...v1.1.1) (2023-06-28)

**Note:** Version bump only for package @certd/plugin-cert

# [1.1.0](https://github.com/certd/certd/compare/v1.0.6...v1.1.0) (2023-06-28)

### Bug Fixes

* 修复access选择类型trigger ([2851a33](https://github.com/certd/certd/commit/2851a33eb2510f038fadb55da29512597a4ba512))

### Features

* save files ([99522fb](https://github.com/certd/certd/commit/99522fb49adb42c1dfdf7bec3dd52d641158285b))
* save files ([671d273](https://github.com/certd/certd/commit/671d273e2f9136d16896536b0ca127cf372f1619))

## [1.0.6](https://github.com/certd/certd/compare/v1.0.5...v1.0.6) (2023-05-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.0.5](https://github.com/certd/certd/compare/v1.0.4...v1.0.5) (2023-05-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.0.4](https://github.com/certd/certd/compare/v1.0.3...v1.0.4) (2023-05-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.0.3](https://github.com/certd/certd/compare/v1.0.2...v1.0.3) (2023-05-25)

**Note:** Version bump only for package @certd/plugin-cert

## [1.0.2](https://github.com/certd/certd/compare/v1.0.1...v1.0.2) (2023-05-24)

**Note:** Version bump only for package @certd/plugin-cert

## [1.0.1](https://github.com/certd/certd/compare/v1.0.0...v1.0.1) (2023-05-24)

**Note:** Version bump only for package @certd/plugin-cert
