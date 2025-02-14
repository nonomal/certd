
CREATE INDEX `index_access_user_id` ON `cd_access` (`user_id`);

CREATE INDEX `index_cname_record_user_id` ON `cd_cname_record` (`user_id`);


CREATE INDEX `index_history_user_id` ON `pi_history` (`user_id`);

CREATE INDEX `index_history_log_user_id` ON `pi_history_log` (`user_id`);

CREATE INDEX `index_history_log_pipeline_id` ON `pi_history_log` (`pipeline_id`);

CREATE INDEX `index_notification_user_id` ON `pi_notification` (`user_id`);

CREATE INDEX `index_pipeline_user_id` ON `pi_pipeline` (`user_id`);
CREATE INDEX `index_pipeline_group_user_id` ON `pi_pipeline_group` (`user_id`);


CREATE INDEX `index_storage_default_get` ON `pi_storage` (`scope`(50), `namespace`(50), `key`(50));
CREATE INDEX `index_storage_user_id` ON `pi_storage` (`user_id`);


CREATE INDEX `index_user_email` ON `sys_user` (`email`);
CREATE INDEX `index_user_mobile` ON `sys_user` (`mobile`);

CREATE INDEX `index_permission` ON `sys_permission` (`permission`);


CREATE INDEX `index_user_settings_user_id` ON `user_settings` (`user_id`);

