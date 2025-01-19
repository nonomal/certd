# 证书申请失败情况


## DNS记录问题

1. DNS 不要设置CAA记录，删除即可

2. DNSSEC相关报错，DNSSEC管理中删除即可

3. DNS 有其他平台申请过的_acme-challenge记录，删除即可
