-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	10.5.8-MariaDB-1:10.5.8+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `test2`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `test2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `test2`;

--
-- Table structure for table `dashboard`
--

DROP TABLE IF EXISTS `dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dashboard` (
  `dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `year` year(4) NOT NULL,
  `month` int(2) NOT NULL,
  `date` int(2) NOT NULL,
  `report_count` int(11) NOT NULL,
  `suggestion_count` int(11) NOT NULL,
  `mall_count` int(11) NOT NULL,
  `review_count` int(11) NOT NULL,
  `user_count` int(11) NOT NULL,
  PRIMARY KEY (`dashboard_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `file_id` varchar(255) NOT NULL,
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `original_name` varchar(100) NOT NULL,
  `file_folder_id` varchar(255) NOT NULL,
  `uploader` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `checksum` varchar(255) DEFAULT NULL COMMENT '사용여부 미확정',
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `index` (`index`),
  KEY `FK_file_folder_TO_file_1` (`file_folder_id`),
  KEY `FK_user_TO_file_1` (`uploader`),
  CONSTRAINT `FK_file_folder_TO_file_1` FOREIGN KEY (`file_folder_id`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_user_TO_file_1` FOREIGN KEY (`uploader`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file_folder`
--

DROP TABLE IF EXISTS `file_folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_folder` (
  `file_folder_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `type` varchar(255) NOT NULL COMMENT 'mall_thumbnail, board_thumbnail',
  PRIMARY KEY (`file_folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mail_auth`
--

DROP TABLE IF EXISTS `mail_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_auth` (
  `mail_auth_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `date_expire` datetime DEFAULT NULL,
  `auth_code` varchar(255) NOT NULL,
  `date_auth` datetime DEFAULT NULL,
  `is_auth` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`mail_auth_id`),
  KEY `FK_user_TO_mail_auth_1` (`user_id`),
  CONSTRAINT `FK_user_TO_mail_auth_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mall`
--

DROP TABLE IF EXISTS `mall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mall` (
  `mall_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `mall_name` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `evaluate_average` double DEFAULT NULL,
  `recommend_count` int(11) DEFAULT 0,
  `is_active` varchar(1) DEFAULT 'Y',
  `gate_location` varchar(20) DEFAULT NULL,
  `kakao_mall_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`mall_id`) USING BTREE,
  KEY `FK_user_TO_mall_1` (`user_id`) USING BTREE,
  KEY `FK_file_folder_TO_mall_1` (`thumbnail`) USING BTREE,
  CONSTRAINT `FK_file_folder_TO_mall_1` FOREIGN KEY (`thumbnail`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_user_TO_mall_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `mall_id` int(11) NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `like` int(11) NOT NULL DEFAULT 0,
  `dislike` int(11) NOT NULL DEFAULT 0,
  `date_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`menu_id`),
  KEY `FK_mall_TO_menu_1` (`mall_id`),
  CONSTRAINT `FK_menu_mall` FOREIGN KEY (`mall_id`) REFERENCES `mall` (`mall_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu_list`
--

DROP TABLE IF EXISTS `menu_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_list` (
  `menu_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `review_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`menu_list_id`),
  KEY `FK_review_TO_menu_list_1` (`review_id`),
  KEY `FK_menu_TO_menu_list_1` (`menu_id`),
  CONSTRAINT `FK_menu_TO_menu_list_1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`),
  CONSTRAINT `FK_review_TO_menu_list_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_recommend`
--

DROP TABLE IF EXISTS `my_recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_recommend` (
  `recommend_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `mall_id` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` varchar(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`recommend_id`),
  KEY `FK_user_TO_my_recommend_1` (`user_id`),
  KEY `FK_mall_TO_my_recommend_1` (`mall_id`),
  CONSTRAINT `FK_user_TO_my_recommend_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `is_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`notice_id`) USING BTREE,
  KEY `FK_user_TO_notice_1` (`user_id`) USING BTREE,
  CONSTRAINT `FK_user_TO_notice_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `review_id` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `reason` varchar(255) NOT NULL,
  `result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FK_user_TO_report_1` (`user_id`),
  KEY `FK_review_TO_report_1` (`review_id`) USING BTREE,
  CONSTRAINT `FK_review_TO_report_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`),
  CONSTRAINT `FK_user_TO_report_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `mall_id` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `contents` varchar(255) NOT NULL,
  `evaluate` int(1) NOT NULL COMMENT '1~5',
  `review_image` varchar(255) DEFAULT NULL,
  `is_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`review_id`),
  KEY `FK_user_TO_review_1` (`user_id`),
  KEY `FK_mall_TO_review_1` (`mall_id`),
  KEY `FK_file_folder_TO_review_1` (`review_image`),
  CONSTRAINT `FK_file_folder_TO_review_1` FOREIGN KEY (`review_image`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_mall_TO_review_1` FOREIGN KEY (`mall_id`) REFERENCES `mall` (`mall_id`),
  CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suggestion`
--

DROP TABLE IF EXISTS `suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suggestion` (
  `suggestion_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`suggestion_id`),
  KEY `FK_user_TO_suggestion_1` (`user_id`),
  CONSTRAINT `FK_user_TO_suggestion_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'encryped_password',
  `display_name` varchar(255) NOT NULL COMMENT '이름 - 중복불가',
  `mail_address` varchar(255) DEFAULT NULL COMMENT '학교 메일',
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` varchar(1) NOT NULL DEFAULT 'Y',
  `medal_id` int(11) DEFAULT NULL,
  `user_thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `display_name` (`display_name`),
  UNIQUE KEY `user_name` (`user_name`),
  KEY `FK_user_file_folder_2` (`user_thumbnail`),
  KEY `FK_user_file_folder` (`medal_id`) USING BTREE,
  CONSTRAINT `FK_user_file_folder_2` FOREIGN KEY (`user_thumbnail`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_user_user_medal_info` FOREIGN KEY (`medal_id`) REFERENCES `user_medal_info` (`medal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_medal_info`
--

DROP TABLE IF EXISTS `user_medal_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_medal_info` (
  `medal_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`medal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `user_role_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_user_role_group_TO_user_role_1` (`user_role_group_id`),
  CONSTRAINT `FK_user_TO_user_role_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_user_role_group_TO_user_role_1` FOREIGN KEY (`user_role_group_id`) REFERENCES `user_role_group` (`user_role_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role_authority`
--

DROP TABLE IF EXISTS `user_role_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_authority` (
  `user_role_authority_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_role_group_id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_permission` varchar(1) NOT NULL COMMENT 'Y || N',
  `read_permission` varchar(1) NOT NULL COMMENT 'Y || N',
  `update_permission` varchar(1) NOT NULL COMMENT 'Y || N',
  `delete_permission` varchar(1) NOT NULL COMMENT 'Y || N',
  PRIMARY KEY (`user_role_authority_id`,`user_role_group_id`),
  KEY `FK_user_role_group_TO_user_role_authority_1` (`user_role_group_id`),
  CONSTRAINT `FK_user_role_group_TO_user_role_authority_1` FOREIGN KEY (`user_role_group_id`) REFERENCES `user_role_group` (`user_role_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=309 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role_group`
--

DROP TABLE IF EXISTS `user_role_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_group` (
  `user_role_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_role_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_token` (
  `user_token_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `access_point` varchar(255) DEFAULT NULL COMMENT 'user_agent',
  PRIMARY KEY (`user_token_id`),
  KEY `FK_user_TO_user_token_1` (`user_id`),
  CONSTRAINT `FK_user_TO_user_token_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-20 17:23:14
