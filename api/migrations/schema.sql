-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: ntua-rental
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

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

--
-- Temporary table structure for view `active_reservations`
--

DROP TABLE IF EXISTS `active_reservations`;
/*!50001 DROP VIEW IF EXISTS `active_reservations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `active_reservations` AS SELECT 
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `identity_number`,
 1 AS `reservation_id`,
 1 AS `start_date`,
 1 AS `end_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `billings`
--

DROP TABLE IF EXISTS `billings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billings` (
  `bd_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_company` tinyint(4) NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `street_number` varchar(45) NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `postal_code` int(10) unsigned NOT NULL,
  `country` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`bd_id`),
  UNIQUE KEY `bd_id_UNIQUE` (`bd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billings`
--

LOCK TABLES `billings` WRITE;
/*!40000 ALTER TABLE `billings` DISABLE KEYS */;
INSERT INTO `billings` VALUES (1,1,'Giannis Manousopoulos','6A','Kokkinopoulou','Zografou',27054,'Greece','6979680787'),(2,0,'INTRACOM','64','Oulof Palme','Zografou',15779,'Greece','6979680787'),(3,0,'INTRACOM','64','Oulof Palme','Zografou',15779,'Greece','6979680787'),(4,0,'INTRACOM','64','Oulof Palme','Zografou',15779,'Greece','6979680787');
/*!40000 ALTER TABLE `billings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `client_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `license_id` int(10) unsigned DEFAULT NULL,
  `identity_number` varchar(10) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `street_number` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL DEFAULT '',
  `password` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `employee_id_UNIQUE` (`client_id`),
  UNIQUE KEY `identity_number_UNIQUE` (`identity_number`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`),
  KEY `identity_number` (`identity_number`),
  KEY `first_name` (`first_name`),
  KEY `last_name` (`last_name`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (11,15,'kfdjffg','Giannis ','Kostoglou','Gravias',12222,'Kaisariani','Greece','16','themicp@gmail.com','123456'),(12,NULL,'BB1111','Grigorios','Thanasolas','STREETTT',152,'Athens','Greece','992','greg@gmail.com','98765');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER check_mail
     BEFORE INSERT ON clients FOR EACH ROW
     BEGIN
          IF NEW.email NOT LIKE '%_@__%.__%'
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Invalid mail';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER check_update_mail
     BEFORE UPDATE ON clients FOR EACH ROW
     BEGIN
          IF NEW.email NOT LIKE '%_@__%.__%'
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Invalid mail';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `contact_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(45) NOT NULL,
  `store_id` int(10) unsigned DEFAULT NULL,
  `type` enum('telephone','website','facebook','twitter','email') DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `fk_emails_idx` (`store_id`),
  CONSTRAINT `fk_contacts` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `employee_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `license_id` int(10) unsigned DEFAULT NULL,
  `store_id` int(10) unsigned NOT NULL,
  `identity_number` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `street_number` varchar(10) NOT NULL,
  `role` enum('admin','secretary','driver') NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  UNIQUE KEY `identity_number_UNIQUE` (`identity_number`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`),
  KEY `store_id_idx` (`store_id`),
  CONSTRAINT `employee_license_id` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`license_id`) ON UPDATE NO ACTION,
  CONSTRAINT `employee_store_id` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,NULL,1,'2345','Thanasoulas','Georgios','vf',1233,'tgt','g','fr223','admin','2010-09-09 00:00:00',NULL),(2,NULL,2,'AM 2345','Giannis','fgfg','vf',1233,'tgt','g','fr223','admin','2010-09-09 00:00:00','2011-09-09 00:00:00'),(3,NULL,3,'HAK 2343','Giannis','fgfg','vf',1233,'tgt','g','fr223','admin','2010-09-09 00:00:00','2011-09-09 00:00:00'),(4,NULL,1,'BG','ffff','fgfg','vf',1233,'tgt','g','fr223','admin','2010-09-09 00:00:00','2011-09-09 00:00:00'),(5,NULL,1,'232ss32ss','Thanasoulas','Giannis','vf',1233,'tgt','g','fr223','admin','2010-09-09 00:00:00','2011-09-09 00:00:00'),(6,13,1,'234533','Ti','thes ','aa',23,'dfsdfas','adfadsfasd','dsafdasfas','secretary','2018-01-10 00:00:00','2018-02-09 00:00:00');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER validate__insert_end_date
 BEFORE INSERT ON employees FOR EACH ROW
     BEGIN
          IF (NEW.end_date IS NOT NULL AND NEW.end_date < NEW.start_date)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'End date can not be prior start date';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER validate__updated_end_date
     BEFORE UPDATE ON employees FOR EACH ROW
     BEGIN
          IF (NEW.end_date IS NOT NULL AND NEW.end_date < NEW.start_date)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'End date can not be prior start date';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `inactive_current_reservations`
--

DROP TABLE IF EXISTS `inactive_current_reservations`;
/*!50001 DROP VIEW IF EXISTS `inactive_current_reservations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `inactive_current_reservations` AS SELECT 
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `identity_number`,
 1 AS `reservation_id`,
 1 AS `start_date`,
 1 AS `end_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `licenses`
--

DROP TABLE IF EXISTS `licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `licenses` (
  `license_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `atv` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `car` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `moto` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `minivan` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `truck` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `license_number` int(20) unsigned NOT NULL,
  PRIMARY KEY (`license_id`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`),
  UNIQUE KEY `license_number_UNIQUE` (`license_number`),
  KEY `license_id` (`license_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licenses`
--

LOCK TABLES `licenses` WRITE;
/*!40000 ALTER TABLE `licenses` DISABLE KEYS */;
INSERT INTO `licenses` VALUES (1,0,0,1,1,1,1),(13,1,1,0,1,1,1333),(15,1,1,1,1,1,11111);
/*!40000 ALTER TABLE `licenses` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER validate_insertted_data
     BEFORE INSERT ON licenses FOR EACH ROW
     BEGIN
          IF atv > 1 OR minivan > 1 OR car > 1 OR truck > 1 OR moto > 1
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'License type fields can contain only 0 or 1';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validate_updated_data` BEFORE UPDATE ON `licenses` FOR EACH ROW BEGIN
          IF (NEW.atv > 1 OR NEW.minivan > 1 OR NEW.car > 1 OR NEW.truck > 1 OR NEW.moto > 1)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'License type fields can contain only 0 or 1';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rentals` (
  `rental_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `receiver_employee_id` int(10) unsigned DEFAULT NULL,
  `deliverer_employee_id` int(10) unsigned NOT NULL,
  `reservation_id` int(10) unsigned NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `damage_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`rental_id`),
  UNIQUE KEY `rental_id_UNIQUE` (`rental_id`),
  KEY `reservation_id_idx` (`reservation_id`),
  KEY `recveiver_emplee_id_idx` (`receiver_employee_id`),
  KEY `deliverer_emploee_id_idx` (`deliverer_employee_id`),
  CONSTRAINT `deliverer_emploee_id` FOREIGN KEY (`deliverer_employee_id`) REFERENCES `employees` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `receiver_empolee_id` FOREIGN KEY (`receiver_employee_id`) REFERENCES `employees` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentals`
--

LOCK TABLES `rentals` WRITE;
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
INSERT INTO `rentals` VALUES (3,NULL,1,26,'2018-01-12 00:00:00','2018-01-18 00:00:00',NULL);
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_check_date_to_reservation` BEFORE INSERT ON `rentals` FOR EACH ROW BEGIN
	IF (SELECT start_date FROM reservations 
   		WHERE reservation_id = NEW.reservation_id) > NEW.start_date  
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rental Start Date has to be >= Reservation Start Date';
    END IF;   
    IF (SELECT end_date FROM reservations 
   		WHERE reservation_id = NEW.reservation_id) < NEW.end_date  
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rental End Date has to be <= Reservation Start Date';
    END IF;   
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_end_date_after_start` BEFORE INSERT ON `rentals` FOR EACH ROW BEGIN
          IF (NEW.end_date IS NOT NULL AND NEW.end_date < NEW.start_date)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'End date can not be prior start date';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_check_date_to_reservation` BEFORE UPDATE ON `rentals` FOR EACH ROW BEGIN
	IF (SELECT start_date FROM reservations 
   		WHERE reservation_id = NEW.reservation_id) > NEW.start_date  
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rental Start Date has to be >= Reservation Start Date';
    END IF;   
    IF (SELECT end_date FROM reservations 
   		WHERE reservation_id = NEW.reservation_id) < NEW.end_date  
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rental End Date has to be <= Reservation Start Date';
    END IF;   
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_end_date_after_start` BEFORE UPDATE ON `rentals` FOR EACH ROW BEGIN
          IF (NEW.end_date IS NOT NULL AND NEW.end_date < NEW.start_date)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'End date can not be prior start date';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_laste_seen_location` AFTER UPDATE ON `rentals` FOR EACH ROW BEGIN
IF (OLD.receiver_employee_id IS NULL AND
    !(NEW.receiver_employee_id IS NULL )) THEN
	UPDATE vehicles SET vehicles.last_seen_at = 
		(SELECT store_id 
     	FROM employees 
     	WHERE employee_id = NEW.receiver_employee_id)
    WHERE vehicles.vehicle_id = 
    	(SELECT vehicle_id FROM reservations 
         WHERE reservation_id = NEW.reservation_id)   
    ;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `reservation_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned NOT NULL,
  `vehicle_id` int(10) unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `has_paid` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `store_id` int(10) unsigned NOT NULL,
  `amount` double unsigned NOT NULL,
  `bd_id` int(10) NOT NULL,
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `reservation_id_UNIQUE` (`reservation_id`),
  KEY `client_id_idx` (`client_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  KEY `store_id_idx` (`store_id`),
  KEY `bd_id_idx` (`bd_id`),
  CONSTRAINT `reservation_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_store_id` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (26,11,1,'2018-01-10','2018-01-19',0,1,100,1),(28,11,1,'2018-01-22','2018-01-27',0,1,0,1),(29,12,1,'2018-01-20','2018-01-21',0,1,100,1);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_end_date_check` BEFORE INSERT ON `reservations` FOR EACH ROW BEGIN
          IF (NEW.end_date < NEW.start_date)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'End date can not be prior start date';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_has_paid_check` BEFORE INSERT ON `reservations` FOR EACH ROW BEGIN
          IF NEW.has_paid > 1
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Has_paid field can contain only 0 or 1';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_prevent_overlapping_reservations_car` BEFORE INSERT ON `reservations` FOR EACH ROW BEGIN
    IF EXISTS (
        SELECT start_date, end_date
            FROM reservations
            WHERE vehicle_id = NEW.vehicle_id AND (
                (start_date <= NEW.start_date AND end_date >= NEW.start_date)
                OR (start_date <= NEW.end_date AND NEW.end_date <= end_date)
                OR (NEW.start_date <= start_date AND NEW.end_date >= end_date)
            )   
    )   
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Overlapping reservations for same vehicle';
    END IF;                                                                                                                                                               
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_prevent_overlapping_reservations_user` BEFORE INSERT ON `reservations` FOR EACH ROW BEGIN
    IF EXISTS (
        SELECT start_date, end_date
            FROM reservations
            WHERE client_id = NEW.client_id AND (
                (start_date <= NEW.start_date AND end_date >= NEW.start_date)
                OR (start_date <= NEW.end_date AND NEW.end_date <= end_date)
                OR (NEW.start_date <= start_date AND NEW.end_date >= end_date)
            )   
    )   
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Overlapping reservations for same user';
    END IF;                                                                                                                                                               
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_end_date_check` BEFORE UPDATE ON `reservations` FOR EACH ROW BEGIN
          IF ( NEW.end_date < NEW.start_date)
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'End date can not be prior start date';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_has_paid_check` BEFORE UPDATE ON `reservations` FOR EACH ROW BEGIN
          IF NEW.has_paid > 1
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Has_paid field can contain only 0 or 1';
          END IF;
     END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_prevent_overlapping_reservations_user` BEFORE UPDATE ON `reservations` FOR EACH ROW BEGIN
    IF EXISTS (
        SELECT start_date, end_date
            FROM reservations
            WHERE client_id = NEW.client_id 
			AND (reservation_id <> OLD.reservation_id ) AND
			(
                (start_date <= NEW.start_date AND end_date >= NEW.start_date)
                OR (start_date <= NEW.end_date AND NEW.end_date <= end_date)
                OR (NEW.start_date <= start_date AND NEW.end_date >= end_date)
            )   
    )   
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Overlapping reservations for same user';
    END IF;                                                                                                                                                               
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_prevent_overlapping_reservations_car` BEFORE UPDATE ON `reservations` FOR EACH ROW BEGIN
    IF EXISTS (
        SELECT start_date, end_date
            FROM reservations
            WHERE vehicle_id = NEW.vehicle_id AND
			reservation_id != OLD.reservation_id AND
 (
                (start_date <= NEW.start_date AND end_date >= NEW.start_date)
                OR (start_date <= NEW.end_date AND NEW.end_date <= end_date)
                OR (NEW.start_date <= start_date AND NEW.end_date >= end_date)
            )   
    )   
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Overlapping reservations for same vehicle';
    END IF;                                                                                                                                                               
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `store_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street_number` varchar(45) NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `postal_code` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `store_name` varchar(45) NOT NULL,
  PRIMARY KEY (`store_id`),
  UNIQUE KEY `store_id_UNIQUE` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'6A','Kokkinopoulou','15773','Athens','GR','Rental Kokkinopoulou\n'),(2,'72','Leof. Vasilissis Sofias','11521','Athens','GR','Rental Syntagma'),(3,'414','Mesogion Av.','15343','Agia Paraskevi','GR','Rental Agia Paraskevi');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `upcoming_services`
--

DROP TABLE IF EXISTS `upcoming_services`;
/*!50001 DROP VIEW IF EXISTS `upcoming_services`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `upcoming_services` AS SELECT 
 1 AS `vehicle_id`,
 1 AS `brand`,
 1 AS `model`,
 1 AS `plate_number`,
 1 AS `next_service`,
 1 AS `store_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `vehicle_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `last_seen_at` int(10) unsigned NOT NULL,
  `store_id` int(10) unsigned NOT NULL,
  `type` enum('car','atv','truck','minivan','moto') NOT NULL,
  `brand` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `cc` int(10) unsigned NOT NULL,
  `horse_power` int(10) unsigned NOT NULL,
  `plate_number` varchar(45) NOT NULL,
  `buy_date` date NOT NULL,
  `kilometers` int(11) NOT NULL,
  `last_service` date DEFAULT NULL,
  `next_service` date NOT NULL,
  `insurance_expiration` date NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `vehicle_id_UNIQUE` (`vehicle_id`),
  UNIQUE KEY `plate_number_UNIQUE` (`plate_number`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,2,1,'car','Tesla','Model 3',0,0,'HAK 2176','2017-09-08',10985,'2020-01-28','2022-01-28','2018-09-08',0),(2,1,12,'atv','Toyota','CV',22,22,'HAK 2345','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01',0),(3,3,1,'car','Tesla','ubj',23,233,'HAK 2233','2919-08-01',12,'2919-08-01','2018-01-28','2919-08-01',0),(8,1,12,'atv','Toyota','CV',22,22,'HAK 2342','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01',0),(9,3,12,'atv','TOYOTA','CV',22,22,'HAK 2343','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01',0),(10,3,1,'car','Tesla','ubj',23,233,'ABH 234','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01',0),(12,3,1,'car','Tesla','ubj',23,233,'ABH 3454','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01',0),(13,3,12,'atv','TOYOTA','CV',22,22,'HAK 2341','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01',0),(14,3,12,'atv','TOYOTA','CV',22,22,'HAK 2389','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01',0),(16,3,12,'atv','MAZDA','CV',22,22,'HAK 2354','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01',0);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_update_nexts_service` BEFORE UPDATE ON `vehicles` FOR EACH ROW BEGIN
IF (OLD.next_service !=  NEW.next_service ) THEN
SET NEW.last_service = OLD.next_service;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `active_reservations`
--

/*!50001 DROP VIEW IF EXISTS `active_reservations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `active_reservations` AS select `clients`.`first_name` AS `first_name`,`clients`.`last_name` AS `last_name`,`clients`.`identity_number` AS `identity_number`,`reservations`.`reservation_id` AS `reservation_id`,`reservations`.`start_date` AS `start_date`,`reservations`.`end_date` AS `end_date` from ((`reservations` join `rentals` on((`rentals`.`reservation_id` = `reservations`.`reservation_id`))) join `clients` on((`clients`.`client_id` = `reservations`.`client_id`))) where isnull(`rentals`.`end_date`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `inactive_current_reservations`
--

/*!50001 DROP VIEW IF EXISTS `inactive_current_reservations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `inactive_current_reservations` AS select `clients`.`first_name` AS `first_name`,`clients`.`last_name` AS `last_name`,`clients`.`identity_number` AS `identity_number`,`reservations`.`reservation_id` AS `reservation_id`,`reservations`.`start_date` AS `start_date`,`reservations`.`end_date` AS `end_date` from ((`reservations` left join `rentals` on((`rentals`.`reservation_id` = `reservations`.`reservation_id`))) join `clients` on((`clients`.`client_id` = `reservations`.`client_id`))) where (isnull(`rentals`.`rental_id`) and (`reservations`.`start_date` < now()) and (`reservations`.`end_date` > now())) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `upcoming_services`
--

/*!50001 DROP VIEW IF EXISTS `upcoming_services`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `upcoming_services` AS select `v`.`vehicle_id` AS `vehicle_id`,`v`.`brand` AS `brand`,`v`.`model` AS `model`,`v`.`plate_number` AS `plate_number`,`v`.`next_service` AS `next_service`,`s`.`store_name` AS `store_name` from (`vehicles` `v` join `stores` `s` on((`s`.`store_id` = `v`.`store_id`))) where (`v`.`next_service` <= (now() + interval 30 day)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-11 23:31:50
