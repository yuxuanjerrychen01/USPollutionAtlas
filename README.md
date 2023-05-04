# Project Title: US Pollution Atlas
### Team079 TruePikachu
##
### Summary

Our team selects US Pollution Data from Kaggle (https://www.kaggle.com/datasets/sogun3/uspollution). This dataset contains detailed, everyday data of four major pollutants (Nitrogen Dioxide, Sulphur Dioxide, Carbon Monoxide and Ozone) of US Pollution from 2000 to 2016 documented by US EPA. Using this large dataset as a fundamental database, we have implemented a "US Pollution Atlas" that provides easy-to-use frontend toggles, CRUD operations, advanced queries of specific data, and visualizations of pollutant states.

### Functionality 
 - __1: Pollution Dataset CRUD Operations__  
We have built a dataset (or numerous related sub-datasets) that holds all necessary data information. Users will be able to read specific data from the web page UI, such as State, Mean value of CO units, AQI of SO2 on 2000.01.01, and so on. We have built a web interface where users can interact, such that users can create and insert new pollution data, update existing pollution data, and delete out-of-date data, if necessary.
 - __2: General Search Bar__  
We have created a search bar where users can search for their local pollution situation by Mean Value of Units, Maximum Value of Units, and AQI. Users can search by text, or search by interest preference, through selecting cities, dates, states, and so on. Users can also search for general data rows, by typing in search text. For example, a user can find all data rows of 2002.07.24 by typing in the corresponding date in the search bar.
 - __3: Pollution Threshold__  
We have an average AQI threshold functionality, which obtains the states that have an average AQI better than the given threshold and the best counties within those states. This will allow users to discover pollution-free locations as well as heavy pollution areas, and this information can be used in many ways, such as prediction trends and warnings.
 - __4: Pollution Graphical Visualization__  
We created a US map for pollution visualization. Users can visualize different combinations of pollution components (NO2, SO2, CO, and O3) in each state.

### Demo Video Link
[https://youtu.be/anXB1nVsMdA](https://youtu.be/anXB1nVsMdA)
