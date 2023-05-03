# Project Report
### Project Title: US Pollution Atlas
### Team079 TruePikachu
##

Our team selects US Pollution Data from Kaggle (https://www.kaggle.com/datasets/sogun3/uspollution). This dataset contains detailed, everyday data of four major pollutants (Nitrogen Dioxide, Sulphur Dioxide, Carbon Monoxide and Ozone) of US Pollution from 2000 to 2016 documented by US EPA. Using this large dataset as a fundamental database, we have implemented a "US Pollution Atlas" that provides easy-to-use frontend toggles, CRUD operations, advanced queries of specific data, and visualizations of pollutant states.

#### 1. List out changes in the directions of your project if the final project is different from your original proposal.  

For the most part the direction of our project stayed constant. The only part of our vision that changed was that we ended up narrowing the scope of the final project. In our proposal, we decided to create a statistical aspect of the project on top of the pollution atlas itself. The idea was to perform predictions and statistical computations on the data and visualize it in another part of the application. Ultimately, this idea was deemed to be too great a departure from the core focus of the application.

#### 2. Discuss what you think your application achieved or failed to achieve regarding its usefulness.  

Our application achieved most of our goals as far as “usefulness” is concerned. Our main objective was to provide an intuitive way for academic, but not necessarily technical users, to navigate a complex dataset. The final product definitely achieves this goal, but the list of features available in the final product is not quite as extensive as we originally ambitioned. The main divergence from the original plan is that the user can interact with our database mainly through inputting values into search bars. These features are easy enough to use, but to be truly as useful as the original vision, we would have more graphical interactions; this would make the application even more useful to the intended audience.

#### 3. Discuss if you changed the schema or source of the data for your application.  

While we never changed the source of our data, we did end up only using a fraction of the dataset in our final application. There were simply too many pollutants (1746344) to be able to include them all in the database without running up the cost of GCP. We also made a minor adjustment to our schema as we were implementing the project. We realized that in order to maintain cohesion between our pollutant tables, we needed to alter the table to make our pollutant_id keys “Auto Increment”.

#### 4. Discuss what you change to your ER diagram and/or your table implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design?  

We mostly followed our ER diagram and table implementations, and there were two primary differences between the original design and the final design.

 - First, we added more non-key columns to the userLogin table, specifically the “Username” column and the “Password” column. We used the userLogin table to store all user information, including users' first/last names, email addresses, and roles, but we were missing the fundamental information for login, which was the Username and Password. Hence, after adding these two columns, we were able to send requests to the backend to perform Username/Password checks to allow users to log into our web application. This addition made our project more efficient and practical.

 - Second, we decided not to implement the userData table. Originally, we planned to use the userData table to store the connections between userLogin and the pollutant tables (i.e., which user uploaded which pollutant data). However, we removed this connection because we realized that to achieve this level of accuracy, we would need a table that basically duplicates all userIDs and PollutantIDs, and the result is not worthwhile compared to the cost of duplicate storage. If we were to use this relation further, then perhaps implementing the userData table would be the better design choice, but for now, removing the table is the better option for us.

#### 5. Discuss what functionalities you added or removed. Why?  

We removed the checkbox functionality from the frontend. Originally, we planned to use checkboxes that would allow users to select their preferred pollutants and pollutant characteristics (e.g., SO2, MAX AQI). However, we realized that this functionality would require a substantial amount of code on both the frontend and backend SQL query, so we decided not to implement it and instead went with a simpler, cleaner version using textboxes. We also removed the prediction functionality due to the lack of data from different locations. The data we have now are focused more on some states than others, so any predictions we made would be skewed.

We added an average AQI threshold functionality, which obtains the states that have an average AQI better than the given threshold and the best counties within those states. We created four stored procedures, one for each of the different pollutants. This functionality was not in the original design, but we decided that it would be a great idea for users to discover the best unpolluted locations.

#### 6. Explain how you think your advanced database programs complement your application.  

As mentioned in part5, we added an average AQI threshold functionality which is an advanced database function that uses stored procedures and triggers. For each pollutant we have its own stored procedure, and whenever the user calls on a specific pollutant with a specific AQI threshold, we generate a table with the corresponding states with higher average AQI than the threshold with the best county in the state. This advanced database program adds depth to our project, as we are not simply doing basic CRUD operations but actually using the data and the relationships between them to obtain meaningful results for the users.

This is also why we created a map visualization. Since we are creating a US Pollution Atlas, we want the users to be able to visualize the pollutant data across the US map, with detailed labels such as a specific pollutant for each state. The map visualization functionality obtains the average pollutant value from each state from the backend sql query and uses that data to generate hex colors for each state. The more red the state is, the more polluted that state is. This feature allows the user to visually see the pollutant states and can warn users about polluted states.

#### 7. Each team member should describe one technical challenge that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project.  

 - __Michael Ortiz (backend)__  
Getting certain SQL queries to execute on the database through Node.js endpoints ended up presenting more difficulties than originally expected. Being able to connect to the database and execute transactions on the database through node.js in particular came with unique quirks. We used node-sql to connect to our database, and we had the expectation that we would just write our SQL queries as strings and use this library to execute them on the database. For the most part this was the case, but more advanced SQL queries (i.e transactions) required making use of different functions within the library, and learning about JavaScript promises.

 - __Zihan Ming (backend)__  
One of the challenges in the SQL query is the store procedure. We plan to use one procedure to rank the states and give the best county in each state by a certain pollutant standard and the pollutant name. However, we cannot take an input string as the table name to query. Under this situation, we plan to construct four procedures for each pollutant. Then the only input value of this procedure is the pollutant standard to define whether this state is a “good” state. Then we can connect the four store procedure to frontend to satisfied our ranking functionality.

 - __Yuxuan Chen (frontend)__  
Connecting the frontend to the backend was as difficult as the connection between backend and the GCP database. For frontend we used React axios() rather than fetch() to send HTTP requests to the backend server. The main issue was the CORS security feature that disallowed connection between frontend and backend endpoints. We we able to fix this by using axios.get() and axios.put() in the frontend, while enabling the cors middleware in the Express backend. After that, we worked on creating the correct json object format so that the frontend can successfully pass to the backend, and the backend can successfully read the json object and generate a query to pass to the database.

 - __Xiaoci Huang (frontend)__  
One technical challenge that we encountered when working with SQL queries is to optimize the performance of their queries. They are slow and inefficient as the amount of data being queried increases, especially when the database is not correctly indexed or the query is much too complex. To address the difficulty, we had a detailed analysis of the query execution plan to identify areas where the query could be optimized. We utilized techniques such as creating new indexes, refactoring the query to reduce the number of joins or subqueries, or using caching or materialized views to speed up commonly-used queries.

#### 8. Are there other things that changed comparing the final application with the original proposal?  

We have made some changes to the ranking functionality originally proposed. Instead of ranking each state, county, and city by different pollutants, we have decided to only rank each state by the pollutant standard. In addition, we display the best county in each state based on the pollutant value.

Furthermore, we have also made changes to the UI design in the final project. Initially, we had planned to use filters in the US map visualization to categorize different pollutant conditions. However, we have decided to use a search bar in the map to enable users to search for different pollutant statistics.

#### 9. Describe future work that you think, other than the interface, that the application can improve on.  

To improve our visualization for the pollutant map, we plan to incorporate additional elements beyond the current color scheme that represents different levels of pollution in each state. One possible addition is the inclusion of the average AQI (Air Quality Index) in each state. When a user clicks on any state in the map, they will be able to access all relevant statistics. Additionally, we plan to include a legend that defines the color scheme, making it easier for users to understand the visualization.

#### 10. Describe the final division of labor and how well you managed teamwork.  

In the proposal, we divide the work to frontend, backend, and the full stack. In the actual process, we mainly just focus on frontend and backend. The frontend team mainly focuses on designing the user interface, developing interactive visualizations, and creating a user-friendly experience for our users. The backend team, on the other hand, was responsible for developing the server-side infrastructure, handling the pollutant data, and creating SQL query to satisfy the different requests received from the frontend. 

Overall, our team works well. We discuss a lot, and help each other when they are needed. We also made sure to give each team member autonomy and the freedom to work on their assigned tasks, while still ensuring that everyone had a clear understanding of the project goals and timeline.
