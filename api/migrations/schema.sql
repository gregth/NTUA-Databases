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
  UNIQUE KEY `license_id_UNIQUE` (`license_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (11,NULL,'AA0000','Themistoklis','Papameletiou','Gravias',16122,'Kaisariani','Greece','16','themicp@gmail.com','123456'),(12,NULL,'BB1111','Grigorios','Thanasoulas','STREETTT',11111,'Athens','Greece','99','gregth@gmail.com','98765');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
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
  `role` varchar(45) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  UNIQUE KEY `identity_number_UNIQUE` (`identity_number`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`),
  KEY `store_id_idx` (`store_id`),
  CONSTRAINT `employee_license_id` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`license_id`) ON UPDATE NO ACTION,
  CONSTRAINT `employee_store_id` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (2,NULL,1,'232ss32ssddd','Thanasoulas','Georgios','vf',1233,'tgt','g','fr223','dres','2010-09-09 00:00:00','2011-09-09 00:00:00'),(5,NULL,1,'dfdfd','ffff','fgfg','vf',1233,'tgt','g','fr223','dres','2010-09-09 00:00:00','2011-09-09 00:00:00'),(6,NULL,1,'23232','ffff','fgfg','vf',1233,'tgt','g','fr223','dres','2010-09-09 00:00:00','2011-09-09 00:00:00'),(8,NULL,1,'23232ss','ffff','fgfg','vf',1233,'tgt','g','fr223','dres','2010-09-09 00:00:00','2011-09-09 00:00:00'),(10,NULL,1,'232ss32ss','Thanasoulas','Giannis','vf',1233,'tgt','g','fr223','dres','2010-09-09 00:00:00','2011-09-09 00:00:00');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `licenses`
--

DROP TABLE IF EXISTS `licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `licenses` (
  `license_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `atv` tinyint(4) NOT NULL DEFAULT '0',
  `car` tinyint(4) NOT NULL DEFAULT '0',
  `moto` tinyint(4) NOT NULL DEFAULT '0',
  `minivan` tinyint(4) NOT NULL DEFAULT '0',
  `truck` tinyint(4) NOT NULL DEFAULT '0',
  `license_number` int(20) unsigned NOT NULL,
  PRIMARY KEY (`license_id`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`),
  UNIQUE KEY `license_number_UNIQUE` (`license_number`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licenses`
--

LOCK TABLES `licenses` WRITE;
/*!40000 ALTER TABLE `licenses` DISABLE KEYS */;
INSERT INTO `licenses` VALUES (1,0,1,1,1,1,1),(13,0,1,0,1,1,1333);
/*!40000 ALTER TABLE `licenses` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentals`
--

LOCK TABLES `rentals` WRITE;
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
INSERT INTO `rentals` VALUES (2,NULL,5,11,'2018-01-01 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;
UNLOCK TABLES;

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
  `has_paid` tinyint(4) NOT NULL DEFAULT '0',
  `store_id` int(10) unsigned NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `reservation_id_UNIQUE` (`reservation_id`),
  KEY `client_id_idx` (`client_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  KEY `store_id_idx` (`store_id`),
  CONSTRAINT `reservation_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_store_id` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,11,1,'2018-01-05','2018-01-19',0,1,159.3),(2,11,1,'2010-03-01','2010-04-01',0,1,100),(3,11,1,'2010-03-01','2010-04-01',0,1,100),(4,11,1,'2010-03-01','2010-04-01',0,1,100),(5,11,1,'2010-03-01','2010-04-01',0,1,100),(6,11,1,'2010-03-01','2010-04-01',0,1,100),(7,11,1,'2010-03-01','2010-04-01',0,1,100),(10,11,1,'2010-03-02','2010-04-01',0,1,100),(11,11,1,'2010-03-01','2010-04-01',0,1,100),(14,11,1,'2010-03-01','2010-04-01',0,1,100),(15,11,1,'2010-03-01','2010-04-01',0,1,100),(16,12,1,'2010-03-01','2010-04-01',0,1,100),(20,11,2,'2013-03-01','2013-04-01',0,1,100),(21,11,2,'2013-03-01','2013-04-01',0,1,100),(22,11,2,'2013-03-01','2013-04-01',0,1,100),(23,11,2,'2013-03-01','2013-04-01',0,1,100),(24,11,2,'2013-03-01','2013-04-01',0,1,100),(25,11,2,'2013-03-01','2013-04-01',0,1,100);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `stores` VALUES (1,'6A','Kokkinopoulou','15773','Athens','GR','Rental Kokkinopoulou\n'),(2,'72','Leof. Vasilissis Sofias','11521','Athens','GR','Rental Kentro'),(3,'414','Mesogion Av.','15343','Agia Paraskevi, Athens','GR','Rental Agia Paraskevi');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `vehicles` VALUES (1,1,1,'car','Tesla','Model 3',0,0,'ABC0395','2017-09-08',10985,'2017-09-08','2018-09-08','2018-09-08'),(2,12,12,'atv','TOYOTA','CV',22,22,'AM314522','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),(3,1,1,'car','Tesla','ubj',23,233,'AB','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01'),(8,12,12,'atv','TOYOTA','CV',22,22,'AM312222232323','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),(9,12,12,'atv','TOYOTA','CV',22,22,'AM31','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),(10,1,1,'car','Tesla','ubj',23,233,'ABssss','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01'),(12,1,1,'car','Tesla','ubj',23,233,'ABsssss','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01'),(13,12,12,'atv','TOYOTA','CV',22,22,'AM312222232323ss','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),(14,12,12,'atv','TOYOTA','CV',22,22,'AM31222223232d3ss','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),(16,1,12,'atv','MAZDA','CV',22,22,'333','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-11  0:26:49
