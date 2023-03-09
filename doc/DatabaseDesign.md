# Database Design
### Team079 TruePikachu
##
### Data Definition Language (DDL) commands

For our project, we have created a _**USPollutionAtlas1**_ database with 6 tables **location**, **dates**, **SO2**, **CO**, **NO2**, and **O3**. Below are our current DDL commands.

The **SO2**, **NO2**, **CO**, and **O3** tables store our primary pollutant data information. They all contain their own _PollutantID, AQI, MEAN, MAXVAL, MAXHOUR, FIPSCODE, YMD_. The **Location** table stores the location where the pollutant data was recorded, using _FIPSCODE_ as the primary key. The **Date** table stores the date when the pollutant data was recorded, using _YMD_ as the primary key. An example of _YMD_ would be "20010721". We will implement other tables such as the **UserLogin** table in later stages.
  
The file [PollutionDatabaseSQL](https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/PollutionDatabaseSQL.sql) is the SQL file we used to upload to Google Cloud Platform (GCP), and contains the DDL commands below as well as the actual inserted data. We created the PollutionDatabaseSQL file by doing data filtering and data formating using Python Pandas. The filter and format code can be found in our [data_filter](https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/tree/main/data_filer) folder.

```
CREATE DATABASE `USPollutionAtlas1`;
USE `USPollutionAtlas1`;


/*Table structure for table `location` */
DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `FIPSCODE` varchar(50) NOT NULL,
  `StateName` varchar(50) NOT NULL,
  `CountyName` varchar(50) NOT NULL,
  `StateCode` varchar(50) NOT NULL,
  `CountyCode` varchar(50) NOT NULL,
  PRIMARY KEY (`FIPSCODE`)
)


/*Table structure for table `dates` */
DROP TABLE IF EXISTS `dates`;

CREATE TABLE `dates` (
  `YMD` varchar(50) NOT NULL,
  `Year` varchar(50) NOT NULL,
  `Month` varchar(50) NOT NULL,
  `Day` varchar(10) NOT NULL,
  PRIMARY KEY (`YMD`)
)


/*Table structure for table `SO2` */
DROP TABLE IF EXISTS `SO2`;

CREATE TABLE `SO2` (
  `PollutantID` int NOT NULL,
  `SO2 AQI` real NOT NULL,
  `SO2 MEAN` real NOT NULL,
  `SO2 MAXVAL` real NOT NULL,
  `SO2 MAXHOUR` int NOT NULL,
  `FIPSCODE` varchar(50) NOT NULL,
  `YMD` varchar(50) NOT NULL,
  PRIMARY KEY (`PollutantID`),
  KEY `FIPSCODE` (`FIPSCODE`),
  KEY `YMD` (`YMD`),
  CONSTRAINT `SO2_ibfk_1` FOREIGN KEY (`FIPSCODE`) REFERENCES `location` (`FIPSCODE`),
  CONSTRAINT `SO2_ibfk_2` FOREIGN KEY (`YMD`) REFERENCES `dates` (`YMD`)
)


/*Table structure for table `CO` */
DROP TABLE IF EXISTS `CO`;

CREATE TABLE `CO` (
  `PollutantID` int NOT NULL,
  `CO AQI` real NOT NULL,
  `CO MEAN` real NOT NULL,
  `CO MAXVAL` real NOT NULL,
  `CO MAXHOUR` int NOT NULL,
  `FIPSCODE` varchar(50) NOT NULL,
  `YMD` varchar(50) NOT NULL,
  PRIMARY KEY (`PollutantID`),
  KEY `FIPSCODE` (`FIPSCODE`),
  KEY `YMD` (`YMD`),
  CONSTRAINT `CO_ibfk_1` FOREIGN KEY (`FIPSCODE`) REFERENCES `location` (`FIPSCODE`),
  CONSTRAINT `CO_ibfk_2` FOREIGN KEY (`YMD`) REFERENCES `dates` (`YMD`)
)


/*Table structure for table `NO2` */
DROP TABLE IF EXISTS `NO2`;

CREATE TABLE `NO2` (
  `PollutantID` int NOT NULL,
  `NO2 AQI` real NOT NULL,
  `NO2 MEAN` real NOT NULL,
  `NO2 MAXVAL` real NOT NULL,
  `NO2 MAXHOUR` int NOT NULL,
  `FIPSCODE` varchar(50) NOT NULL,
  `YMD` varchar(50) NOT NULL,
  PRIMARY KEY (`PollutantID`),
  KEY `FIPSCODE` (`FIPSCODE`),
  KEY `YMD` (`YMD`),
  CONSTRAINT `NO2_ibfk_1` FOREIGN KEY (`FIPSCODE`) REFERENCES `location` (`FIPSCODE`),
  CONSTRAINT `NO2_ibfk_2` FOREIGN KEY (`YMD`) REFERENCES `dates` (`YMD`)
)


/*Table structure for table `O3` */
DROP TABLE IF EXISTS `O3`;

CREATE TABLE `O3` (
  `PollutantID` int NOT NULL,
  `O3 AQI` real NOT NULL,
  `O3 MEAN` real NOT NULL,
  `O3 MAXVAL` real NOT NULL,
  `O3 MAXHOUR` int NOT NULL,
  `FIPSCODE` varchar(50) NOT NULL,
  `YMD` varchar(50) NOT NULL,
  PRIMARY KEY (`PollutantID`),
  KEY `FIPSCODE` (`FIPSCODE`),
  KEY `YMD` (`YMD`),
  CONSTRAINT `O3_ibfk_1` FOREIGN KEY (`FIPSCODE`) REFERENCES `location` (`FIPSCODE`),
  CONSTRAINT `O3_ibfk_2` FOREIGN KEY (`YMD`) REFERENCES `dates` (`YMD`)
)
```

### Connection to GCP
  
Our GCP project is called cs411-TruePikachu. Below is a screenshot of our overview page.  

<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/main1.png" alt="main1" width="80%" />

We use MySQL Workbench 8.0 CE as a graphical user interface.  

<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/bench1.png" alt="bench1" width="80%" />

This cloud shell terminal screenshot also shows our database and its current tables.  

<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/terminal1.png" alt="terminal1" width="70%" />

### Data Insertion

For this stage, we have currently inserted 10000 rows of data into the **CO** table, 10000 rows of data into the **SO2** table, 10000 rows of data into the **NO2** table, 10000 rows of data into the **O3** table, 5996 rows of data into the **dates** table, and 139 rows of data into the **location** table. The rows of data we inserted into the tables have all been filtered and formatted correctly. We may plan to insert more data for our next stage.  

<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/terminal2.png" alt="terminal2" width="50%" />

### Advanced Queries
