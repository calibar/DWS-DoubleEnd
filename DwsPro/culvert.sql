-- MySQL dump 10.13  Distrib 5.7.22, for Win64 (x86_64)
--
-- Host: localhost    Database: culvert
-- ------------------------------------------------------
-- Server version	5.7.22-log

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
-- Table structure for table `culvert_image`
--

DROP TABLE IF EXISTS `culvert_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `culvert_image` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `low_lat` double(10,6) NOT NULL,
  `low_lon` double(10,6) NOT NULL,
  `low_pic` text,
  `high_lat` double(10,6) NOT NULL,
  `high_lon` double(10,6) NOT NULL,
  `high_pic` text,
  `phototime` timestamp NULL DEFAULT NULL,
  `description` text,
  `orientation` text,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culvert_image`
--

LOCK TABLES `culvert_image` WRITE;
/*!40000 ALTER TABLE `culvert_image` DISABLE KEYS */;
INSERT INTO `culvert_image` VALUES (21,'Lord Grim',100.000000,100.000000,'Lord Grim/Lord Grim_low_2019-03-10T20A49A34-06A00.jpg',100.000000,100.000000,'Lord Grim/Lord Grim_high_2019-03-10T20A49A34-06A00.jpg',NULL,'Test','north');
/*!40000 ALTER TABLE `culvert_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culvert_incomplete`
--

DROP TABLE IF EXISTS `culvert_incomplete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `culvert_incomplete` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `low_pic` text,
  `high_pic` text,
  `description` text,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culvert_incomplete`
--

LOCK TABLES `culvert_incomplete` WRITE;
/*!40000 ALTER TABLE `culvert_incomplete` DISABLE KEYS */;
/*!40000 ALTER TABLE `culvert_incomplete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `pwdhash` varchar(100) NOT NULL,
  `createtime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-10 20:52:57
