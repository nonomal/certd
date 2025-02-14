
ALTER TABLE `pi_history` MODIFY COLUMN `pipeline` longtext  NULL;
ALTER TABLE `pi_storage` MODIFY COLUMN `value` longtext  NULL;
ALTER TABLE `pi_history_log` MODIFY COLUMN `logs` longtext  NULL;
