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
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime,
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
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
INSERT INTO `especie` VALUES (1,'Mandrillus Sphinx','Mono Domestico',192,192,32.5,35.8,'2016-11-10 20:30:14','2016-11-10 20:30:14'),(2,'Canis Lupus Familiaris','Perro Domestico',90,100,38.5,38.8,'2016-11-10 20:43:54','2016-11-10 20:43:54'),(3,'Felis catus','Gato Domestico',120,140,38.6,38.6,'2016-11-10 20:44:35','2016-11-10 20:44:35'),(4,'Prueba de especie','nombre comun alterado',100,120,34,37,'2016-11-12 18:31:56','2016-11-12 18:31:56');
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
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (9,'2016-11-12 19:11:37',2,NULL,4,'PACIENTE','nombre: Firu; ','nombre: Firu II; ',4),(10,'2016-11-13 22:19:54',2,NULL,4,'PACIENTE','id_especie : 7; ','id_especie : 2; ',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitor`
--

LOCK TABLES `monitor` WRITE;
/*!40000 ALTER TABLE `monitor` DISABLE KEYS */;
INSERT INTO `monitor` VALUES (1,1,'0000-00-00 00:00:00','2016-11-14 01:22:27');
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
  `fecha` datetime,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=6238 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoreo_paciente`
--

LOCK TABLES `monitoreo_paciente` WRITE;
/*!40000 ALTER TABLE `monitoreo_paciente` DISABLE KEYS */;
INSERT INTO `monitoreo_paciente` VALUES (6006,38.5,120,3,'Normal','Normal','Normal','Normal','2016-11-12 17:22:47','2016-11-12 17:22:47','2016-11-12 17:22:47',4),(6007,38.5,92.9,0,'39','90','danger',NULL,'2016-11-14 01:23:23','2016-11-14 01:23:23','2016-11-14 01:23:23',4),(6008,38.5238,92.7143,0,'39','89','danger',NULL,'2016-11-14 01:23:26','2016-11-14 01:23:26','2016-11-14 01:23:26',4),(6009,38.5455,93,0,'39','99','danger',NULL,'2016-11-14 01:23:29','2016-11-14 01:23:29','2016-11-14 01:23:29',4),(6010,38.5652,93.3043,0,'39','100','danger',NULL,'2016-11-14 01:23:32','2016-11-14 01:23:32','2016-11-14 01:23:32',4),(6011,38.5833,93.375,0,'39','95','danger',NULL,'2016-11-14 01:23:35','2016-11-14 01:23:35','2016-11-14 01:23:35',4),(6012,38.6,93.6,0,'39','99','danger',NULL,'2016-11-14 01:23:38','2016-11-14 01:23:38','2016-11-14 01:23:38',4),(6013,38.5769,93.7692,0,'38','98','danger',NULL,'2016-11-14 01:23:41','2016-11-14 01:23:41','2016-11-14 01:23:41',4),(6014,38.5926,93.9259,0,'39','98','danger',NULL,'2016-11-14 01:23:44','2016-11-14 01:23:44','2016-11-14 01:23:44',4),(6015,38.6071,93.8214,0,'39','91','danger',NULL,'2016-11-14 01:23:47','2016-11-14 01:23:47','2016-11-14 01:23:47',4),(6016,38.5862,93.6552,0,'38','89','danger',NULL,'2016-11-14 01:23:50','2016-11-14 01:23:50','2016-11-14 01:23:50',4),(6017,38.6,93.6,0,'39','92','danger',NULL,'2016-11-14 01:23:53','2016-11-14 01:23:53','2016-11-14 01:23:53',4),(6018,38.5806,93.6774,0,'38','96','danger',NULL,'2016-11-14 01:23:56','2016-11-14 01:23:56','2016-11-14 01:23:56',4),(6019,38.5625,93.5625,0,'38','90','danger',NULL,'2016-11-14 01:23:59','2016-11-14 01:23:59','2016-11-14 01:23:59',4),(6020,38.5758,93.4242,0,'39','89','danger',NULL,'2016-11-14 01:24:02','2016-11-14 01:24:02','2016-11-14 01:24:02',4),(6021,38.5588,93.4706,0,'38','95','danger',NULL,'2016-11-14 01:24:05','2016-11-14 01:24:05','2016-11-14 01:24:05',4),(6022,38.5429,93.4571,0,'38','93','danger',NULL,'2016-11-14 01:24:08','2016-11-14 01:24:08','2016-11-14 01:24:08',4),(6023,38.5556,93.4444,0,'39','93','danger',NULL,'2016-11-14 01:24:11','2016-11-14 01:24:11','2016-11-14 01:24:11',4),(6024,38.5405,93.4054,0,'38','92','danger',NULL,'2016-11-14 01:24:14','2016-11-14 01:24:14','2016-11-14 01:24:14',4),(6025,38.5263,93.3421,0,'38','91','danger',NULL,'2016-11-14 01:24:18','2016-11-14 01:24:18','2016-11-14 01:24:18',4),(6026,38.5385,93.4872,0,'39','99','danger',NULL,'2016-11-14 01:24:21','2016-11-14 01:24:21','2016-11-14 01:24:21',4),(6027,38.55,93.45,0,'39','92','danger',NULL,'2016-11-14 01:24:24','2016-11-14 01:24:24','2016-11-14 01:24:24',4),(6028,38.561,93.5366,0,'39','97','danger',NULL,'2016-11-14 01:24:27','2016-11-14 01:24:27','2016-11-14 01:24:27',4),(6029,38.5714,93.4762,0,'39','91','danger',NULL,'2016-11-14 01:24:30','2016-11-14 01:24:30','2016-11-14 01:24:30',4),(6030,38.5581,93.6047,0,'38','99','danger',NULL,'2016-11-14 01:24:33','2016-11-14 01:24:33','2016-11-14 01:24:33',4),(6031,38.5455,93.7273,0,'38','99','danger',NULL,'2016-11-14 01:24:36','2016-11-14 01:24:36','2016-11-14 01:24:36',4),(6032,38.5556,93.7556,0,'39','95','danger',NULL,'2016-11-14 01:24:39','2016-11-14 01:24:39','2016-11-14 01:24:39',4),(6033,38.5435,93.7174,0,'38','92','danger',NULL,'2016-11-14 01:24:42','2016-11-14 01:24:42','2016-11-14 01:24:42',4),(6034,38.5532,93.6383,0,'39','90','danger',NULL,'2016-11-14 01:24:45','2016-11-14 01:24:45','2016-11-14 01:24:45',4),(6035,38.5625,93.7292,0,'39','98','danger',NULL,'2016-11-14 01:24:48','2016-11-14 01:24:48','2016-11-14 01:24:48',4),(6036,38.5714,93.7143,0,'39','93','danger',NULL,'2016-11-14 01:24:51','2016-11-14 01:24:51','2016-11-14 01:24:51',4),(6037,38.58,93.68,0,'39','92','danger',NULL,'2016-11-14 01:24:54','2016-11-14 01:24:54','2016-11-14 01:24:54',4),(6038,38.5686,93.8039,0,'38','100','danger',NULL,'2016-11-14 01:24:57','2016-11-14 01:24:57','2016-11-14 01:24:57',4),(6039,38.5577,93.8462,0,'38','96','danger',NULL,'2016-11-14 01:25:00','2016-11-14 01:25:00','2016-11-14 01:25:00',4),(6040,38.5472,93.8113,0,'38','92','danger',NULL,'2016-11-14 01:25:03','2016-11-14 01:25:03','2016-11-14 01:25:03',4),(6041,38.5556,93.7407,0,'39','90','danger',NULL,'2016-11-14 01:25:06','2016-11-14 01:25:06','2016-11-14 01:25:06',4),(6042,38.5636,93.6909,0,'39','91','danger',NULL,'2016-11-14 01:25:10','2016-11-14 01:25:10','2016-11-14 01:25:10',4),(6043,38.5536,93.625,0,'38','90','danger',NULL,'2016-11-14 01:25:13','2016-11-14 01:25:13','2016-11-14 01:25:13',4),(6044,38.5614,93.6842,0,'39','97','danger',NULL,'2016-11-14 01:25:16','2016-11-14 01:25:16','2016-11-14 01:25:16',4),(6045,38.569,93.7241,0,'39','96','danger',NULL,'2016-11-14 01:25:19','2016-11-14 01:25:19','2016-11-14 01:25:19',4),(6046,38.5593,93.661,0,'38','90','danger',NULL,'2016-11-14 01:25:22','2016-11-14 01:25:22','2016-11-14 01:25:22',4),(6047,38.55,93.65,0,'38','93','danger',NULL,'2016-11-14 01:25:25','2016-11-14 01:25:25','2016-11-14 01:25:25',4),(6048,38.5574,93.6229,0,'39','92','danger',NULL,'2016-11-14 01:25:28','2016-11-14 01:25:28','2016-11-14 01:25:28',4),(6049,38.5484,93.6613,0,'38','96','danger',NULL,'2016-11-14 01:25:31','2016-11-14 01:25:31','2016-11-14 01:25:31',4),(6050,38.5556,93.746,0,'39','99','danger',NULL,'2016-11-14 01:25:34','2016-11-14 01:25:34','2016-11-14 01:25:34',4),(6051,38.5625,93.7188,0,'39','92','danger',NULL,'2016-11-14 01:25:37','2016-11-14 01:25:37','2016-11-14 01:25:37',4),(6052,38.5538,93.7231,0,'38','94','danger',NULL,'2016-11-14 01:25:40','2016-11-14 01:25:40','2016-11-14 01:25:40',4),(6053,38.5606,93.8182,0,'39','100','danger',NULL,'2016-11-14 01:25:43','2016-11-14 01:25:43','2016-11-14 01:25:43',4),(6054,38.5672,93.8507,0,'39','96','danger',NULL,'2016-11-14 01:25:46','2016-11-14 01:25:46','2016-11-14 01:25:46',4),(6055,38.5735,93.8824,0,'39','96','danger',NULL,'2016-11-14 01:25:49','2016-11-14 01:25:49','2016-11-14 01:25:49',4),(6056,38.5797,93.942,0,'39','98','danger',NULL,'2016-11-14 01:25:52','2016-11-14 01:25:52','2016-11-14 01:25:52',4),(6057,38.5714,93.9857,0,'38','97','danger',NULL,'2016-11-14 01:25:55','2016-11-14 01:25:55','2016-11-14 01:25:55',4),(6058,38.5634,93.9155,0,'38','89','danger',NULL,'2016-11-14 01:25:58','2016-11-14 01:25:58','2016-11-14 01:25:58',4),(6059,38.5556,93.9583,0,'38','97','danger',NULL,'2016-11-14 01:26:01','2016-11-14 01:26:01','2016-11-14 01:26:01',4),(6060,38.5479,93.9589,0,'38','94','danger',NULL,'2016-11-14 01:26:05','2016-11-14 01:26:05','2016-11-14 01:26:05',4),(6061,38.5405,94.0405,0,'38','100','danger',NULL,'2016-11-14 01:26:08','2016-11-14 01:26:08','2016-11-14 01:26:08',4),(6062,38.5467,94.0667,0,'39','96','danger',NULL,'2016-11-14 01:26:11','2016-11-14 01:26:11','2016-11-14 01:26:11',4),(6063,38.5526,94.0263,0,'39','91','danger',NULL,'2016-11-14 01:26:14','2016-11-14 01:26:14','2016-11-14 01:26:14',4),(6064,38.5584,94.013,0,'39','93','danger',NULL,'2016-11-14 01:26:17','2016-11-14 01:26:17','2016-11-14 01:26:17',4),(6065,38.5513,93.9487,0,'38','89','danger',NULL,'2016-11-14 01:26:20','2016-11-14 01:26:20','2016-11-14 01:26:20',4),(6066,38.5443,93.9114,0,'38','91','danger',NULL,'2016-11-14 01:26:23','2016-11-14 01:26:23','2016-11-14 01:26:23',4),(6067,38.55,93.95,0,'39','97','danger',NULL,'2016-11-14 01:26:26','2016-11-14 01:26:26','2016-11-14 01:26:26',4),(6068,38.5556,93.9753,0,'39','96','danger',NULL,'2016-11-14 01:26:29','2016-11-14 01:26:29','2016-11-14 01:26:29',4),(6069,38.561,94.0244,0,'39','98','danger',NULL,'2016-11-14 01:26:32','2016-11-14 01:26:32','2016-11-14 01:26:32',4),(6070,38.5542,94.0843,0,'38','99','danger',NULL,'2016-11-14 01:26:35','2016-11-14 01:26:35','2016-11-14 01:26:35',4),(6071,38.5595,94.119,0,'39','97','danger',NULL,'2016-11-14 01:26:38','2016-11-14 01:26:38','2016-11-14 01:26:38',4),(6072,38.5647,94.1059,0,'39','93','danger',NULL,'2016-11-14 01:26:41','2016-11-14 01:26:41','2016-11-14 01:26:41',4),(6073,38.5581,94.1395,0,'38','97','danger',NULL,'2016-11-14 01:26:44','2016-11-14 01:26:44','2016-11-14 01:26:44',4),(6074,38.5517,94.1954,0,'38','99','danger',NULL,'2016-11-14 01:26:47','2016-11-14 01:26:47','2016-11-14 01:26:47',4),(6075,38.5568,94.1591,0,'39','91','danger',NULL,'2016-11-14 01:26:50','2016-11-14 01:26:50','2016-11-14 01:26:50',4),(6076,38.5618,94.2022,0,'39','98','danger',NULL,'2016-11-14 01:26:53','2016-11-14 01:26:53','2016-11-14 01:26:53',4),(6077,38.5667,94.2333,0,'39','97','danger',NULL,'2016-11-14 01:26:56','2016-11-14 01:26:56','2016-11-14 01:26:56',4),(6078,38.5714,94.2747,0,'39','98','danger',NULL,'2016-11-14 01:27:00','2016-11-14 01:27:00','2016-11-14 01:27:00',4),(6079,38.5761,94.2826,0,'39','95','danger',NULL,'2016-11-14 01:27:03','2016-11-14 01:27:03','2016-11-14 01:27:03',4),(6080,38.5806,94.2581,0,'39','92','danger',NULL,'2016-11-14 01:27:06','2016-11-14 01:27:06','2016-11-14 01:27:06',4),(6081,38.5851,94.234,0,'39','92','danger',NULL,'2016-11-14 01:27:09','2016-11-14 01:27:09','2016-11-14 01:27:09',4),(6082,38.5789,94.1895,0,'38','90','danger',NULL,'2016-11-14 01:27:12','2016-11-14 01:27:12','2016-11-14 01:27:12',4),(6083,38.5729,94.1562,0,'38','91','danger',NULL,'2016-11-14 01:27:15','2016-11-14 01:27:15','2016-11-14 01:27:15',4),(6084,38.5773,94.1753,0,'39','96','danger',NULL,'2016-11-14 01:27:18','2016-11-14 01:27:18','2016-11-14 01:27:18',4),(6085,38.5714,94.1531,0,'38','92','danger',NULL,'2016-11-14 01:27:21','2016-11-14 01:27:21','2016-11-14 01:27:21',4),(6086,38.5657,94.1414,0,'38','93','danger',NULL,'2016-11-14 01:27:24','2016-11-14 01:27:24','2016-11-14 01:27:24',4),(6087,38.57,94.17,0,'39','97','danger',NULL,'2016-11-14 01:27:27','2016-11-14 01:27:27','2016-11-14 01:27:27',4),(6088,38.5644,94.1881,0,'38','96','danger',NULL,'2016-11-14 01:27:30','2016-11-14 01:27:30','2016-11-14 01:27:30',4),(6089,38.5686,94.2353,0,'39','99','danger',NULL,'2016-11-14 01:27:33','2016-11-14 01:27:33','2016-11-14 01:27:33',4),(6090,38.5631,94.2524,0,'38','96','danger',NULL,'2016-11-14 01:27:36','2016-11-14 01:27:36','2016-11-14 01:27:36',4),(6091,38.5577,94.2692,0,'38','96','danger',NULL,'2016-11-14 01:27:39','2016-11-14 01:27:39','2016-11-14 01:27:39',4),(6092,38.5619,94.2381,0,'39','91','danger',NULL,'2016-11-14 01:27:42','2016-11-14 01:27:42','2016-11-14 01:27:42',4),(6093,38.5566,94.1981,0,'38','90','danger',NULL,'2016-11-14 01:27:45','2016-11-14 01:27:45','2016-11-14 01:27:45',4),(6094,38.5514,94.1682,0,'38','91','danger',NULL,'2016-11-14 01:27:48','2016-11-14 01:27:48','2016-11-14 01:27:48',4),(6095,38.5463,94.1944,0,'38','97','danger',NULL,'2016-11-14 01:27:52','2016-11-14 01:27:51','2016-11-14 01:27:51',4),(6096,38.5413,94.2477,0,'38','100','danger',NULL,'2016-11-14 01:27:55','2016-11-14 01:27:55','2016-11-14 01:27:55',4),(6097,38.5455,94.2,0,'39','89','danger',NULL,'2016-11-14 01:27:58','2016-11-14 01:27:58','2016-11-14 01:27:58',4),(6098,38.5495,94.2342,0,'39','98','danger',NULL,'2016-11-14 01:28:01','2016-11-14 01:28:01','2016-11-14 01:28:01',4),(6099,38.5446,94.2143,0,'38','92','danger',NULL,'2016-11-14 01:28:04','2016-11-14 01:28:04','2016-11-14 01:28:04',4),(6100,38.5398,94.2212,0,'38','95','danger',NULL,'2016-11-14 01:28:07','2016-11-14 01:28:07','2016-11-14 01:28:07',4),(6101,38.5439,94.2368,0,'39','96','danger',NULL,'2016-11-14 01:28:10','2016-11-14 01:28:10','2016-11-14 01:28:10',4),(6102,38.5391,94.2348,0,'38','94','danger',NULL,'2016-11-14 01:28:13','2016-11-14 01:28:13','2016-11-14 01:28:13',4),(6103,38.5345,94.2069,0,'38','91','danger',NULL,'2016-11-14 01:28:16','2016-11-14 01:28:16','2016-11-14 01:28:16',4),(6104,38.5385,94.2393,0,'39','98','danger',NULL,'2016-11-14 01:28:19','2016-11-14 01:28:19','2016-11-14 01:28:19',4),(6105,38.5424,94.2203,0,'39','92','danger',NULL,'2016-11-14 01:28:22','2016-11-14 01:28:22','2016-11-14 01:28:22',4),(6106,38.5378,94.2185,0,'38','94','danger',NULL,'2016-11-14 01:28:25','2016-11-14 01:28:25','2016-11-14 01:28:25',4),(6107,38.5333,94.1917,0,'38','91','danger',NULL,'2016-11-14 01:28:28','2016-11-14 01:28:28','2016-11-14 01:28:28',4),(6108,38.5372,94.1901,0,'39','94','danger',NULL,'2016-11-14 01:28:31','2016-11-14 01:28:31','2016-11-14 01:28:31',4),(6109,38.541,94.2295,0,'39','99','danger',NULL,'2016-11-14 01:28:34','2016-11-14 01:28:34','2016-11-14 01:28:34',4),(6110,38.5447,94.2276,0,'39','94','danger',NULL,'2016-11-14 01:28:37','2016-11-14 01:28:37','2016-11-14 01:28:37',4),(6111,38.5403,94.25,0,'38','97','danger',NULL,'2016-11-14 01:28:40','2016-11-14 01:28:40','2016-11-14 01:28:40',4),(6112,38.536,94.208,0,'38','89','danger',NULL,'2016-11-14 01:28:43','2016-11-14 01:28:43','2016-11-14 01:28:43',4),(6113,38.5317,94.2222,0,'38','96','danger',NULL,'2016-11-14 01:28:47','2016-11-14 01:28:47','2016-11-14 01:28:47',4),(6114,38.5354,94.2441,0,'39','97','danger',NULL,'2016-11-14 01:28:50','2016-11-14 01:28:50','2016-11-14 01:28:50',4),(6115,38.5312,94.2266,0,'38','92','danger',NULL,'2016-11-14 01:28:53','2016-11-14 01:28:53','2016-11-14 01:28:53',4),(6116,38.5271,94.2171,0,'38','93','danger',NULL,'2016-11-14 01:28:56','2016-11-14 01:28:56','2016-11-14 01:28:56',4),(6117,38.5308,94.2538,0,'39','99','danger',NULL,'2016-11-14 01:28:59','2016-11-14 01:28:59','2016-11-14 01:28:59',4),(6118,38.5267,94.2214,0,'38','90','danger',NULL,'2016-11-14 01:29:02','2016-11-14 01:29:02','2016-11-14 01:29:02',4),(6119,38.5303,94.2652,0,'39','100','danger',NULL,'2016-11-14 01:29:05','2016-11-14 01:29:05','2016-11-14 01:29:05',4),(6120,38.5263,94.2782,0,'38','96','danger',NULL,'2016-11-14 01:29:08','2016-11-14 01:29:08','2016-11-14 01:29:08',4),(6121,38.5299,94.2463,0,'39','90','danger',NULL,'2016-11-14 01:29:11','2016-11-14 01:29:11','2016-11-14 01:29:11',4),(6122,38.5259,94.237,0,'38','93','danger',NULL,'2016-11-14 01:29:14','2016-11-14 01:29:14','2016-11-14 01:29:14',4),(6123,38.5221,94.2279,0,'38','93','danger',NULL,'2016-11-14 01:29:17','2016-11-14 01:29:17','2016-11-14 01:29:17',4),(6124,38.5255,94.1898,0,'39','89','danger',NULL,'2016-11-14 01:29:20','2016-11-14 01:29:20','2016-11-14 01:29:20',4),(6125,38.529,94.1739,0,'39','92','danger',NULL,'2016-11-14 01:29:23','2016-11-14 01:29:23','2016-11-14 01:29:23',4),(6126,38.5324,94.1655,0,'39','93','danger',NULL,'2016-11-14 01:29:26','2016-11-14 01:29:26','2016-11-14 01:29:26',4),(6127,38.5286,94.2,0,'38','99','danger',NULL,'2016-11-14 01:29:29','2016-11-14 01:29:29','2016-11-14 01:29:29',4),(6128,38.5319,94.2199,0,'39','97','danger',NULL,'2016-11-14 01:29:32','2016-11-14 01:29:32','2016-11-14 01:29:32',4),(6129,38.5282,94.1972,0,'38','91','danger',NULL,'2016-11-14 01:29:35','2016-11-14 01:29:35','2016-11-14 01:29:35',4),(6130,38.5245,94.2308,0,'38','99','danger',NULL,'2016-11-14 01:29:38','2016-11-14 01:29:38','2016-11-14 01:29:38',4),(6131,38.5278,94.2569,0,'39','98','danger',NULL,'2016-11-14 01:29:42','2016-11-14 01:29:42','2016-11-14 01:29:42',4),(6132,38.531,94.2621,0,'39','95','danger',NULL,'2016-11-14 01:29:45','2016-11-14 01:29:45','2016-11-14 01:29:45',4),(6133,38.5274,94.3014,0,'38','100','danger',NULL,'2016-11-14 01:29:48','2016-11-14 01:29:48','2016-11-14 01:29:48',4),(6134,38.5238,94.3197,0,'38','97','danger',NULL,'2016-11-14 01:29:51','2016-11-14 01:29:51','2016-11-14 01:29:51',4),(6135,38.5203,94.3446,0,'38','98','danger',NULL,'2016-11-14 01:29:54','2016-11-14 01:29:54','2016-11-14 01:29:54',4),(6136,38.5168,94.3356,0,'38','93','danger',NULL,'2016-11-14 01:29:57','2016-11-14 01:29:57','2016-11-14 01:29:57',4),(6137,38.52,94.34,0,'39','95','danger',NULL,'2016-11-14 01:30:00','2016-11-14 01:30:00','2016-11-14 01:30:00',4),(6138,38.5166,94.3245,0,'38','92','danger',NULL,'2016-11-14 01:30:03','2016-11-14 01:30:03','2016-11-14 01:30:03',4),(6139,38.5197,94.3092,0,'39','92','danger',NULL,'2016-11-14 01:30:06','2016-11-14 01:30:06','2016-11-14 01:30:06',4),(6140,38.5229,94.3007,0,'39','93','danger',NULL,'2016-11-14 01:30:09','2016-11-14 01:30:09','2016-11-14 01:30:09',4),(6141,38.526,94.2987,0,'39','94','danger',NULL,'2016-11-14 01:30:12','2016-11-14 01:30:12','2016-11-14 01:30:12',4),(6142,38.5226,94.3226,0,'38','98','danger',NULL,'2016-11-14 01:30:15','2016-11-14 01:30:15','2016-11-14 01:30:15',4),(6143,38.5192,94.3013,0,'38','91','danger',NULL,'2016-11-14 01:30:18','2016-11-14 01:30:18','2016-11-14 01:30:18',4),(6144,38.5159,94.2739,0,'38','90','danger',NULL,'2016-11-14 01:30:21','2016-11-14 01:30:21','2016-11-14 01:30:21',4),(6145,38.519,94.2658,0,'39','93','danger',NULL,'2016-11-14 01:30:24','2016-11-14 01:30:24','2016-11-14 01:30:24',4),(6146,38.522,94.2516,0,'39','92','danger',NULL,'2016-11-14 01:30:27','2016-11-14 01:30:27','2016-11-14 01:30:27',4),(6147,38.525,94.2688,0,'39','97','danger',NULL,'2016-11-14 01:30:30','2016-11-14 01:30:30','2016-11-14 01:30:30',4),(6148,38.528,94.3043,0,'39','100','danger',NULL,'2016-11-14 01:30:33','2016-11-14 01:30:33','2016-11-14 01:30:33',4),(6149,38.5309,94.2778,0,'39','90','danger',NULL,'2016-11-14 01:30:37','2016-11-14 01:30:37','2016-11-14 01:30:37',4),(6150,38.5337,94.3067,0,'39','99','danger',NULL,'2016-11-14 01:30:40','2016-11-14 01:30:40','2016-11-14 01:30:40',4),(6151,38.5305,94.2927,0,'38','92','danger',NULL,'2016-11-14 01:30:43','2016-11-14 01:30:43','2016-11-14 01:30:43',4),(6152,38.5333,94.3273,0,'39','100','danger',NULL,'2016-11-14 01:30:46','2016-11-14 01:30:46','2016-11-14 01:30:46',4),(6153,38.5361,94.3554,0,'39','99','danger',NULL,'2016-11-14 01:30:49','2016-11-14 01:30:49','2016-11-14 01:30:49',4),(6154,38.5389,94.3713,0,'39','97','danger',NULL,'2016-11-14 01:30:52','2016-11-14 01:30:52','2016-11-14 01:30:52',4),(6155,38.5357,94.369,0,'38','94','danger',NULL,'2016-11-14 01:30:55','2016-11-14 01:30:55','2016-11-14 01:30:55',4),(6156,38.5385,94.3432,0,'39','90','danger',NULL,'2016-11-14 01:30:58','2016-11-14 01:30:58','2016-11-14 01:30:58',4),(6157,38.5412,94.3647,0,'39','98','danger',NULL,'2016-11-14 01:31:01','2016-11-14 01:31:01','2016-11-14 01:31:01',4),(6158,38.538,94.3626,0,'38','94','danger',NULL,'2016-11-14 01:31:04','2016-11-14 01:31:04','2016-11-14 01:31:04',4),(6159,38.5407,94.3605,0,'39','94','danger',NULL,'2016-11-14 01:31:07','2016-11-14 01:31:07','2016-11-14 01:31:07',4),(6160,38.5376,94.3815,0,'38','98','danger',NULL,'2016-11-14 01:31:10','2016-11-14 01:31:10','2016-11-14 01:31:10',4),(6161,38.5402,94.408,0,'39','99','danger',NULL,'2016-11-14 01:31:13','2016-11-14 01:31:13','2016-11-14 01:31:13',4),(6162,38.5429,94.3771,0,'39','89','danger',NULL,'2016-11-14 01:31:16','2016-11-14 01:31:16','2016-11-14 01:31:16',4),(6163,38.5398,94.3693,0,'38','93','danger',NULL,'2016-11-14 01:31:19','2016-11-14 01:31:19','2016-11-14 01:31:19',4),(6164,38.5367,94.3616,0,'38','93','danger',NULL,'2016-11-14 01:31:22','2016-11-14 01:31:22','2016-11-14 01:31:22',4),(6165,38.5393,94.3427,0,'39','91','danger',NULL,'2016-11-14 01:31:25','2016-11-14 01:31:25','2016-11-14 01:31:25',4),(6166,38.5419,94.3184,0,'39','90','danger',NULL,'2016-11-14 01:31:29','2016-11-14 01:31:29','2016-11-14 01:31:29',4),(6167,38.5389,94.3056,0,'38','92','danger',NULL,'2016-11-14 01:31:32','2016-11-14 01:31:32','2016-11-14 01:31:32',4),(6168,38.5414,94.3039,0,'39','94','danger',NULL,'2016-11-14 01:31:35','2016-11-14 01:31:35','2016-11-14 01:31:35',4),(6169,38.544,94.3132,0,'39','96','danger',NULL,'2016-11-14 01:31:38','2016-11-14 01:31:38','2016-11-14 01:31:38',4),(6170,38.5464,94.3224,0,'39','96','danger',NULL,'2016-11-14 01:31:41','2016-11-14 01:31:41','2016-11-14 01:31:41',4),(6171,38.5435,94.3533,0,'38','100','danger',NULL,'2016-11-14 01:31:44','2016-11-14 01:31:44','2016-11-14 01:31:44',4),(6172,38.5405,94.373,0,'38','98','danger',NULL,'2016-11-14 01:31:47','2016-11-14 01:31:47','2016-11-14 01:31:47',4),(6173,38.5376,94.371,0,'38','94','danger',NULL,'2016-11-14 01:31:50','2016-11-14 01:31:50','2016-11-14 01:31:50',4),(6174,38.5401,94.3636,0,'39','93','danger',NULL,'2016-11-14 01:31:53','2016-11-14 01:31:53','2016-11-14 01:31:53',4),(6175,38.5372,94.3883,0,'38','99','danger',NULL,'2016-11-14 01:31:56','2016-11-14 01:31:56','2016-11-14 01:31:56',4),(6176,38.5344,94.4074,0,'38','98','danger',NULL,'2016-11-14 01:31:59','2016-11-14 01:31:59','2016-11-14 01:31:59',4),(6177,38.5368,94.4211,0,'39','97','danger',NULL,'2016-11-14 01:32:02','2016-11-14 01:32:02','2016-11-14 01:32:02',4),(6178,38.5393,94.3979,0,'39','90','danger',NULL,'2016-11-14 01:32:05','2016-11-14 01:32:05','2016-11-14 01:32:05',4),(6179,38.5365,94.3698,0,'38','89','danger',NULL,'2016-11-14 01:32:08','2016-11-14 01:32:08','2016-11-14 01:32:08',4),(6180,38.5389,94.3886,0,'39','98','danger',NULL,'2016-11-14 01:32:11','2016-11-14 01:32:11','2016-11-14 01:32:11',4),(6181,38.5412,94.3918,0,'39','95','danger',NULL,'2016-11-14 01:32:14','2016-11-14 01:32:14','2016-11-14 01:32:14',4),(6182,38.5385,94.3641,0,'38','89','danger',NULL,'2016-11-14 01:32:17','2016-11-14 01:32:17','2016-11-14 01:32:17',4),(6183,38.5408,94.3775,0,'39','97','danger',NULL,'2016-11-14 01:32:20','2016-11-14 01:32:20','2016-11-14 01:32:20',4),(6184,38.5381,94.401,0,'38','99','danger',NULL,'2016-11-14 01:32:24','2016-11-14 01:32:24','2016-11-14 01:32:24',4),(6185,38.5354,94.399,0,'38','94','danger',NULL,'2016-11-14 01:32:27','2016-11-14 01:32:27','2016-11-14 01:32:27',4),(6186,38.5377,94.397,0,'39','94','danger',NULL,'2016-11-14 01:32:30','2016-11-14 01:32:30','2016-11-14 01:32:30',4),(6187,38.54,94.38,0,'39','91','danger',NULL,'2016-11-14 01:32:33','2016-11-14 01:32:33','2016-11-14 01:32:33',4),(6188,38.5423,94.3582,0,'39','90','danger',NULL,'2016-11-14 01:32:36','2016-11-14 01:32:36','2016-11-14 01:32:36',4),(6189,38.5446,94.3762,0,'39','98','danger',NULL,'2016-11-14 01:32:39','2016-11-14 01:32:39','2016-11-14 01:32:39',4),(6190,38.5419,94.3941,0,'38','98','danger',NULL,'2016-11-14 01:32:42','2016-11-14 01:32:42','2016-11-14 01:32:42',4),(6191,38.5441,94.402,0,'39','96','danger',NULL,'2016-11-14 01:32:45','2016-11-14 01:32:45','2016-11-14 01:32:45',4),(6192,38.5463,94.3902,0,'39','92','danger',NULL,'2016-11-14 01:32:48','2016-11-14 01:32:48','2016-11-14 01:32:48',4),(6193,38.5485,94.3932,0,'39','95','danger',NULL,'2016-11-14 01:32:51','2016-11-14 01:32:51','2016-11-14 01:32:51',4),(6194,38.5459,94.4155,0,'38','99','danger',NULL,'2016-11-14 01:32:54','2016-11-14 01:32:54','2016-11-14 01:32:54',4),(6195,38.5433,94.3894,0,'38','89','danger',NULL,'2016-11-14 01:32:57','2016-11-14 01:32:57','2016-11-14 01:32:57',4),(6196,38.5407,94.4163,0,'38','100','danger',NULL,'2016-11-14 01:33:00','2016-11-14 01:33:00','2016-11-14 01:33:00',4),(6197,38.5381,94.4048,0,'38','92','danger',NULL,'2016-11-14 01:33:03','2016-11-14 01:33:03','2016-11-14 01:33:03',4),(6198,38.5403,94.3934,0,'39','92','danger',NULL,'2016-11-14 01:33:06','2016-11-14 01:33:06','2016-11-14 01:33:06',4),(6199,38.5425,94.3821,0,'39','92','danger',NULL,'2016-11-14 01:33:09','2016-11-14 01:33:09','2016-11-14 01:33:09',4),(6200,38.5446,94.3662,0,'39','91','danger',NULL,'2016-11-14 01:33:12','2016-11-14 01:33:12','2016-11-14 01:33:12',4),(6201,38.5467,94.3692,0,'39','95','danger',NULL,'2016-11-14 01:33:15','2016-11-14 01:33:15','2016-11-14 01:33:15',4),(6202,38.5442,94.3442,0,'38','89','danger',NULL,'2016-11-14 01:33:19','2016-11-14 01:33:19','2016-11-14 01:33:19',4),(6203,38.5417,94.3565,0,'38','97','danger',NULL,'2016-11-14 01:33:22','2016-11-14 01:33:22','2016-11-14 01:33:22',4),(6204,38.5392,94.3641,0,'38','96','danger',NULL,'2016-11-14 01:33:25','2016-11-14 01:33:25','2016-11-14 01:33:25',4),(6205,38.5367,94.3624,0,'38','94','danger',NULL,'2016-11-14 01:33:28','2016-11-14 01:33:28','2016-11-14 01:33:28',4),(6206,38.5342,94.3653,0,'38','95','danger',NULL,'2016-11-14 01:33:31','2016-11-14 01:33:31','2016-11-14 01:33:31',4),(6207,38.5318,94.3682,0,'38','95','danger',NULL,'2016-11-14 01:33:34','2016-11-14 01:33:34','2016-11-14 01:33:34',4),(6208,38.5339,94.3891,0,'39','99','danger',NULL,'2016-11-14 01:33:37','2016-11-14 01:33:37','2016-11-14 01:33:37',4),(6209,38.5315,94.3784,0,'38','92','danger',NULL,'2016-11-14 01:33:40','2016-11-14 01:33:40','2016-11-14 01:33:40',4),(6210,38.5336,94.3991,0,'39','99','danger',NULL,'2016-11-14 01:33:43','2016-11-14 01:33:43','2016-11-14 01:33:43',4),(6211,38.5357,94.3839,0,'39','91','danger',NULL,'2016-11-14 01:33:46','2016-11-14 01:33:46','2016-11-14 01:33:46',4),(6212,38.5378,94.3689,0,'39','91','danger',NULL,'2016-11-14 01:33:49','2016-11-14 01:33:49','2016-11-14 01:33:49',4),(6213,38.5354,94.3805,0,'38','97','danger',NULL,'2016-11-14 01:33:52','2016-11-14 01:33:52','2016-11-14 01:33:52',4),(6214,38.533,94.3921,0,'38','97','danger',NULL,'2016-11-14 01:33:55','2016-11-14 01:33:55','2016-11-14 01:33:55',4),(6215,38.5307,94.4167,0,'38','100','danger',NULL,'2016-11-14 01:33:58','2016-11-14 01:33:58','2016-11-14 01:33:58',4),(6216,38.5284,94.4105,0,'38','93','danger',NULL,'2016-11-14 01:34:01','2016-11-14 01:34:01','2016-11-14 01:34:01',4),(6217,38.5304,94.413,0,'39','95','danger',NULL,'2016-11-14 01:34:04','2016-11-14 01:34:04','2016-11-14 01:34:04',4),(6218,38.5325,94.4286,0,'39','98','danger',NULL,'2016-11-14 01:34:07','2016-11-14 01:34:07','2016-11-14 01:34:07',4),(6219,38.5302,94.4052,0,'38','89','danger',NULL,'2016-11-14 01:34:11','2016-11-14 01:34:11','2016-11-14 01:34:11',4),(6220,38.5279,94.4292,0,'38','100','danger',NULL,'2016-11-14 01:34:14','2016-11-14 01:34:14','2016-11-14 01:34:14',4),(6221,38.5256,94.4188,0,'38','92','danger',NULL,'2016-11-14 01:34:17','2016-11-14 01:34:17','2016-11-14 01:34:17',4),(6222,38.5234,94.4128,0,'38','93','danger',NULL,'2016-11-14 01:34:20','2016-11-14 01:34:20','2016-11-14 01:34:20',4),(6223,38.5254,94.4068,0,'39','93','danger',NULL,'2016-11-14 01:34:23','2016-11-14 01:34:23','2016-11-14 01:34:23',4),(6224,38.5274,94.4304,0,'39','100','danger',NULL,'2016-11-14 01:34:26','2016-11-14 01:34:26','2016-11-14 01:34:26',4),(6225,38.5252,94.4244,0,'38','93','danger',NULL,'2016-11-14 01:34:29','2016-11-14 01:34:29','2016-11-14 01:34:29',4),(6226,38.523,94.4142,0,'38','92','danger',NULL,'2016-11-14 01:34:32','2016-11-14 01:34:32','2016-11-14 01:34:32',4),(6227,38.525,94.425,0,'39','97','danger',NULL,'2016-11-14 01:34:35','2016-11-14 01:34:35','2016-11-14 01:34:35',4),(6228,38.527,94.4481,0,'39','100','danger',NULL,'2016-11-14 01:34:38','2016-11-14 01:34:38','2016-11-14 01:34:38',4),(6229,38.5248,94.4504,0,'38','95','danger',NULL,'2016-11-14 01:34:41','2016-11-14 01:34:41','2016-11-14 01:34:41',4),(6230,38.5226,94.4321,0,'38','90','danger',NULL,'2016-11-14 01:34:44','2016-11-14 01:34:44','2016-11-14 01:34:44',4),(6231,38.5246,94.4262,0,'39','93','danger',NULL,'2016-11-14 01:34:47','2016-11-14 01:34:47','2016-11-14 01:34:47',4),(6232,38.5224,94.449,0,'38','100','danger',NULL,'2016-11-14 01:34:50','2016-11-14 01:34:50','2016-11-14 01:34:50',4),(6233,38.5244,94.4309,0,'39','90','danger',NULL,'2016-11-14 01:34:53','2016-11-14 01:34:53','2016-11-14 01:34:53',4),(6234,38.5223,94.4494,0,'38','99','danger',NULL,'2016-11-14 01:34:56','2016-11-14 01:34:56','2016-11-14 01:34:56',4),(6235,38.5202,94.4436,0,'38','93','danger',NULL,'2016-11-14 01:34:59','2016-11-14 01:34:59','2016-11-14 01:34:59',4),(6236,38.5221,94.4578,0,'39','98','danger',NULL,'2016-11-14 01:35:02','2016-11-14 01:35:02','2016-11-14 01:35:02',4),(6237,38.52,94.464,0,'38','96','danger',NULL,'2016-11-14 01:35:06','2016-11-14 01:35:06','2016-11-14 01:35:06',4);
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
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (4,'Firu II',2006,0,'macho','2016-11-10 20:56:29','2016-11-10 20:56:29',155871865,2,1,1);
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
  `fecha_actualizacion` datetime NOT NULL,
  `fecha_creacion` datetime NOT NULL,
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
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
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

-- Dump completed on 2016-11-13 22:35:07
