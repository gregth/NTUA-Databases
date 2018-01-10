# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: ntua-rental
# Generation Time: 2018-01-10 23:33:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table vehicles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vehicles`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;

INSERT INTO `vehicles` (`vehicle_id`, `last_seen_at`, `store_id`, `type`, `brand`, `model`, `cc`, `horse_power`, `plate_number`, `buy_date`, `kilometers`, `last_service`, `next_service`, `insurance_expiration`)
VALUES
	(1,1,1,'car','Tesla','Model 3',0,0,'ABC0395','2017-09-08',10985,'2017-09-08','2018-09-08','2018-09-08'),
	(2,12,12,'atv','TOYOTA','CV',22,22,'AM314522','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),
	(3,1,1,'car','Tesla','ubj',23,233,'AB','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01'),
	(8,12,12,'atv','TOYOTA','CV',22,22,'AM312222232323','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),
	(9,12,12,'atv','TOYOTA','CV',22,22,'AM31','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),
	(10,1,1,'car','Tesla','ubj',23,233,'ABssss','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01'),
	(12,1,1,'car','Tesla','ubj',23,233,'ABsssss','2919-08-01',12,'2919-08-01','2919-08-01','2919-08-01'),
	(13,12,12,'atv','TOYOTA','CV',22,22,'AM312222232323ss','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),
	(14,12,12,'atv','TOYOTA','CV',22,22,'AM31222223232d3ss','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01'),
	(16,1,12,'atv','MAZDA','CV',22,22,'333','2018-01-01',23,'2018-01-01','2018-01-01','2018-01-01');

/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
