-- Adminer 4.8.0 MySQL 5.5.5-10.5.8-MariaDB-1:10.5.8+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

TRUNCATE `file`;

TRUNCATE `file_folder`;

TRUNCATE `mail_auth`;
INSERT INTO `mail_auth` (`mail_auth_id`, `user_id`, `date_create`, `date_expire`, `auth_code`, `date_auth`, `is_auth`) VALUES
(1,	'1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	'2021-04-18 16:28:20',	'2021-04-18 16:31:20',	'129226ce',	NULL,	'N'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:28:40',	'2021-04-18 16:31:40',	'c2790d8c',	NULL,	'N');

TRUNCATE `mall`;
INSERT INTO `mall` (`mall_id`, `user_id`, `date_create`, `mall_name`, `contact`, `category_name`, `address`, `latitude`, `longitude`, `thumbnail`, `evaluate_average`, `recommend_count`, `is_active`, `gate_location`) VALUES
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:30:38',	'끝돈',	NULL,	'한식',	'대구 북구 산격동 1321-2',	35.894697690918576,	128.6112701960862,	NULL,	NULL,	0,	'Y',	NULL);

TRUNCATE `menu`;

TRUNCATE `my_recommend`;

TRUNCATE `report`;

TRUNCATE `review`;

TRUNCATE `suggestion`;

TRUNCATE `suggestion_reply`;

TRUNCATE `user`;
INSERT INTO `user` (`user_id`, `user_name`, `password`, `display_name`, `mail_address`, `date_create`, `is_active`) VALUES
('1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	'test',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'test',	'asdf@asdf.com',	'2021-04-18 16:28:20',	'Y'),
('72cbb603-0594-4cf3-b38b-0fd2719ef963',	'hbjs',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'hbjs',	'asdf@asdf.com',	'2021-04-18 16:28:40',	'Y');

TRUNCATE `user_role`;
INSERT INTO `user_role` (`user_id`, `user_role_group_id`) VALUES
('1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	2),
('72cbb603-0594-4cf3-b38b-0fd2719ef963',	2);

TRUNCATE `user_role_authority`;

TRUNCATE `user_role_group`;
INSERT INTO `user_role_group` (`user_role_group_id`, `name`, `description`) VALUES
(1,	'ADMIN',	'모든 권한'),
(2,	'NON_AUTH_USER',	'메일 비인증 사용자'),
(3,	'AUTH_USER',	'메일 인증 사용자');

TRUNCATE `user_token`;
INSERT INTO `user_token` (`user_token_id`, `user_id`, `date_create`, `access_point`) VALUES
('9bdebd39-a294-486d-b030-60b445e178b5',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:28:43',	'insomnia/2021.2.2');

-- 2021-04-18 07:31:02