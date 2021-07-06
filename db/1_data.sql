-- Adminer 4.7.4 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

TRUNCATE `dashboard`;
INSERT INTO `dashboard` (`dashboard_id`, `year`, `month`, `date`, `report_count`, `suggestion_count`, `mall_count`, `review_count`, `user_count`) VALUES
(2,	'2021',	7,	4,	3,	5,	1,	2,	1),
(3,	'2021',	7,	5,	4,	7,	3,	6,	6),
(4,	'2021',	7,	6,	5,	12,	18,	22,	11);

TRUNCATE `file`;
INSERT INTO `file` (`file_id`, `index`, `path`, `original_name`, `file_folder_id`, `uploader`, `size`, `extension`, `date_create`, `checksum`) VALUES
('01d41cc8-b31a-4703-a48e-3f21735bab29',	35,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/d1503fb3-553f-4256-9a71-6c6cea8bb180/01d41cc8-b31a-4703-a48e-3f21735bab29',	'F40D534C-E844-4F4B-B894-C33ECD1A20B8.jpeg',	'd1503fb3-553f-4256-9a71-6c6cea8bb180',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'1164811',	'jpeg',	'2021-07-05 15:58:03',	NULL),
('0537f3b7-a83a-4c30-b2b5-fd67d071fc31',	7,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/e90cd533-b915-4194-8fd4-d4887d4e56fb/0537f3b7-a83a-4c30-b2b5-fd67d071fc31',	'cron.png',	'e90cd533-b915-4194-8fd4-d4887d4e56fb',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-06-28 09:37:57',	NULL),
('2dff6214-c04d-4ddf-801b-44b956b581fe',	9,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/eda463ef-79c6-4901-80ad-d57edc99d472/2dff6214-c04d-4ddf-801b-44b956b581fe',	'cron.png',	'eda463ef-79c6-4901-80ad-d57edc99d472',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-06-28 09:38:20',	NULL),
('36a12652-e137-499a-b81e-293d9c04e80f',	13,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/bbca0459-2390-438d-bffa-18f30579e3cf/36a12652-e137-499a-b81e-293d9c04e80f',	'container.jpg',	'bbca0459-2390-438d-bffa-18f30579e3cf',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-06-28 09:42:04',	NULL),
('4021659d-f20d-48f5-8fdf-10481279a0ec',	1,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/f42abdfe-fba5-4bda-b49b-2bf8e778e849/4021659d-f20d-48f5-8fdf-10481279a0ec',	'docker_swarm.png',	'f42abdfe-fba5-4bda-b49b-2bf8e778e849',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'123625',	'png',	'2021-06-26 10:14:26',	NULL),
('487744f0-144d-4c53-bb85-a7589f42a791',	4,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/a7c927db-eab2-44d8-a780-173bd8192bab/487744f0-144d-4c53-bb85-a7589f42a791',	'container.jpg',	'a7c927db-eab2-44d8-a780-173bd8192bab',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-06-28 09:37:48',	NULL),
('4c07cee1-0178-4e31-9a8d-33305ef80c26',	6,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/e90cd533-b915-4194-8fd4-d4887d4e56fb/4c07cee1-0178-4e31-9a8d-33305ef80c26',	'container.jpg',	'e90cd533-b915-4194-8fd4-d4887d4e56fb',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-06-28 09:37:57',	NULL),
('4ef8bccc-6c24-4ef2-862c-6bb1c1d84972',	31,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/87e8588f-e3c3-439f-82cf-6eeda72787fd/4ef8bccc-6c24-4ef2-862c-6bb1c1d84972',	'9A01624D-450E-408C-95FC-2C2DD9F3BF46.jpeg',	'87e8588f-e3c3-439f-82cf-6eeda72787fd',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'887980',	'jpeg',	'2021-07-05 15:55:09',	NULL),
('6b34eff9-0955-4778-9dfa-8064c98a1f76',	15,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/3b83a642-1bbd-4a2c-ae7a-6403703c9983/6b34eff9-0955-4778-9dfa-8064c98a1f76',	'663D41DA-847C-448E-B1FF-A2087FCCCF3C.jpeg',	'3b83a642-1bbd-4a2c-ae7a-6403703c9983',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'880028',	'jpeg',	'2021-06-28 17:15:53',	NULL),
('6d4570a5-3570-418d-b9e0-7f046be84935',	22,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/b2211ab2-6720-478d-abfe-0f888a6d11a0/6d4570a5-3570-418d-b9e0-7f046be84935',	'container.jpg',	'b2211ab2-6720-478d-abfe-0f888a6d11a0',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-07-04 21:21:53',	NULL),
('77f1c022-0213-4173-ab38-41b9ae8d42dc',	18,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/58294a66-b75b-4332-b180-f1d8336e570b/77f1c022-0213-4173-ab38-41b9ae8d42dc',	'container.jpg',	'58294a66-b75b-4332-b180-f1d8336e570b',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-07-04 21:04:15',	NULL),
('7aa2e6f3-e4c2-47db-a026-38fad6fc3c44',	11,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/ac32cb81-981f-437f-a853-61d5f56bb7f0/7aa2e6f3-e4c2-47db-a026-38fad6fc3c44',	'cron.png',	'ac32cb81-981f-437f-a853-61d5f56bb7f0',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-06-28 09:40:58',	NULL),
('8347b057-f92e-4566-a110-3e5d02e17b7d',	16,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/f5a04b21-425a-4afd-ba3d-144e3cc8ef2b/8347b057-f92e-4566-a110-3e5d02e17b7d',	'8B78FC0F-64CA-4CCD-B327-48AC145D6423.jpeg',	'f5a04b21-425a-4afd-ba3d-144e3cc8ef2b',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'1467717',	'jpeg',	'2021-07-01 12:07:10',	NULL),
('88e05b79-c528-496d-81e4-231666c02f90',	2,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/f42abdfe-fba5-4bda-b49b-2bf8e778e849/88e05b79-c528-496d-81e4-231666c02f90',	'bitbucket.png',	'f42abdfe-fba5-4bda-b49b-2bf8e778e849',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'10551',	'png',	'2021-06-26 10:14:26',	NULL),
('901f9a14-6d5d-4801-bde5-241d3f7e79d8',	10,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/ac32cb81-981f-437f-a853-61d5f56bb7f0/901f9a14-6d5d-4801-bde5-241d3f7e79d8',	'container.jpg',	'ac32cb81-981f-437f-a853-61d5f56bb7f0',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-06-28 09:40:58',	NULL),
('9aba2462-5eda-415c-a8a7-45a189e8e53b',	32,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/3dcf8fc7-23ae-41b6-87b5-8a2b5bf8fc89/9aba2462-5eda-415c-a8a7-45a189e8e53b',	'42822AE4-6CFF-4465-B476-A25255F693BB.jpeg',	'3dcf8fc7-23ae-41b6-87b5-8a2b5bf8fc89',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'1064961',	'jpeg',	'2021-07-05 15:55:35',	NULL),
('9b32b5dd-9c1e-496b-83fb-0f26d4957777',	17,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/01c8dbe9-4884-44fd-ab8a-244cfc83ece4/9b32b5dd-9c1e-496b-83fb-0f26d4957777',	'container.jpg',	'01c8dbe9-4884-44fd-ab8a-244cfc83ece4',	'7dcc0400-3fb6-44cb-b951-cd9220527070',	'25718',	'jpg',	'2021-07-03 16:21:43',	NULL),
('9d2f3324-0621-4fef-8d89-f68ee8209229',	12,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/2f98a9a2-3b4e-40e9-b377-510092f7a57d/9d2f3324-0621-4fef-8d89-f68ee8209229',	'container.jpg',	'2f98a9a2-3b4e-40e9-b377-510092f7a57d',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-06-28 09:41:53',	NULL),
('a9ce1ef9-192e-42b1-9a81-ba8a518813f0',	21,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/321ff655-bfc7-4cba-8992-215d6529ad5d/a9ce1ef9-192e-42b1-9a81-ba8a518813f0',	'cron.png',	'321ff655-bfc7-4cba-8992-215d6529ad5d',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-07-04 21:05:24',	NULL),
('ac2ab434-7c93-4fed-b260-86940570479d',	34,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/0d2f6d11-6b89-487a-b797-92e27598c212/ac2ab434-7c93-4fed-b260-86940570479d',	'2506412C-CDB1-401C-8D06-146A326AAB8F.jpeg',	'0d2f6d11-6b89-487a-b797-92e27598c212',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'595986',	'jpeg',	'2021-07-05 15:56:18',	NULL),
('b13c6ad3-143a-46fa-9c2f-ec5d3d4920ce',	8,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/eda463ef-79c6-4901-80ad-d57edc99d472/b13c6ad3-143a-46fa-9c2f-ec5d3d4920ce',	'container.jpg',	'eda463ef-79c6-4901-80ad-d57edc99d472',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-06-28 09:38:20',	NULL),
('b3d5f4de-365d-4ab4-9ed1-9ab8d7c07183',	20,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/321ff655-bfc7-4cba-8992-215d6529ad5d/b3d5f4de-365d-4ab4-9ed1-9ab8d7c07183',	'container.jpg',	'321ff655-bfc7-4cba-8992-215d6529ad5d',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'25718',	'jpg',	'2021-07-04 21:05:24',	NULL),
('b652ddd4-b57d-4b29-9bf6-d65432eb7e27',	5,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/a7c927db-eab2-44d8-a780-173bd8192bab/b652ddd4-b57d-4b29-9bf6-d65432eb7e27',	'cron.png',	'a7c927db-eab2-44d8-a780-173bd8192bab',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-06-28 09:37:48',	NULL),
('b8e46de1-c968-46a1-a6ea-9ca58533f2f5',	19,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/58294a66-b75b-4332-b180-f1d8336e570b/b8e46de1-c968-46a1-a6ea-9ca58533f2f5',	'cron.png',	'58294a66-b75b-4332-b180-f1d8336e570b',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-07-04 21:04:15',	NULL),
('d15900ac-a658-483a-9500-37d834b47bf0',	33,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/a134603c-600c-42eb-b5d2-e310cefb1d48/d15900ac-a658-483a-9500-37d834b47bf0',	'8B81AE9D-F716-42F6-BD32-1F04ADE09845.jpeg',	'a134603c-600c-42eb-b5d2-e310cefb1d48',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'966952',	'jpeg',	'2021-07-05 15:56:01',	NULL),
('df44f53d-3a46-4648-a28b-dbeb3b380f82',	25,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/a76720ce-60ac-410e-902e-342d29b91dbb/df44f53d-3a46-4648-a28b-dbeb3b380f82',	'834882EC-F30E-4459-9C17-FF9B3AD4CD5A.jpeg',	'a76720ce-60ac-410e-902e-342d29b91dbb',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'788769',	'jpeg',	'2021-07-05 15:49:57',	NULL),
('e54c564c-2de7-4da7-a8e6-a2ec297df78b',	14,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/bbca0459-2390-438d-bffa-18f30579e3cf/e54c564c-2de7-4da7-a8e6-a2ec297df78b',	'cron.png',	'bbca0459-2390-438d-bffa-18f30579e3cf',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-06-28 09:42:04',	NULL),
('e80128d0-9781-47c3-98d1-6783ae9d0b31',	23,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/b2211ab2-6720-478d-abfe-0f888a6d11a0/e80128d0-9781-47c3-98d1-6783ae9d0b31',	'cron.png',	'b2211ab2-6720-478d-abfe-0f888a6d11a0',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'5395',	'png',	'2021-07-04 21:21:53',	NULL),
('f80de88a-9403-4c86-9754-86d49342e6f6',	3,	'https://hbjs-kuchelin-guide.s3.ap-northeast-2.amazonaws.com/4423d22b-50b7-4429-ac28-b4d0cbcf7fbc/f80de88a-9403-4c86-9754-86d49342e6f6',	'jenkins.png',	'4423d22b-50b7-4429-ac28-b4d0cbcf7fbc',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'77771',	'png',	'2021-06-26 11:56:24',	NULL);

TRUNCATE `file_folder`;
INSERT INTO `file_folder` (`file_folder_id`, `date_create`, `type`) VALUES
('01c8dbe9-4884-44fd-ab8a-244cfc83ece4',	'2021-07-03 16:21:43',	'user_thumbnail'),
('0d2f6d11-6b89-487a-b797-92e27598c212',	'2021-07-05 15:56:18',	'thumbnail'),
('2f98a9a2-3b4e-40e9-b377-510092f7a57d',	'2021-06-28 09:41:53',	'review_image'),
('321ff655-bfc7-4cba-8992-215d6529ad5d',	'2021-07-04 21:05:24',	'review_image'),
('3b83a642-1bbd-4a2c-ae7a-6403703c9983',	'2021-06-28 17:15:53',	'user_thumbnail'),
('3dcf8fc7-23ae-41b6-87b5-8a2b5bf8fc89',	'2021-07-05 15:55:35',	'thumbnail'),
('4423d22b-50b7-4429-ac28-b4d0cbcf7fbc',	'2021-06-26 11:56:24',	'user_thumbnail'),
('58294a66-b75b-4332-b180-f1d8336e570b',	'2021-07-04 21:04:15',	'review_image'),
('87e8588f-e3c3-439f-82cf-6eeda72787fd',	'2021-07-05 15:55:09',	'thumbnail'),
('a134603c-600c-42eb-b5d2-e310cefb1d48',	'2021-07-05 15:56:01',	'thumbnail'),
('a76720ce-60ac-410e-902e-342d29b91dbb',	'2021-07-05 15:49:57',	'thumbnail'),
('a7c927db-eab2-44d8-a780-173bd8192bab',	'2021-06-28 09:37:48',	'review_image'),
('ac32cb81-981f-437f-a853-61d5f56bb7f0',	'2021-06-28 09:40:58',	'review_image'),
('b2211ab2-6720-478d-abfe-0f888a6d11a0',	'2021-07-04 21:21:53',	'review_image'),
('bbca0459-2390-438d-bffa-18f30579e3cf',	'2021-06-28 09:42:04',	'review_image'),
('d1503fb3-553f-4256-9a71-6c6cea8bb180',	'2021-07-05 15:58:03',	'thumbnail'),
('e90cd533-b915-4194-8fd4-d4887d4e56fb',	'2021-06-28 09:37:57',	'review_image'),
('eda463ef-79c6-4901-80ad-d57edc99d472',	'2021-06-28 09:38:20',	'review_image'),
('f42abdfe-fba5-4bda-b49b-2bf8e778e849',	'2021-06-26 10:14:26',	'thumbnail'),
('f5a04b21-425a-4afd-ba3d-144e3cc8ef2b',	'2021-07-01 12:07:10',	'review_image');

TRUNCATE `mail_auth`;
INSERT INTO `mail_auth` (`mail_auth_id`, `user_id`, `date_create`, `date_expire`, `auth_code`, `date_auth`, `is_auth`) VALUES
(1,	'1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	'2021-04-18 16:28:20',	'2021-04-18 16:31:20',	'129226ce',	NULL,	'N'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:28:40',	'2021-04-18 16:31:40',	'c2790d8c',	NULL,	'N'),
(3,	'e27b8491-77bd-4652-8eae-b1d07f1224da',	'2021-04-21 21:27:27',	'2021-04-21 21:30:27',	'8bb7d081',	NULL,	'N'),
(4,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-04-21 21:59:48',	'2021-04-21 22:02:48',	'08daff34',	NULL,	'N'),
(5,	'85a67213-dbf1-41cd-bafb-50b1fd1ef188',	'2021-04-21 22:02:32',	'2021-04-21 22:05:32',	'1e737a7b',	NULL,	'N'),
(6,	'5d88b090-044f-4291-8d71-07cac44337d2',	'2021-04-21 22:04:39',	'2021-04-21 22:07:39',	'1e9da346',	NULL,	'N'),
(7,	'276f73f9-8dbd-4a38-8344-331d6c5c51d1',	'2021-04-21 22:07:27',	'2021-04-21 22:10:27',	'30794565',	NULL,	'N'),
(8,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-04-21 22:09:42',	'2021-04-21 22:12:42',	'ab9c9594',	NULL,	'N'),
(9,	'b0d8b17b-e1de-4a45-98e3-635d424cf549',	'2021-07-01 14:53:36',	'2021-07-01 14:56:17',	'4d4b0bda',	NULL,	'N'),
(10,	'20f46525-f8e4-4251-b72e-35040c25bdc4',	'2021-07-01 16:42:54',	'2021-07-01 16:45:54',	'f5fcfec8',	NULL,	'N'),
(11,	'7dcc0400-3fb6-44cb-b951-cd9220527070',	'2021-07-03 16:21:43',	'2021-07-03 16:24:34',	'7a0d5a2c',	NULL,	'N');

TRUNCATE `mall`;
INSERT INTO `mall` (`mall_id`, `user_id`, `date_create`, `mall_name`, `contact`, `category_name`, `address`, `latitude`, `longitude`, `thumbnail`, `evaluate_average`, `recommend_count`, `is_active`, `gate_location`) VALUES
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-18 16:30:38',	'끝돈',	NULL,	'한식',	'대구 북구 산격동 1321-2',	35.894697690918576,	128.6112701960862,	'2f98a9a2-3b4e-40e9-b377-510092f7a57d',	4.173913043478261,	1,	'Y',	NULL),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:37:39',	'반미리코',	NULL,	'세계 음식',	'대구 북구 산격동 1321-5',	35.8946462818903,	128.611072021845,	NULL,	NULL,	0,	'Y',	NULL),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:38:26',	'메타피자 경대점',	NULL,	'양식',	'대구 북구 산격동 1328-5',	35.89404622954,	128.610661169814,	NULL,	NULL,	0,	'Y',	NULL),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-04-19 09:39:29',	'맘스터치 경북대점',	NULL,	'세계 음식',	'대구 북구 산격동 1393-25',	35.8928210820776,	128.608749237664,	NULL,	NULL,	0,	'Y',	'서문'),
(6,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-18 15:34:35',	'벨로',	NULL,	'양식',	'대구 북구 산격동 1325-7',	35.8944306435981,	128.610487331345,	'067f745d-618e-46c6-a579-929cb1163916',	NULL,	0,	'Y',	'북문'),
(7,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-24 14:24:46',	'써브웨이 대구경북대북문',	NULL,	'세계 음식',	'대구 북구 산격동 1335-4',	35.8930999909325,	128.60945479841425,	NULL,	NULL,	0,	'Y',	'북문'),
(8,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-24 15:24:00',	'끝소 경북대직영점',	NULL,	'한식',	'대구 북구 산격동 1308-6',	35.8947388667741,	128.610887840566,	NULL,	NULL,	0,	'Y',	'북문'),
(9,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 10:14:26',	'할리스 경북대북문점',	NULL,	'카페',	'대구 북구 산격동 1393-11',	35.8926839682366,	128.608759752586,	'f42abdfe-fba5-4bda-b49b-2bf8e778e849',	NULL,	0,	'Y',	'북문'),
(10,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-06-28 17:14:08',	'낭만놀이',	NULL,	'카페',	'대구 북구 산격동 1309-15',	35.8944296913021,	128.609751944204,	NULL,	NULL,	0,	'Y',	'북문'),
(11,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:48:34',	'왕추찜닭 본점',	NULL,	'한식',	'대구 북구 대현동 257-15',	35.8880982778814,	128.603152145921,	NULL,	NULL,	0,	'Y',	'서문'),
(12,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:49:57',	'베를린버거',	NULL,	'양식',	'대구 북구 산격동 1327-13',	35.893524742002,	128.608960606417,	'a76720ce-60ac-410e-902e-342d29b91dbb',	NULL,	0,	'Y',	'북문'),
(13,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:55:09',	'앞치마입는남자',	NULL,	'양식',	'대구 북구 산격동 1312-10',	35.8950310545585,	128.609393112425,	'87e8588f-e3c3-439f-82cf-6eeda72787fd',	NULL,	0,	'Y',	'북문'),
(14,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:55:35',	'태산분식',	NULL,	'세계 음식',	'대구 북구 산격동 1265-20',	35.89685820446493,	128.61116668971306,	'3dcf8fc7-23ae-41b6-87b5-8a2b5bf8fc89',	NULL,	0,	'Y',	'북문'),
(15,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:56:01',	'고니식탁',	NULL,	'한식',	'대구 북구 산격동 1393-13',	35.892601279566,	128.608474570478,	'a134603c-600c-42eb-b5d2-e310cefb1d48',	NULL,	0,	'Y',	'북문'),
(16,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:56:18',	'마사',	NULL,	'일식',	'대구 북구 산격동 1414-1',	35.8924458015572,	128.607164628631,	'0d2f6d11-6b89-487a-b797-92e27598c212',	NULL,	0,	'Y',	'북문'),
(17,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 15:58:03',	'나이스샤워 경대북문점',	NULL,	'일식',	'대구 북구 산격동 1397-42',	35.8933932198759,	128.607746375079,	'd1503fb3-553f-4256-9a71-6c6cea8bb180',	NULL,	0,	'Y',	'북문'),
(18,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-05 22:10:28',	'정선생 경북대점',	NULL,	'술집',	'대구 북구 산격동 1397-15',	35.8926322130062,	128.607779713339,	NULL,	NULL,	0,	'Y',	'북문'),
(19,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-06 11:45:50',	'한신포차 경북대점',	NULL,	'술집',	'대구 북구 산격동 1313-4',	35.8938102617378,	128.609038370788,	NULL,	NULL,	0,	'Y',	'북문');

TRUNCATE `menu`;
INSERT INTO `menu` (`menu_id`, `mall_id`, `menu_name`, `like`, `dislike`, `date_create`) VALUES
(1,	2,	'백반',	15,	0,	'2021-04-19 16:31:31'),
(2,	2,	'삼겹살',	13,	1,	'2021-04-19 17:02:18'),
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
(16,	12,	2),
(17,	13,	1),
(18,	13,	2),
(19,	14,	1),
(20,	14,	2),
(21,	15,	1),
(22,	15,	2),
(23,	16,	1),
(24,	16,	2),
(25,	17,	1),
(26,	17,	2),
(27,	18,	1),
(28,	18,	2),
(29,	19,	1),
(30,	19,	2),
(31,	20,	1),
(32,	21,	1),
(33,	21,	2),
(34,	22,	1),
(35,	22,	2),
(36,	23,	1),
(37,	23,	2);

TRUNCATE `my_recommend`;
INSERT INTO `my_recommend` (`recommend_id`, `user_id`, `mall_id`, `date_create`, `is_active`) VALUES
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-20 13:41:57',	'Y'),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	4,	'2021-04-20 14:07:17',	'Y'),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	3,	'2021-04-20 14:07:27',	'Y'),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	5,	'2021-04-20 14:07:29',	'Y');

TRUNCATE `notice`;
INSERT INTO `notice` (`notice_id`, `user_id`, `date_create`, `title`, `contents`, `is_active`) VALUES
(1,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:40:07',	'notice title 1',	'notice contents 1',	'N'),
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:40:29',	'title 1',	'contents 2',	'Y'),
(3,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:40:37',	'notice title 1',	'notice contents 1',	'Y'),
(4,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:41:49',	'notice title 1',	'notice contents 1',	'Y'),
(5,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:41:52',	'notice title 1',	'notice contents 1',	'Y'),
(6,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:42:09',	'notice title 1',	'notice contents 1',	'Y'),
(7,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-06-26 11:43:08',	'notice title 1',	'notice contents 1',	'Y');

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
(2,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-04-19 20:54:49',	'review1',	5,	NULL,	'N'),
(3,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-18 15:38:33',	'진짜 맛있었어요! 가성비 갑',	5,	'0592611c-667b-40ba-9baa-2fbddd551a02',	'Y'),
(4,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-18 16:35:06',	'진짜 굿굿',	5,	'fe2c403c-29ff-415e-8dec-d2a7a3f7c431',	'Y'),
(5,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-18 16:35:46',	'그냥 그랬어요',	3,	NULL,	'Y'),
(6,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-19 11:34:34',	'상당히 좋았어요',	4,	'0c2fd354-b190-48df-b7e4-8f9eaef9aee9',	'Y'),
(7,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-19 15:13:22',	'꽤 괜찮았습니다. 가성비 좋아요 ㅎㅎ ',	4,	NULL,	'Y'),
(8,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 14:03:40',	'아주 굿굿 분위기도 좋아요',	5,	'2d5bc1d0-f487-468c-ac30-2e5f437a87b4',	'Y'),
(9,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 14:07:17',	'아주 좋았어요 가성비 굿굿 ㅎㅎ',	4,	'adb723e7-2486-4fef-a049-38cf52eee9aa',	'Y'),
(10,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 15:26:41',	'위생도 좋고 사장님도 친절하세요. 사람들이 더 알았으면 좋겠네요! 일주일에 최소 2번 이상은 방문 할 것 같습니다 ㅎㅎ',	4,	'97adb449-5e5f-4421-8df8-42410e45b247',	'Y'),
(11,	'3c3032ce-21b5-4905-8607-6259d1f4a642',	2,	'2021-06-24 15:38:00',	'꽤 만족스러웠다',	4,	'8e824e4e-43f3-4dab-9614-2971c8050ddd',	'Y'),
(12,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	2,	'2021-06-24 16:11:53',	'가성비 값 ㅎㅎ',	4,	NULL,	'Y'),
(13,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:37:49',	'review',	4,	'a7c927db-eab2-44d8-a780-173bd8192bab',	'Y'),
(14,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:37:57',	'review',	4,	'e90cd533-b915-4194-8fd4-d4887d4e56fb',	'Y'),
(15,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:38:37',	'review',	4,	'eda463ef-79c6-4901-80ad-d57edc99d472',	'Y'),
(16,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:41:06',	'review',	4,	'ac32cb81-981f-437f-a853-61d5f56bb7f0',	'Y'),
(17,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:41:48',	'review',	4,	NULL,	'Y'),
(18,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:41:55',	'review',	4,	'2f98a9a2-3b4e-40e9-b377-510092f7a57d',	'Y'),
(19,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-06-28 09:42:04',	'review',	4,	'bbca0459-2390-438d-bffa-18f30579e3cf',	'Y'),
(20,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	2,	'2021-07-01 12:07:10',	'Very very good',	5,	'f5a04b21-425a-4afd-ba3d-144e3cc8ef2b',	'Y'),
(21,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-07-04 21:04:15',	'review',	4,	'58294a66-b75b-4332-b180-f1d8336e570b',	'Y'),
(22,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-07-04 21:05:25',	'review',	4,	'321ff655-bfc7-4cba-8992-215d6529ad5d',	'Y'),
(23,	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	2,	'2021-07-04 21:21:53',	'review',	4,	'b2211ab2-6720-478d-abfe-0f888a6d11a0',	'Y');

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
(9,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'앱 디자인이 좀 더 좋았으면 좋겠씁니다 ',	'2021-06-24 14:13:26'),
(10,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'건의사항 보내기 테스트 ',	'2021-06-28 17:21:56'),
(11,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'Test test',	'2021-06-28 17:23:08'),
(12,	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'건의하고싶어요',	'2021-07-01 11:58:51');

TRUNCATE `user`;
INSERT INTO `user` (`user_id`, `user_name`, `password`, `display_name`, `mail_address`, `date_create`, `is_active`, `medal_id`, `user_thumbnail`) VALUES
('1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	'test',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'test',	'asdf@asdf.com',	'2021-04-18 16:28:20',	'Y',	3,	NULL),
('20f46525-f8e4-4251-b72e-35040c25bdc4',	'hello123',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'hello123',	'hello123@knu.ac.kr',	'2021-07-01 16:42:54',	'Y',	3,	NULL),
('276f73f9-8dbd-4a38-8344-331d6c5c51d1',	'kevink2',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevnki2',	'kevin2kim26@knu.ac.kr',	'2021-04-21 22:07:27',	'Y',	3,	NULL),
('3c3032ce-21b5-4905-8607-6259d1f4a642',	'kevinkim',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevinkim',	'kevinkim2586@knu.ac.kr',	'2021-04-21 21:59:48',	'Y',	3,	NULL),
('5d88b090-044f-4291-8d71-07cac44337d2',	'kevink',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevnki',	'kevinkim26@knu.ac.kr',	'2021-04-21 22:04:39',	'Y',	3,	NULL),
('6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'alexding',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'alexding',	'alexding@knu.ac.kr',	'2021-04-21 22:09:42',	'Y',	3,	'3b83a642-1bbd-4a2c-ae7a-6403703c9983'),
('72cbb603-0594-4cf3-b38b-0fd2719ef963',	'hbjs',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'hbjs',	'junsu@knu.ac.kr',	'2021-04-18 16:28:40',	'Y',	2,	'4423d22b-50b7-4429-ac28-b4d0cbcf7fbc'),
('7dcc0400-3fb6-44cb-b951-cd9220527070',	'hbjs4',	'TrKPCKB8swPI4J3RdDepk7r7YwWmQLd9NWU7T6ztcDoAivkw6/DKN74VrsW02WkVI6eNmdZ9R/Y65ER+rnrA7Q==',	'hbjs4',	'asdf@asdf.com',	'2021-07-03 16:21:42',	'Y',	3,	'01c8dbe9-4884-44fd-ab8a-244cfc83ece4'),
('85a67213-dbf1-41cd-bafb-50b1fd1ef188',	'kevinki',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevinki',	'kevinkim256@knu.ac.kr',	'2021-04-21 22:02:32',	'Y',	3,	NULL),
('b0d8b17b-e1de-4a45-98e3-635d424cf549',	'aaaa',	'2lpJVevDQiywrB03SaXIriGw6hGHUjkDswH64YrkBJNahWgSeMvtWvdM3xXiJnUZVk6i8zt7xiUS4sfkBU2I3Q==',	'aaaa',	'aaa@aaa.com',	'2021-07-01 14:53:36',	'Y',	3,	NULL),
('e27b8491-77bd-4652-8eae-b1d07f1224da',	'kevinkim2222',	'g7uqO+Sp1P/IhhM/7erHhhgQSgVElxH82k89uJi/56braHp9Na4SRC7R9F/NEjfjcgngSLGMayUTaUy8Mi1Ufg==',	'kevin2323',	'kevinkim2586@gmail.com',	'2021-04-21 21:27:27',	'Y',	3,	NULL);

TRUNCATE `user_medal_info`;
INSERT INTO `user_medal_info` (`medal_id`, `description`) VALUES
(1,	'금메달, 댓글 50회이상 등록'),
(2,	'은메달, 댓글 10회이상 등록'),
(3,	'동메달, 기본');

TRUNCATE `user_role`;
INSERT INTO `user_role` (`user_id`, `user_role_group_id`) VALUES
('1aa6a6ea-f52b-4496-b560-5dba4a9aad1c',	2),
('20f46525-f8e4-4251-b72e-35040c25bdc4',	2),
('276f73f9-8dbd-4a38-8344-331d6c5c51d1',	2),
('5d88b090-044f-4291-8d71-07cac44337d2',	2),
('7dcc0400-3fb6-44cb-b951-cd9220527070',	2),
('85a67213-dbf1-41cd-bafb-50b1fd1ef188',	2),
('b0d8b17b-e1de-4a45-98e3-635d424cf549',	2),
('e27b8491-77bd-4652-8eae-b1d07f1224da',	2),
('3c3032ce-21b5-4905-8607-6259d1f4a642',	3),
('6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	3),
('72cbb603-0594-4cf3-b38b-0fd2719ef963',	3);

TRUNCATE `user_role_authority`;
INSERT INTO `user_role_authority` (`user_role_authority_id`, `user_role_group_id`, `name`, `description`, `create_permission`, `read_permission`, `update_permission`, `delete_permission`) VALUES
(100,	1,	'mail_auth',	'관리자 권한',	'Y',	'N',	'Y',	'N'),
(101,	1,	'mall',	'관리자 권한',	'Y',	'Y',	'N',	'Y'),
(102,	1,	'menu',	'관리자 권한',	'Y',	'N',	'Y',	'Y'),
(103,	1,	'notice',	'관리자 권한',	'Y',	'Y',	'Y',	'Y'),
(104,	1,	'report',	'관리자 권한',	'Y',	'Y',	'Y',	'N'),
(105,	1,	'review',	'관리자 권한',	'Y',	'Y',	'N',	'Y'),
(106,	1,	'suggestion',	'관리자 권한',	'Y',	'Y',	'N',	'N'),
(107,	1,	'admin_user',	'관리자 권한',	'Y',	'Y',	'Y',	'Y'),
(200,	2,	'mail_auth',	'메일 비인증 사용자 권한',	'Y',	'N',	'N',	'N'),
(201,	2,	'mall',	'메일 비인증 사용자 권한',	'N',	'Y',	'N',	'N'),
(202,	2,	'menu',	'메일 비인증 사용자 권한',	'N',	'N',	'N',	'N'),
(203,	2,	'notice',	'메일 비인증 사용자 권한',	'N',	'Y',	'N',	'N'),
(204,	2,	'report',	'메일 비인증 사용자 권한',	'N',	'N',	'N',	'N'),
(205,	2,	'review',	'메일 비인증 사용자 권한',	'N',	'Y',	'N',	'N'),
(206,	2,	'suggestion',	'메일 비인증 사용자 권한',	'N',	'N',	'N',	'N'),
(207,	2,	'non_auth_user',	'메일 비인증 사용자 권한',	'Y',	'Y',	'N',	'Y'),
(300,	3,	'mail_auth',	'메일 인증 사용자 권한',	'Y',	'Y',	'Y',	'Y'),
(301,	3,	'mall',	'메일 인증 사용자 권한',	'Y',	'Y',	'Y',	'Y'),
(302,	3,	'menu',	'메일 인증 사용자 권한',	'Y',	'N',	'Y',	'Y'),
(303,	3,	'notice',	'메일 인증 사용자 권한',	'N',	'Y',	'N',	'N'),
(304,	3,	'report',	'메일 인증 사용자 권한',	'N',	'Y',	'Y',	'N'),
(305,	3,	'review',	'메일 인증 사용자 권한',	'Y',	'Y',	'N',	'Y'),
(306,	3,	'suggestion',	'메일 인증 사용자 권한',	'Y',	'Y',	'N',	'N'),
(307,	3,	'auth_user',	'메일 인증 사용자 권한',	'Y',	'Y',	'Y',	'Y');

TRUNCATE `user_role_group`;
INSERT INTO `user_role_group` (`user_role_group_id`, `name`, `description`) VALUES
(1,	'ADMIN',	'관리자'),
(2,	'NON_AUTH_USER',	'메일 비인증 사용자'),
(3,	'AUTH_USER',	'메일 인증 사용자');

TRUNCATE `user_token`;
INSERT INTO `user_token` (`user_token_id`, `user_id`, `date_create`, `access_point`) VALUES
('164e03db-6bcc-44a1-b1a6-bd2b4a3ad135',	'85a67213-dbf1-41cd-bafb-50b1fd1ef188',	'2021-04-22 15:14:28',	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'),
('4d76850f-57e5-4824-896d-f86660b5eca8',	'6a8cb443-39ad-499c-9f9f-5959ef4ae1a8',	'2021-07-06 15:49:53',	'KNU_Plate_iOS/1.0 (kevinkim.KNU-Plate-iOS; build:1; iOS 14.6.0) Alamofire/5.4.2'),
('608cc4ca-2882-4b84-a672-d562d3aa06e2',	'b0d8b17b-e1de-4a45-98e3-635d424cf549',	'2021-07-01 15:18:03',	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'),
('6fcb9946-2713-4b32-8a66-a30277bd1cdb',	'72cbb603-0594-4cf3-b38b-0fd2719ef963',	'2021-07-06 18:46:45',	'insomnia/2021.3.0'),
('88fde5b1-393d-4f98-a8b2-b34badc8ddcf',	'3c3032ce-21b5-4905-8607-6259d1f4a642',	'2021-06-28 17:10:10',	'PostmanRuntime/7.28.1');

-- 2021-07-06 10:42:45