# ER Diagram and Relational Schema
### Team079 TruePikachu
##
### ER Diagram
![ER_Diagram](ER_Diagram.png)

This is our ER diagram for our project. We have 4 entities that store our primary pollutant data information. They are **SO2**, **NO2**, **CO**, and **O3** tables, all containing _PollutantID, AQI, MEAN, MAXVAL, MAXHOUR, FIPSCODE, YMD_.  

We have a **Location** entity table which stores the location where the pollutant data was recorded. We use _FIPSCODE_ as the primary key since it is easy to obtain one, and it is unique. The relationship between **Location** and the 4 pollutant data entities should be 1 to many, and must exist 1, since we can have different pollutant data from the same location, and we are only storing the location where pollutant data was recorded.  

We have a **Date** entity table which stores the date when the pollutant data was recorded. We use _YMD_ as the primary key since it is unique, and easy to understand. An example of _YMD_ would be "20010721". The relationship between **Date** and the 4 pollutant data entities should be 1 to many, and must exist 1, since we can have different pollutant data recorded on the same day, and we are only storing the date when pollutant data was recorded.  

We use a **UserLogin** entity table to keep track of all users of our application. A "user" will be able to log into the system and check results, update, delete data, etc. The data they update (or request for) will go through the **UserData** entity table. This table acts as a general information center. It stores the _PollutantID_ which will serve as the link to the pollutant data. The relationship between **UserLogin** and **UserData** should be 1 to many, and must exist 1, since all users should be able to see the original pollutant data, and users should be able to upload more than one of their own data.  

Finally, the relationship between **UserData** and the 4 pollutant data entities should be 1 to 1, and must exist. Each pollutant data has its unique _PollutantID_.  

### Relational Schema

```
CREATE TABLE UserLogin(
    UserID INT PRIMARY KEY
    FirstName VARCHAR(255)
    LastName VARCHAR(255)
    EmailAddress VARCHAR(255)
    UserRole VARCHAR(255)
);

CREATE TABLE Location(
    FIPSCODE INT PRIMARY KEY
    StateName VARCHAR(255)
    CountyName VARCHAR(255)
    StateCode INT
    CountyCode INT
);

CREATE TABLE Date(
    YMD INT PRIMARY KEY
    YearDate INT
    MonthDate INT
    DayDate INT
);

CREATE TABLE SO2(
    PollutantID INT PRIMARY KEY
    S02AQI REAL
    S02MEAN REAL
    SO2MAXVAL REAL
    SO2MAXHOUR REAL
    FOREIGN KEY(FIPSCODE) REFERENCES Location(FIPSCODE) ON DELETE SET NULL ON CASCADE
    FOREIGN KEY(YMD) REFERENCES Date(YMD) ON DELETE SET NULL ON CASCADE
);

CREATE TABLE O3(
    PollutantID INT PRIMARY KEY
    O3AQI REAL
    O3MEAN REAL
    O3MAXVAL REAL
    O3MAXHOUR REAL
    FOREIGN KEY(FIPSCODE) REFERENCES Location(FIPSCODE) ON DELETE SET NULL ON CASCADE
    FOREIGN KEY(YMD) REFERENCES Date(YMD) ON DELETE SET NULL ON CASCADE
);

CREATE TABLE CO(
    PollutantID INT PRIMARY KEY
    COAQI REAL
    COMEAN REAL
    COMAXVAL REAL
    COMAXHOUR REAL
    FOREIGN KEY(FIPSCODE) REFERENCES Location(FIPSCODE) ON DELETE SET NULL ON CASCADE
    FOREIGN KEY(YMD) REFERENCES Date(YMD) ON DELETE SET NULL ON CASCADE
);

CREATE TABLE NO2(
    PollutantID INT PRIMARY KEY
    NO2AQI REAL
    NO2MEAN REAL
    NO2MAXVAL REAL
    NO2MAXHOUR REAL
    FOREIGN KEY(FIPSCODE) REFERENCES Location(FIPSCODE) ON DELETE SET NULL ON CASCADE
    FOREIGN KEY(YMD) REFERENCES Date(YMD) ON DELETE SET NULL ON CASCADE
);

CREATE TABLE UserData(
    PollutantID INT PRIMARY KEY
    UserID PRIMARY KEY 
    FOREIGN KEY(UserID) REFERENCES UserLogin(UserID) ON DELETE SET NULL ON CASCADE
    FOREIGN KEY(PollutantID) REFERENCES CO(PollutantID) ON DELETE SET NULL ON CASCADE
);
```
