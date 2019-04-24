-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: culvert
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `basic_image`
--

DROP TABLE IF EXISTS `basic_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basic_image` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `Uploader` varchar(100) NOT NULL,
  `lat` double(10,6) NOT NULL,
  `lon` double(10,6) NOT NULL,
  `pic` text,
  `phototime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  `orientation` text,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_image`
--

LOCK TABLES `basic_image` WRITE;
/*!40000 ALTER TABLE `basic_image` DISABLE KEYS */;
INSERT INTO `basic_image` VALUES (1,'admin',52.132027,-106.635460,'c4340cd69766f8ceae30d88291138c1c/admin_basic_2019-04-22T21A59A19-06A00.jpg','2019-04-23 09:59:19','',''),(2,'admin',52.225315,-106.593552,'c4340cd69766f8ceae30d88291138c1c/admin_basic_2019-04-23T16A28A04-06A00.jpg','2019-04-24 04:28:04','','');
/*!40000 ALTER TABLE `basic_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_incomplete`
--

DROP TABLE IF EXISTS `basic_incomplete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basic_incomplete` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `pic` text,
  `description` text,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_incomplete`
--

LOCK TABLES `basic_incomplete` WRITE;
/*!40000 ALTER TABLE `basic_incomplete` DISABLE KEYS */;
/*!40000 ALTER TABLE `basic_incomplete` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culvert_image`
--

LOCK TABLES `culvert_image` WRITE;
/*!40000 ALTER TABLE `culvert_image` DISABLE KEYS */;
INSERT INTO `culvert_image` VALUES (45,'admin',52.132023,-106.635490,'c4340cd69766f8ceae30d88291138c1c/admin_low_2019-04-22T22A13A26-06A00.jpg',52.132027,-106.635460,'c4340cd69766f8ceae30d88291138c1c/admin_high_2019-04-22T22A13A26-06A00.jpg',NULL,'','');
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
-- Table structure for table `debris_jams`
--

DROP TABLE IF EXISTS `debris_jams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debris_jams` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `lat` double(10,6) NOT NULL,
  `lon` double(10,6) NOT NULL,
  `pic` text,
  `phototime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  `orientation` text,
  `direction` varchar(100) NOT NULL,
  PRIMARY KEY (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debris_jams`
--

LOCK TABLES `debris_jams` WRITE;
/*!40000 ALTER TABLE `debris_jams` DISABLE KEYS */;
INSERT INTO `debris_jams` VALUES (1,'admin',52.126633,-106.663269,'c4340cd69766f8ceae30d88291138c1c/admin_DebrisJams_2019-04-23T15A22A16-06A00.jpg','2019-04-24 03:22:16','','','SouthEast');
/*!40000 ALTER TABLE `debris_jams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debris_jams_incomplete`
--

DROP TABLE IF EXISTS `debris_jams_incomplete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debris_jams_incomplete` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `pic` text,
  `description` text,
  `direction` varchar(100) NOT NULL,
  PRIMARY KEY (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debris_jams_incomplete`
--

LOCK TABLES `debris_jams_incomplete` WRITE;
/*!40000 ALTER TABLE `debris_jams_incomplete` DISABLE KEYS */;
/*!40000 ALTER TABLE `debris_jams_incomplete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `streamflow`
--

DROP TABLE IF EXISTS `streamflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `streamflow` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `lat` double(10,6) NOT NULL,
  `lon` double(10,6) NOT NULL,
  `pic` text,
  `phototime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  `orientation` text,
  `area` varchar(100) NOT NULL,
  `level` varchar(100) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `streamflow`
--

LOCK TABLES `streamflow` WRITE;
/*!40000 ALTER TABLE `streamflow` DISABLE KEYS */;
INSERT INTO `streamflow` VALUES (1,'admin',52.225315,-106.593552,'c4340cd69766f8ceae30d88291138c1c/admin_streamflow_2019-04-23T14A30A41-06A00.jpg','2019-04-24 02:30:41','','','agricultural','low'),(2,'admin',52.225315,-106.593552,'c4340cd69766f8ceae30d88291138c1c/admin_streamflow_2019-04-23T14A34A24-06A00.jpg','2019-04-24 02:34:24','','','agricultural','low');
/*!40000 ALTER TABLE `streamflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `streamflow_incomplete`
--

DROP TABLE IF EXISTS `streamflow_incomplete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `streamflow_incomplete` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `uploader` varchar(100) NOT NULL,
  `pic` text,
  `description` text,
  `area` varchar(100) NOT NULL,
  `level` varchar(100) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `streamflow_incomplete`
--

LOCK TABLES `streamflow_incomplete` WRITE;
/*!40000 ALTER TABLE `streamflow_incomplete` DISABLE KEYS */;
/*!40000 ALTER TABLE `streamflow_incomplete` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (9,'admin','21232f297a57a5a743894a0e4a801fc3','2019-03-12 21:09:14'),(10,'Jp','7793fc95f22d6af520c9f284cb19bd9a','2019-03-16 00:59:52'),(11,'Mengxuan','723831f4f9b71ce47b5487718f1cd89f','2019-04-23 02:11:00');
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

-- Dump completed on 2019-04-23 20:58:09
