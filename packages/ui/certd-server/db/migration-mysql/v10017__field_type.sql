ALTER TABLE `cd_access` MODIFY COLUMN `setting` text  NULL AFTER `type`;

ALTER TABLE `pi_pipeline` MODIFY COLUMN `content` longtext  NULL AFTER `title`;
