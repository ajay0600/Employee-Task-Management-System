-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: employeetaskdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20260703140503_InitialCreate','9.0.11'),('20260705131204_AddEmployeeTable','9.0.11'),('20260705144951_AddTaskTable','9.0.11');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Department` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Designation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Ajay','ajay@test.com','IT','Full Stack Developer'),(2,'Rahul Sharma','rahul@test.com','HR','HR'),(3,'Neha Singh','neha@test.com','Finance','Accountant'),(4,'Amit Kumar','amit@test.com','IT','Developer'),(5,'Priya','priya@test.com','IT','Developer'),(6,'Rohit','rohit@test.com','IT','Frontend Developer');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Priority` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `StartDate` datetime(6) NOT NULL,
  `DueDate` datetime(6) NOT NULL,
  `EmployeeId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Tasks_EmployeeId` (`EmployeeId`),
  CONSTRAINT `FK_Tasks_Employees_EmployeeId` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Build Login Module','Develop JWT authentication and login page','High','Completed','2026-07-06 00:00:00.000000','2026-07-07 00:00:00.000000',1),(2,'Dashboard UI','Create responsive dashboard using Bootstrap','Medium','Pending','2026-07-06 00:00:00.000000','2026-07-07 00:00:00.000000',1),(3,'Bug Fixes','Resolve frontend validation issues','Low','Pending','2026-07-06 00:00:00.000000','2026-07-08 00:00:00.000000',1),(4,'Schedule Interviews','Schedule interviews for Java developers','High','Pending','2026-07-06 00:00:00.000000','2026-07-08 00:00:00.000000',2),(5,'Employee Onboarding','Prepare onboarding documents','Medium','Pending','2026-07-06 00:00:00.000000','2026-07-08 00:00:00.000000',2);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Role` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@test.com','AQAAAAIAAYagAAAAELb8QAYiVD/VApP8SaoKZUxqq4SYESSDrgTBR4Vu1u6dm8vQLKC5AJEQLVq+ZmeRrA==','Admin'),(2,'Super Admin','superadmin@test.com','AQAAAAIAAYagAAAAEM+CGj37KifvjKVt56eWCcUMTEC057Oyd6D8lZNmzfjhnJS07bRs8YZU+F4MeyJJ7A==','Admin'),(3,'Ajay Pal','ajay@test.com','AQAAAAIAAYagAAAAEOJ1Zg5pRjfOkBi1OAC+C4cBRQzGEcglAiPZG4mz/mHIaa8um3i1MJoYTIO/7fIBNg==','Employee'),(4,'Rahul Sharma','rahul@test.com','AQAAAAIAAYagAAAAEIeNbtBjy2z8ZknmjVaH5c+6RKKIXDS4MoM0amDUEG/OhG7WSrVleTddgk/kKHMDLA==','Employee'),(5,'Neha Singh','neha@test.com','AQAAAAIAAYagAAAAEJp+YcY202RulG5Qt7iYcYhTS7wz5C/MTvFTksINnT+1JNu6rdHpOejIEHIfCkz+iQ==','Employee'),(6,'Amit Kumar','amit@test.com','AQAAAAIAAYagAAAAEAJ00lnXW08cBj9/BHme68TLuO74QZqpsDuqrXJ+2t57a03/lqPpNxk1Jpi9+6yljg==','Employee'),(7,'Priya Verma','priya@test.com','AQAAAAIAAYagAAAAEDT6bdWgJz4taUAt4P8Sl2uAABjCFhY2ZjklOsvkpFpa0y6AlmVaql6YyF5JSKbnwQ==','Employee'),(8,'Rohit','rohit@test.com','AQAAAAIAAYagAAAAEDqKXO+Qw+Nli8PXOtIIJ6NogfYb/CfsoPo3xXpxK3m0THNxi3EFd4GT6GSjoc86pg==','Employee');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-07 13:37:53
