ALTER TABLE `sys_settings` RENAME TO `user_settings`;

CREATE TABLE `sys_settings` (
                              `id` bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              `key` varchar(100) NOT NULL,
                              `title` varchar(100) NOT NULL,
                              `setting` varchar(1024),
                              `access` varchar(100) NOT NULL,
                              `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SET @parent_id = (SELECT id FROM sys_permission WHERE permission = 'sys');
INSERT INTO sys_permission (title, permission, parent_id, sort) VALUES ('系统设置', 'sys:settings', @parent_id, 1);
INSERT INTO sys_role_permission (role_id, permission_id) VALUES (1, LAST_INSERT_ID());

SET @parent_id = (SELECT id FROM sys_permission WHERE permission = 'sys:settings');
INSERT INTO sys_permission (title, permission, parent_id, sort) VALUES ('查看', 'sys:settings:view',@parent_id, 1);
INSERT INTO sys_role_permission (role_id, permission_id) VALUES (1, LAST_INSERT_ID());
INSERT INTO sys_permission (title, permission, parent_id, sort) VALUES ('编辑', 'sys:settings:edit', @parent_id, 1);
INSERT INTO sys_role_permission (role_id, permission_id) VALUES (1, LAST_INSERT_ID());

