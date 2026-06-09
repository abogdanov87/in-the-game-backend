-- MySQL dump 10.13  Distrib 5.7.27-30, for Linux (x86_64)
--
-- Host: localhost    Database: u2662691_default
-- ------------------------------------------------------
-- Server version	5.7.27-30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!50717 SELECT COUNT(*) INTO @rocksdb_has_p_s_session_variables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'performance_schema' AND TABLE_NAME = 'session_variables' */;
/*!50717 SET @rocksdb_get_is_supported = IF (@rocksdb_has_p_s_session_variables, 'SELECT COUNT(*) INTO @rocksdb_is_supported FROM performance_schema.session_variables WHERE VARIABLE_NAME=\'rocksdb_bulk_load\'', 'SELECT 0') */;
/*!50717 PREPARE s FROM @rocksdb_get_is_supported */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
/*!50717 SET @rocksdb_enable_bulk_load = IF (@rocksdb_is_supported, 'SET SESSION rocksdb_bulk_load = 1', 'SET @rocksdb_dummy_bulk_load = 0') */;
/*!50717 PREPARE s FROM @rocksdb_enable_bulk_load */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add source',6,'add_source'),(22,'Can change source',6,'change_source'),(23,'Can delete source',6,'delete_source'),(24,'Can view source',6,'view_source'),(25,'Can add thumbnail',7,'add_thumbnail'),(26,'Can change thumbnail',7,'change_thumbnail'),(27,'Can delete thumbnail',7,'delete_thumbnail'),(28,'Can view thumbnail',7,'view_thumbnail'),(29,'Can add thumbnail dimensions',8,'add_thumbnaildimensions'),(30,'Can change thumbnail dimensions',8,'change_thumbnaildimensions'),(31,'Can delete thumbnail dimensions',8,'delete_thumbnaildimensions'),(32,'Can view thumbnail dimensions',8,'view_thumbnaildimensions'),(33,'Can add Базовый турнир',9,'add_basetournament'),(34,'Can change Базовый турнир',9,'change_basetournament'),(35,'Can delete Базовый турнир',9,'delete_basetournament'),(36,'Can view Базовый турнир',9,'view_basetournament'),(37,'Can add Страна',10,'add_country'),(38,'Can change Страна',10,'change_country'),(39,'Can delete Страна',10,'delete_country'),(40,'Can view Страна',10,'view_country'),(41,'Can add Турнир',11,'add_tournament'),(42,'Can change Турнир',11,'change_tournament'),(43,'Can delete Турнир',11,'delete_tournament'),(44,'Can view Турнир',11,'view_tournament'),(45,'Can add Команда',12,'add_team'),(46,'Can change Команда',12,'change_team'),(47,'Can delete Команда',12,'delete_team'),(48,'Can view Команда',12,'view_team'),(49,'Can add Стадия',13,'add_stage'),(50,'Can change Стадия',13,'change_stage'),(51,'Can delete Стадия',13,'delete_stage'),(52,'Can view Стадия',13,'view_stage'),(53,'Can add Участник',14,'add_participant'),(54,'Can change Участник',14,'change_participant'),(55,'Can delete Участник',14,'delete_participant'),(56,'Can view Участник',14,'view_participant'),(57,'Can add Матч',15,'add_match'),(58,'Can change Матч',15,'change_match'),(59,'Can delete Матч',15,'delete_match'),(60,'Can view Матч',15,'view_match'),(61,'Can add Результат',16,'add_result'),(62,'Can change Результат',16,'change_result'),(63,'Can delete Результат',16,'delete_result'),(64,'Can view Результат',16,'view_result'),(65,'Can add Прогноз',17,'add_forecast'),(66,'Can change Прогноз',17,'change_forecast'),(67,'Can delete Прогноз',17,'delete_forecast'),(68,'Can view Прогноз',17,'view_forecast'),(69,'Can add Коэффициент на стадии',18,'add_stagecoefficient'),(70,'Can change Коэффициент на стадии',18,'change_stagecoefficient'),(71,'Can delete Коэффициент на стадии',18,'delete_stagecoefficient'),(72,'Can view Коэффициент на стадии',18,'view_stagecoefficient'),(73,'Can add Правило',19,'add_rule'),(74,'Can change Правило',19,'change_rule'),(75,'Can delete Правило',19,'delete_rule'),(76,'Can view Правило',19,'view_rule'),(77,'Can add Прогноз на победителя',20,'add_forecastwinner'),(78,'Can change Прогноз на победителя',20,'change_forecastwinner'),(79,'Can delete Прогноз на победителя',20,'delete_forecastwinner'),(80,'Can view Прогноз на победителя',20,'view_forecastwinner'),(81,'Can add entity',21,'add_entity'),(82,'Can change entity',21,'change_entity'),(83,'Can delete entity',21,'delete_entity'),(84,'Can view entity',21,'view_entity'),(85,'Can add Дополнительный параметр',22,'add_param'),(86,'Can change Дополнительный параметр',22,'change_param'),(87,'Can delete Дополнительный параметр',22,'delete_param'),(88,'Can view Дополнительный параметр',22,'view_param'),(89,'Can add Пользователь',23,'add_user'),(90,'Can change Пользователь',23,'change_user'),(91,'Can delete Пользователь',23,'delete_user'),(92,'Can view Пользователь',23,'view_user'),(93,'Can add Письмо',24,'add_mail'),(94,'Can change Письмо',24,'change_mail'),(95,'Can delete Письмо',24,'delete_mail'),(96,'Can view Письмо',24,'view_mail');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `password_change_date` datetime(6) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `auth_user_email_1c89df09_uniq` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$150000$RjgsK117MGLT$jT1NKQBm3PK4Hqgw3tT6PcSmCcTdj5aRypnoAcy65Cw=',NULL,0,'smicersiu@gmail.com','','',1,1,'2024-05-28 17:37:00.579504','smicersiu@gmail.com','avatars/7EcYFeHFvgH5E9lg_GFYOazSBBYg7jA4DFgNIAlQqC-l7U55Os7R2lohIM9dy6QPUdIVoCpa.jpg','1970-01-01 00:00:00.000000','Андрей','Андрей Богданов'),(2,'pbkdf2_sha256$150000$gPbBeCLIEzzS$KRc9L/SJtAs8JpDNI5YDS9Fa+UMJU7YHpl10H/aMXLs=','2024-07-11 08:58:30.218698',1,'admin','','',1,1,'2024-05-28 17:45:39.489593','admin@footbet.fun','','1970-01-01 00:00:00.000000',NULL,NULL),(3,'pbkdf2_sha256$150000$bTb89GJWqtTY$MGK/qCBAjfEudJAN5aoYdgnn1daB1RTRm2jqCKRnO9s=',NULL,0,'abitotti2004@mail.ru','','',0,1,'2024-05-29 10:00:13.181717','abitotti2004@mail.ru','','1970-01-01 00:00:00.000000','Румын (Вадим)','Вадим Минакин'),(4,'pbkdf2_sha256$150000$e0Un5PlQKNOU$wmlPTbk0f41UUcnP3mucg9CywqTllVACU6D+Wj6FmXI=',NULL,0,'dj-ya@mail.ru','','',0,1,'2024-05-29 10:04:44.777655','dj-ya@mail.ru','','1970-01-01 00:00:00.000000','dj-ya','Денис Жигарев'),(5,'pbkdf2_sha256$150000$JHN8PUmyGwn8$WdtnjRMaCID0JWC8I1+0TsXh80VcXfwvYhGZ0ef7uZU=',NULL,0,'g5230ilchenkoan@yandex.ru','','',0,1,'2024-05-29 10:16:45.065756','g5230ilchenkoan@yandex.ru','avatars/rJNdvaWjGS4_Nxcfml8.jpg','1970-01-01 00:00:00.000000','ilAnNik','Андрей Ильченко'),(6,'pbkdf2_sha256$150000$zn2GRYR4561E$7NM3JgJx+//NOX8+RCRUwNmI2dpfoIJkU/c9t3voXu0=',NULL,0,'kutarov@list.ru','','',0,1,'2024-05-29 10:22:20.084854','kutarov@list.ru','avatars/20240630_071553_GSmeY4l.jpg','1970-01-01 00:00:00.000000','ArTHur','Артур Кутаров'),(7,'pbkdf2_sha256$150000$mxGSuIk5rpRB$YBwm6HaOActTvLmell99ItiaroUwDQBOS1OtpVBJKMM=',NULL,0,'djmus@inbox.ru','','',0,1,'2024-05-29 11:27:40.679012','djmus@inbox.ru','','1970-01-01 00:00:00.000000','MuS','Миша Бутенко'),(8,'pbkdf2_sha256$150000$v2KjxTOe8t0Q$3sFba/U7bDyuxHaVMk2/KXPvSFucWaOeM4kAITWzei0=',NULL,0,'sergeyskripnyuk@gmail.com','','',0,1,'2024-05-29 13:29:59.276357','sergeyskripnyuk@gmail.com','','1970-01-01 00:00:00.000000','sergeyskripnyuk','Сергей Скрипнюк'),(9,'pbkdf2_sha256$150000$TIuX78TaXx45$y+qj6g/OPATgMwJqtA3FZaFPgWqcBqzGqxT1SWJm6lU=',NULL,0,'nemozzz1987@gmail.com','','',0,1,'2024-05-29 14:53:24.908198','nemozzz1987@gmail.com','','1970-01-01 00:00:00.000000','Nemozzz87 (Никита)','Никита Цой'),(10,'pbkdf2_sha256$150000$E9Rd6xuKCs5p$e2rIK2HDcF5hM0IagdHoegf3nNuJ2xEZhF/UTrju1R4=',NULL,0,'tatianka1101@yandex.ru','','',0,1,'2024-05-29 17:12:37.289315','tatianka1101@yandex.ru','','1970-01-01 00:00:00.000000','tatianka1101','Таня Богданова'),(11,'pbkdf2_sha256$150000$9FPZ68i5mnT9$AQdxgUgwhzgI92lbwnO3BNkHbq26S3yARgwNU1gHcaY=',NULL,0,'ivavlasov@yandex.ru','','',0,1,'2024-05-30 17:36:19.398196','ivavlasov@yandex.ru','','1970-01-01 00:00:00.000000','ivav','Иван Власов'),(12,'pbkdf2_sha256$150000$E23d0fO5rOu4$QpAgk0InIc+fS0BNVfepd6k1Wf+YQEFhbpkg905lyWo=',NULL,0,'overflow@bk.ru','','',0,1,'2024-06-12 06:17:04.508643','overflow@bk.ru','avatars/Screenshot_20240629-125501_Samsung_Internet.jpg','1970-01-01 00:00:00.000000','Ibra','Саша Муштенко'),(13,'pbkdf2_sha256$150000$hiE5FYSERouX$8B1DECzp3wZoz74RGo4JXBeM24whLF6UyTf5c3TCyZ4=',NULL,0,'oscrowd@mail.ru','','',0,1,'2024-06-13 07:47:29.155845','oscrowd@mail.ru','','1970-01-01 00:00:00.000000','oscrowd','Роман Макаренко'),(14,'pbkdf2_sha256$150000$2ahvR1xp0lqc$Go++EQUrDssDiZOPnX/Idyjb7fdlgOWjZJ6XX/fuK1A=',NULL,0,'sergeantrx10@yandex.ru','','',0,1,'2024-06-18 09:09:17.264050','sergeantrx10@yandex.ru','','1970-01-01 00:00:00.000000','SRX10',NULL);
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_tournament`
--

DROP TABLE IF EXISTS `base_tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_tournament` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `ordering` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `winner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `base_tournament_winner_id_4488f2ba_fk_team_id` (`winner_id`),
  CONSTRAINT `base_tournament_winner_id_4488f2ba_fk_team_id` FOREIGN KEY (`winner_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_tournament`
--

LOCK TABLES `base_tournament` WRITE;
/*!40000 ALTER TABLE `base_tournament` DISABLE KEYS */;
INSERT INTO `base_tournament` VALUES (1,'ЕВРО 24',1,1,20);
/*!40000 ALTER TABLE `base_tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_entity`
--

DROP TABLE IF EXISTS `common_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `common_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_entity`
--

LOCK TABLES `common_entity` WRITE;
/*!40000 ALTER TABLE `common_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `common_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `abbreviation` varchar(32) DEFAULT NULL,
  `flag` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Польша',NULL,'',1),(2,'Украина',NULL,'',1),(3,'Грузия',NULL,'',1),(4,'Хорватия',NULL,'',1),(5,'Словения',NULL,'',1),(6,'Чехия',NULL,'',1),(7,'Италия',NULL,'',1),(8,'Сербия',NULL,'',1),(9,'Румыния',NULL,'',1),(10,'Швейцария',NULL,'',1),(11,'Нидерланды',NULL,'',1),(12,'Дания',NULL,'',1),(13,'Албания',NULL,'',1),(14,'Словакия',NULL,'',1),(15,'Венгрия',NULL,'',1),(16,'Англия',NULL,'',1),(17,'Австрия',NULL,'',1),(18,'Турция',NULL,'',1),(19,'Шотландия',NULL,'',1),(20,'Испания',NULL,'',1),(21,'Португалия',NULL,'',1),(22,'Бельгия',NULL,'',1),(23,'Франция',NULL,'',1),(24,'Германия',NULL,'',1);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-05-28 17:47:46.657938','1','smicersiu@gmail.com',2,'[{\"changed\": {\"fields\": [\"avatar\"]}}]',23,2),(2,'2024-05-28 17:51:22.564538','1','ЕВРО 24',1,'[{\"added\": {}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0422\\u0443\\u0440 1\"}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0422\\u0443\\u0440 2\"}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0422\\u0443\\u0440 3\"}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / 1/8 \\u0444\\u0438\\u043d\\u0430\\u043b\\u0430\"}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0427\\u0435\\u0442\\u0432\\u0435\\u0440\\u0442\\u044c\\u0444\\u0438\\u043d\\u0430\\u043b\"}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u041f\\u043e\\u043b\\u0443\\u0444\\u0438\\u043d\\u0430\\u043b\"}}, {\"added\": {\"name\": \"\\u0421\\u0442\\u0430\\u0434\\u0438\\u044f\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0424\\u0438\\u043d\\u0430\\u043b\"}}]',9,2),(3,'2024-05-28 17:54:17.142392','1','ЕВРО 24',1,'[{\"added\": {}}, {\"added\": {\"name\": \"\\u0423\\u0447\\u0430\\u0441\\u0442\\u043d\\u0438\\u043a\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / smicersiu@gmail.com\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0422\\u0443\\u0440 1\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0422\\u0443\\u0440 2\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0422\\u0443\\u0440 3\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / 1/8 \\u0444\\u0438\\u043d\\u0430\\u043b\\u0430\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0427\\u0435\\u0442\\u0432\\u0435\\u0440\\u0442\\u044c\\u0444\\u0438\\u043d\\u0430\\u043b\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u041f\\u043e\\u043b\\u0443\\u0444\\u0438\\u043d\\u0430\\u043b\"}}, {\"added\": {\"name\": \"\\u041a\\u043e\\u044d\\u0444\\u0444\\u0438\\u0446\\u0438\\u0435\\u043d\\u0442 \\u043d\\u0430 \\u0441\\u0442\\u0430\\u0434\\u0438\\u0438\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / \\u0424\\u0438\\u043d\\u0430\\u043b\"}}, {\"added\": {\"name\": \"\\u041f\\u0440\\u0430\\u0432\\u0438\\u043b\\u043e\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 - goals difference\"}}, {\"added\": {\"name\": \"\\u041f\\u0440\\u0430\\u0432\\u0438\\u043b\\u043e\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 - exact result\"}}, {\"added\": {\"name\": \"\\u041f\\u0440\\u0430\\u0432\\u0438\\u043b\\u043e\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 - winner\"}}]',11,2),(4,'2024-05-28 17:56:02.798112','1','Польша',1,'[{\"added\": {}}]',10,2),(5,'2024-05-28 17:56:09.396299','2','Украина',1,'[{\"added\": {}}]',10,2),(6,'2024-05-28 17:56:15.185582','3','Грузия',1,'[{\"added\": {}}]',10,2),(7,'2024-05-28 17:56:21.131881','4','Хорватия',1,'[{\"added\": {}}]',10,2),(8,'2024-05-28 17:56:26.855104','5','Словения',1,'[{\"added\": {}}]',10,2),(9,'2024-05-28 17:56:31.542599','6','Чехия',1,'[{\"added\": {}}]',10,2),(10,'2024-05-28 17:56:43.740592','7','Италия',1,'[{\"added\": {}}]',10,2),(11,'2024-05-28 17:56:50.089134','8','Сербия',1,'[{\"added\": {}}]',10,2),(12,'2024-05-28 17:56:55.488978','9','Румыния',1,'[{\"added\": {}}]',10,2),(13,'2024-05-28 17:57:05.058590','10','Швейцария',1,'[{\"added\": {}}]',10,2),(14,'2024-05-28 17:57:12.656887','11','Нидерланды',1,'[{\"added\": {}}]',10,2),(15,'2024-05-28 17:57:18.276413','12','Дания',1,'[{\"added\": {}}]',10,2),(16,'2024-05-28 17:57:22.951660','13','Албания',1,'[{\"added\": {}}]',10,2),(17,'2024-05-28 17:57:29.115841','14','Словакия',1,'[{\"added\": {}}]',10,2),(18,'2024-05-28 17:57:33.859011','15','Венгрия',1,'[{\"added\": {}}]',10,2),(19,'2024-05-28 17:57:38.796793','16','Англия',1,'[{\"added\": {}}]',10,2),(20,'2024-05-28 17:57:44.291213','17','Австрия',1,'[{\"added\": {}}]',10,2),(21,'2024-05-28 17:57:49.030254','18','Турция',1,'[{\"added\": {}}]',10,2),(22,'2024-05-28 17:57:53.960345','19','Шотландия',1,'[{\"added\": {}}]',10,2),(23,'2024-05-28 17:57:57.861112','20','Испания',1,'[{\"added\": {}}]',10,2),(24,'2024-05-28 17:58:02.607619','21','Португалия',1,'[{\"added\": {}}]',10,2),(25,'2024-05-28 17:58:07.660947','22','Бельгия',1,'[{\"added\": {}}]',10,2),(26,'2024-05-28 17:58:12.027544','23','Франция',1,'[{\"added\": {}}]',10,2),(27,'2024-05-28 17:58:16.573069','24','Германия',1,'[{\"added\": {}}]',10,2),(28,'2024-05-28 17:58:49.685719','1','Польша / Польша',1,'[{\"added\": {}}]',12,2),(29,'2024-05-28 17:59:01.856299','2','Украина / Украина',1,'[{\"added\": {}}]',12,2),(30,'2024-05-28 17:59:11.163740','3','Грузия / Грузия',1,'[{\"added\": {}}]',12,2),(31,'2024-05-28 17:59:30.880163','4','Хорватия / Хорватия',1,'[{\"added\": {}}]',12,2),(32,'2024-05-28 17:59:47.963548','5','Словения / Словения',1,'[{\"added\": {}}]',12,2),(33,'2024-05-28 18:00:01.381778','6','Чехия / Чехия',1,'[{\"added\": {}}]',12,2),(34,'2024-05-28 18:00:12.435847','7','Италия / Италия',1,'[{\"added\": {}}]',12,2),(35,'2024-05-28 18:00:23.230008','8','Сербия / Сербия',1,'[{\"added\": {}}]',12,2),(36,'2024-05-28 18:00:33.259969','9','Румыния / Румыния',1,'[{\"added\": {}}]',12,2),(37,'2024-05-28 18:00:42.083188','10','Швейцария / Швейцария',1,'[{\"added\": {}}]',12,2),(38,'2024-05-28 18:00:53.078586','11','Нидерланды / Нидерланды',1,'[{\"added\": {}}]',12,2),(39,'2024-05-28 18:01:04.071563','12','Дания / Дания',1,'[{\"added\": {}}]',12,2),(40,'2024-05-28 18:01:14.652137','13','Албания / Албания',1,'[{\"added\": {}}]',12,2),(41,'2024-05-28 18:01:27.028942','14','Словакия / Словакия',1,'[{\"added\": {}}]',12,2),(42,'2024-05-28 18:01:38.320053','15','Венгрия / Венгрия',1,'[{\"added\": {}}]',12,2),(43,'2024-05-28 18:01:52.144948','16','Англия / Англия',1,'[{\"added\": {}}]',12,2),(44,'2024-05-28 18:02:04.192315','17','Австрия / Австрия',1,'[{\"added\": {}}]',12,2),(45,'2024-05-28 18:02:15.843576','18','Турция / Турция',1,'[{\"added\": {}}]',12,2),(46,'2024-05-28 18:02:27.099751','19','Шотландия / Шотландия',1,'[{\"added\": {}}]',12,2),(47,'2024-05-28 18:02:38.229667','20','Испания / Испания',1,'[{\"added\": {}}]',12,2),(48,'2024-05-28 18:02:51.326670','21','Португалия / Португалия',1,'[{\"added\": {}}]',12,2),(49,'2024-05-28 18:03:02.007149','22','Бельгия / Бельгия',1,'[{\"added\": {}}]',12,2),(50,'2024-05-28 18:03:12.217174','23','Франция / Франция',1,'[{\"added\": {}}]',12,2),(51,'2024-05-28 18:03:23.076791','24','Германия / Германия',1,'[{\"added\": {}}]',12,2),(52,'2024-05-28 18:03:36.662667','2','Украина / Украина',2,'[{\"changed\": {\"fields\": [\"team_type\"]}}]',12,2),(53,'2024-05-28 18:03:46.160125','3','Грузия / Грузия',2,'[{\"changed\": {\"fields\": [\"team_type\"]}}]',12,2),(54,'2024-05-28 18:03:51.372672','4','Хорватия / Хорватия',2,'[]',12,2),(55,'2024-05-28 18:05:54.194585','1','ЕВРО 24 / 2024-06-14 19:00:00+00:00 / Германия - Шотландия',1,'[{\"added\": {}}]',15,2),(56,'2024-05-28 18:07:27.705324','2','ЕВРО 24 / 2024-06-15 13:00:00+00:00 / Венгрия - Швейцария',1,'[{\"added\": {}}]',15,2),(57,'2024-05-28 18:07:55.541607','3','ЕВРО 24 / 2024-06-15 16:00:00+00:00 / Испания - Хорватия',1,'[{\"added\": {}}]',15,2),(58,'2024-05-28 18:09:05.947722','4','ЕВРО 24 / 2024-06-15 19:00:00+00:00 / Италия - Албания',1,'[{\"added\": {}}]',15,2),(59,'2024-05-28 18:09:31.308096','5','ЕВРО 24 / 2024-06-16 13:00:00+00:00 / Польша - Нидерланды',1,'[{\"added\": {}}]',15,2),(60,'2024-05-28 18:10:03.080261','6','ЕВРО 24 / 2024-06-16 16:00:00+00:00 / Словения - Дания',1,'[{\"added\": {}}]',15,2),(61,'2024-05-28 18:10:30.847734','7','ЕВРО 24 / 2024-06-16 19:00:00+00:00 / Сербия - Англия',1,'[{\"added\": {}}]',15,2),(62,'2024-05-28 18:11:01.111146','8','ЕВРО 24 / 2024-06-17 13:00:00+00:00 / Румыния - Украина',1,'[{\"added\": {}}]',15,2),(63,'2024-05-28 18:11:28.326704','9','ЕВРО 24 / 2024-06-17 16:00:00+00:00 / Бельгия - Словакия',1,'[{\"added\": {}}]',15,2),(64,'2024-05-28 18:11:55.004876','10','ЕВРО 24 / 2024-06-17 19:00:00+00:00 / Австрия - Франция',1,'[{\"added\": {}}]',15,2),(65,'2024-05-28 18:12:18.631605','11','ЕВРО 24 / 2024-06-18 16:00:00+00:00 / Турция - Грузия',1,'[{\"added\": {}}]',15,2),(66,'2024-05-28 18:12:43.459417','12','ЕВРО 24 / 2024-06-18 19:00:00+00:00 / Португалия - Чехия',1,'[{\"added\": {}}]',15,2),(67,'2024-05-28 19:21:52.074426','13','ЕВРО 24 / 2024-06-19 13:00:00+00:00 / Хорватия - Албания',1,'[{\"added\": {}}]',15,2),(68,'2024-05-28 19:22:19.213123','14','ЕВРО 24 / 2024-06-19 16:00:00+00:00 / Германия - Венгрия',1,'[{\"added\": {}}]',15,2),(69,'2024-05-28 19:22:44.685084','15','ЕВРО 24 / 2024-06-19 19:00:00+00:00 / Шотландия - Швейцария',1,'[{\"added\": {}}]',15,2),(70,'2024-05-28 19:23:09.842236','16','ЕВРО 24 / 2024-06-20 13:00:00+00:00 / Словения - Сербия',1,'[{\"added\": {}}]',15,2),(71,'2024-05-28 19:23:36.121646','17','ЕВРО 24 / 2024-06-20 16:00:00+00:00 / Дания - Англия',1,'[{\"added\": {}}]',15,2),(72,'2024-05-28 19:24:03.224714','18','ЕВРО 24 / 2024-06-20 19:00:00+00:00 / Испания - Италия',1,'[{\"added\": {}}]',15,2),(73,'2024-05-28 19:24:33.720342','19','ЕВРО 24 / 2024-06-21 13:00:00+00:00 / Словакия - Украина',1,'[{\"added\": {}}]',15,2),(74,'2024-05-28 19:24:59.461193','20','ЕВРО 24 / 2024-06-21 16:00:00+00:00 / Польша - Австрия',1,'[{\"added\": {}}]',15,2),(75,'2024-05-28 19:25:20.845663','21','ЕВРО 24 / 2024-06-21 19:00:00+00:00 / Нидерланды - Франция',1,'[{\"added\": {}}]',15,2),(76,'2024-05-28 19:25:42.897983','22','ЕВРО 24 / 2024-06-22 13:00:00+00:00 / Грузия - Чехия',1,'[{\"added\": {}}]',15,2),(77,'2024-05-28 19:26:06.121714','23','ЕВРО 24 / 2024-06-22 16:00:00+00:00 / Турция - Португалия',1,'[{\"added\": {}}]',15,2),(78,'2024-05-28 19:26:33.672073','24','ЕВРО 24 / 2024-06-22 19:00:00+00:00 / Бельгия - Румыния',1,'[{\"added\": {}}]',15,2),(79,'2024-05-28 19:27:32.213538','25','ЕВРО 24 / 2024-06-23 19:00:00+00:00 / Швейцария - Германия',1,'[{\"added\": {}}]',15,2),(80,'2024-05-28 19:28:13.247858','26','ЕВРО 24 / 2024-06-23 19:00:00+00:00 / Шотландия - Венгрия',1,'[{\"added\": {}}]',15,2),(81,'2024-05-28 19:28:39.827625','27','ЕВРО 24 / 2024-06-24 19:00:00+00:00 / Хорватия - Италия',1,'[{\"added\": {}}]',15,2),(82,'2024-05-28 19:29:05.983499','28','ЕВРО 24 / 2024-06-24 19:00:00+00:00 / Албания - Испания',1,'[{\"added\": {}}]',15,2),(83,'2024-05-28 19:29:29.521764','29','ЕВРО 24 / 2024-06-25 16:00:00+00:00 / Нидерланды - Австрия',1,'[{\"added\": {}}]',15,2),(84,'2024-05-28 19:29:53.085876','30','ЕВРО 24 / 2024-06-25 16:00:00+00:00 / Франция - Польша',1,'[{\"added\": {}}]',15,2),(85,'2024-05-28 19:30:25.266906','31','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Англия - Словения',1,'[{\"added\": {}}]',15,2),(86,'2024-05-28 19:30:48.295888','32','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Дания - Сербия',1,'[{\"added\": {}}]',15,2),(87,'2024-05-28 19:31:15.760584','33','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Словакия - Румыния',1,'[{\"added\": {}}]',15,2),(88,'2024-05-28 19:31:38.629508','34','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Украина - Бельгия',1,'[{\"added\": {}}]',15,2),(89,'2024-05-28 19:32:12.540702','35','ЕВРО 24 / 2024-06-26 19:00:00+00:00 / Чехия - Турция',1,'[{\"added\": {}}]',15,2),(90,'2024-05-28 19:32:35.574630','36','ЕВРО 24 / 2024-06-26 19:00:00+00:00 / Грузия - Португалия',1,'[{\"added\": {}}]',15,2),(91,'2024-05-28 19:55:03.549685','1','ЕВРО 24',2,'[]',11,2),(92,'2024-05-28 19:55:20.009969','1','ЕВРО 24',2,'[]',11,2),(93,'2024-05-28 19:55:31.404230','1','ЕВРО 24',2,'[{\"added\": {\"name\": \"\\u041f\\u0440\\u0430\\u0432\\u0438\\u043b\\u043e\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 - exact result\"}}]',11,2),(94,'2024-05-28 19:55:38.444320','1','ЕВРО 24',2,'[{\"changed\": {\"name\": \"\\u041f\\u0440\\u0430\\u0432\\u0438\\u043b\\u043e\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 - match result\", \"fields\": [\"rule_type\"]}}]',11,2),(95,'2024-05-29 07:11:34.199627','24','Германия / Германия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(96,'2024-05-29 07:11:39.869780','23','Франция / Франция',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(97,'2024-05-29 07:12:14.298441','22','Бельгия / Бельгия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(98,'2024-05-29 07:12:19.622669','21','Португалия / Португалия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(99,'2024-05-29 07:12:37.175465','20','Испания / Испания',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(100,'2024-05-29 07:12:44.516479','19','Шотландия / Шотландия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(101,'2024-05-29 07:12:50.414892','18','Турция / Турция',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(102,'2024-05-29 07:12:56.555458','17','Австрия / Австрия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(103,'2024-05-29 07:13:02.260807','16','Англия / Англия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(104,'2024-05-29 07:13:08.046757','15','Венгрия / Венгрия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(105,'2024-05-29 07:13:13.613364','14','Словакия / Словакия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(106,'2024-05-29 07:13:18.677283','13','Албания / Албания',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(107,'2024-05-29 07:13:24.236134','12','Дания / Дания',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(108,'2024-05-29 07:13:30.499669','11','Нидерланды / Нидерланды',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(109,'2024-05-29 07:13:36.528716','10','Швейцария / Швейцария',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(110,'2024-05-29 07:13:42.934547','9','Румыния / Румыния',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(111,'2024-05-29 07:13:48.980651','8','Сербия / Сербия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(112,'2024-05-29 07:13:54.764189','7','Италия / Италия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(113,'2024-05-29 07:14:01.424820','6','Чехия / Чехия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(114,'2024-05-29 07:14:07.002546','5','Словения / Словения',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(115,'2024-05-29 07:14:12.290955','4','Хорватия / Хорватия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(116,'2024-05-29 07:14:17.540666','3','Грузия / Грузия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(117,'2024-05-29 07:14:22.421479','2','Украина / Украина',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(118,'2024-05-29 07:14:28.488911','1','Польша / Польша',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(119,'2024-05-29 10:03:05.045084','1','ForecastWinner object (1)',1,'[{\"added\": {}}]',20,2),(120,'2024-05-29 10:09:48.855361','1','ЕВРО 24',2,'[{\"added\": {\"name\": \"\\u0423\\u0447\\u0430\\u0441\\u0442\\u043d\\u0438\\u043a\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / abitotti2004@mail.ru\"}}, {\"added\": {\"name\": \"\\u0423\\u0447\\u0430\\u0441\\u0442\\u043d\\u0438\\u043a\", \"object\": \"\\u0415\\u0412\\u0420\\u041e 24 / dj-ya@mail.ru\"}}]',11,2),(121,'2024-05-29 10:17:48.571179','2','ForecastWinner object (2)',1,'[{\"added\": {}}]',20,2),(122,'2024-05-29 10:32:24.972118','4','ЕВРО 24 / g5230ilchenkoan@yandex.ru',1,'[{\"added\": {}}]',14,2),(123,'2024-05-29 10:32:30.334420','5','ЕВРО 24 / kutarov@list.ru',1,'[{\"added\": {}}]',14,2),(124,'2024-05-29 11:40:56.765415','6','ЕВРО 24 / djmus@inbox.ru',1,'[{\"added\": {}}]',14,2),(125,'2024-05-29 13:24:09.629035','3','ForecastWinner object (3)',1,'[{\"added\": {}}]',20,2),(126,'2024-05-29 14:00:33.879823','7','ЕВРО 24 / sergeyskripnyuk@gmail.com',1,'[{\"added\": {}}]',14,2),(127,'2024-05-29 14:00:47.786628','4','ForecastWinner object (4)',1,'[{\"added\": {}}]',20,2),(128,'2024-05-29 14:01:19.256169','5','ForecastWinner object (5)',1,'[{\"added\": {}}]',20,2),(129,'2024-05-29 15:11:12.156618','8','ЕВРО 24 / nemozzz1987@gmail.com',1,'[{\"added\": {}}]',14,2),(130,'2024-05-29 17:14:00.572116','9','ЕВРО 24 / tatianka1101@yandex.ru',1,'[{\"added\": {}}]',14,2),(131,'2024-05-30 06:32:23.110456','6','ForecastWinner object (6)',1,'[{\"added\": {}}]',20,2),(132,'2024-05-30 19:06:44.382413','10','ЕВРО 24 / ivavlasov@yandex.ru',1,'[{\"added\": {}}]',14,2),(133,'2024-05-30 19:06:57.183795','7','ForecastWinner object (7)',1,'[{\"added\": {}}]',20,2),(134,'2024-05-30 19:20:26.894432','11','ivavlasov@yandex.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(135,'2024-05-30 19:20:36.862291','7','djmus@inbox.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(136,'2024-06-01 16:21:25.092516','10','tatianka1101@yandex.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(137,'2024-06-01 16:21:34.518579','1','smicersiu@gmail.com',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(138,'2024-06-07 14:58:59.079217','5','g5230ilchenkoan@yandex.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(139,'2024-06-07 14:59:29.111650','9','nemozzz1987@gmail.com',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(140,'2024-06-09 20:20:42.726954','17','Австрия / Австрия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(141,'2024-06-09 20:21:31.742380','13','Албания / Албания',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(142,'2024-06-09 20:21:40.936987','16','Англия / Англия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(143,'2024-06-09 20:21:51.681831','22','Бельгия / Бельгия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(144,'2024-06-09 20:22:03.163059','15','Венгрия / Венгрия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(145,'2024-06-09 20:22:13.772314','24','Германия / Германия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(146,'2024-06-09 20:22:19.259310','3','Грузия / Грузия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(147,'2024-06-09 20:22:26.570497','12','Дания / Дания',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(148,'2024-06-09 20:22:33.682502','20','Испания / Испания',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(149,'2024-06-09 20:22:40.524259','7','Италия / Италия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(150,'2024-06-09 20:22:47.983563','11','Нидерланды / Нидерланды',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(151,'2024-06-09 20:22:55.997199','1','Польша / Польша',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(152,'2024-06-09 20:23:03.489615','21','Португалия / Португалия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(153,'2024-06-09 20:23:11.942442','9','Румыния / Румыния',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(154,'2024-06-09 20:23:20.233251','8','Сербия / Сербия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(155,'2024-06-09 20:23:27.754674','14','Словакия / Словакия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(156,'2024-06-09 20:23:37.336716','5','Словения / Словения',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(157,'2024-06-09 20:23:44.131899','18','Турция / Турция',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(158,'2024-06-09 20:23:52.585234','2','Украина / Украина',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(159,'2024-06-09 20:23:59.353243','23','Франция / Франция',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(160,'2024-06-09 20:24:10.248698','4','Хорватия / Хорватия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(161,'2024-06-09 20:24:16.656912','6','Чехия / Чехия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(162,'2024-06-09 20:24:26.755763','10','Швейцария / Швейцария',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(163,'2024-06-09 20:24:34.063126','19','Шотландия / Шотландия',2,'[{\"changed\": {\"fields\": [\"badge\"]}}]',12,2),(164,'2024-06-12 06:23:10.466308','11','ЕВРО 24 / overflow@bk.ru',1,'[{\"added\": {}}]',14,2),(165,'2024-06-12 06:32:32.344567','8','ForecastWinner object (8)',1,'[{\"added\": {}}]',20,2),(166,'2024-06-12 16:32:52.824086','10','ЕВРО 24 / ivavlasov@yandex.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(167,'2024-06-12 16:32:59.988689','6','ЕВРО 24 / djmus@inbox.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(168,'2024-06-12 16:33:05.997191','4','ЕВРО 24 / g5230ilchenkoan@yandex.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(169,'2024-06-12 16:34:05.982321','9','ЕВРО 24 / tatianka1101@yandex.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(170,'2024-06-12 16:34:10.085745','8','ЕВРО 24 / nemozzz1987@gmail.com',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(171,'2024-06-12 16:34:21.786649','1','ЕВРО 24 / smicersiu@gmail.com',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(172,'2024-06-12 16:34:33.820499','11','ЕВРО 24 / overflow@bk.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(173,'2024-06-13 08:10:11.768941','7','ЕВРО 24 / sergeyskripnyuk@gmail.com',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(174,'2024-06-13 08:13:26.642376','12','ЕВРО 24 / oscrowd@mail.ru',1,'[{\"added\": {}}]',14,2),(175,'2024-06-13 08:13:56.855504','3','ЕВРО 24 / dj-ya@mail.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(176,'2024-06-13 08:21:30.529991','13','oscrowd@mail.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(177,'2024-06-13 08:21:42.496913','4','dj-ya@mail.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(178,'2024-06-13 08:21:50.430934','7','djmus@inbox.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(179,'2024-06-13 08:22:00.966521','5','g5230ilchenkoan@yandex.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(180,'2024-06-13 08:22:11.764246','11','ivavlasov@yandex.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(181,'2024-06-13 08:22:22.497966','6','kutarov@list.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(182,'2024-06-13 08:22:33.195820','9','nemozzz1987@gmail.com',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(183,'2024-06-13 08:22:41.307628','12','overflow@bk.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(184,'2024-06-13 08:22:54.502724','8','sergeyskripnyuk@gmail.com',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(185,'2024-06-13 08:23:08.371776','1','smicersiu@gmail.com',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(186,'2024-06-13 08:23:15.475980','10','tatianka1101@yandex.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(187,'2024-06-13 08:24:48.232696','3','abitotti2004@mail.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',23,2),(188,'2024-06-13 08:25:29.417416','5','ЕВРО 24 / kutarov@list.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(189,'2024-06-13 10:40:15.679130','9','ForecastWinner object (9)',1,'[{\"added\": {}}]',20,2),(190,'2024-06-13 10:41:22.536942','2','ЕВРО 24 / abitotti2004@mail.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',14,2),(191,'2024-06-13 15:05:50.291219','10','ForecastWinner object (10)',1,'[{\"added\": {}}]',20,2),(192,'2024-06-14 05:44:00.853996','11','ForecastWinner object (11)',1,'[{\"added\": {}}]',20,2),(193,'2024-06-14 05:48:58.827382','12','ForecastWinner object (12)',1,'[{\"added\": {}}]',20,2),(194,'2024-06-14 20:56:42.181091','1','ЕВРО 24 / 2024-06-14 19:00:00+00:00 / Германия - Шотландия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (1)\"}}]',15,2),(195,'2024-06-15 14:58:24.447539','2','ЕВРО 24 / 2024-06-15 13:00:00+00:00 / Венгрия - Швейцария',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (2)\"}}]',15,2),(196,'2024-06-15 16:05:48.749650','3','ЕВРО 24 / 2024-06-15 16:00:00+00:00 / Испания - Хорватия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(197,'2024-06-15 17:56:48.850548','3','ЕВРО 24 / 2024-06-15 16:00:00+00:00 / Испания - Хорватия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (3)\"}}]',15,2),(198,'2024-06-15 17:56:58.429072','3','ЕВРО 24 / 2024-06-15 16:00:00+00:00 / Испания - Хорватия',2,'[]',15,2),(199,'2024-06-15 19:23:23.250058','4','ЕВРО 24 / 2024-06-15 19:00:00+00:00 / Италия - Албания',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(200,'2024-06-15 20:55:55.409967','4','ЕВРО 24 / 2024-06-15 19:00:00+00:00 / Италия - Албания',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (4)\"}}]',15,2),(201,'2024-06-16 15:02:02.211741','5','ЕВРО 24 / 2024-06-16 13:00:00+00:00 / Польша - Нидерланды',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (5)\"}}]',15,2),(202,'2024-06-16 17:53:40.466949','6','ЕВРО 24 / 2024-06-16 16:00:00+00:00 / Словения - Дания',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (6)\"}}]',15,2),(203,'2024-06-16 20:27:24.298792','7','ЕВРО 24 / 2024-06-16 19:00:00+00:00 / Сербия - Англия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(204,'2024-06-16 20:29:20.563239','5','ЕВРО 24 / 2024-06-16 13:00:00+00:00 / Польша - Нидерланды',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(205,'2024-06-16 20:29:50.178773','6','ЕВРО 24 / 2024-06-16 16:00:00+00:00 / Словения - Дания',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(206,'2024-06-16 20:54:17.643649','7','ЕВРО 24 / 2024-06-16 19:00:00+00:00 / Сербия - Англия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (7)\"}}]',15,2),(207,'2024-06-17 12:49:57.367467','133','Forecast object (133)',1,'[{\"added\": {}}]',17,2),(208,'2024-06-17 13:10:24.845764','8','ЕВРО 24 / 2024-06-17 13:00:00+00:00 / Румыния - Украина',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(209,'2024-06-17 14:52:50.613727','8','ЕВРО 24 / 2024-06-17 13:00:00+00:00 / Румыния - Украина',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (8)\"}}]',15,2),(210,'2024-06-17 16:39:55.988185','9','ЕВРО 24 / 2024-06-17 16:00:00+00:00 / Бельгия - Словакия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(211,'2024-06-17 17:57:49.607819','9','ЕВРО 24 / 2024-06-17 16:00:00+00:00 / Бельгия - Словакия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (9)\"}}]',15,2),(212,'2024-06-17 19:04:17.242883','10','ЕВРО 24 / 2024-06-17 19:00:00+00:00 / Австрия - Франция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(213,'2024-06-17 20:57:34.299661','10','ЕВРО 24 / 2024-06-17 19:00:00+00:00 / Австрия - Франция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (10)\"}}]',15,2),(214,'2024-06-18 16:04:06.871548','11','ЕВРО 24 / 2024-06-18 16:00:00+00:00 / Турция - Грузия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(215,'2024-06-18 17:56:47.058884','11','ЕВРО 24 / 2024-06-18 16:00:00+00:00 / Турция - Грузия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (11)\"}}]',15,2),(216,'2024-06-18 20:53:14.340511','12','ЕВРО 24 / 2024-06-18 19:00:00+00:00 / Португалия - Чехия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (12)\"}}]',15,2),(217,'2024-06-19 14:56:58.694252','13','ЕВРО 24 / 2024-06-19 13:00:00+00:00 / Хорватия - Албания',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (13)\"}}]',15,2),(218,'2024-06-19 17:52:59.780435','14','ЕВРО 24 / 2024-06-19 16:00:00+00:00 / Германия - Венгрия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (14)\"}}]',15,2),(219,'2024-06-19 20:53:19.587400','15','ЕВРО 24 / 2024-06-19 19:00:00+00:00 / Шотландия - Швейцария',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (15)\"}}]',15,2),(220,'2024-06-20 06:46:50.526724','2','ЕВРО 24 / abitotti2004@mail.ru',2,'[{\"changed\": {\"fields\": [\"checkin\"]}}]',14,2),(221,'2024-06-20 06:46:58.448957','2','ЕВРО 24 / abitotti2004@mail.ru',2,'[{\"changed\": {\"fields\": [\"description\"]}}]',14,2),(222,'2024-06-20 14:55:11.822263','16','ЕВРО 24 / 2024-06-20 13:00:00+00:00 / Словения - Сербия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (16)\"}}]',15,2),(223,'2024-06-20 17:53:03.704736','17','ЕВРО 24 / 2024-06-20 16:00:00+00:00 / Дания - Англия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (17)\"}}]',15,2),(224,'2024-06-20 19:10:00.443267','18','ЕВРО 24 / 2024-06-20 19:00:00+00:00 / Испания - Италия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(225,'2024-06-20 20:54:51.585398','18','ЕВРО 24 / 2024-06-20 19:00:00+00:00 / Испания - Италия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (18)\"}}]',15,2),(226,'2024-06-21 12:16:59.715771','300','Forecast object (300)',1,'[{\"added\": {}}]',17,2),(227,'2024-06-21 13:41:56.864207','19','ЕВРО 24 / 2024-06-21 13:00:00+00:00 / Словакия - Украина',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(228,'2024-06-21 14:54:17.555510','19','ЕВРО 24 / 2024-06-21 13:00:00+00:00 / Словакия - Украина',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (19)\"}}]',15,2),(229,'2024-06-21 17:57:44.806226','20','ЕВРО 24 / 2024-06-21 16:00:00+00:00 / Польша - Австрия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (20)\"}}]',15,2),(230,'2024-06-21 19:44:38.426644','21','ЕВРО 24 / 2024-06-21 19:00:00+00:00 / Нидерланды - Франция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(231,'2024-06-21 20:54:34.119756','21','ЕВРО 24 / 2024-06-21 19:00:00+00:00 / Нидерланды - Франция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (21)\"}}]',15,2),(232,'2024-06-21 20:55:09.006842','21','ЕВРО 24 / 2024-06-21 19:00:00+00:00 / Нидерланды - Франция',2,'[{\"changed\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (21)\", \"fields\": [\"score_home\"]}}]',15,2),(233,'2024-06-22 14:45:13.424560','22','ЕВРО 24 / 2024-06-22 13:00:00+00:00 / Грузия - Чехия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(234,'2024-06-22 15:05:26.561193','22','ЕВРО 24 / 2024-06-22 13:00:00+00:00 / Грузия - Чехия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (22)\"}}]',15,2),(235,'2024-06-22 17:53:40.895545','23','ЕВРО 24 / 2024-06-22 16:00:00+00:00 / Турция - Португалия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (23)\"}}]',15,2),(236,'2024-06-22 18:15:44.610981','345','Forecast object (345)',1,'[{\"added\": {}}]',17,2),(237,'2024-06-22 20:50:54.057663','24','ЕВРО 24 / 2024-06-22 19:00:00+00:00 / Бельгия - Румыния',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (24)\"}}]',15,2),(238,'2024-06-23 20:53:00.949858','25','ЕВРО 24 / 2024-06-23 19:00:00+00:00 / Швейцария - Германия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (25)\"}}]',15,2),(239,'2024-06-23 20:59:00.701839','26','ЕВРО 24 / 2024-06-23 19:00:00+00:00 / Шотландия - Венгрия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (26)\"}}]',15,2),(240,'2024-06-24 18:17:30.081089','396','Forecast object (396)',1,'[{\"added\": {}}]',17,2),(241,'2024-06-24 20:49:10.385767','28','ЕВРО 24 / 2024-06-24 19:00:00+00:00 / Албания - Испания',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(242,'2024-06-24 20:49:19.523552','27','ЕВРО 24 / 2024-06-24 19:00:00+00:00 / Хорватия - Италия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(243,'2024-06-24 20:56:47.746270','28','ЕВРО 24 / 2024-06-24 19:00:00+00:00 / Албания - Испания',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (27)\"}}]',15,2),(244,'2024-06-24 20:58:10.635841','27','ЕВРО 24 / 2024-06-24 19:00:00+00:00 / Хорватия - Италия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (28)\"}}]',15,2),(245,'2024-06-25 17:27:00.120492','30','ЕВРО 24 / 2024-06-25 16:00:00+00:00 / Франция - Польша',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(246,'2024-06-25 17:27:47.449086','29','ЕВРО 24 / 2024-06-25 16:00:00+00:00 / Нидерланды - Австрия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(247,'2024-06-25 17:55:49.602268','29','ЕВРО 24 / 2024-06-25 16:00:00+00:00 / Нидерланды - Австрия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (29)\"}}]',15,2),(248,'2024-06-25 17:56:15.541720','30','ЕВРО 24 / 2024-06-25 16:00:00+00:00 / Франция - Польша',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (30)\"}}]',15,2),(249,'2024-06-25 20:05:17.163162','32','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Дания - Сербия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(250,'2024-06-25 20:05:58.509426','31','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Англия - Словения',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(251,'2024-06-25 20:52:04.595540','31','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Англия - Словения',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (31)\"}}]',15,2),(252,'2024-06-25 20:52:08.959133','31','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Англия - Словения',2,'[{\"changed\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (31)\", \"fields\": [\"score_home\"]}}]',15,2),(253,'2024-06-25 20:53:39.205102','32','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Дания - Сербия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (32)\"}}]',15,2),(254,'2024-06-25 20:53:43.304221','32','ЕВРО 24 / 2024-06-25 19:00:00+00:00 / Дания - Сербия',2,'[{\"changed\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (32)\", \"fields\": [\"score_home\"]}}]',15,2),(255,'2024-06-26 15:08:51.622822','456','Forecast object (456)',1,'[{\"added\": {}}]',17,2),(256,'2024-06-26 15:09:05.846367','457','Forecast object (457)',1,'[{\"added\": {}}]',17,2),(257,'2024-06-26 15:53:22.068078','34','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Украина - Бельгия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(258,'2024-06-26 15:53:44.688613','33','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Словакия - Румыния',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(259,'2024-06-26 17:49:38.261372','34','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Украина - Бельгия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (33)\"}}]',15,2),(260,'2024-06-26 17:49:42.499242','34','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Украина - Бельгия',2,'[{\"changed\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (33)\", \"fields\": [\"score_home\"]}}]',15,2),(261,'2024-06-26 17:54:38.840285','34','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Украина - Бельгия',2,'[{\"changed\": {\"fields\": [\"status\"]}}]',15,2),(262,'2024-06-26 17:55:39.886026','33','ЕВРО 24 / 2024-06-26 16:00:00+00:00 / Словакия - Румыния',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (34)\"}}]',15,2),(263,'2024-06-26 18:54:12.002062','460','Forecast object (460)',1,'[{\"added\": {}}]',17,2),(264,'2024-06-26 19:34:18.511464','36','ЕВРО 24 / 2024-06-26 19:00:00+00:00 / Грузия - Португалия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(265,'2024-06-26 19:35:36.512538','35','ЕВРО 24 / 2024-06-26 19:00:00+00:00 / Чехия - Турция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(266,'2024-06-26 20:53:42.564955','36','ЕВРО 24 / 2024-06-26 19:00:00+00:00 / Грузия - Португалия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (35)\"}}]',15,2),(267,'2024-06-26 20:57:24.483085','35','ЕВРО 24 / 2024-06-26 19:00:00+00:00 / Чехия - Турция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (36)\"}}]',15,2),(268,'2024-06-27 05:20:46.963211','37','ЕВРО 24 / 2024-06-29 16:00:00+00:00 / Швейцария - Италия',1,'[{\"added\": {}}]',15,2),(269,'2024-06-27 05:21:24.837454','38','ЕВРО 24 / 2024-06-29 19:00:00+00:00 / Германия - Дания',1,'[{\"added\": {}}]',15,2),(270,'2024-06-27 05:22:03.128819','39','ЕВРО 24 / 2024-06-30 16:00:00+00:00 / Англия - Словакия',1,'[{\"added\": {}}]',15,2),(271,'2024-06-27 05:22:43.793567','40','ЕВРО 24 / 2024-06-30 19:00:00+00:00 / Испания - Грузия',1,'[{\"added\": {}}]',15,2),(272,'2024-06-27 05:23:27.582416','41','ЕВРО 24 / 2024-07-01 16:00:00+00:00 / Франция - Бельгия',1,'[{\"added\": {}}]',15,2),(273,'2024-06-27 05:24:03.856117','42','ЕВРО 24 / 2024-07-01 19:00:00+00:00 / Португалия - Словения',1,'[{\"added\": {}}]',15,2),(274,'2024-06-27 05:24:42.606375','43','ЕВРО 24 / 2024-07-02 16:00:00+00:00 / Румыния - Нидерланды',1,'[{\"added\": {}}]',15,2),(275,'2024-06-27 05:25:13.989416','44','ЕВРО 24 / 2024-07-02 19:00:00+00:00 / Австрия - Турция',1,'[{\"added\": {}}]',15,2),(276,'2024-06-29 17:53:06.453757','37','ЕВРО 24 / 2024-06-29 16:00:00+00:00 / Швейцария - Италия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (37)\"}}]',15,2),(277,'2024-06-29 20:56:15.250273','38','ЕВРО 24 / 2024-06-29 19:00:00+00:00 / Германия - Дания',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(278,'2024-06-29 21:19:05.484418','38','ЕВРО 24 / 2024-06-29 19:00:00+00:00 / Германия - Дания',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (38)\"}}]',15,2),(279,'2024-06-30 15:03:58.993197','524','Forecast object (524)',1,'[{\"added\": {}}]',17,2),(280,'2024-06-30 17:57:12.376079','39','ЕВРО 24 / 2024-06-30 16:00:00+00:00 / Англия - Словакия',2,'[{\"changed\": {\"fields\": [\"place\", \"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (39)\"}}]',15,2),(281,'2024-06-30 19:19:35.706158','40','ЕВРО 24 / 2024-06-30 19:00:00+00:00 / Испания - Грузия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(282,'2024-06-30 20:52:19.165051','40','ЕВРО 24 / 2024-06-30 19:00:00+00:00 / Испания - Грузия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (40)\"}}]',15,2),(283,'2024-07-01 17:51:23.938250','41','ЕВРО 24 / 2024-07-01 16:00:00+00:00 / Франция - Бельгия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (41)\"}}]',15,2),(284,'2024-07-01 17:51:38.202494','41','ЕВРО 24 / 2024-07-01 16:00:00+00:00 / Франция - Бельгия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(285,'2024-07-01 20:09:32.892616','42','ЕВРО 24 / 2024-07-01 19:00:00+00:00 / Португалия - Словения',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(286,'2024-07-01 20:54:29.570619','42','ЕВРО 24 / 2024-07-01 19:00:00+00:00 / Португалия - Словения',2,'[{\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (42)\"}}]',15,2),(287,'2024-07-01 20:54:33.255061','42','ЕВРО 24 / 2024-07-01 19:00:00+00:00 / Португалия - Словения',2,'[{\"changed\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (42)\", \"fields\": [\"score_home\"]}}]',15,2),(288,'2024-07-01 20:54:40.740054','42','ЕВРО 24 / 2024-07-01 19:00:00+00:00 / Португалия - Словения',2,'[{\"changed\": {\"fields\": [\"status\"]}}]',15,2),(289,'2024-07-02 06:15:56.673003','45','ЕВРО 24 / 2024-07-05 16:00:00+00:00 / Испания - Германия',1,'[{\"added\": {}}]',15,2),(290,'2024-07-02 06:16:35.310015','46','ЕВРО 24 / 2024-07-05 19:00:00+00:00 / Португалия - Франция',1,'[{\"added\": {}}]',15,2),(291,'2024-07-02 06:17:04.171419','47','ЕВРО 24 / 2024-07-06 16:00:00+00:00 / Англия - Швейцария',1,'[{\"added\": {}}]',15,2),(292,'2024-07-02 16:47:24.628077','43','ЕВРО 24 / 2024-07-02 16:00:00+00:00 / Румыния - Нидерланды',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(293,'2024-07-02 17:54:08.766094','43','ЕВРО 24 / 2024-07-02 16:00:00+00:00 / Румыния - Нидерланды',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (43)\"}}]',15,2),(294,'2024-07-02 18:56:50.995913','44','ЕВРО 24 / 2024-07-02 19:00:00+00:00 / Австрия - Турция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(295,'2024-07-02 20:53:12.871155','44','ЕВРО 24 / 2024-07-02 19:00:00+00:00 / Австрия - Турция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (44)\"}}]',15,2),(296,'2024-07-03 06:17:17.682374','48','ЕВРО 24 / 2024-07-06 19:00:00+00:00 / Нидерланды - Турция',1,'[{\"added\": {}}]',15,2),(297,'2024-07-05 15:56:39.301770','596','Forecast object (596)',1,'[{\"added\": {}}]',17,2),(298,'2024-07-05 16:48:02.976655','45','ЕВРО 24 / 2024-07-05 16:00:00+00:00 / Испания - Германия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(299,'2024-07-05 17:53:28.483710','45','ЕВРО 24 / 2024-07-05 16:00:00+00:00 / Испания - Германия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (45)\"}}]',15,2),(300,'2024-07-05 18:43:59.962278','599','Forecast object (599)',1,'[{\"added\": {}}]',17,2),(301,'2024-07-05 19:00:52.592970','46','ЕВРО 24 / 2024-07-05 19:00:00+00:00 / Португалия - Франция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(302,'2024-07-05 20:49:57.838713','46','ЕВРО 24 / 2024-07-05 19:00:00+00:00 / Португалия - Франция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (46)\"}}]',15,2),(303,'2024-07-05 20:50:01.863686','46','ЕВРО 24 / 2024-07-05 19:00:00+00:00 / Португалия - Франция',2,'[{\"changed\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (46)\", \"fields\": [\"score_home\"]}}]',15,2),(304,'2024-07-05 21:42:51.962719','49','ЕВРО 24 / 2024-07-09 19:00:00+00:00 / Испания - Франция',1,'[{\"added\": {}}]',15,2),(305,'2024-07-06 15:18:13.222199','609','Forecast object (609)',1,'[{\"added\": {}}]',17,2),(306,'2024-07-06 15:20:33.171929','610','Forecast object (610)',1,'[{\"added\": {}}]',17,2),(307,'2024-07-06 15:22:38.140436','15','e',3,'',23,2),(308,'2024-07-06 16:41:56.666875','612','Forecast object (612)',1,'[{\"added\": {}}]',17,2),(309,'2024-07-06 17:50:08.685338','47','ЕВРО 24 / 2024-07-06 16:00:00+00:00 / Англия - Швейцария',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (47)\"}}]',15,2),(310,'2024-07-06 18:01:16.666260','47','ЕВРО 24 / 2024-07-06 16:00:00+00:00 / Англия - Швейцария',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(311,'2024-07-06 19:38:16.352970','48','ЕВРО 24 / 2024-07-06 19:00:00+00:00 / Нидерланды - Турция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(312,'2024-07-06 20:54:50.270783','48','ЕВРО 24 / 2024-07-06 19:00:00+00:00 / Нидерланды - Турция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (48)\"}}]',15,2),(313,'2024-07-06 20:57:11.249281','50','ЕВРО 24 / 2024-07-10 19:00:00+00:00 / Нидерланды - Англия',1,'[{\"added\": {}}]',15,2),(314,'2024-07-09 19:08:47.552889','49','ЕВРО 24 / 2024-07-09 19:00:00+00:00 / Испания - Франция',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(315,'2024-07-09 20:54:01.995426','49','ЕВРО 24 / 2024-07-09 19:00:00+00:00 / Испания - Франция',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (49)\"}}]',15,2),(316,'2024-07-10 18:43:28.793103','50','ЕВРО 24 / 2024-07-10 19:00:00+00:00 / Нидерланды - Англия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(317,'2024-07-10 20:55:20.209490','50','ЕВРО 24 / 2024-07-10 19:00:00+00:00 / Нидерланды - Англия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (50)\"}}]',15,2),(318,'2024-07-10 20:57:06.258444','51','ЕВРО 24 / 2024-07-14 19:00:00+00:00 / Испания - Англия',1,'[{\"added\": {}}]',15,2),(319,'2024-07-11 04:49:08.070113','51','ЕВРО 24 / 2024-07-14 19:00:00+00:00 / Испания - Англия',2,'[{\"changed\": {\"fields\": [\"place\"]}}]',15,2),(320,'2024-07-14 20:53:35.664597','51','ЕВРО 24 / 2024-07-14 19:00:00+00:00 / Испания - Англия',2,'[{\"changed\": {\"fields\": [\"status\"]}}, {\"added\": {\"name\": \"\\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\", \"object\": \"Result object (51)\"}}]',15,2),(321,'2024-07-14 20:55:06.433312','1','ЕВРО 24',2,'[{\"changed\": {\"fields\": [\"winner\"]}}]',9,2);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(21,'common','entity'),(24,'common','mail'),(22,'common','param'),(23,'common','user'),(4,'contenttypes','contenttype'),(6,'easy_thumbnails','source'),(7,'easy_thumbnails','thumbnail'),(8,'easy_thumbnails','thumbnaildimensions'),(5,'sessions','session'),(9,'tournaments','basetournament'),(10,'tournaments','country'),(17,'tournaments','forecast'),(20,'tournaments','forecastwinner'),(15,'tournaments','match'),(14,'tournaments','participant'),(16,'tournaments','result'),(19,'tournaments','rule'),(13,'tournaments','stage'),(18,'tournaments','stagecoefficient'),(12,'tournaments','team'),(11,'tournaments','tournament');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-27 17:39:09.007157'),(2,'contenttypes','0002_remove_content_type_name','2024-05-27 17:39:09.062749'),(3,'auth','0001_initial','2024-05-27 17:39:11.461284'),(4,'auth','0002_alter_permission_name_max_length','2024-05-27 17:39:11.600989'),(5,'auth','0003_alter_user_email_max_length','2024-05-27 17:39:11.611957'),(6,'auth','0004_alter_user_username_opts','2024-05-27 17:39:11.622701'),(7,'auth','0005_alter_user_last_login_null','2024-05-27 17:39:11.631970'),(8,'auth','0006_require_contenttypes_0002','2024-05-27 17:39:11.633445'),(9,'auth','0007_alter_validators_add_error_messages','2024-05-27 17:39:11.644035'),(10,'auth','0008_alter_user_username_max_length','2024-05-27 17:39:11.656671'),(11,'auth','0009_alter_user_last_name_max_length','2024-05-27 17:39:11.666926'),(12,'auth','0010_alter_group_name_max_length','2024-05-27 17:39:11.699013'),(13,'auth','0011_update_proxy_permissions','2024-05-27 17:39:11.709889'),(14,'common','0001_initial','2024-05-27 17:39:17.939886'),(15,'admin','0001_initial','2024-05-27 17:39:19.988574'),(16,'admin','0002_logentry_remove_auto_add','2024-05-27 17:39:20.024993'),(17,'admin','0003_logentry_add_action_flag_choices','2024-05-27 17:39:20.034599'),(18,'common','0002_mail','2024-05-27 17:39:20.929003'),(19,'common','0003_auto_20210616_1110','2024-05-27 17:39:20.943995'),(20,'common','0004_auto_20210616_1113','2024-05-27 17:39:20.974052'),(21,'common','0005_user_nickname','2024-05-27 17:39:21.215432'),(22,'common','0006_user_description','2024-05-27 17:39:21.468351'),(23,'easy_thumbnails','0001_initial','2024-05-27 17:39:23.559119'),(24,'easy_thumbnails','0002_thumbnaildimensions','2024-05-27 17:39:24.507874'),(25,'sessions','0001_initial','2024-05-27 17:39:25.227898'),(26,'tournaments','0001_initial','2024-05-27 17:39:34.566419'),(27,'tournaments','0002_result','2024-05-27 17:39:35.820961'),(28,'tournaments','0003_forecast','2024-05-27 17:39:37.413095'),(29,'tournaments','0004_auto_20210618_0604','2024-05-27 17:39:37.489992'),(30,'tournaments','0005_rule_stagecoefficient','2024-05-27 17:39:39.778235'),(31,'tournaments','0006_auto_20210618_0918','2024-05-27 17:39:39.856094'),(32,'tournaments','0007_auto_20210619_0443','2024-05-27 17:39:40.378338'),(33,'tournaments','0008_auto_20210623_0858','2024-05-27 17:39:41.616400'),(34,'tournaments','0009_participant_checkin','2024-06-12 16:32:11.079135'),(35,'tournaments','0010_participant_description','2024-06-12 16:32:11.354388');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('3sbkaztnt79zvmp85ddlc3wq05o6lacy','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-07-10 15:08:22.644807'),('arjs0qgxf48blj9r0fgkrszw0a31m7lk','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-07-25 08:58:30.220423'),('i16n820e09phrb3g27e99rbc7j1znkx3','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-06-11 17:46:01.094323'),('k660b760yjfm806vy1bsbxx5dugk7h1t','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-06-26 07:44:30.245570'),('msqex6621ck1uflpdf6s3orzdyp65qhv','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-06-26 06:22:49.857415'),('vz33cucyahbqphg9743yl35v60mv4bdg','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-07-11 06:05:10.369518'),('yrm2hxsp98qifv9cw553iu2w5il8fgcf','MDU2ZDcxZjZjYjZjZThhZDI0MTM1YmM2ZjliNGJlNzRkYTNmZDFmZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NGVkYmI4OGUyN2I2YmYwYTgxMzdmMmIyZjhjZTljMWMyNDJhMjg1In0=','2024-07-24 18:42:56.906929');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easy_thumbnails_source`
--

DROP TABLE IF EXISTS `easy_thumbnails_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easy_thumbnails_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storage_hash` varchar(40) NOT NULL,
  `name` varchar(255) NOT NULL,
  `modified` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `easy_thumbnails_source_storage_hash_name_481ce32d_uniq` (`storage_hash`,`name`),
  KEY `easy_thumbnails_source_storage_hash_946cbcc9` (`storage_hash`),
  KEY `easy_thumbnails_source_name_5fe0edc6` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easy_thumbnails_source`
--

LOCK TABLES `easy_thumbnails_source` WRITE;
/*!40000 ALTER TABLE `easy_thumbnails_source` DISABLE KEYS */;
INSERT INTO `easy_thumbnails_source` VALUES (1,'f9bde26a1556cd667f742bd34ec7c55e','avatars/1643114605_14-abrakadabra-fun-p-oboi-na-telefon-spartak-moskva-futbol-vert-16.jpg','2024-05-28 17:47:46.648331'),(2,'f9bde26a1556cd667f742bd34ec7c55e','badges/Польша.png','2024-05-28 17:58:49.682553'),(3,'f9bde26a1556cd667f742bd34ec7c55e','badges/Украина.png','2024-05-28 17:59:01.853842'),(4,'f9bde26a1556cd667f742bd34ec7c55e','badges/Грузия.png','2024-05-28 17:59:11.161454'),(5,'f9bde26a1556cd667f742bd34ec7c55e','badges/Хорватия.png','2024-05-28 17:59:30.877619'),(6,'f9bde26a1556cd667f742bd34ec7c55e','badges/Словения.png','2024-05-28 17:59:47.960309'),(7,'f9bde26a1556cd667f742bd34ec7c55e','badges/Чехия.png','2024-05-28 18:00:01.378442'),(8,'f9bde26a1556cd667f742bd34ec7c55e','badges/Италия.png','2024-05-28 18:00:12.433338'),(9,'f9bde26a1556cd667f742bd34ec7c55e','badges/Сербия.png','2024-05-28 18:00:23.227048'),(10,'f9bde26a1556cd667f742bd34ec7c55e','badges/Румыния.png','2024-05-28 18:00:33.257620'),(11,'f9bde26a1556cd667f742bd34ec7c55e','badges/Швеицария.png','2024-05-28 18:00:42.080465'),(12,'f9bde26a1556cd667f742bd34ec7c55e','badges/Нидерланды.png','2024-05-28 18:00:53.075988'),(13,'f9bde26a1556cd667f742bd34ec7c55e','badges/Дания.png','2024-05-28 18:01:04.068953'),(14,'f9bde26a1556cd667f742bd34ec7c55e','badges/Албания.png','2024-05-28 18:01:14.649462'),(15,'f9bde26a1556cd667f742bd34ec7c55e','badges/Словакия.png','2024-05-28 18:01:27.025588'),(16,'f9bde26a1556cd667f742bd34ec7c55e','badges/Венгрия.png','2024-05-28 18:01:38.317411'),(17,'f9bde26a1556cd667f742bd34ec7c55e','badges/Англия.png','2024-05-28 18:01:52.140087'),(18,'f9bde26a1556cd667f742bd34ec7c55e','badges/Австрия.png','2024-05-28 18:02:04.189590'),(19,'f9bde26a1556cd667f742bd34ec7c55e','badges/Турция.png','2024-05-28 18:02:15.840605'),(20,'f9bde26a1556cd667f742bd34ec7c55e','badges/Шотландия.png','2024-05-28 18:02:27.097278'),(21,'f9bde26a1556cd667f742bd34ec7c55e','badges/Испания.png','2024-05-28 18:02:38.226356'),(22,'f9bde26a1556cd667f742bd34ec7c55e','badges/Португалия.png','2024-05-28 18:02:51.324526'),(23,'f9bde26a1556cd667f742bd34ec7c55e','badges/Бельгия.png','2024-05-28 18:03:02.003013'),(24,'f9bde26a1556cd667f742bd34ec7c55e','badges/Франция.png','2024-05-28 18:03:12.214930'),(25,'f9bde26a1556cd667f742bd34ec7c55e','badges/Германия.png','2024-05-28 18:03:23.073769'),(26,'f9bde26a1556cd667f742bd34ec7c55e','badges/Германия_rBCFoIa.png','2024-05-29 07:11:34.191098'),(27,'f9bde26a1556cd667f742bd34ec7c55e','badges/Франция_AQYqvq7.png','2024-05-29 07:11:39.866539'),(28,'f9bde26a1556cd667f742bd34ec7c55e','badges/Бельгия_wRVerjR.png','2024-05-29 07:12:14.295394'),(29,'f9bde26a1556cd667f742bd34ec7c55e','badges/Португалия_YCrKZBO.png','2024-05-29 07:12:19.619726'),(30,'f9bde26a1556cd667f742bd34ec7c55e','badges/Испания_Wb3P0c8.png','2024-05-29 07:12:37.172258'),(31,'f9bde26a1556cd667f742bd34ec7c55e','badges/Шотландия_VoH8cdP.png','2024-05-29 07:12:44.513269'),(32,'f9bde26a1556cd667f742bd34ec7c55e','badges/Турция_dRes1fn.png','2024-05-29 07:12:50.411710'),(33,'f9bde26a1556cd667f742bd34ec7c55e','badges/Австрия_U0R569L.png','2024-05-29 07:12:56.551282'),(34,'f9bde26a1556cd667f742bd34ec7c55e','badges/Англия_VoXykVk.png','2024-05-29 07:13:02.257500'),(35,'f9bde26a1556cd667f742bd34ec7c55e','badges/Венгрия_NLFOS0H.png','2024-05-29 07:13:08.044042'),(36,'f9bde26a1556cd667f742bd34ec7c55e','badges/Словакия_xkdA5MO.png','2024-05-29 07:13:13.609813'),(37,'f9bde26a1556cd667f742bd34ec7c55e','badges/Албания_qViyzDP.png','2024-05-29 07:13:18.674721'),(38,'f9bde26a1556cd667f742bd34ec7c55e','badges/Дания_FokK9aC.png','2024-05-29 07:13:24.233191'),(39,'f9bde26a1556cd667f742bd34ec7c55e','badges/Нидерланды_AjH4d3y.png','2024-05-29 07:13:30.496969'),(40,'f9bde26a1556cd667f742bd34ec7c55e','badges/Швеицария_XZq2iL4.png','2024-05-29 07:13:36.525897'),(41,'f9bde26a1556cd667f742bd34ec7c55e','badges/Румыния_F9PcxV3.png','2024-05-29 07:13:42.931488'),(42,'f9bde26a1556cd667f742bd34ec7c55e','badges/Сербия_7jPPIM2.png','2024-05-29 07:13:48.977971'),(43,'f9bde26a1556cd667f742bd34ec7c55e','badges/Италия_c9FUZVU.png','2024-05-29 07:13:54.761635'),(44,'f9bde26a1556cd667f742bd34ec7c55e','badges/Чехия_5bWz6FE.png','2024-05-29 07:14:01.418856'),(45,'f9bde26a1556cd667f742bd34ec7c55e','badges/Словения_dkVynIw.png','2024-05-29 07:14:06.997015'),(46,'f9bde26a1556cd667f742bd34ec7c55e','badges/Хорватия_X3LaMaW.png','2024-05-29 07:14:12.288131'),(47,'f9bde26a1556cd667f742bd34ec7c55e','badges/Грузия_DDqjzt4.png','2024-05-29 07:14:17.537944'),(48,'f9bde26a1556cd667f742bd34ec7c55e','badges/Украина_VcXlySN.png','2024-05-29 07:14:22.418730'),(49,'f9bde26a1556cd667f742bd34ec7c55e','badges/Польша_TaNeg6P.png','2024-05-29 07:14:28.485637'),(50,'f9bde26a1556cd667f742bd34ec7c55e','avatars/rJNdvaWjGS4.jpg','2024-05-29 10:19:06.157787'),(51,'f9bde26a1556cd667f742bd34ec7c55e','avatars/rJNdvaWjGS4_Gu2iame.jpg','2024-05-29 10:19:07.125699'),(52,'f9bde26a1556cd667f742bd34ec7c55e','avatars/rJNdvaWjGS4_79LFmjD.jpg','2024-05-29 10:19:34.520093'),(53,'f9bde26a1556cd667f742bd34ec7c55e','avatars/rJNdvaWjGS4_Nxcfml8.jpg','2024-05-29 10:19:36.008365'),(54,'f9bde26a1556cd667f742bd34ec7c55e','avatars/IMG_20240302_212935_047.jpg','2024-05-29 10:28:37.827296'),(55,'f9bde26a1556cd667f742bd34ec7c55e','avatars/IMG_20240302_212935_047_wOFMiiS.jpg','2024-05-29 10:28:45.281668'),(56,'f9bde26a1556cd667f742bd34ec7c55e','avatars/1678211965_papik-pro-p-malenkie-risunki-spartaka-44.jpg','2024-06-01 16:24:14.637659'),(57,'f9bde26a1556cd667f742bd34ec7c55e','badges/Австрия_8LaBLeH.png','2024-06-09 20:20:42.720735'),(58,'f9bde26a1556cd667f742bd34ec7c55e','badges/Албания_vZv88Vy.png','2024-06-09 20:21:31.739020'),(59,'f9bde26a1556cd667f742bd34ec7c55e','badges/Англия_FMUUgXr.png','2024-06-09 20:21:40.933496'),(60,'f9bde26a1556cd667f742bd34ec7c55e','badges/Бельгия_UqNatBe.png','2024-06-09 20:21:51.678944'),(61,'f9bde26a1556cd667f742bd34ec7c55e','badges/Венгрия_G2LE2Yq.png','2024-06-09 20:22:03.159569'),(62,'f9bde26a1556cd667f742bd34ec7c55e','badges/Германия_jShj9kg.png','2024-06-09 20:22:13.769454'),(63,'f9bde26a1556cd667f742bd34ec7c55e','badges/Грузия_hjlXu7l.png','2024-06-09 20:22:19.249678'),(64,'f9bde26a1556cd667f742bd34ec7c55e','badges/Дания_1anfngR.png','2024-06-09 20:22:26.567885'),(65,'f9bde26a1556cd667f742bd34ec7c55e','badges/Испания_17LDn8Q.png','2024-06-09 20:22:33.678891'),(66,'f9bde26a1556cd667f742bd34ec7c55e','badges/Италия_sjboZvF.png','2024-06-09 20:22:40.521459'),(67,'f9bde26a1556cd667f742bd34ec7c55e','badges/Нидерланды_1PqU2V7.png','2024-06-09 20:22:47.980769'),(68,'f9bde26a1556cd667f742bd34ec7c55e','badges/Польша_8MuofQv.png','2024-06-09 20:22:55.994461'),(69,'f9bde26a1556cd667f742bd34ec7c55e','badges/Португалия_m4EhTir.png','2024-06-09 20:23:03.486457'),(70,'f9bde26a1556cd667f742bd34ec7c55e','badges/Румыния_2U8LXfs.png','2024-06-09 20:23:11.939591'),(71,'f9bde26a1556cd667f742bd34ec7c55e','badges/Сербия_RHwNI94.png','2024-06-09 20:23:20.230158'),(72,'f9bde26a1556cd667f742bd34ec7c55e','badges/Словакия_qsLlLyB.png','2024-06-09 20:23:27.751582'),(73,'f9bde26a1556cd667f742bd34ec7c55e','badges/Словения_nrNzwNM.png','2024-06-09 20:23:37.334023'),(74,'f9bde26a1556cd667f742bd34ec7c55e','badges/Турция_WB07BOO.png','2024-06-09 20:23:44.129165'),(75,'f9bde26a1556cd667f742bd34ec7c55e','badges/Украина_qdxdcus.png','2024-06-09 20:23:52.582022'),(76,'f9bde26a1556cd667f742bd34ec7c55e','badges/Франция_6ZBGnOq.png','2024-06-09 20:23:59.350373'),(77,'f9bde26a1556cd667f742bd34ec7c55e','badges/Хорватия_2o9UgHF.png','2024-06-09 20:24:10.245944'),(78,'f9bde26a1556cd667f742bd34ec7c55e','badges/Чехия_L0AlO2I.png','2024-06-09 20:24:16.653899'),(79,'f9bde26a1556cd667f742bd34ec7c55e','badges/Швеицария_wflq8qU.png','2024-06-09 20:24:26.752615'),(80,'f9bde26a1556cd667f742bd34ec7c55e','badges/Шотландия_VgLdw39.png','2024-06-09 20:24:34.060394'),(81,'f9bde26a1556cd667f742bd34ec7c55e','avatars/7EcYFeHFvgH5E9lg_GFYOazSBBYg7jA4DFgNIAlQqC-l7U55Os7R2lohIM9dy6QPUdIVoCpa.jpg','2024-06-13 08:56:06.823980'),(82,'f9bde26a1556cd667f742bd34ec7c55e','avatars/Screenshot_20240629-125501_Samsung_Internet.jpg','2024-06-29 09:55:28.416678'),(83,'f9bde26a1556cd667f742bd34ec7c55e','avatars/20240630_071553.jpg','2024-06-30 10:18:35.693914'),(84,'f9bde26a1556cd667f742bd34ec7c55e','avatars/20240630_071553_GSmeY4l.jpg','2024-06-30 10:18:42.389635');
/*!40000 ALTER TABLE `easy_thumbnails_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easy_thumbnails_thumbnail`
--

DROP TABLE IF EXISTS `easy_thumbnails_thumbnail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easy_thumbnails_thumbnail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storage_hash` varchar(40) NOT NULL,
  `name` varchar(255) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `source_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `easy_thumbnails_thumbnai_storage_hash_name_source_fb375270_uniq` (`storage_hash`,`name`,`source_id`),
  KEY `easy_thumbnails_thum_source_id_5b57bc77_fk_easy_thum` (`source_id`),
  KEY `easy_thumbnails_thumbnail_storage_hash_f1435f49` (`storage_hash`),
  KEY `easy_thumbnails_thumbnail_name_b5882c31` (`name`),
  CONSTRAINT `easy_thumbnails_thum_source_id_5b57bc77_fk_easy_thum` FOREIGN KEY (`source_id`) REFERENCES `easy_thumbnails_source` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easy_thumbnails_thumbnail`
--

LOCK TABLES `easy_thumbnails_thumbnail` WRITE;
/*!40000 ALTER TABLE `easy_thumbnails_thumbnail` DISABLE KEYS */;
/*!40000 ALTER TABLE `easy_thumbnails_thumbnail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easy_thumbnails_thumbnaildimensions`
--

DROP TABLE IF EXISTS `easy_thumbnails_thumbnaildimensions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easy_thumbnails_thumbnaildimensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail_id` int(11) NOT NULL,
  `width` int(10) unsigned DEFAULT NULL,
  `height` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `thumbnail_id` (`thumbnail_id`),
  CONSTRAINT `easy_thumbnails_thum_thumbnail_id_c3a0c549_fk_easy_thum` FOREIGN KEY (`thumbnail_id`) REFERENCES `easy_thumbnails_thumbnail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easy_thumbnails_thumbnaildimensions`
--

LOCK TABLES `easy_thumbnails_thumbnaildimensions` WRITE;
/*!40000 ALTER TABLE `easy_thumbnails_thumbnaildimensions` DISABLE KEYS */;
/*!40000 ALTER TABLE `easy_thumbnails_thumbnaildimensions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forecast`
--

DROP TABLE IF EXISTS `forecast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forecast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forecast_type` varchar(32) NOT NULL,
  `score_home` int(11) NOT NULL,
  `score_away` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forecast_forecast_type_match_id_t_d9d1424c_uniq` (`forecast_type`,`match_id`,`tournament_id`,`user_id`),
  KEY `forecast_match_id_de8747ac_fk_match_id` (`match_id`),
  KEY `forecast_tournament_id_c07f5187_fk_tournament_id` (`tournament_id`),
  KEY `forecast_user_id_42fcb438_fk_auth_user_id` (`user_id`),
  CONSTRAINT `forecast_match_id_de8747ac_fk_match_id` FOREIGN KEY (`match_id`) REFERENCES `match` (`id`),
  CONSTRAINT `forecast_tournament_id_c07f5187_fk_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`),
  CONSTRAINT `forecast_user_id_42fcb438_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=649 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forecast`
--

LOCK TABLES `forecast` WRITE;
/*!40000 ALTER TABLE `forecast` DISABLE KEYS */;
INSERT INTO `forecast` VALUES (1,'full time',2,0,1,1,1),(2,'full time',4,0,1,1,9),(4,'full time',1,2,2,1,9),(5,'full time',2,0,4,1,9),(6,'full time',4,0,1,1,5),(7,'full time',3,2,3,1,9),(8,'full time',1,3,7,1,9),(9,'full time',1,2,8,1,9),(10,'full time',0,2,5,1,9),(11,'full time',2,2,6,1,9),(12,'full time',3,1,9,1,9),(13,'full time',1,2,10,1,9),(14,'full time',2,3,11,1,9),(15,'full time',4,2,12,1,9),(16,'full time',2,0,1,1,12),(17,'full time',2,0,1,1,11),(18,'full time',0,0,2,1,11),(19,'full time',1,0,3,1,11),(20,'full time',2,0,4,1,11),(21,'full time',1,2,5,1,11),(22,'full time',0,1,6,1,11),(23,'full time',0,2,7,1,11),(24,'full time',1,0,8,1,11),(25,'full time',2,0,9,1,11),(26,'full time',2,0,1,1,4),(27,'full time',1,2,2,1,4),(28,'full time',2,1,3,1,4),(30,'full time',2,0,4,1,4),(31,'full time',2,0,1,1,6),(32,'full time',3,0,1,1,8),(33,'full time',3,0,3,1,5),(34,'full time',2,1,2,1,5),(35,'full time',4,1,4,1,5),(36,'full time',0,3,5,1,5),(37,'full time',2,0,1,1,3),(38,'full time',2,0,1,1,13),(39,'full time',0,1,2,1,13),(40,'full time',1,0,3,1,13),(41,'full time',2,0,4,1,13),(42,'full time',0,2,5,1,13),(43,'full time',1,3,5,1,4),(44,'full time',0,0,6,1,4),(45,'full time',0,3,7,1,4),(46,'full time',2,0,8,1,4),(47,'full time',2,1,9,1,4),(48,'full time',0,1,10,1,4),(49,'full time',3,0,1,1,10),(50,'full time',2,0,2,1,10),(51,'full time',2,0,3,1,10),(52,'full time',1,0,4,1,10),(53,'full time',3,1,1,1,7),(54,'full time',1,0,2,1,7),(55,'full time',2,2,3,1,7),(56,'full time',2,0,4,1,7),(57,'full time',1,1,2,1,1),(58,'full time',1,2,3,1,1),(59,'full time',1,0,4,1,1),(60,'full time',1,1,2,1,12),(61,'full time',2,1,3,1,12),(62,'full time',2,0,4,1,12),(63,'full time',1,0,2,1,8),(64,'full time',2,0,3,1,8),(65,'full time',4,0,4,1,8),(66,'full time',1,1,2,1,6),(67,'full time',1,0,3,1,6),(68,'full time',2,0,4,1,6),(69,'full time',1,1,2,1,3),(70,'full time',1,1,3,1,3),(71,'full time',2,0,4,1,3),(72,'full time',2,1,5,1,10),(73,'full time',0,2,6,1,10),(74,'full time',0,3,7,1,10),(75,'full time',0,3,8,1,10),(76,'full time',1,3,6,1,5),(77,'full time',1,4,7,1,5),(78,'full time',1,3,5,1,7),(79,'full time',2,0,6,1,7),(80,'full time',2,4,7,1,7),(81,'full time',2,1,8,1,7),(82,'full time',3,1,9,1,7),(83,'full time',0,3,10,1,7),(84,'full time',3,1,11,1,7),(85,'full time',2,2,5,1,1),(86,'full time',0,2,6,1,1),(87,'full time',0,3,7,1,1),(88,'full time',2,0,11,1,4),(89,'full time',1,0,12,1,4),(90,'full time',1,3,5,1,12),(91,'full time',1,2,6,1,12),(92,'full time',1,2,7,1,12),(93,'full time',1,2,5,1,3),(94,'full time',0,1,6,1,13),(95,'full time',0,3,7,1,13),(96,'full time',1,3,5,1,8),(97,'full time',0,2,6,1,8),(98,'full time',0,1,7,1,8),(99,'full time',0,1,5,1,6),(100,'full time',0,1,6,1,6),(101,'full time',0,2,7,1,6),(102,'full time',1,1,6,1,3),(103,'full time',2,1,8,1,5),(104,'full time',3,1,9,1,5),(105,'full time',0,4,10,1,5),(106,'full time',2,0,13,1,9),(107,'full time',3,1,14,1,9),(108,'full time',1,2,15,1,9),(109,'full time',1,2,16,1,9),(111,'full time',1,2,7,1,3),(112,'full time',0,3,10,1,10),(113,'full time',2,0,9,1,10),(114,'full time',2,1,11,1,5),(115,'full time',2,1,12,1,5),(116,'full time',3,1,13,1,5),(117,'full time',2,0,9,1,1),(118,'full time',1,2,8,1,1),(119,'full time',0,3,10,1,1),(120,'full time',0,3,10,1,11),(121,'full time',2,1,11,1,11),(122,'full time',1,0,12,1,11),(123,'full time',1,1,8,1,3),(124,'full time',1,1,8,1,8),(125,'full time',2,0,9,1,8),(126,'full time',1,3,10,1,8),(127,'full time',1,1,8,1,12),(128,'full time',2,0,9,1,12),(129,'full time',0,2,8,1,13),(130,'full time',2,0,9,1,13),(131,'full time',0,1,10,1,13),(132,'full time',0,1,10,1,12),(133,'full time',1,0,8,1,6),(134,'full time',2,1,9,1,3),(135,'full time',2,0,9,1,6),(136,'full time',0,1,10,1,6),(139,'full time',1,2,10,1,3),(140,'full time',2,0,14,1,4),(141,'full time',2,1,13,1,4),(142,'full time',0,2,15,1,4),(143,'full time',1,2,18,1,9),(144,'full time',3,0,14,1,5),(146,'full time',1,3,15,1,5),(147,'full time',0,3,16,1,5),(148,'full time',2,1,17,1,5),(149,'full time',3,0,18,1,5),(150,'full time',2,1,11,1,1),(151,'full time',2,0,12,1,1),(152,'full time',1,0,11,1,8),(153,'full time',2,1,12,1,8),(154,'full time',1,0,13,1,8),(155,'full time',1,0,13,1,11),(156,'full time',3,0,14,1,11),(157,'full time',0,0,15,1,11),(158,'full time',2,1,12,1,10),(159,'full time',2,0,11,1,10),(160,'full time',1,0,11,1,6),(161,'full time',2,0,12,1,6),(162,'full time',2,1,11,1,3),(163,'full time',3,1,12,1,3),(164,'full time',2,0,11,1,12),(165,'full time',2,0,13,1,13),(170,'full time',2,1,11,1,13),(171,'full time',2,0,12,1,13),(175,'full time',2,0,12,1,12),(176,'full time',1,1,17,1,9),(177,'full time',1,2,19,1,9),(178,'full time',1,3,19,1,5),(179,'full time',2,1,20,1,5),(180,'full time',2,4,21,1,5),(181,'full time',1,1,13,1,10),(182,'full time',3,0,14,1,10),(183,'full time',0,1,15,1,10),(184,'full time',2,1,13,1,1),(185,'full time',3,0,14,1,1),(186,'full time',0,1,15,1,1),(187,'full time',2,0,13,1,7),(188,'full time',1,1,20,1,9),(189,'full time',3,0,14,1,8),(190,'full time',1,1,15,1,8),(191,'full time',1,1,13,1,3),(192,'full time',2,1,13,1,12),(193,'full time',3,0,14,1,12),(194,'full time',1,2,15,1,12),(195,'full time',5,0,14,1,7),(196,'full time',1,2,15,1,7),(197,'full time',1,3,16,1,7),(198,'full time',0,2,17,1,7),(199,'full time',3,1,18,1,7),(200,'full time',2,0,19,1,7),(201,'full time',2,0,13,1,6),(202,'full time',3,0,14,1,6),(203,'full time',1,2,15,1,6),(204,'full time',2,1,14,1,3),(205,'full time',3,0,14,1,13),(206,'full time',1,3,15,1,3),(207,'full time',0,2,15,1,13),(208,'full time',0,2,17,1,10),(209,'full time',0,1,16,1,10),(210,'full time',2,1,18,1,10),(211,'full time',1,1,16,1,11),(212,'full time',1,1,17,1,11),(213,'full time',0,0,18,1,11),(214,'full time',0,0,16,1,1),(215,'full time',0,1,17,1,1),(216,'full time',2,0,18,1,1),(217,'full time',0,0,16,1,4),(218,'full time',1,3,17,1,4),(219,'full time',1,1,18,1,4),(220,'full time',1,1,19,1,4),(221,'full time',0,1,20,1,4),(222,'full time',1,2,21,1,4),(223,'full time',0,1,16,1,6),(224,'full time',0,1,17,1,6),(225,'full time',2,1,18,1,6),(226,'full time',1,3,21,1,9),(227,'full time',1,1,22,1,9),(228,'full time',1,3,23,1,9),(229,'full time',2,1,24,1,9),(230,'full time',1,2,16,1,3),(231,'full time',0,1,16,1,8),(232,'full time',1,2,18,1,8),(233,'full time',2,1,19,1,11),(234,'full time',2,1,20,1,11),(235,'full time',1,2,21,1,11),(236,'full time',0,2,23,1,11),(237,'full time',1,2,22,1,11),(238,'full time',1,2,24,1,11),(239,'full time',0,1,16,1,12),(240,'full time',1,2,16,1,13),(241,'full time',0,1,17,1,13),(242,'full time',1,0,18,1,13),(243,'full time',0,1,17,1,3),(244,'full time',1,2,17,1,12),(245,'full time',2,1,18,1,12),(246,'full time',2,1,18,1,3),(247,'full time',0,1,19,1,6),(248,'full time',1,2,20,1,6),(249,'full time',1,2,21,1,6),(250,'full time',0,1,22,1,6),(251,'full time',1,2,23,1,6),(252,'full time',1,0,24,1,6),(253,'full time',0,1,25,1,6),(254,'full time',1,0,26,1,6),(255,'full time',0,1,27,1,6),(256,'full time',0,2,28,1,6),(257,'full time',1,0,29,1,6),(258,'full time',1,0,30,1,6),(259,'full time',1,0,31,1,6),(260,'full time',1,0,32,1,6),(261,'full time',2,1,33,1,6),(262,'full time',0,1,34,1,6),(263,'full time',1,2,35,1,6),(264,'full time',0,2,36,1,6),(265,'full time',0,2,22,1,4),(266,'full time',1,1,23,1,4),(267,'full time',2,1,24,1,4),(268,'full time',2,1,19,1,10),(270,'full time',0,2,20,1,10),(274,'full time',1,2,21,1,10),(286,'full time',1,2,19,1,1),(287,'full time',1,1,20,1,1),(290,'full time',2,2,21,1,1),(291,'full time',2,1,19,1,3),(292,'full time',1,0,19,1,8),(293,'full time',2,0,20,1,8),(294,'full time',1,1,21,1,8),(295,'full time',1,1,20,1,7),(296,'full time',2,3,21,1,7),(297,'full time',2,1,19,1,12),(298,'full time',0,1,20,1,12),(299,'full time',1,2,21,1,12),(300,'full time',1,2,19,1,13),(301,'full time',1,2,20,1,13),(302,'full time',1,2,21,1,13),(303,'full time',1,1,20,1,3),(304,'full time',2,2,21,1,3),(305,'full time',1,2,27,1,9),(306,'full time',1,2,25,1,9),(307,'full time',1,1,26,1,9),(308,'full time',1,2,22,1,5),(309,'full time',1,3,23,1,5),(310,'full time',3,0,24,1,5),(311,'full time',0,1,26,1,4),(312,'full time',0,0,25,1,4),(313,'full time',0,2,22,1,1),(314,'full time',1,1,23,1,1),(315,'full time',2,0,24,1,1),(316,'full time',0,3,22,1,10),(317,'full time',2,1,22,1,7),(318,'full time',2,3,23,1,7),(319,'full time',2,1,24,1,7),(320,'full time',0,3,25,1,7),(321,'full time',2,1,26,1,7),(322,'full time',1,2,27,1,7),(323,'full time',0,2,28,1,7),(324,'full time',2,2,23,1,10),(325,'full time',3,0,24,1,10),(326,'full time',1,2,22,1,3),(327,'full time',0,1,22,1,12),(328,'full time',1,2,23,1,12),(329,'full time',2,1,24,1,12),(330,'full time',0,2,22,1,8),(331,'full time',1,3,23,1,8),(332,'full time',2,0,24,1,8),(333,'full time',1,3,23,1,3),(334,'full time',0,1,22,1,13),(335,'full time',1,2,23,1,13),(336,'full time',1,0,24,1,13),(337,'full time',1,3,25,1,5),(338,'full time',3,1,26,1,5),(339,'full time',2,1,27,1,5),(340,'full time',0,3,28,1,5),(341,'full time',3,0,29,1,5),(342,'full time',2,1,30,1,5),(343,'full time',3,0,31,1,5),(344,'full time',1,2,32,1,5),(345,'full time',3,1,24,1,3),(346,'full time',1,1,25,1,1),(347,'full time',1,1,26,1,1),(348,'full time',1,1,27,1,1),(349,'full time',0,2,28,1,9),(350,'full time',2,0,30,1,9),(351,'full time',2,1,29,1,9),(352,'full time',1,1,31,1,9),(353,'full time',1,2,32,1,9),(354,'full time',1,2,34,1,9),(355,'full time',1,2,33,1,9),(356,'full time',2,2,35,1,9),(357,'full time',1,2,36,1,9),(358,'full time',0,2,25,1,11),(359,'full time',2,1,26,1,11),(360,'full time',0,1,27,1,11),(361,'full time',0,2,28,1,11),(362,'full time',0,1,25,1,13),(363,'full time',0,1,26,1,13),(364,'full time',1,1,27,1,13),(365,'full time',0,2,25,1,10),(366,'full time',0,1,26,1,10),(367,'full time',1,1,27,1,10),(368,'full time',1,2,25,1,3),(369,'full time',1,2,26,1,3),(370,'full time',2,1,29,1,11),(371,'full time',2,0,30,1,11),(372,'full time',2,1,32,1,11),(373,'full time',2,1,31,1,11),(374,'full time',0,2,34,1,11),(375,'full time',0,2,36,1,11),(376,'full time',1,2,35,1,11),(377,'full time',1,2,33,1,11),(378,'full time',1,3,25,1,12),(379,'full time',2,1,26,1,12),(380,'full time',0,0,26,1,8),(381,'full time',0,2,25,1,8),(382,'full time',1,2,28,1,4),(383,'full time',1,2,27,1,4),(384,'full time',1,1,30,1,4),(385,'full time',1,0,29,1,4),(386,'full time',1,0,31,1,4),(387,'full time',1,1,32,1,4),(388,'full time',0,2,28,1,10),(389,'full time',0,2,28,1,1),(390,'full time',1,2,27,1,8),(391,'full time',0,3,28,1,8),(392,'full time',2,1,27,1,12),(393,'full time',1,2,28,1,12),(394,'full time',1,3,28,1,3),(395,'full time',1,1,27,1,3),(396,'full time',1,2,28,1,13),(397,'full time',1,1,33,1,5),(398,'full time',0,3,34,1,5),(399,'full time',2,1,35,1,5),(400,'full time',0,4,36,1,5),(401,'full time',2,0,30,1,7),(402,'full time',2,1,29,1,7),(403,'full time',2,1,31,1,7),(404,'full time',1,0,32,1,7),(405,'full time',1,3,34,1,7),(406,'full time',1,2,35,1,7),(407,'full time',1,1,29,1,10),(408,'full time',2,0,30,1,10),(409,'full time',2,0,31,1,10),(410,'full time',1,1,32,1,10),(411,'full time',1,0,29,1,1),(412,'full time',1,1,30,1,1),(413,'full time',0,0,31,1,1),(414,'full time',1,2,32,1,1),(415,'full time',1,0,29,1,8),(416,'full time',2,0,30,1,8),(417,'full time',3,1,31,1,8),(418,'full time',1,1,32,1,8),(419,'full time',2,1,29,1,3),(420,'full time',2,0,30,1,3),(421,'full time',2,0,32,1,3),(422,'full time',1,0,31,1,3),(423,'full time',1,0,29,1,12),(424,'full time',3,1,30,1,12),(425,'full time',1,0,30,1,13),(426,'full time',1,1,29,1,13),(427,'full time',1,0,31,1,13),(428,'full time',1,0,32,1,13),(429,'full time',1,0,31,1,12),(430,'full time',2,0,32,1,12),(431,'full time',2,1,33,1,7),(432,'full time',0,2,34,1,4),(433,'full time',0,0,33,1,4),(434,'full time',0,1,36,1,4),(435,'full time',0,0,35,1,4),(436,'full time',2,0,33,1,10),(437,'full time',1,1,34,1,10),(438,'full time',0,2,36,1,10),(439,'full time',1,1,35,1,10),(440,'full time',1,1,33,1,3),(441,'full time',1,2,34,1,3),(442,'full time',2,1,35,1,3),(443,'full time',0,2,36,1,3),(444,'full time',1,0,33,1,1),(445,'full time',1,1,34,1,1),(446,'full time',2,1,35,1,1),(447,'full time',0,2,36,1,1),(448,'full time',1,1,33,1,8),(449,'full time',1,0,35,1,8),(450,'full time',0,4,36,1,8),(451,'full time',1,2,34,1,8),(452,'full time',1,1,33,1,12),(453,'full time',1,2,34,1,12),(454,'full time',1,1,35,1,12),(455,'full time',1,2,36,1,12),(456,'full time',1,1,33,1,13),(457,'full time',1,2,34,1,13),(458,'full time',1,1,35,1,13),(459,'full time',0,1,36,1,13),(460,'full time',1,2,36,1,7),(461,'full time',0,1,37,1,1),(462,'full time',2,0,38,1,1),(463,'full time',1,0,39,1,1),(464,'full time',3,1,40,1,1),(465,'full time',3,1,41,1,1),(466,'full time',2,1,42,1,1),(467,'full time',1,2,43,1,1),(468,'full time',1,1,44,1,1),(469,'full time',3,1,38,1,11),(470,'full time',1,2,37,1,11),(471,'full time',2,1,39,1,11),(472,'full time',3,1,40,1,11),(473,'full time',2,1,41,1,11),(474,'full time',2,0,42,1,11),(475,'full time',0,0,43,1,11),(476,'full time',2,0,44,1,11),(477,'full time',1,2,37,1,9),(478,'full time',3,1,38,1,9),(479,'full time',0,2,39,1,9),(480,'full time',3,1,40,1,9),(481,'full time',2,2,41,1,9),(482,'full time',3,1,42,1,9),(483,'full time',2,0,43,1,9),(484,'full time',2,1,44,1,9),(485,'full time',0,1,37,1,4),(486,'full time',2,0,38,1,4),(487,'full time',2,1,39,1,4),(488,'full time',3,0,40,1,4),(489,'full time',2,1,37,1,5),(490,'full time',3,1,38,1,5),(491,'full time',3,1,39,1,5),(492,'full time',3,0,40,1,5),(493,'full time',1,2,41,1,5),(494,'full time',3,0,42,1,5),(495,'full time',0,3,43,1,5),(496,'full time',1,3,44,1,5),(497,'full time',0,1,37,1,6),(498,'full time',2,1,38,1,6),(499,'full time',2,0,38,1,10),(500,'full time',1,1,37,1,10),(501,'full time',1,0,37,1,12),(502,'full time',2,1,38,1,12),(503,'full time',1,1,37,1,3),(504,'full time',2,0,38,1,3),(505,'full time',1,0,38,1,8),(506,'full time',0,1,37,1,8),(507,'full time',1,3,37,1,7),(508,'full time',2,1,38,1,7),(509,'full time',1,1,37,1,13),(510,'full time',1,0,38,1,13),(511,'full time',2,0,39,1,13),(512,'full time',2,0,39,1,10),(513,'full time',1,0,40,1,10),(514,'full time',2,0,39,1,8),(515,'full time',3,0,40,1,8),(516,'full time',2,0,39,1,6),(517,'full time',3,0,40,1,6),(518,'full time',1,0,39,1,3),(519,'full time',2,1,40,1,3),(520,'full time',2,1,39,1,12),(521,'full time',3,1,40,1,12),(522,'full time',2,0,40,1,13),(523,'full time',3,1,40,1,7),(524,'full time',1,1,39,1,7),(525,'full time',3,0,41,1,10),(526,'full time',1,0,42,1,10),(527,'full time',1,1,41,1,4),(528,'full time',1,0,42,1,4),(529,'full time',1,3,43,1,4),(530,'full time',2,1,44,1,4),(531,'full time',1,2,41,1,8),(532,'full time',1,0,42,1,8),(533,'full time',2,1,41,1,3),(534,'full time',2,1,42,1,3),(535,'full time',2,1,41,1,6),(536,'full time',2,0,42,1,6),(537,'full time',1,2,41,1,12),(538,'full time',2,1,42,1,12),(539,'full time',1,1,41,1,13),(540,'full time',1,0,42,1,13),(541,'full time',2,1,41,1,7),(542,'full time',3,0,42,1,7),(543,'full time',1,2,43,1,7),(544,'full time',1,1,44,1,7),(545,'full time',0,2,43,1,6),(547,'full time',2,1,44,1,6),(548,'full time',1,0,45,1,6),(549,'full time',1,0,46,1,6),(550,'full time',1,0,47,1,6),(551,'full time',1,3,43,1,12),(552,'full time',2,0,44,1,12),(553,'full time',0,2,43,1,13),(554,'full time',2,0,44,1,13),(555,'full time',1,2,43,1,3),(556,'full time',2,0,44,1,3),(557,'full time',1,0,47,1,11),(558,'full time',1,2,46,1,11),(559,'full time',2,3,45,1,11),(560,'full time',0,1,43,1,10),(561,'full time',2,1,44,1,10),(562,'full time',1,3,43,1,8),(563,'full time',1,1,44,1,8),(564,'full time',1,2,45,1,9),(565,'full time',2,2,46,1,9),(566,'full time',1,2,47,1,9),(567,'full time',0,2,47,1,5),(568,'full time',2,1,46,1,5),(569,'full time',2,1,45,1,5),(570,'full time',0,2,46,1,10),(571,'full time',0,1,45,1,10),(572,'full time',1,2,46,1,12),(573,'full time',1,1,45,1,12),(574,'full time',1,2,47,1,12),(575,'full time',2,1,48,1,12),(576,'full time',2,1,48,1,6),(577,'full time',1,1,45,1,1),(578,'full time',0,1,46,1,1),(579,'full time',0,1,47,1,1),(580,'full time',2,2,48,1,1),(581,'full time',1,2,46,1,4),(582,'full time',0,1,45,1,4),(583,'full time',1,1,48,1,4),(584,'full time',2,0,47,1,4),(585,'full time',1,1,48,1,9),(586,'full time',2,1,48,1,11),(587,'full time',2,1,45,1,3),(588,'full time',1,1,46,1,3),(594,'full time',2,1,45,1,13),(596,'full time',3,1,45,1,7),(597,'full time',1,2,46,1,7),(598,'full time',1,0,46,1,13),(599,'full time',1,1,46,1,8),(600,'full time',1,0,47,1,8),(601,'full time',1,1,48,1,8),(602,'full time',0,1,47,1,3),(603,'full time',3,1,48,1,3),(604,'full time',3,1,48,1,5),(605,'full time',3,1,49,1,5),(606,'full time',1,1,47,1,7),(607,'full time',3,2,48,1,7),(609,'full time',1,0,47,1,13),(610,'full time',1,0,47,1,10),(611,'full time',2,0,48,1,13),(612,'full time',1,1,48,1,10),(613,'full time',3,1,50,1,5),(614,'full time',1,0,50,1,6),(615,'full time',2,1,49,1,6),(616,'full time',0,1,50,1,4),(617,'full time',0,0,49,1,4),(618,'full time',2,0,49,1,1),(619,'full time',0,1,50,1,1),(620,'full time',2,2,49,1,9),(621,'full time',1,0,50,1,9),(622,'full time',1,0,49,1,3),(623,'full time',1,1,49,1,10),(624,'full time',0,0,49,1,11),(625,'full time',0,0,50,1,11),(626,'full time',2,0,49,1,8),(627,'full time',1,1,50,1,8),(628,'full time',1,0,49,1,13),(629,'full time',1,2,49,1,7),(630,'full time',2,1,49,1,12),(631,'full time',0,1,50,1,10),(632,'full time',2,1,50,1,3),(633,'full time',2,1,50,1,12),(634,'full time',1,2,50,1,7),(635,'full time',0,1,50,1,13),(637,'full time',1,0,51,1,6),(638,'full time',3,0,51,1,11),(639,'full time',0,0,51,1,1),(640,'full time',2,1,51,1,12),(641,'full time',1,0,51,1,4),(642,'full time',3,1,51,1,9),(643,'full time',2,1,51,1,10),(644,'full time',3,2,51,1,8),(645,'full time',3,1,51,1,5),(646,'full time',2,2,51,1,7),(647,'full time',2,1,51,1,3),(648,'full time',1,1,51,1,13);
/*!40000 ALTER TABLE `forecast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forecast_winner`
--

DROP TABLE IF EXISTS `forecast_winner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forecast_winner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forecast_winner_tournament_id_team_id_user_id_3ba78943_uniq` (`tournament_id`,`team_id`,`user_id`),
  KEY `forecast_winner_team_id_7284189b_fk_team_id` (`team_id`),
  KEY `forecast_winner_user_id_97ed7a78_fk_auth_user_id` (`user_id`),
  CONSTRAINT `forecast_winner_team_id_7284189b_fk_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `forecast_winner_tournament_id_f4c3ec7c_fk_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`),
  CONSTRAINT `forecast_winner_user_id_97ed7a78_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forecast_winner`
--

LOCK TABLES `forecast_winner` WRITE;
/*!40000 ALTER TABLE `forecast_winner` DISABLE KEYS */;
INSERT INTO `forecast_winner` VALUES (5,7,1,1),(9,7,1,9),(3,11,1,5),(2,16,1,4),(4,16,1,8),(10,21,1,6),(11,21,1,13),(1,23,1,3),(12,23,1,7),(6,23,1,10),(7,24,1,11),(8,24,1,12);
/*!40000 ALTER TABLE `forecast_winner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `sent_date` datetime(6) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (1,'smicersiu@gmail.com','2024-05-28 17:37:01.064181','743035'),(2,'abitotti2004@mail.ru','2024-05-29 10:00:14.385452','090280'),(3,'dj-ya@mail.ru','2024-05-29 10:04:45.270218','541818'),(4,'g5230ilchenkoan@yandex.ru','2024-05-29 10:16:45.863093','754255'),(5,'g5230ilchenkoan@yandex.ru','2024-05-29 10:20:54.655297','931169'),(6,'kutarov@list.ru','2024-05-29 10:22:21.061868','234201'),(7,'djmus@inbox.ru','2024-05-29 11:27:41.006631','700199'),(8,'sergeyskripnyuk@gmail.com','2024-05-29 13:29:59.977545','431842'),(9,'nemozzz1987@gmail.com','2024-05-29 14:53:25.516377','599550'),(10,'nemozzz1987@gmail.com','2024-05-29 14:57:13.131640','453345'),(11,'nemozzz1987@gmail.com','2024-05-29 14:59:13.731874','902096'),(12,'tatianka1101@yandex.ru','2024-05-29 17:12:37.702657','686218'),(13,'nemozzz1987@gmail.com','2024-05-30 07:16:16.152031','731754'),(14,'ivavlasov@yandex.ru','2024-05-30 17:36:19.883073','276559'),(15,'ivavlasov@yandex.ru','2024-05-30 17:37:38.386226','970946'),(16,'ivavlasov@yandex.ru','2024-05-30 17:39:36.470867','005076'),(17,'ivavlasov@yandex.ru','2024-05-30 17:41:02.889142','118885'),(18,'ivavlasov@yandex.ru','2024-05-30 18:36:35.683984','039111'),(19,'smicersiu@gmail.com','2024-06-02 12:48:36.183882','455175'),(20,'smicersiu@gmail.com','2024-06-02 12:49:52.835892','568875'),(21,'g5230ilchenkoan@yandex.ru','2024-06-02 17:24:29.247268','671472'),(22,'djmus@inbox.ru','2024-06-02 21:07:56.254818','370152'),(23,'nemozzz1987@gmail.com','2024-06-03 15:41:25.255842','706963'),(24,'nemozzz1987@gmail.com','2024-06-04 20:17:00.343514','164161'),(25,'nemozzz1987@gmail.com','2024-06-11 14:30:47.603179','292871'),(26,'overflow@bk.ru','2024-06-12 06:17:05.263143','331630'),(27,'smicersiu@gmail.com','2024-06-12 20:50:40.204471','956060'),(28,'smicersiu@gmail.com','2024-06-12 21:06:19.718765','847219'),(29,'smicersiu@gmail.com','2024-06-12 21:27:32.217628','528147'),(30,'abitotti2004@mail.ru','2024-06-13 05:47:25.202994','563049'),(31,'kutarov@list.ru','2024-06-13 06:16:51.736775','564598'),(32,'overflow@bk.ru','2024-06-13 06:17:55.778013','060988'),(33,'oscrowd@mail.ru','2024-06-13 07:47:29.701332','578275'),(34,'oscrowd@mail.ru','2024-06-13 07:48:16.786687','015849'),(35,'dj-ya@mail.ru','2024-06-13 11:34:32.550774','520697'),(36,'oscrowd@mail.ru','2024-06-13 22:33:51.956798','070642'),(37,'tatianka1101@yandex.ru','2024-06-14 11:37:28.174143','891841'),(38,'nemozzz1987@gmail.com','2024-06-14 15:27:38.282232','472038'),(39,'nemozzz1987@gmail.com','2024-06-14 15:39:08.694622','771588'),(40,'djmus@inbox.ru','2024-06-14 17:17:12.608170','374814'),(41,'tatianka1101@yandex.ru','2024-06-15 20:03:11.748542','915893'),(42,'nemozzz1987@gmail.com','2024-06-16 15:25:18.780429','133363'),(43,'nemozzz1987@gmail.com','2024-06-16 16:20:34.975762','040705'),(44,'sergeyskripnyuk@gmail.com','2024-06-16 17:54:06.242260','499571'),(45,'nemozzz1987@gmail.com','2024-06-17 13:48:51.973856','445808'),(46,'dj-ya@mail.ru','2024-06-17 13:50:08.656862','128130'),(47,'oscrowd@mail.ru','2024-06-17 19:02:30.166637','315327'),(48,'oscrowd@mail.ru','2024-06-17 19:03:10.200293','147009'),(49,'sergeantrx10@yandex.ru','2024-06-18 09:09:17.787187','089914'),(50,'nemozzz1987@gmail.com','2024-06-18 13:44:43.463400','537196'),(51,'oscrowd@mail.ru','2024-06-18 20:38:10.299270','699000'),(52,'nemozzz1987@gmail.com','2024-06-19 13:40:34.172414','958830'),(53,'oscrowd@mail.ru','2024-06-20 11:30:11.445763','378201'),(54,'nemozzz1987@gmail.com','2024-06-20 13:05:18.033792','205682'),(55,'overflow@bk.ru','2024-06-20 14:43:26.042854','855697'),(56,'nemozzz1987@gmail.com','2024-06-21 08:38:17.366425','223809'),(57,'nemozzz1987@gmail.com','2024-06-24 11:31:51.090571','901727'),(58,'nemozzz1987@gmail.com','2024-06-25 16:21:44.896863','767578'),(59,'nemozzz1987@gmail.com','2024-06-26 06:51:37.941929','457235'),(60,'nemozzz1987@gmail.com','2024-06-27 11:26:55.743261','988068'),(61,'overflow@bk.ru','2024-06-29 09:42:38.436387','630107'),(62,'oscrowd@mail.ru','2024-06-29 14:52:35.920459','000716'),(63,'oscrowd@mail.ru','2024-06-29 14:53:41.984976','998949'),(64,'oscrowd@mail.ru','2024-06-29 14:54:18.999737','321244'),(65,'oscrowd@mail.ru','2024-06-29 14:54:33.361638','677440'),(66,'nemozzz1987@gmail.com','2024-06-30 14:30:30.259164','320709'),(67,'dj-ya@mail.ru','2024-06-30 21:22:07.606613','478869'),(68,'nemozzz1987@gmail.com','2024-07-01 08:24:06.361792','770114'),(69,'oscrowd@mail.ru','2024-07-01 20:55:37.787690','169747'),(70,'oscrowd@mail.ru','2024-07-02 09:30:55.511041','001534'),(71,'nemozzz1987@gmail.com','2024-07-02 18:42:02.043955','140701'),(72,'nemozzz1987@gmail.com','2024-07-03 11:30:49.040077','156074'),(73,'nemozzz1987@gmail.com','2024-07-04 18:22:43.935759','744866'),(74,'nemozzz1987@gmail.com','2024-07-05 15:55:52.399625','730509'),(75,'nemozzz1987@gmail.com','2024-07-06 14:08:41.721977','014254'),(76,'overflow@bk.ru','2024-07-06 16:20:36.860433','713296'),(77,'nemozzz1987@gmail.com','2024-07-06 17:31:19.775588','642602'),(78,'nemozzz1987@gmail.com','2024-07-08 16:29:49.419450','556137'),(79,'oscrowd@mail.ru','2024-07-10 17:53:50.295669','773054'),(80,'oscrowd@mail.ru','2024-07-10 17:54:23.250713','504306'),(81,'nemozzz1987@gmail.com','2024-07-10 19:08:03.175952','707551'),(82,'oscrowd@mail.ru','2024-07-14 17:02:22.910905','859447'),(83,'oscrowd@mail.ru','2024-07-14 17:03:15.492324','463000'),(84,'oscrowd@mail.ru','2024-07-14 17:04:29.680010','609508'),(85,'overflow@bk.ru','2024-07-14 18:43:02.191193','929244');
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime(6) NOT NULL,
  `place` varchar(128) DEFAULT NULL,
  `status` varchar(32) NOT NULL,
  `base_tournament_id` int(11) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `team_away_id` int(11) NOT NULL,
  `team_home_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `match_base_tournament_id_ffc78b14_fk_base_tournament_id` (`base_tournament_id`),
  KEY `match_stage_id_ca3ca5c7_fk_stage_id` (`stage_id`),
  KEY `match_team_away_id_36f7570e_fk_team_id` (`team_away_id`),
  KEY `match_team_home_id_2fce7846_fk_team_id` (`team_home_id`),
  CONSTRAINT `match_base_tournament_id_ffc78b14_fk_base_tournament_id` FOREIGN KEY (`base_tournament_id`) REFERENCES `base_tournament` (`id`),
  CONSTRAINT `match_stage_id_ca3ca5c7_fk_stage_id` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`),
  CONSTRAINT `match_team_away_id_36f7570e_fk_team_id` FOREIGN KEY (`team_away_id`) REFERENCES `team` (`id`),
  CONSTRAINT `match_team_home_id_2fce7846_fk_team_id` FOREIGN KEY (`team_home_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (1,'2024-06-14 19:00:00.000000','Мюнхен','finished',1,1,19,24),(2,'2024-06-15 13:00:00.000000','Кёльн','finished',1,1,10,15),(3,'2024-06-15 16:00:00.000000','Берлин','finished',1,1,4,20),(4,'2024-06-15 19:00:00.000000','Дортмунд','finished',1,1,13,7),(5,'2024-06-16 13:00:00.000000','Гамбург','finished',1,1,11,1),(6,'2024-06-16 16:00:00.000000','Штутгарт','finished',1,1,12,5),(7,'2024-06-16 19:00:00.000000','Гельзенкирхен','finished',1,1,16,8),(8,'2024-06-17 13:00:00.000000','Мюнхен','finished',1,1,2,9),(9,'2024-06-17 16:00:00.000000','Франкфурт','finished',1,1,14,22),(10,'2024-06-17 19:00:00.000000','Дюссельдорф','finished',1,1,23,17),(11,'2024-06-18 16:00:00.000000','Дортмунд','finished',1,1,3,18),(12,'2024-06-18 19:00:00.000000','Лейпциг','finished',1,1,6,21),(13,'2024-06-19 13:00:00.000000','Гамбург','finished',1,2,13,4),(14,'2024-06-19 16:00:00.000000','Штутгарт','finished',1,2,15,24),(15,'2024-06-19 19:00:00.000000','Кёльн','finished',1,2,10,19),(16,'2024-06-20 13:00:00.000000','Мюнхен','finished',1,2,8,5),(17,'2024-06-20 16:00:00.000000','Франкфурт','finished',1,2,16,12),(18,'2024-06-20 19:00:00.000000','Гельзенкирхен','finished',1,2,7,20),(19,'2024-06-21 13:00:00.000000','Дюссельдорф','finished',1,2,2,14),(20,'2024-06-21 16:00:00.000000','Берлин','finished',1,2,17,1),(21,'2024-06-21 19:00:00.000000','Лейпциг','finished',1,2,23,11),(22,'2024-06-22 13:00:00.000000','Гамбург','finished',1,2,6,3),(23,'2024-06-22 16:00:00.000000','Дортмунд','finished',1,2,21,18),(24,'2024-06-22 19:00:00.000000','Кёльн','finished',1,2,9,22),(25,'2024-06-23 19:00:00.000000','Франкфурт','finished',1,3,24,10),(26,'2024-06-23 19:00:00.000000','Штутгарт','finished',1,3,15,19),(27,'2024-06-24 19:00:00.000000','Лейпциг','finished',1,3,7,4),(28,'2024-06-24 19:00:00.000000','Дюссельдорф','finished',1,3,20,13),(29,'2024-06-25 16:00:00.000000','Берлин','finished',1,3,17,11),(30,'2024-06-25 16:00:00.000000','Дортмунд','finished',1,3,1,23),(31,'2024-06-25 19:00:00.000000','Кёльн','finished',1,3,5,16),(32,'2024-06-25 19:00:00.000000','Мюнхен','finished',1,3,8,12),(33,'2024-06-26 16:00:00.000000','Франкфурт','finished',1,3,9,14),(34,'2024-06-26 16:00:00.000000','Штутгарт','finished',1,3,22,2),(35,'2024-06-26 19:00:00.000000','Гамбург','finished',1,3,18,6),(36,'2024-06-26 19:00:00.000000','Гельзенкирхен','finished',1,3,21,3),(37,'2024-06-29 16:00:00.000000','Берлин','finished',1,4,7,10),(38,'2024-06-29 19:00:00.000000','Дортмунд','finished',1,4,12,24),(39,'2024-06-30 16:00:00.000000','Гельзенкирхен','finished',1,4,14,16),(40,'2024-06-30 19:00:00.000000','Кёльн','finished',1,4,3,20),(41,'2024-07-01 16:00:00.000000','Дюссельдорф','finished',1,4,22,23),(42,'2024-07-01 19:00:00.000000','Франкфурт','finished',1,4,5,21),(43,'2024-07-02 16:00:00.000000','Мюнхен','finished',1,4,11,9),(44,'2024-07-02 19:00:00.000000','Лейпциг','finished',1,4,18,17),(45,'2024-07-05 16:00:00.000000','Штутгарт','finished',1,5,24,20),(46,'2024-07-05 19:00:00.000000','Гамбург','finished',1,5,23,21),(47,'2024-07-06 16:00:00.000000','Дюссельдорф','finished',1,5,10,16),(48,'2024-07-06 19:00:00.000000','Берлин','finished',1,5,18,11),(49,'2024-07-09 19:00:00.000000','Мюнхен','finished',1,6,23,20),(50,'2024-07-10 19:00:00.000000','Дортмунд','finished',1,6,16,11),(51,'2024-07-14 19:00:00.000000','Берлин','finished',1,7,16,20);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `param`
--

DROP TABLE IF EXISTS `param`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value_type` varchar(10) NOT NULL,
  `value` varchar(2000) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `entity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `param_entity_id_55a2a1df_fk_common_entity_id` (`entity_id`),
  CONSTRAINT `param_entity_id_55a2a1df_fk_common_entity_id` FOREIGN KEY (`entity_id`) REFERENCES `common_entity` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `param`
--

LOCK TABLES `param` WRITE;
/*!40000 ALTER TABLE `param` DISABLE KEYS */;
/*!40000 ALTER TABLE `param` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `checkin` tinyint(1) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `participant_tournament_id_63790e87_fk_tournament_id` (`tournament_id`),
  KEY `participant_user_id_8d68cba9_fk_auth_user_id` (`user_id`),
  CONSTRAINT `participant_tournament_id_63790e87_fk_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`),
  CONSTRAINT `participant_user_id_8d68cba9_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
INSERT INTO `participant` VALUES (1,0,1,1,1,1,NULL),(2,0,1,1,3,1,NULL),(3,0,1,1,4,1,NULL),(4,0,1,1,5,1,NULL),(5,0,1,1,6,1,NULL),(6,0,1,1,7,1,NULL),(7,0,1,1,8,1,NULL),(8,0,1,1,9,1,NULL),(9,0,1,1,10,1,NULL),(10,0,1,1,11,1,NULL),(11,0,1,1,12,1,NULL),(12,0,1,1,13,1,NULL);
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `result_type` varchar(32) NOT NULL,
  `score_home` int(11) NOT NULL,
  `score_away` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `result_match_id_f3b6e0d7_fk_match_id` (`match_id`),
  CONSTRAINT `result_match_id_f3b6e0d7_fk_match_id` FOREIGN KEY (`match_id`) REFERENCES `match` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
INSERT INTO `result` VALUES (1,'full time',5,1,1),(2,'full time',1,3,2),(3,'full time',3,0,3),(4,'full time',2,1,4),(5,'full time',1,2,5),(6,'full time',1,1,6),(7,'full time',0,1,7),(8,'full time',3,0,8),(9,'full time',0,1,9),(10,'full time',0,1,10),(11,'full time',3,1,11),(12,'full time',2,1,12),(13,'full time',2,2,13),(14,'full time',2,0,14),(15,'full time',1,1,15),(16,'full time',1,1,16),(17,'full time',1,1,17),(18,'full time',1,0,18),(19,'full time',1,2,19),(20,'full time',1,3,20),(21,'full time',0,0,21),(22,'full time',1,1,22),(23,'full time',0,3,23),(24,'full time',2,0,24),(25,'full time',1,1,25),(26,'full time',0,1,26),(27,'full time',0,1,28),(28,'full time',1,1,27),(29,'full time',2,3,29),(30,'full time',1,1,30),(31,'full time',0,0,31),(32,'full time',0,0,32),(33,'full time',0,0,34),(34,'full time',1,1,33),(35,'full time',2,0,36),(36,'full time',1,2,35),(37,'full time',2,0,37),(38,'full time',2,0,38),(39,'full time',1,1,39),(40,'full time',4,1,40),(41,'full time',1,0,41),(42,'full time',0,0,42),(43,'full time',0,3,43),(44,'full time',1,2,44),(45,'full time',1,1,45),(46,'full time',0,0,46),(47,'full time',1,1,47),(48,'full time',2,1,48),(49,'full time',2,1,49),(50,'full time',1,2,50),(51,'full time',2,1,51);
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rule`
--

DROP TABLE IF EXISTS `rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rule_type` varchar(32) NOT NULL,
  `points` double NOT NULL,
  `active` tinyint(1) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rule_tournament_id_b66bfa62_fk_tournament_id` (`tournament_id`),
  CONSTRAINT `rule_tournament_id_b66bfa62_fk_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule`
--

LOCK TABLES `rule` WRITE;
/*!40000 ALTER TABLE `rule` DISABLE KEYS */;
INSERT INTO `rule` VALUES (1,'goals difference',2,1,1),(2,'exact result',3,1,1),(3,'winner',5,1,1),(4,'match result',1,1,1);
/*!40000 ALTER TABLE `rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stage`
--

DROP TABLE IF EXISTS `stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stage_type` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `ordering` int(11) NOT NULL,
  `base_tournament_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stage_base_tournament_id_773117cc_fk_base_tournament_id` (`base_tournament_id`),
  CONSTRAINT `stage_base_tournament_id_773117cc_fk_base_tournament_id` FOREIGN KEY (`base_tournament_id`) REFERENCES `base_tournament` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` VALUES (1,'group stage','Тур 1',1,1),(2,'group stage','Тур 2',2,1),(3,'group stage','Тур 3',3,1),(4,'round of 16','1/8 финала',4,1),(5,'quarterfinal','Четвертьфинал',5,1),(6,'semifinal','Полуфинал',6,1),(7,'final','Финал',7,1);
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stage_coefficient`
--

DROP TABLE IF EXISTS `stage_coefficient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stage_coefficient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coefficient` double NOT NULL,
  `active` tinyint(1) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stage_coefficient_stage_id_9b70522e_fk_stage_id` (`stage_id`),
  KEY `stage_coefficient_tournament_id_6bec122f_fk_tournament_id` (`tournament_id`),
  CONSTRAINT `stage_coefficient_stage_id_9b70522e_fk_stage_id` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`),
  CONSTRAINT `stage_coefficient_tournament_id_6bec122f_fk_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage_coefficient`
--

LOCK TABLES `stage_coefficient` WRITE;
/*!40000 ALTER TABLE `stage_coefficient` DISABLE KEYS */;
INSERT INTO `stage_coefficient` VALUES (1,1,1,1,1),(2,1,1,2,1),(3,1,1,3,1),(4,1.2,1,4,1),(5,1.5,1,5,1),(6,2,1,6,1),(7,3,1,7,1);
/*!40000 ALTER TABLE `stage_coefficient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_type` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `town` varchar(255) DEFAULT NULL,
  `short_title` varchar(255) DEFAULT NULL,
  `abbreviation` varchar(32) DEFAULT NULL,
  `badge` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_country_id_76edd4fd_fk_country_id` (`country_id`),
  CONSTRAINT `team_country_id_76edd4fd_fk_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'national','Польша',NULL,NULL,NULL,'badges/Польша_8MuofQv.png',1,1),(2,'national','Украина',NULL,NULL,NULL,'badges/Украина_qdxdcus.png',1,2),(3,'national','Грузия',NULL,NULL,NULL,'badges/Грузия_hjlXu7l.png',1,3),(4,'national','Хорватия',NULL,NULL,NULL,'badges/Хорватия_2o9UgHF.png',1,4),(5,'national','Словения',NULL,NULL,NULL,'badges/Словения_nrNzwNM.png',1,5),(6,'national','Чехия',NULL,NULL,NULL,'badges/Чехия_L0AlO2I.png',1,6),(7,'national','Италия',NULL,NULL,NULL,'badges/Италия_sjboZvF.png',1,7),(8,'national','Сербия',NULL,NULL,NULL,'badges/Сербия_RHwNI94.png',1,8),(9,'national','Румыния',NULL,NULL,NULL,'badges/Румыния_2U8LXfs.png',1,9),(10,'national','Швейцария',NULL,NULL,NULL,'badges/Швеицария_wflq8qU.png',1,10),(11,'national','Нидерланды',NULL,NULL,NULL,'badges/Нидерланды_1PqU2V7.png',1,11),(12,'national','Дания',NULL,NULL,NULL,'badges/Дания_1anfngR.png',1,12),(13,'national','Албания',NULL,NULL,NULL,'badges/Албания_vZv88Vy.png',1,13),(14,'national','Словакия',NULL,NULL,NULL,'badges/Словакия_qsLlLyB.png',1,14),(15,'national','Венгрия',NULL,NULL,NULL,'badges/Венгрия_G2LE2Yq.png',1,15),(16,'national','Англия',NULL,NULL,NULL,'badges/Англия_FMUUgXr.png',1,16),(17,'national','Австрия',NULL,NULL,NULL,'badges/Австрия_8LaBLeH.png',1,17),(18,'national','Турция',NULL,NULL,NULL,'badges/Турция_WB07BOO.png',1,18),(19,'national','Шотландия',NULL,NULL,NULL,'badges/Шотландия_VgLdw39.png',1,19),(20,'national','Испания',NULL,NULL,NULL,'badges/Испания_17LDn8Q.png',1,20),(21,'national','Португалия',NULL,NULL,NULL,'badges/Португалия_m4EhTir.png',1,21),(22,'national','Бельгия',NULL,NULL,NULL,'badges/Бельгия_UqNatBe.png',1,22),(23,'national','Франция',NULL,NULL,NULL,'badges/Франция_6ZBGnOq.png',1,23),(24,'national','Германия',NULL,NULL,NULL,'badges/Германия_jShj9kg.png',1,24);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `base_tournament_id` int(11) NOT NULL,
  `code` varchar(32) NOT NULL,
  `open` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `tournament_base_tournament_id_5053983f_fk_base_tournament_id` (`base_tournament_id`),
  CONSTRAINT `tournament_base_tournament_id_5053983f_fk_base_tournament_id` FOREIGN KEY (`base_tournament_id`) REFERENCES `base_tournament` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES (1,'ЕВРО 24','',1,1,'',1);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;
/*!50112 SET @disable_bulk_load = IF (@is_rocksdb_supported, 'SET SESSION rocksdb_bulk_load = @old_rocksdb_bulk_load', 'SET @dummy_rocksdb_bulk_load = 0') */;
/*!50112 PREPARE s FROM @disable_bulk_load */;
/*!50112 EXECUTE s */;
/*!50112 DEALLOCATE PREPARE s */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-15  9:25:45
