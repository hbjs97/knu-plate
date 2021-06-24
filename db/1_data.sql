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
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:30:38',	'끝돈',	NULL,	'한식',	'대구 북구 산격동 1321-2',	35.894697690918576,	128.6112701960862,	NULL,	4.25,	1,	'Y',	NULL),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:37:39',	'반미리코',	NULL,	'세계 음식',	'대구 북구 산격동 1321-5',	35.8946462818903,	128.611072021845,	NULL,	NULL,	0,	'Y',	NULL),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:38:26',	'메타피자 경대점',	NULL,	'양식',	'대구 북구 산격동 1328-5',	35.89404622954,	128.610661169814,	NULL,	NULL,	0,	'Y',	NULL),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:39:29',	'맘스터치 경북대점',	NULL,	'세계 음식',	'대구 북구 산격동 1393-25',	35.8928210820776,	128.608749237664,	NULL,	NULL,	0,	'Y',	NULL),
(6,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-18 15:34:35',	'벨로',	NULL,	'양식',	'대구 북구 산격동 1325-7',	35.8944306435981,	128.610487331345,	'067f745d-618e-46c6-a579-929cb1163916',	NULL,	0,	'Y',	'북문'),
(7,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-24 14:24:46',	'써브웨이 대구경북대북문',	NULL,	'세계 음식',	'대구 북구 산격동 1335-4',	35.8930999909325,	128.60945479841425,	NULL,	NULL,	0,	'Y',	'북문'),
(8,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-24 15:24:00',	'끝소 경북대직영점',	NULL,	'한식',	'대구 북구 산격동 1308-6',	35.8947388667741,	128.610887840566,	NULL,	NULL,	0,	'Y',	'북문');

TRUNCATE `menu`;
INSERT INTO `menu` (`menu_id`, `mall_id`, `menu_name`, `like`, `dislike`, `date_create`) VALUES
(1,	2,	'백반',	4,	0,	'2021-04-19 16:31:31'),
(2,	2,	'삼겹살',	3,	1,	'2021-04-19 17:02:18'),
(3,	2,	'스파게티',	1,	0,	'2021-06-18 15:38:31'),
(4,	2,	'루꼴라피자',	2,	0,	'2021-06-18 15:38:31'),
(5,	2,	'스콘',	1,	0,	'2021-06-18 16:35:06'),
(6,	2,	'독일소세지',	1,	0,	'2021-06-19 11:34:32'),
(7,	2,	'하이볼',	1,	0,	'2021-06-24 14:03:36'),
(8,	2,	'술',	1,	0,	'2021-06-24 14:03:36'),
(9,	2,	'새우구이',	1,	0,	'2021-06-24 14:07:16');

TRUNCATE `menu_list`;
INSERT INTO `menu_list` (`menu_list_id`, `review_id`, `menu_id`) VALUES
(1,	1,	1),
(2,	1,	2),
(3,	2,	1),
(4,	2,	2),
(5,	3,	3),
(6,	3,	4),
(7,	4,	5),
(8,	5,	1),
(9,	6,	6),
(10,	7,	2),
(11,	8,	7),
(12,	8,	8),
(13,	9,	9),
(14,	10,	1),
(15,	11,	4),
(16,	12,	2);

TRUNCATE `my_recommend`;
INSERT INTO `my_recommend` (`recommend_id`, `user_id`, `mall_id`, `date_create`, `is_active`) VALUES
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-20 13:41:57',	'Y'),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	4,	'2021-04-20 14:07:17',	'Y'),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	3,	'2021-04-20 14:07:27',	'Y'),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	5,	'2021-04-20 14:07:29',	'Y');

TRUNCATE `report`;
INSERT INTO `report` (`report_id`, `user_id`, `review_id`, `date_create`, `reason`, `result`) VALUES
(1,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	1,	'2021-06-18 14:28:53',	'욕설 포',	'proceeding'),
(2,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	1,	'2021-06-18 14:30:25',	'욕설 포',	'proceeding'),
(3,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	4,	'2021-06-18 16:57:58',	'나빠요 ㅠㅠ',	'proceeding'),
(4,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	4,	'2021-06-18 16:59:29',	'욕을 썼어요',	'proceeding'),
(5,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	3,	'2021-06-18 17:18:46',	'신고합니다',	'proceeding');

TRUNCATE `review`;
INSERT INTO `review` (`review_id`, `user_id`, `mall_id`, `date_create`, `contents`, `evaluate`, `review_image`, `is_active`) VALUES
(1,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-19 20:53:10',	'review1',	4,	NULL,	'Y'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-19 20:54:49',	'review1',	5,	NULL,	'Y'),
(3,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-18 15:38:33',	'진짜 맛있었어요! 가성비 갑',	5,	'0592611c-667b-40ba-9baa-2fbddd551a02',	'Y'),
(4,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-18 16:35:06',	'진짜 굿굿',	5,	'fe2c403c-29ff-415e-8dec-d2a7a3f7c431',	'Y'),
(5,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-18 16:35:46',	'그냥 그랬어요',	3,	NULL,	'Y'),
(6,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-19 11:34:34',	'상당히 좋았어요',	4,	'0c2fd354-b190-48df-b7e4-8f9eaef9aee9',	'Y'),
(7,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-19 15:13:22',	'꽤 괜찮았습니다. 가성비 좋아요 ㅎㅎ ',	4,	NULL,	'Y'),
(8,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 14:03:40',	'아주 굿굿 분위기도 좋아요',	5,	'2d5bc1d0-f487-468c-ac30-2e5f437a87b4',	'Y'),
(9,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 14:07:17',	'아주 좋았어요 가성비 굿굿 ㅎㅎ',	4,	'adb723e7-2486-4fef-a049-38cf52eee9aa',	'Y'),
(10,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 15:26:41',	'위생도 좋고 사장님도 친절하세요. 사람들이 더 알았으면 좋겠네요! 일주일에 최소 2번 이상은 방문 할 것 같습니다 ㅎㅎ',	4,	'97adb449-5e5f-4421-8df8-42410e45b247',	'Y'),
(11,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 15:38:00',	'꽤 만족스러웠다',	4,	'8e824e4e-43f3-4dab-9614-2971c8050ddd',	'Y'),
(12,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	2,	'2021-06-24 16:11:53',	'가성비 값 ㅎㅎ',	4,	NULL,	'Y');

TRUNCATE `suggestion`;
INSERT INTO `suggestion` (`suggestion_id`, `user_id`, `contents`, `date_create`) VALUES
(1,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion contents1',	'2021-06-11 22:31:18'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion contents2',	'2021-06-11 22:31:25'),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion contents3',	'2021-06-11 22:31:27'),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion contents4',	'2021-06-11 22:31:29'),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion contents5',	'2021-06-11 22:31:31'),
(6,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'앱 디자인이 좀 더 좋았으면 좋겠씁니다 ',	'2021-06-18 14:37:14'),
(7,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'suggestion contents5',	'2021-06-19 19:07:59'),
(8,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'개선 부탁합니다잉',	'2021-06-23 16:55:38'),
(9,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'앱 디자인이 좀 더 좋았으면 좋겠씁니다 ',	'2021-06-24 14:13:26');

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

-- 2021-06-18 14:18:36