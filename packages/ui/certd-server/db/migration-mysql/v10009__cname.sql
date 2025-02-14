CREATE TABLE `cd_cname_provider`
(
  `id`                bigint      NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `domain`            varchar(100) NOT NULL,
  `dns_provider_type` varchar(100) NOT NULL,
  `access_id`         bigint      NOT NULL,
  `is_default`        boolean      NOT NULL,
  `remark`            varchar(200),
  `disabled`          boolean      NOT NULL,
  `create_time`       timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time`       timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE `cd_cname_record`
(
  `id`                bigint      NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id`           bigint      NOT NULL,
  `domain`            varchar(100) NOT NULL,
  `host_record`       varchar(100) NOT NULL,
  `record_value`      varchar(200) NOT NULL,
  `cname_provider_id` bigint      NOT NULL,
  `status`            varchar(100) NOT NULL,
  `create_time`       timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time`       timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

