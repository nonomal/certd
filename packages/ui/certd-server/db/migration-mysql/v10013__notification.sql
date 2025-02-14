
CREATE TABLE `pi_notification` (`id` bigint PRIMARY KEY AUTO_INCREMENT NOT NULL, `user_id` bigint NOT NULL, `name` varchar(100) NOT NULL, `type` varchar(100) NOT NULL, `setting` text, `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
