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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `board_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `mall_id` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `title` varchar(255) DEFAULT NULL,
  `evaluate` int(1) NOT NULL COMMENT '1~5',
  `board_image` varchar(255) NOT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK_user_TO_board_1` (`user_id`),
  KEY `FK_mall_TO_board_1` (`mall_id`),
  KEY `FK_file_folder_TO_board_1` (`board_image`),
  CONSTRAINT `FK_file_folder_TO_board_1` FOREIGN KEY (`board_image`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_mall_TO_board_1` FOREIGN KEY (`mall_id`) REFERENCES `mall` (`mall_id`),
  CONSTRAINT `FK_user_TO_board_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluate`
--

DROP TABLE IF EXISTS `evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluate` (
  `reply_id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `mall_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` varchar(1) DEFAULT 'Y',
  `doc_food` varchar(255) DEFAULT NULL,
  `evaluate` int(1) NOT NULL DEFAULT 0 COMMENT '0~5',
  `evaluate_contents` varchar(255) NOT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `FK_board_TO_evaluate_1` (`board_id`),
  KEY `FK_mall_TO_evaluate_1` (`mall_id`),
  KEY `FK_user_TO_evaluate_1` (`user_id`),
  CONSTRAINT `FK_board_TO_evaluate_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FK_mall_TO_evaluate_1` FOREIGN KEY (`mall_id`) REFERENCES `mall` (`mall_id`),
  CONSTRAINT `FK_user_TO_evaluate_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `file_id` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `original_name` varchar(100) NOT NULL,
  `file_folder_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `date_create` datetime NOT NULL,
  `checksum` varchar(255) DEFAULT NULL COMMENT '사용여부 미확정',
  PRIMARY KEY (`file_id`),
  KEY `FK_file_folder_TO_file_1` (`file_folder_id`),
  KEY `FK_user_TO_file_1` (`user_id`),
  CONSTRAINT `FK_file_folder_TO_file_1` FOREIGN KEY (`file_folder_id`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_user_TO_file_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file_folder`
--

DROP TABLE IF EXISTS `file_folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_folder` (
  `file_folder_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT 'mall_thumbnail, board_thumbnail',
  PRIMARY KEY (`file_folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mall`
--

DROP TABLE IF EXISTS `mall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mall` (
  `mall_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `mall_name` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `evaluate_average` int(1) DEFAULT NULL,
  `recommend_count` int(11) NOT NULL DEFAULT 0,
  `is_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`mall_id`),
  KEY `FK_user_TO_mall_1` (`user_id`),
  KEY `FK_file_folder_TO_mall_1` (`thumbnail`),
  CONSTRAINT `FK_file_folder_TO_mall_1` FOREIGN KEY (`thumbnail`) REFERENCES `file_folder` (`file_folder_id`),
  CONSTRAINT `FK_user_TO_mall_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_recommend`
--

DROP TABLE IF EXISTS `my_recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_recommend` (
  `recommend_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `mall_id` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` varchar(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`recommend_id`),
  KEY `FK_user_TO_my_recommend_1` (`user_id`),
  KEY `FK_mall_TO_my_recommend_1` (`mall_id`),
  CONSTRAINT `FK_mall_TO_my_recommend_1` FOREIGN KEY (`mall_id`) REFERENCES `mall` (`mall_id`),
  CONSTRAINT `FK_user_TO_my_recommend_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `board_id` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `reason` varchar(255) NOT NULL,
  `result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FK_user_TO_report_1` (`user_id`),
  KEY `FK_board_TO_report_1` (`board_id`),
  CONSTRAINT `FK_board_TO_report_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FK_user_TO_report_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `simple_evaluate`
--

DROP TABLE IF EXISTS `simple_evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `simple_evaluate` (
  `simple_evaluate_id` int(11) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `menu_name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `contents` varchar(255) DEFAULT NULL,
  `is_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`simple_evaluate_id`),
  KEY `FK_evaluate_TO_simple_evaluate_1` (`reply_id`),
  KEY `FK_user_TO_simple_evaluate_1` (`user_id`),
  CONSTRAINT `FK_evaluate_TO_simple_evaluate_1` FOREIGN KEY (`reply_id`) REFERENCES `evaluate` (`reply_id`),
  CONSTRAINT `FK_user_TO_simple_evaluate_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suggestion`
--

DROP TABLE IF EXISTS `suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suggestion` (
  `suggestion_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`suggestion_id`),
  KEY `FK_user_TO_suggestion_1` (`user_id`),
  CONSTRAINT `FK_user_TO_suggestion_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suggestion_reply`
--

DROP TABLE IF EXISTS `suggestion_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suggestion_reply` (
  `suggestion_reply_id` int(11) NOT NULL,
  `suggestion_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `reply` text NOT NULL,
  `is_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`suggestion_reply_id`),
  KEY `FK_suggestion_TO_suggestion_reply_1` (`suggestion_id`),
  KEY `FK_user_TO_suggestion_reply_1` (`user_id`),
  CONSTRAINT `FK_suggestion_TO_suggestion_reply_1` FOREIGN KEY (`suggestion_id`) REFERENCES `suggestion` (`suggestion_id`),
  CONSTRAINT `FK_user_TO_suggestion_reply_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
  `mail_address` varchar(255) NOT NULL COMMENT '학교 메일',
  `date_create` datetime NOT NULL,
  `is_active` varchar(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
  `user_role_authority_id` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role_group`
--

DROP TABLE IF EXISTS `user_role_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_group` (
  `user_role_group_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_role_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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

-- Dump completed on 2021-04-05  3:03:32
