# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: ntua-rental
# Generation Time: 2018-01-09 18:21:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table employees
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `employee_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `license_id` int(10) unsigned DEFAULT NULL,
  `store_id` int(10) unsigned NOT NULL,
  `identity_number` varchar(10) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table licenses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `licenses`;

CREATE TABLE `licenses` (
  `license_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `atv` bit(1) NOT NULL DEFAULT b'0',
  `car` bit(1) NOT NULL DEFAULT b'0',
  `moto` bit(1) NOT NULL DEFAULT b'0',
  `minivan` bit(1) NOT NULL DEFAULT b'0',
  `truck` bit(1) NOT NULL DEFAULT b'0',
  `license_number` int(20) unsigned NOT NULL,
  PRIMARY KEY (`license_id`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`),
  UNIQUE KEY `license_number_UNIQUE` (`license_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table rentals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rentals`;

CREATE TABLE `rentals` (
  `rental_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `receiver_emploee_id` int(10) unsigned NOT NULL,
  `deliverer_emploee_id` int(10) unsigned NOT NULL,
  `reservation_id` int(10) unsigned NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `damage_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`rental_id`),
  UNIQUE KEY `rental_id_UNIQUE` (`rental_id`),
  KEY `reservation_id_idx` (`reservation_id`),
  KEY `recveiver_emplee_id_idx` (`receiver_emploee_id`),
  KEY `deliverer_emploee_id_idx` (`deliverer_emploee_id`),
  CONSTRAINT `deliverer_emploee_id` FOREIGN KEY (`deliverer_emploee_id`) REFERENCES `employees` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `receiver_empolee_id` FOREIGN KEY (`receiver_emploee_id`) REFERENCES `employees` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table reservations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reservations`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table stores
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stores`;

CREATE TABLE `stores` (
  `store_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street_number` varchar(45) NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `postal_code` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  PRIMARY KEY (`store_id`),
  UNIQUE KEY `store_id_UNIQUE` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;

INSERT INTO `stores` (`store_id`, `street_number`, `street_name`, `postal_code`, `city`, `country`)
VALUES
	(1,'6A','Kokkinopoulou','15773','Athens','GR');

/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;


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




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
