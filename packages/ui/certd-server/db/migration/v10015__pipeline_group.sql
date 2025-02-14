CREATE TABLE "pi_pipeline_group"
(
  "id"          integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_id"     integer      NOT NULL,
  "name"        varchar(100) NOT NULL,
  "icon"        varchar(100),
  "favorite"    boolean      NOT NULL DEFAULT (false),
  "create_time" datetime     NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "update_time" datetime     NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE pi_pipeline
  ADD COLUMN group_id integer;
