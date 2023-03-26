// Imports
const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection =  mysql.createConnection({
    host: '34.122.96.91',
    user: 'root',
    password: 'cs411truepikachu'
   // database: 'test'
});

connection.query(
    "USE USPollutionAtlas1",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

connection.query(
    "SELECT CountyName FROM location",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

// connection.execute(
//     'SELECT CountyName FROM Location',
//     ['Rick C-137'],
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//
//         // If you execute same statement again, it will be picked from a LRU cache
//         // which will save query preparation time and give better performance
//     }
// );


// // Listen on Port 5000
// app.listen(port, () => console.info(`App listening on port ${port}`))

//add the router
app.use('/', router);
app.listen(process.env.port || 3000, console.info(`App listening `));

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/Frontend/index.html'));
});