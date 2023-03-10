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

Below are 2 advanced queries we implemented for future stage usage.  

- _**the maximum AQIs of the four pollutants of every county ever**_
  - There are 27 rows representing 27 places (counties), all showing the highest AQI of the four pollutants that that place has ever had. (After we insert more data, we should have more places, thus more rows.)
  - We choose to create index on CO(CO AQI), CO(FIPSCODE), and CO(YMD) respectively to try to achieve speed in time. 
    - CO(CO AQI) since we are finding the max of CO AQI, and can represent SO2, NO2, O3 AQI speed up
    - CO(FIPSCODE) since we are focusing on locations
    - CO(YMD) since we natural joined dates
   - After comparing with the original EXPLAIN ANALYZE, we do not see significant difference in time speedup. Some, after indexing, were even slower. We believe that these three indexing choices do not speed up the natural join of the tables. After the natural join, indexing of CO(CO AQI), CO(FIPSCODE), or CO(YMD) do not matter any more. The indexing shown in EXPLAIN ANALYZE belong the the PRIMARY indexing, which already existed since they are the primary keys of the corresponding tables.  

```
SELECT FIPSCODE, MAX(`CO AQI`), MAX(`O3 AQI`), MAX(`SO2 AQI`), MAX(`NO2 AQI`)
FROM CO NATURAL JOIN O3 NATURAL JOIN SO2 NATURAL JOIN NO2 NATURAL JOIN dates
GROUP BY FIPSCODE;
```
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query1.png" alt="query1" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query1_1.png" alt="query1_1" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query1_2.png" alt="query1_2" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query1_3.png" alt="query1_3" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query1_4.png" alt="query1_4" width="85%" />

- _**the counties that have an average NO2 pollution value greater than the total average NO2 pollution value**_
  - There are 13 rows representing 13 places (counties) and their average NO2 Pollution value. (After we insert more data, we should have more places, thus more rows.)
  - We choose to create index on NO2(NO2 MEAN), location(CountyName), and location(FIPSCODE, CountyName) respectively to try to achieve speed in time. 
    - NO2(NO2 MEAN) since we are finding the average of the column called `NO2 MEAN`
    - location(CountyName) since we are focusing on locations
    - location(FIPSCODE, CountyName) since we are focusing on locations, and location(CountyName) did not work, so we tried indexing on tuples
   - After comparing with the original EXPLAIN ANALYZE, indexing on NO2(NO2 MEAN) sped things up, though not too much. We believe that this is because instead of instead of doing table scan on NO2, after adding the index, we were able to index scan on NO2 using idx2, which sped things up a bit. We believe that with more data inserted, there will be more significant speed up.
   - After comparing with the original EXPLAIN ANALYZE, we do not see significant difference in time speedup regarding indexing on location(CountyName) or location(FIPSCODE, CountyName). We believe that these two indexing choices do not speed up the natural join of the tables, and after the natural join, indexing of location(CountyName) or location(FIPSCODE, CountyName) do not matter any more. 

```
SELECT CountyName, AVG(`NO2 MEAN`) as AverageNO2
FROM location NATURAL JOIN NO2 
GROUP BY CountyName
HAVING AVG(`NO2 MEAN`) > (SELECT AVG(`NO2 MEAN`) FROM NO2);
```
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query2.png" alt="query2" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query2_1.png" alt="query2_1" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query2_2.png" alt="query2_2" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query2_3.png" alt="query2_3" width="85%" />
<img src="https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/DatabaseDesignImg/query2_4.png" alt="query2_4" width="85%" />

