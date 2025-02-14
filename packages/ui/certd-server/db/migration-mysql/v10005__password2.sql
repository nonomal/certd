INSERT INTO sys_settings (`key`, title, setting, access)
VALUES (
         'sys.install',
         '安装信息',
         CONCAT('{"installTime":', (SELECT timestamp FROM flyway_history WHERE id = 1), '}'),
         'private'
       );

ALTER TABLE sys_user ADD COLUMN password_version bigint DEFAULT 1;
ALTER TABLE sys_user ADD COLUMN password_salt varchar(36);
