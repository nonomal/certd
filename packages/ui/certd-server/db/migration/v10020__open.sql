CREATE TABLE "cd_open_key"
(
  "id"          integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_id"     integer,
  "key_id"      varchar(50),
  "key_secret"  varchar(100),
  "scope"       varchar(50),
  "disabled"    boolean  NOT NULL DEFAULT (false),
  "create_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);



CREATE INDEX "index_open_key_user_id" ON "cd_open_key" ("user_id");
CREATE INDEX "index_open_key_key_id" ON "cd_open_key" ("key_id");
