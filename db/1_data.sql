-- Adminer 4.8.0 MySQL 5.5.5-10.5.8-MariaDB-1:10.5.8+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

TRUNCATE `board`;

TRUNCATE `evaluate`;

TRUNCATE `file`;

TRUNCATE `file_folder`;

TRUNCATE `mail_auth`;

TRUNCATE `mall`;

TRUNCATE `my_recommend`;

TRUNCATE `report`;

TRUNCATE `simple_evaluate`;

TRUNCATE `suggestion`;

TRUNCATE `suggestion_reply`;

TRUNCATE `user`;

TRUNCATE `user_role`;

TRUNCATE `user_role_authority`;

TRUNCATE `user_role_group`;
INSERT INTO `user_role_group` (`user_role_group_id`, `name`, `description`) VALUES
(1,	'ADMIN',	'모든 권한'),
(2,	'NON_AUTH_USER',	'메일 비인증 사용자'),
(3,	'AUTH_USER',	'메일 인증 사용자');

TRUNCATE `user_token`;

-- 2021-04-11 11:38:10