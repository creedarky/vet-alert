-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: vet-alert
-- ------------------------------------------------------
-- Server version	5.6.24

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
-- Table structure for table `apoderado`
--

DROP TABLE IF EXISTS `apoderado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apoderado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `direccion` varchar(70) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `id_comuna` int(11) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_comuna` (`id_comuna`),
  CONSTRAINT `apoderado_ibfk_1` FOREIGN KEY (`id_comuna`) REFERENCES `comuna` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155871866 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apoderado`
--

LOCK TABLES `apoderado` WRITE;
/*!40000 ALTER TABLE `apoderado` DISABLE KEYS */;
INSERT INTO `apoderado` VALUES (155871865,'Rodrigo','Ramírez','Club Hipico 642','2016-11-10 20:47:29','2016-11-10 20:47:29',1,'78903395');
/*!40000 ALTER TABLE `apoderado` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_INSERT_APODERADO
AFTER INSERT ON APODERADO 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 1, null, null, 'APODERADO', null, CONCAT(NEW.nombre,' ',NEW.apellido), NEW.id);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_UPDATE_APODERADO
AFTER UPDATE ON APODERADO 
FOR EACH ROW 
BEGIN
Declare valorAntiguo VARCHAR(700);
Declare valorNuevo VARCHAR(700);
SET valorAntiguo := '';
SET valorNuevo := '';

IF(OLD.nombre != NEW.nombre) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nombre: ',OLD.nombre, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nombre: ',NEW.nombre, '; ');
END IF;

IF(OLD.apellido != NEW.apellido) then
SET valorAntiguo := CONCAT(valorAntiguo, 'apellido: ', OLD.apellido, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'apellido: ', NEW.apellido, '; '); 		
END IF;

IF(OLD.direccion != NEW.direccion) then
SET valorAntiguo := CONCAT(valorAntiguo, 'direccion: ', OLD.direccion, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'direccion: ', NEW.direccion, '; '); 		
END IF;

IF(OLD.id_comuna != NEW.id_comuna) then
SET valorAntiguo := CONCAT(valorAntiguo,'id_comuna : ',OLD.id_comuna, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'id_comuna : ',NEW.id_comuna, '; '); 		
END IF;

IF(OLD.telefono != NEW.telefono) then
SET valorAntiguo := CONCAT(valorAntiguo,'telefono : ',OLD.telefono, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'telefono : ',NEW.telefono, '; '); 		
END IF;


insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 2, null, null, 'APODERADO',  valorAntiguo, valorNuevo, OLD.id);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_DELETE_APODERADO
AFTER DELETE ON APODERADO 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 3, null, null, 'APODERADO', CONCAT(OLD.nombre,' ',OLD.apellido), null, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Santiago','2016-11-10 15:19:52','2016-11-10 15:19:52'),(2,'Santiago','2016-11-10 15:21:04','2016-11-10 15:21:04');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comuna`
--

DROP TABLE IF EXISTS `comuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comuna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_ciudad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ciudad` (`id_ciudad`),
  CONSTRAINT `comuna_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comuna`
--

LOCK TABLES `comuna` WRITE;
/*!40000 ALTER TABLE `comuna` DISABLE KEYS */;
INSERT INTO `comuna` VALUES (1,'Santiago','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(2,'El Bosque','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(3,'La Pintana','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(4,'Pudahuel','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(5,'Maipu','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(6,'Puente Alto','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(7,'Quilicura','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(8,'Peñaflor','2016-11-10 15:21:04','2016-11-10 15:21:04',1),(9,'Las Condes','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(10,'San Ramón','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(11,'La Granja','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(12,'Lo Espejo','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(13,'Conchali','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(14,'Renca','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(15,'Calera De Tango','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(16,'La Reina','2016-11-10 15:21:05','2016-11-10 15:21:05',1),(17,'Providencia','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(18,'Estación Central','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(19,'Independencia','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(20,'Recoleta','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(21,'Vitacura','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(22,'Colina','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(23,'Lampa','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(24,'Macul','2016-11-10 15:21:06','2016-11-10 15:21:06',1),(25,'Nuñoa','2016-11-10 15:21:28','2016-11-10 15:21:28',1),(26,'La Cisterna','2016-11-10 15:21:28','2016-11-10 15:21:28',1);
/*!40000 ALTER TABLE `comuna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie`
--

DROP TABLE IF EXISTS `especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `especie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `nombre_comun` varchar(45) DEFAULT NULL,
  `minPpm` int(11) DEFAULT NULL,
  `maxPpm` int(11) DEFAULT NULL,
  `minTemp` float DEFAULT NULL,
  `maxTemp` float DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
INSERT INTO `especie` VALUES (1,'Mandrillus Sphinx','Mono Domestico',192,192,32.5,35.8,'2016-11-10 20:30:14','2016-11-10 20:30:14'),(2,'Canis Lupus Familiaris','Perro Domestico',70,120,37.9,39.9,'2016-11-10 20:43:54','2016-11-10 20:43:54'),(3,'Felis catus','Gato Domestico',120,140,38.1,39.2,'2016-11-10 20:44:35','2016-11-10 20:44:35'),(4,'Prueba de especie','nombre comun alterado',100,120,34,37,'2016-11-12 18:31:56','2016-11-12 18:31:56');
/*!40000 ALTER TABLE `especie` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_INSERT_ESPECIE
AFTER INSERT ON ESPECIE 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 1, null, null, 'ESPECIE', null, NEW.nombre, NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_UPDATE_ESPECIE
AFTER UPDATE ON ESPECIE 
FOR EACH ROW 
BEGIN
Declare valorAntiguo VARCHAR(700);
Declare valorNuevo VARCHAR(700);
SET valorAntiguo := '';
SET valorNuevo := '';

IF(OLD.nombre != NEW.nombre) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nombre: ',OLD.nombre, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nombre: ',NEW.nombre, '; ');
END IF;

IF(OLD.nombre_comun != NEW.nombre_comun) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nombre_comun: ', OLD.nombre_comun, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nombre_comun: ', NEW.nombre_comun, '; '); 		
END IF;

IF(OLD.minPpm != NEW.minPpm) then
SET valorAntiguo := CONCAT(valorAntiguo,'minPpm : ',OLD.minPpm, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'minPpm : ',NEW.minPpm, '; '); 		
END IF;

IF(OLD.maxPpm != NEW.maxPpm) then
SET valorAntiguo := CONCAT(valorAntiguo,' maxPpm: ',OLD.maxPpm, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'maxPpm: ',NEW.maxPpm, '; '); 		
END IF;

IF(OLD.minTemp != NEW.minTemp) then
SET valorAntiguo := CONCAT(valorAntiguo,' minTemp: ',OLD.minTemp, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'minTemp: ',NEW.minTemp, '; '); 		
END IF;

IF(OLD.maxTemp != NEW.maxTemp) then
SET valorAntiguo := CONCAT(valorAntiguo,' maxTemp: ',OLD.maxTemp, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'maxTemp: ',NEW.maxTemp, '; '); 		
END IF;

insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 2, null, null, 'ESPECIE',  valorAntiguo, valorNuevo, OLD.id);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_DELETE_ESPECIE
AFTER DELETE ON ESPECIE 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 3, null, null, 'ESPECIE', OLD.nombre, null, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (5,'normal','2016-11-10 20:23:14','2016-11-10 20:23:14'),(6,'baja','2016-11-10 20:23:14','2016-11-10 20:23:14'),(7,'alta','2016-11-10 20:23:14','2016-11-10 20:23:14'),(8,'grave','2016-11-10 20:23:14','2016-11-10 20:23:14'),(9,'activo','2016-11-10 21:48:02','2016-11-10 21:48:02');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Creacion','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Modificacion','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Borrado','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `id_evento` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `tabla_modificada` varchar(45) DEFAULT NULL,
  `valor_antiguo` varchar(100) DEFAULT NULL,
  `valor_nuevo` varchar(100) DEFAULT NULL,
  `id_registro_creado_modificado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_evento` (`id_evento`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `log_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `log_ibfk_3` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (9,'2016-11-12 19:11:37',2,NULL,4,'PACIENTE','nombre: Firu; ','nombre: Firu II; ',4),(10,'2016-11-13 22:19:54',2,NULL,4,'PACIENTE','id_especie : 7; ','id_especie : 2; ',4),(11,'2016-11-14 20:29:59',2,NULL,NULL,'ESPECIE','minPpm : 90;  maxPpm: 100;  minTemp: 38.5;  maxTemp: 38.8; ','minPpm : 70; maxPpm: 120; minTemp: 37.9; maxTemp: 39.9; ',2),(12,'2016-11-14 20:29:59',2,NULL,NULL,'ESPECIE',' minTemp: 38.6;  maxTemp: 38.6; ','minTemp: 38.1; maxTemp: 39.2; ',3),(13,'2016-11-14 21:26:07',1,NULL,5,'PACIENTE',NULL,'Firu III',5);
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitor`
--

DROP TABLE IF EXISTS `monitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activo` tinyint(1) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitor`
--

LOCK TABLES `monitor` WRITE;
/*!40000 ALTER TABLE `monitor` DISABLE KEYS */;
INSERT INTO `monitor` VALUES (1,1,'0000-00-00 00:00:00','2016-11-15 00:00:05'),(2,1,'0000-00-00 00:00:00','2016-11-15 00:00:05');
/*!40000 ALTER TABLE `monitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoreo_paciente`
--

DROP TABLE IF EXISTS `monitoreo_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoreo_paciente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promedioTemperatura` float DEFAULT NULL,
  `promedioPpm` float DEFAULT NULL,
  `promedioMovHora` float DEFAULT NULL,
  `estadoTemperatura` varchar(15) DEFAULT NULL,
  `estadoMovimiento` varchar(15) DEFAULT NULL,
  `estadoPaciente` varchar(15) DEFAULT NULL,
  `estadoPPM` varchar(15) DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_paciente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoreo_paciente`
--

LOCK TABLES `monitoreo_paciente` WRITE;
/*!40000 ALTER TABLE `monitoreo_paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitoreo_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paciente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `annoNacimiento` int(11) DEFAULT NULL,
  `carnet` int(11) DEFAULT NULL,
  `sexo` char(6) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_apoderado` int(11) NOT NULL,
  `id_especie` int(11) NOT NULL,
  `id_monitor` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_apoderado` (`id_apoderado`),
  KEY `id_especie` (`id_especie`),
  KEY `fk_monitor_idx` (`id_monitor`),
  CONSTRAINT `fk_apoderado` FOREIGN KEY (`id_apoderado`) REFERENCES `apoderado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_especie` FOREIGN KEY (`id_especie`) REFERENCES `especie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_monitor` FOREIGN KEY (`id_monitor`) REFERENCES `monitor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (4,'Firu II',2006,0,'macho','2016-11-10 20:56:29','2016-11-10 20:56:29',155871865,2,1,1),(5,'Firu III',2010,0,'macho','2016-11-10 00:00:00','2016-11-10 00:00:00',155871865,2,2,0);
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_INSERT_PACIENTE
AFTER INSERT ON PACIENTE 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 1, null, NEW.id, 'PACIENTE', null, NEW.nombre, NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_UPDATE_PACIENTE
AFTER UPDATE ON PACIENTE 
FOR EACH ROW 
BEGIN
Declare valorAntiguo VARCHAR(700);
Declare valorNuevo VARCHAR(700);
SET valorAntiguo := '';
SET valorNuevo := '';

IF(OLD.nombre != NEW.nombre) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nombre: ',OLD.nombre, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nombre: ',NEW.nombre, '; ');
END IF;

IF(OLD.annoNacimiento != NEW.annoNacimiento) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nacimiento: ', OLD.annoNacimiento, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nacimiento: ', NEW.annoNacimiento, '; '); 		
END IF;

IF(OLD.sexo != NEW.sexo) then
SET valorAntiguo := CONCAT(valorAntiguo, 'sexo: ', OLD.sexo, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'sexo: ', NEW.sexo, '; '); 		
END IF;

IF(OLD.id_apoderado != NEW.id_apoderado) then
SET valorAntiguo := CONCAT(valorAntiguo,'id_apoderado : ',OLD.id_apoderado, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'id_apoderado : ',NEW.id_apoderado, '; '); 		
END IF;

IF(OLD.id_especie != NEW.id_especie) then
SET valorAntiguo := CONCAT(valorAntiguo,'id_especie : ',OLD.id_especie, '; '); 		
SET valorNuevo := CONCAT(valorNuevo,'id_especie : ',NEW.id_especie, '; '); 		
END IF;

insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 2, null, OLD.id, 'PACIENTE',  valorAntiguo, valorNuevo, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_DELETE_PACIENTE
AFTER DELETE ON PACIENTE 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 3, null, OLD.id, 'PACIENTE', OLD.nombre, null, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,'Lectura','2016-11-10 21:04:44','2016-11-10 21:04:44'),(2,'Escritura','2016-11-10 21:04:56','2016-11-10 21:04:56'),(3,'Borrado','2016-11-10 21:08:32','2016-11-10 21:08:32');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_INSERT_PERMISO
AFTER INSERT ON PERMISO 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 1, null, null, 'PERMISO', null, NEW.descripcion, NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_UPDATE_PERMISO
AFTER UPDATE ON PERMISO
FOR EACH ROW 
BEGIN
Declare valorAntiguo VARCHAR(700);
Declare valorNuevo VARCHAR(700);
SET valorAntiguo := '';
SET valorNuevo := '';

IF(OLD.descripcion != NEW.descripcion) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nombre: ',OLD.descripcion, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nombre: ',NEW.descripcion, '; ');
END IF;

insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 2, null, null, 'PERMISO',  valorAntiguo, valorNuevo, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_DELETE_PERMISO
AFTER DELETE ON PERMISO 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 3, null, null, 'PERMISO', OLD.descripcion, null, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'SuperAdmin','2016-11-10 21:12:44','2016-11-10 21:12:44'),(2,'Admin','2016-11-10 21:12:50','2016-11-10 21:12:50'),(3,'SuperUser','2016-11-10 21:13:08','2016-11-10 21:13:08'),(4,'User','2016-11-10 21:13:15','2016-11-10 21:13:15');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_INSERT_ROL
AFTER INSERT ON ROL 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 1, null, null, 'ROL', null, NEW.descripcion, NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_UPDATE_ROL
AFTER UPDATE ON ROL
FOR EACH ROW 
BEGIN
Declare valorAntiguo VARCHAR(700);
Declare valorNuevo VARCHAR(700);
SET valorAntiguo := '';
SET valorNuevo := '';

IF(OLD.descripcion != NEW.descripcion) then
SET valorAntiguo := CONCAT(valorAntiguo, 'nombre: ',OLD.descripcion, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'nombre: ',NEW.descripcion, '; ');
END IF;

insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 2, null, null, 'ROL',  valorAntiguo, valorNuevo, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_DELETE_ROL
AFTER DELETE ON ROL 
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 3, null, null, 'ROL', OLD.descripcion, null, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rol_permiso`
--

DROP TABLE IF EXISTS `rol_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol_permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_rol` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rol_permiso_rol1_idx` (`id_rol`),
  KEY `fk_rol_permiso_permiso1_idx` (`id_permiso`),
  CONSTRAINT `fk_rol_permiso_permiso1` FOREIGN KEY (`id_permiso`) REFERENCES `permiso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rol_permiso_rol1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_permiso`
--

LOCK TABLES `rol_permiso` WRITE;
/*!40000 ALTER TABLE `rol_permiso` DISABLE KEYS */;
INSERT INTO `rol_permiso` VALUES (1,'2016-11-10 21:19:45','2016-11-10 21:19:45',1,1),(2,'2016-11-10 21:19:50','2016-11-10 21:19:50',1,2),(3,'2016-11-10 21:19:55','2016-11-10 21:19:55',1,3),(5,'2016-11-10 21:21:21','2016-11-10 21:21:21',2,1),(6,'2016-11-10 21:21:27','2016-11-10 21:21:27',2,2),(7,'2016-11-10 21:22:15','2016-11-10 21:22:15',4,1);
/*!40000 ALTER TABLE `rol_permiso` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_INSERT_ROL_PERMISO
AFTER INSERT ON ROL_PERMISO
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 1, null, null, 'ROL_PERMISO', null, CONCAT('Rol ', NEW.id_rol, 'permiso ', NEW.id_permiso), NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_UPDATE_ROL_PERMISO
AFTER UPDATE ON ROL_PERMISO
FOR EACH ROW 
BEGIN
Declare valorAntiguo VARCHAR(700);
Declare valorNuevo VARCHAR(700);
SET valorAntiguo := '';
SET valorNuevo := '';

IF(OLD.id_rol != NEW.id_rol) then
SET valorAntiguo := CONCAT(valorAntiguo, 'id_rol: ',OLD.id_rol, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'id_rol: ',NEW.id_rol, '; ');
END IF;

IF(OLD.id_permiso != NEW.id_permiso) then
SET valorAntiguo := CONCAT(valorAntiguo, 'id_permiso: ',OLD.id_permiso, '; '); 		
SET valorNuevo := CONCAT(valorNuevo, 'id_permiso: ',NEW.id_permiso, '; ');
END IF;

insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 2, null, null, 'ROL',  valorAntiguo, valorNuevo, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER TR_LOG_DELETE_ROL_PERMISO
AFTER DELETE ON ROL_PERMISO
FOR EACH ROW 
BEGIN 
insert into log
(fecha, id_evento, id_usuario, id_paciente, tabla_modificada, valor_antiguo, valor_nuevo, id_registro_creado_modificado) 
values
(now(), 3, null, null, 'ROL_PERMISO', CONCAT('Rol ', OLD.id_rol, 'permiso ', OLD.id_permiso), null, OLD.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` varchar(255) NOT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sid` (`sid`),
  UNIQUE KEY `Sessions_sid_unique` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'iMIzN7ksjhPBuPYQe7wA3ig15xFGLlZx','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"Tj+W850IMC27wA==\"}','2016-11-10 16:29:36','2016-11-10 16:29:36'),(2,'B9VOJNtxoowR9kIzoilv14fBbnTKTHvB','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"e/QtNYRI0vMjYA==\"}','2016-11-10 23:13:13','2016-11-10 23:13:13'),(3,'UQcgmubr6hH84EU2YI8dI-m5wA3rPmZe','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"NOR692LBVPrdZQ==\"}','2016-11-14 01:21:37','2016-11-14 01:21:37');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_email_unique` (`email`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (307,'Test','User','test@example.com','9BSryXpX4T0WcS+v8SPdNIbfLWOy7NRe577N+pjF4/KfwURM74THlOyR+Kl3tVQv0H1lq2Tl8sxsRyZdzYXphA==','local','XCYI5lfVflA5CTdGY+lu6A==','2016-11-14 01:22:21','2016-11-14 01:22:21',3,1),(308,'Super','Admin','admin@example.com','C20nQ1wWmPjar5+VXuRvKUh33zqQBBZ+Wu7SKnwtHGjT04elrKL0xg0Q5ApiCVR8ZW2Xe+3sNzjFnsBm/ooNXw==','local','dXjGauGStk/Qm1DhqxKKTw==','2016-11-14 01:22:21','2016-11-14 01:22:21',1,1),(309,'Normal','Admin','admin_normal@example.com','9JW1Jr931wwBhr5N0PksNwA0J4W1Ae2Qhfu10GU7j27LcES09rvpBEl1hKqPLyy61/RDzIJD6xmEKbaovvkv1A==','local','54V83aDWsjtvYxGtGp+oiw==','2016-11-14 01:22:21','2016-11-14 01:22:21',2,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'vet-alert'
--

--
-- Dumping routines for database 'vet-alert'
--
/*!50003 DROP PROCEDURE IF EXISTS `insertaApoderado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaApoderado`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`apoderado`
(`nombre`,
`apellido`,
`direccion`,
`fecha_creacion`,
`fecha_actualizacion`,
`id_comuna`,
`telefono`)
VALUES
('NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENO' ,
 'APELLIDOAPELLIDOAPELLIDOAPELLIDOAPELLIDOAPEL',
 'DIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECC',
now(),
now(),
1,
111111111111);
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaCiudad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaCiudad`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`ciudad`
		(`nombre`,`fecha_creacion`,	`fecha_actualizacion`)
		VALUES
		('SantiagoSantiagoSantiagoSantiagoSantiagoSant',now(),now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaComuna` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaComuna`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`comuna`
		(`nombre`,`fecha_creacion`,	`fecha_actualizacion`)
		VALUES
		('COMUNACOMUNACOMUNACOMUNACOMUNACOMUNACOMUNACOMUNACOMUNACOMUNACOMUNACOMU',now(),now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaEspecie` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaEspecie`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`especie`
(
`nombre`,
`nombre_comun`,
`minPpm`,
`maxPpm`,
`minTemp`,
`maxTemp`,
`fecha_creacion`,
`fecha_actualizacion`)
VALUES
(
'NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMB',
'NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOM',
99999,
99999,
99999,
99999,
now(),
now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaEstado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaEstado`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
   
		INSERT INTO `vet-alert`.`estado`
		(`descripcion`,`fecha_creacion`,	`fecha_actualizacion`)
		VALUES
		('NormalNormalNormalNormalNormalNormalNormalNor',now(),now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaEvento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaEvento`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`evento`
		(`nombre`,`fecha_creacion`,	`fecha_actualizacion`)
		VALUES
		('LecturaLecturaLecturaLecturaLecturaLecturaLec',now(),now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaLog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaLog`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`log`
(
`fecha`,
`id_evento`,
`id_usuario`,
`id_paciente`,
`tabla_modificada`,
`valor_antiguo`,
`valor_nuevo`,
`id_registro_creado_modificado`)
VALUES(

now(),
1,
1,
3,
'NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOM',
'NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMB',
'NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMB',
1);

	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaMonitoreoPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaMonitoreoPaciente`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do    
		INSERT INTO `vet-alert`.`monitoreo_paciente`
(
`promedioTemperatura`,
`promedioPpm`,
`promedioMovHora`,
`estadoTemperatura`,
`estadoMovimiento`,
`estadoPaciente`,
`fecha`,
`fecha_creacion`,
`fecha_actualizacion`,
`id_paciente`)
VALUES
(
9999999,
9999999,
9999999,
1,
1,
1,
now(),
now(),
now(),
3);
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaPaciente`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`paciente`
(
`nombre`,
`annoNacimiento`,
`carnet`,
`sexo`,
`direccion`,
`fecha_creacion`,
`fecha_actualizacion`,
`id_apoderado`,
`id_especie`)
VALUES
('NOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOMBRENOM',
9999,
'111111111',
'MACHO',
'DIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECCIONDIRECC',
now(),
now(),
5,
1);
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaPermiso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaPermiso`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`permiso`
		(`descripcion`,`fecha_creacion`,	`fecha_actualizacion`)
		VALUES
		('LecturaLecturaLecturaLecturaLecturaLecturaLec',now(),now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaRegistros` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaRegistros`(in sent varchar(1000), in veces int)
Begin
	declare i int;
    set i = 0;
    SET @myquery = sent ;
    PREPARE stmt2 FROM @myquery;
    while i<veces do
		EXECUTE stmt2;		
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaRol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaRol`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
		INSERT INTO `vet-alert`.`rol`
		(`descripcion`,`fecha_creacion`,	`fecha_actualizacion`)
		VALUES
		('rolrolrolrolrolrolrolrolrolrolrolrolrolrolrol',now(),now());
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaRolPermiso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaRolPermiso`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do    
		insert into rol_permiso (fecha_creacion, fecha_actualizacion, id_rol, id_permiso) values (now(),now(),1,1);
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertaUsuario`(in veces int)
Begin
	declare i int;
    set i = 0;
    while i<veces do
    
	INSERT INTO `vet-alert`.`usuario`
(
`nombre`,
`apellido`,
`email`,
`password`,
`provider`,
`salt`,
`fecha_creacion`,
`fecha_actualizacion`,
`id_rol`,
`id_estado`)
VALUES ('Test','User',CONCAT('test@example.com',i),'nDqGOf3OZ/zn4EqtYe11Yrb9lnAwZHGBKaDp4v+AtholNw2Ha3MCdgRlhj1sT9zPOTzQJMoUSxi9obrGf6iaMw==','local','dscGat6T1rcK2r+gby/4aw==','2016-11-02 02:08:44','2016-11-02 02:08:44',3,NULL);
	set i=i+1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_borrarLogsAntiguos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_borrarLogsAntiguos`(IN limite INT)
BEGIN
delete from log where fecha <= DATE_SUB(concat(curdate(),' 23:59:59'),INTERVAL limite DAY);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_borrarRegistrosAntiguos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_borrarRegistrosAntiguos`(IN limite INT)
BEGIN
delete from monitoreo_Paciente where fecha <= DATE_SUB(concat(curdate(),' 23:59:59'),INTERVAL limite DAY);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_identifica_trx` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_identifica_trx`(IN id_usuario_in INT)
BEGIN

UPDATE log SET id_usuario=id_usuario_in WHERE id_usuario IS NULL;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_Reporte_verLogs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Reporte_verLogs`(IN inicio DATETIME, IN fin DATETIME)
BEGIN
select l.fecha as 'Fecha evento', 
e.nombre as 'Tipo de evento', 
l.tabla_modificada as 'Tabla afectada', 

case when l.id_usuario IS NULL
	then '-'
	else l.id_usuario
end as 'Usuario_id', 
case when u.nombre IS NULL
	then '-'
	else u.nombre
end as 'Usuario_nombre', 

case when l.valor_antiguo IS NULL
	then '-'
	else l.valor_antiguo
end as 'valor_antiguo', 
case when l.valor_nuevo IS NULL
	then '-'
	else l.valor_nuevo
end as 'valor_nuevo',
l.id_registro_creado_modificado as 'Id registro afectado'
from log l
inner join evento e on
l.id_evento = e.id
left join usuario u on
l.id_usuario = u.id
left join paciente p on
l.id_paciente = p.id
where l.fecha between inicio and fin;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_Reporte_VerMonitoreoPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Reporte_VerMonitoreoPaciente`(IN inicio DATETIME, IN fin DATETIME)
BEGIN
select p.id as 'id_paciente', p.nombre as nombre_paciente, m.promedioTemperatura,  m.promedioPpm, m.promedioMovHora, 
m.estadoTemperatura, m.estadoMovimiento,m.estadoPPm, m.estadoPaciente, a.id as 'id_apoderado', concat(a.nombre,' ',a.apellido) as nombre_apoderado from monitoreo_paciente m
inner join paciente p on
m.id_paciente = p.id
inner join apoderado a on
p.id_apoderado = a.id
Where (m.fecha between inicio and fin);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_verLogs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verLogs`(IN inicio DATETIME, IN fin DATETIME)
BEGIN
select l.fecha as 'Fecha evento', e.nombre as 'Tipo de evento', l.tabla_modificada as 'Tabla afectada', l.id_registro_creado_modificado as 'Id registro afectado', u.nombre as 'Usuario', p.nombre as 'Paciente Afectado'  from log l
inner join evento e on
l.id_evento = e.id
inner join usuario u on
l.id_usuario = u.id
inner join paciente p on
l.id_paciente = p.id
where l.fecha between inicio and fin;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_verMonitoreoPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verMonitoreoPaciente`(IN inicio DATE, IN fin DATE)
BEGIN
select p.nombre as nombre_paciente, m.promedioTemperatura, m.estadoTemperatura, m.promedioPpm, m.promedioMovHora, 
m.estadoMovimiento, m.estadoPaciente, concat(a.nombre+' '+a.apellido) as nombre_apoderado from monitoreo_paciente m
inner join paciente p on
m.id_paciente = p.id
inner join apoderado a on
p.id_apoderado = a.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-14 21:27:25
