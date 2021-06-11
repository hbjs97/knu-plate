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
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:28:40',	'2021-04-18 16:31:40',	'c2790d8c',	NULL,	'N'),
(3,	'e27b8491-77bd-4652-8eae-b1d07f1224da',	'2021-04-21 21:27:27',	'2021-04-21 21:30:27',	'8bb7d081',	NULL,	'N'),
(4,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-04-21 21:59:48',	'2021-04-21 22:02:48',	'08daff34',	NULL,	'N'),
(5,	'85a67213-dbf1-41cd-bafb-50b1fd1ef188',	'2021-04-21 22:02:32',	'2021-04-21 22:05:32',	'1e737a7b',	NULL,	'N'),
(6,	'5d88b090-044f-4291-8d71-07cac44337d2',	'2021-04-21 22:04:39',	'2021-04-21 22:07:39',	'1e9da346',	NULL,	'N'),
(7,	'276f73f9-8dbd-4a38-8344-331d6c5c51d1',	'2021-04-21 22:07:27',	'2021-04-21 22:10:27',	'30794565',	NULL,	'N'),
(8,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-04-21 22:09:42',	'2021-04-21 22:12:42',	'ab9c9594',	NULL,	'N');

TRUNCATE `mall`;
INSERT INTO `mall` (`mall_id`, `user_id`, `date_create`, `mall_name`, `contact`, `category_name`, `address`, `latitude`, `longitude`, `thumbnail`, `evaluate_average`, `recommend_count`, `is_active`, `gate_location`) VALUES
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:30:38',	'끝돈',	NULL,	'한식',	'대구 북구 산격동 1321-2',	35.894697690918576,	128.6112701960862,	NULL,	4.5,	1,	'Y',	NULL),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:37:39',	'반미리코',	NULL,	'세계 음식',	'대구 북구 산격동 1321-5',	35.8946462818903,	128.611072021845,	NULL,	NULL,	0,	'Y',	NULL),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:38:26',	'메타피자 경대점',	NULL,	'양식',	'대구 북구 산격동 1328-5',	35.89404622954,	128.610661169814,	NULL,	NULL,	0,	'Y',	NULL),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:39:29',	'맘스터치 경북대점',	NULL,	'세계 음식',	'대구 북구 산격동 1393-25',	35.8928210820776,	128.608749237664,	NULL,	NULL,	0,	'Y',	NULL);

TRUNCATE `menu`;
INSERT INTO `menu` (`menu_id`, `mall_id`, `menu_name`, `like`, `dislike`, `date_create`) VALUES
(1,	2,	'백반',	2,	0,	'2021-04-19 16:31:31'),
(2,	2,	'삼겹살',	1,	1,	'2021-04-19 17:02:18');

TRUNCATE `menu_list`;
INSERT INTO `menu_list` (`menu_list_id`, `review_id`, `menu_id`) VALUES
(1,	1,	1),
(2,	1,	2),
(3,	2,	1),
(4,	2,	2);

TRUNCATE `my_recommend`;
INSERT INTO `my_recommend` (`recommend_id`, `user_id`, `mall_id`, `date_create`, `is_active`) VALUES
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-20 13:41:57',	'Y'),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	4,	'2021-04-20 14:07:17',	'Y'),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	3,	'2021-04-20 14:07:27',	'Y'),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	5,	'2021-04-20 14:07:29',	'Y');

TRUNCATE `report`;

TRUNCATE `review`;
INSERT INTO `review` (`review_id`, `user_id`, `mall_id`, `date_create`, `contents`, `evaluate`, `review_image`, `is_active`) VALUES
(1,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-19 20:53:10',	'review1',	4,	NULL,	'Y'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-19 20:54:49',	'review1',	5,	NULL,	'Y');

TRUNCATE `suggestion`;
INSERT INTO `suggestion` (`suggestion_id`, `user_id`, `title`, `contents`, `date_create`) VALUES
(1,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion title',	'suggestion contents1',	'2021-06-11 22:31:18'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion title2',	'suggestion contents2',	'2021-06-11 22:31:25'),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion title3',	'suggestion contents3',	'2021-06-11 22:31:27'),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion title4',	'suggestion contents4',	'2021-06-11 22:31:29'),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion title5',	'suggestion contents5',	'2021-06-11 22:31:31');

TRUNCATE `suggestion_reply`;

TRUNCATE `user`;
INSERT INTO `user` (`user_id`, `user_name`, `password`, `display_name`, `mail_address`, `date_create`, `is_active`, `medal_id`, `user_thumbnail`) VALUES
('1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	'test',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'test',	'asdf@asdf.com',	'2021-04-18 16:28:20',	'Y',	3,	NULL),
('276f73f9-8dbd-4a38-8344-331d6c5c51d1',	'kevink2',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevnki2',	'kevin2kim26@knu.ac.kr',	'2021-04-21 22:07:27',	'Y',	3,	NULL),
('3c3032ce-21b5-4905-8607-6259d1f4a642',	'kevinkim',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevinkim',	'kevinkim2586@knu.ac.kr',	'2021-04-21 21:59:48',	'Y',	3,	NULL),
('5d88b090-044f-4291-8d71-07cac44337d2',	'kevink',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevnki',	'kevinkim26@knu.ac.kr',	'2021-04-21 22:04:39',	'Y',	3,	NULL),
('6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'alexding',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'alexding',	'alexding@knu.ac.kr',	'2021-04-21 22:09:42',	'Y',	3,	NULL),
('72cbb603-0594-4cf3-b38b-0fd2719ef963',	'hbjs',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'hbjs',	'asdf@asdf.com',	'2021-04-18 16:28:40',	'Y',	3,	NULL),
('85a67213-dbf1-41cd-bafb-50b1fd1ef188',	'kevinki',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevinki',	'kevinkim256@knu.ac.kr',	'2021-04-21 22:02:32',	'Y',	3,	NULL),
('e27b8491-77bd-4652-8eae-b1d07f1224da',	'kevinkim2222',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevin2323',	'kevinkim2586@gmail.com',	'2021-04-21 21:27:27',	'Y',	3,	NULL);

TRUNCATE `user_medal_info`;
INSERT INTO `user_medal_info` (`medal_id`, `description`) VALUES
(1,	'금메달, 댓글 50회이상 등록'),
(2,	'은메달, 댓글 10회이상 등록'),
(3,	'동메달, 기본');

TRUNCATE `user_role`;
INSERT INTO `user_role` (`user_id`, `user_role_group_id`) VALUES
('1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	2),
('276f73f9-8dbd-4a38-8344-331d6c5c51d1',	2),
('3c3032ce-21b5-4905-8607-6259d1f4a642',	2),
('5d88b090-044f-4291-8d71-07cac44337d2',	2),
('6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	2),
('72cbb603-0594-4cf3-b38b-0fd2719ef963',	2),
('85a67213-dbf1-41cd-bafb-50b1fd1ef188',	2),
('e27b8491-77bd-4652-8eae-b1d07f1224da',	2);

TRUNCATE `user_role_authority`;

TRUNCATE `user_role_group`;
INSERT INTO `user_role_group` (`user_role_group_id`, `name`, `description`) VALUES
(1,	'ADMIN',	'모든 권한'),
(2,	'NON_AUTH_USER',	'메일 비인증 사용자'),
(3,	'AUTH_USER',	'메일 인증 사용자');

TRUNCATE `user_token`;
INSERT INTO `user_token` (`user_token_id`, `user_id`, `date_create`, `access_point`) VALUES
('164e03db-6bcc-44a1-b1a6-bd2b4a3ad135',	'85a67213-dbf1-41cd-bafb-50b1fd1ef188',	'2021-04-22 15:14:28',	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'),
('9a63c19c-c84c-4783-8287-1092a42cc93b',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-11 22:24:22',	'insomnia/2021.3.0'),
('c5467364-d47c-4529-b2f8-dbe6d8469852',	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-04-22 15:07:02',	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36');

-- 2021-06-11 13:43:48