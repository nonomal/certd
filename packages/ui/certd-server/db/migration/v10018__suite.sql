CREATE TABLE "cd_product"
(
  "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon"            varchar(100),
  "title"           varchar(100),
  "type"            varchar(100),
  "content"         varchar(4096),
  "duration_prices" varchar(10240),
  "duration"        integer,
  "price"           integer,
  "intro"           varchar(10240),
  "order"           integer,
  "support_buy"     boolean,
  "disabled"        boolean  NOT NULL DEFAULT (false),
  "create_time"     datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time"     datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "cd_trade"
(
  "id"          integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "trade_no"    varchar(100),
  "user_id"     integer,
  "product_id"  integer,
  "title"       varchar(1024),
  "desc"        varchar(2048),
  "num"         integer,
  "duration"    integer,
  "price"       integer,
  "amount"      integer,
  "remark"      varchar(2048),
  "status"      varchar(100),
  "pay_type"    varchar(50),
  "pay_time"    integer,
  "pay_no"      varchar(100),
  "end_time"    integer,
  "create_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX "index_trade_user_id" ON "cd_trade" ("user_id");
CREATE UNIQUE INDEX "index_trade_trade_no" ON "cd_trade" ("trade_no");
CREATE INDEX "index_trade_pay_no" ON "cd_trade" ("pay_type", "pay_no");


CREATE TABLE "cd_user_suite"
(
  "id"                integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_id"           integer,
  "product_id"        integer,
  "trade_id"          integer,
  "icon"              varchar(100),
  "title"             varchar(100),
  "content"           text,
  "duration"          integer,
  "product_type"      varchar(50),
  "deploy_count_used" integer,
  "is_present"        boolean,
  "is_bootstrap"      boolean,
  "is_empty"          boolean,
  "disabled"          boolean  NOT NULL DEFAULT (false),
  "active_time"       integer,
  "expires_time"      integer,
  "create_time"       datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time"       datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX "index_user_suite_user_id" ON "cd_user_suite" ("user_id");


DROP TABLE IF EXISTS "cd_cert";
DROP TABLE IF EXISTS "cd_cert_apply_history";
DROP TABLE IF EXISTS "cd_cert_issuer";
DROP TABLE IF EXISTS "cd_task";
DROP TABLE IF EXISTS "cd_task_history";



CREATE TABLE "cd_cert_info"
(
  "id"            integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_id"       integer,
  "domain"        varchar(100),
  "domains"       varchar(10240),
  "domain_count"  integer,
  "pipeline_id"   integer,
  "apply_time"    integer,
  "from_type"     varchar(100),
  "cert_provider" varchar(100),
  "expires_time"  integer,
  "cert_info"     text,
  "cert_file"     varchar(100),
  "disabled"      boolean  NOT NULL DEFAULT (false),
  "create_time"   datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time"   datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX "index_cert_info_user_id" ON "cd_cert_info" ("user_id");
CREATE INDEX "index_cert_info_domain" ON "cd_cert_info" ("domain");
CREATE INDEX "index_cert_info_domains" ON "cd_cert_info" ("domains");
CREATE INDEX "index_cert_info_pipeline" ON "cd_cert_info" ("pipeline_id");


CREATE TABLE "cd_site_info"
(
  "id"                integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_id"           integer,

  "name"              varchar(100),
  "domain"            varchar(100),

  "https_port"        integer,
  "cert_domains"      varchar(10240),
  "cert_info"         varchar(10240),
  "cert_provider"     varchar(100),
  "cert_status"       varchar(100),
  "cert_expires_time" integer,
  "last_check_time"   integer,
  "check_status"      varchar(100),
  "error"             varchar(4096),
  "pipeline_id"       integer,
  "cert_info_id"      integer,
  "disabled"          boolean  NOT NULL DEFAULT (false),

  "create_time"       datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time"       datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX "index_site_info_user_id" ON "cd_site_info" ("user_id");
CREATE INDEX "index_site_info_domain" ON "cd_site_info" ("domain");
CREATE INDEX "index_site_info_pipeline" ON "cd_site_info" ("pipeline_id");


ALTER TABLE pi_pipeline
  ADD COLUMN "type" varchar(50);
ALTER TABLE pi_pipeline
  ADD COLUMN "from" varchar(50);
