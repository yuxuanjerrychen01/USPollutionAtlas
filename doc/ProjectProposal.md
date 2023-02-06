# Project Proposal
### Project Title: US Pollution Atlas
### Team079 TruePikachu
##
### Summary
Our team selects US Pollution Data from Kaggle (https://www.kaggle.com/datasets/sogun3/uspollution). This dataset contains detailed, everyday data of four major pollutants (Nitrogen Dioxide, Sulphur Dioxide, Carbon Monoxide and Ozone) of US Pollution from 2000 to 2016 documented by US EPA. We believe that by using this large dataset as a fundamental database, we can implement a "US Pollution Atlas" providing easy-to-use frontend toggles, search bars for finding specific data, visualizations of pollution trends, and predictions of future pollution data.

The US Pollution Atlas will provide the user with an interactive graphical interface for navigating the large and complex US Pollution Dataset as a baseline, including functionality for users to read, obtain, update, insert, and delete specific pollution data. The user will be able to toggle many different parameters and search by location and time in order to derive insights into pollution data within the US at many levels of detail. For example, we will provide functionality for visualizing national, state, and local (specifically county) level pollution data for different types of pollutants such as NO2, SO2, CO, and O3.

### Description
The main part of our web app will be an interactive choropleth with a series of UI elements for toggling various parameters. CRUD operations will be available through said UI elements. Search bars and buttons will enable various search queries on the backend that will be reflected through our data visualization elements which center around the choropleth, but will also include statistical visualizations. Some planned features related to data selection include:
- The user will be able to search an address, and we will filter the database to only include elements from that particular area
- The user will also be able to select between viewing county, state, and national level data
- The user will be able to select between different types of pollutants

We will also have various buttons and/or separate pages that will enable users to insert, delete, and update their own pollution data into our database. These changes will, of course, be reflected in our front end visualizations. We will support uploading new data in bulk to the server, most likely using a formatted file type such as a CSV, as well as the ability to upload individual rows. For updating and deletion, we will allow the user to view the dataset and make changes through the UI.


### Usefulness
Our project mainly focuses on the visualization of the US pollution in every state. For education use, our projects can find the pollution data for the researchers who do not have strong technical skills. The researchers can use our project for their own research area. They can also update the dataset by their new output in their research. Also, our project can alarm people in the heavily polluted areas to protect their home. 

There are several similar projects on the internet. One of them is the world visualization for the air condition. The major difference and the advantages of our project is we can give the visualization more detail. The users can find different behaviors in CO2, O3, NO2, and SO2 in their location. The users of our project can also change the dataset by themselves. For example, the staff from the environment department can correct the website with more accurate data.

### Realness
As mentioned in the summary, our team selects US Pollution Data from Kaggle, which contains detailed, everyday data of NO2, SO2, CO, and O3 of US Pollution from 2000 to 2016 documented by US EPA.
 - __Dataset__  
US Pollution Data from Kaggle (https://www.kaggle.com/datasets/sogun3/uspollution). Specifically, we will use the State, County, City, Date (of data collection), Mean Value of Units, Maximum Value of Units, and the AQI of NO2, SO2, CO, and O3.
 - __Download__  
We will download *pollution_us_2000_2016.csv* version 1 (400.95 MB) and store them in a CSV document type. We may download other data if necessary. 
 - __Clean__  
When cleaning our data, the primary programming language we will use is Python, specifically its library Pandas. Since the dataset we obtained are all raw, given different numeric features, we will need to clean all dirty data, remove duplicates, fix structural errors, and handle outdated, incomplete, as well as inconsistent data (null data, NaN data). 

### Functionality 
 - __1: Pollution Dataset CRUD Operations__  
We will build a dataset (or numerous related sub-datasets) that holds all necessary data information. Users will be able to read specific data from the web page UI, such as State, Mean value of CO units, AQI of SO2 on 2000.01.01, and so on. We will build a web interface where users can interact, such that users can create and insert new pollution data, update existing pollution data, and delete out-of-date data, if necessary.
 - __2: General Search Bar__  
We will create a search bar where users can search for their local pollution situation by Mean Value of Units, Maximum Value of Units, and AQI. Users can search by text, or search by interest preference, through toggling cities, dates, states, and so on. Users can also search for general data rows, by typing in search text. For example, a user can find all data rows of 2002.07.24 by typing in the corresponding date in the search bar.
 - __3: Pollution Rankings__  
Users can find the rank for each state, county, or city by different kinds of pollution. This will allow users to discover pollution-free locations as well as heavy pollution areas, and this information can be used in many ways, such as prediction trends and warnings.
 - __4: Pollution Prediction__  
We will use models to generate pollution prediction for the future, and portray them to the users. We have a massive US Pollution data from 2000 to 2016, which would be beneficial to calculate a relatively more precise prediction of future pollution trends, which can then be used to warn the cities or states to decrease pollution output.
 - __5: Pollution Graphical Visualization__  
We will use algorithms that utilize our large dataset to generate interesting visualizations of pollution, such as heat maps, State maps, US country maps, and so on. Users can visualize different combinations of pollution components (NO2, SO2, CO, and O3) in each state, county, or city. We aim for real-time graph generation instead of preprocessed graph generation, so we can take into account the user's new data and use them for graphical visualization.

### A Low-Fidelity UI Mockup
![example1](https://github.com/cs411-alawini/sp23-cs411-team079-TruePikachu/blob/main/doc/Low-Fidelity%20UI%20Mockup.jpg)

### Work Distribution
We have decided to divide the team into Frontend, Backend, and Fullstack. Yuxuan Chen will be the Frontend, Xiaoci Huang will be the Backend, and Zihan Ming and Michael Ortiz will be Fullstack. The Fullstack developers will help the Frontend and Backend. That said, everyone on the team will help each other if needed. (The truth is that everyone will be more or less Fullstack!)
  - __Responsibility for the Frontend (Fullstack):__   
    1. Create the general search bar for the users  
    2. Make a filter for different pollutants  
    3. Create UI elements for interacting with the database such as radio buttons, sliders, etc.  
    4. Generate the visualizations of the pollution dataset based on the choices of the users  
  - __Responsibility for the Backend (Fullstack):__  
    1. Enable users to search, delete, update, and insert their data  
    2. Structure and maintain the database(s)  
    3. Setting up and hosting the server  
    4. Develop an API for handling user selected parameters  
    5. Develop a model to make the prediction of pollution for the future  
  - __Possible Languages/Tools/Libraries:__  
      JavaScript  
      MySQL (or MongoDB)  
      Node.js  
      Express.js  
      D3.js  
      Plotly  
      Python  
      React.js  
