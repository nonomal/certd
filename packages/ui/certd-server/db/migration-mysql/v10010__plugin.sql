CREATE TABLE `pi_plugin`
(
  `id`          bigint      NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name`        varchar(100) NOT NULL,
  `icon`        varchar(100),
  `title`       varchar(200),
  `desc`        varchar(500),
  `group`       varchar(100),
  `version`     varchar(100),
  `setting`     text,
  `sys_setting` text,
  `content`     text,
  `type`        varchar(100) NOT NULL,
  `disabled`    boolean      NOT NULL,
  `create_time` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

