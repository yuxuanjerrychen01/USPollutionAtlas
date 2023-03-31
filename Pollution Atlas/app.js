// Imports
const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
// get the client
const mysql = require('mysql2');

// create the connection to database
// const connection =  mysql.createConnection({
//     host: '34.122.96.91',
//     user: 'root',
//     password: 'cs411truepikachu'
//    // database: 'test'
// });
//
// connection.query(
//     "USE USPollutionAtlas1",
//     function(err, results, fields) {
//         // console.log(err);
//         // console.log(results); // results contains rows returned by server
//         // console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

// connection.query(
//     "SELECT *  FROM location",
//     function(err, results, fields) {
//         console.log(err);
//         console.log(results); // results contains rows returned by server
//        // console.log(fields); // fields contains extra meta data about results, if available
//     }
// );


// // Listen on Port 5000
// app.listen(port, () => console.info(`App listening on port ${port}`))

//add the router
app.use('/', router);


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/Frontend/index.html'));
});

/**
 * Returns DB tuples for 1 to all pollutants at the county or state level
 * Expected format for req.query:
 * {
 *     "NO2": 1,
 *     "CountyName" : "Champaign",
 *     "FIPS" : "43134"
 *     ....
 * }
 */
app.get('/search', (req, res) => {
    let params = req.query;
    if(Object.keys(params).length <= 0) {
        res.sendStatus(400);
        return;
    }
     // build the FROM clause
    let fromString = "FROM ";
    const pollutants = Object.entries(params).filter(([key, value]) =>
        key === 'NO2' || key === 'O3' || key === 'SO2' || key === 'CO');

    if(pollutants.length <= 0) {
        fromString += "NO2 NATURAL JOIN CO NATURAL JOIN SO2 NATURAL JOIN O3 ";
    }
    else if(pollutants.length === 1) {
        fromString += `${pollutants[0][0]} `;
    }
    else {
        pollutants.forEach((e, i) => {
            if(i === pollutants.length - 1)
                fromString += `${e[0]} `;
            else
                fromString += `${e[0]} NATURAL JOIN `;
        });
    }
    fromString += "NATURAL JOIN Location ";

    // Build the WHERE clause
    let whereString = "WHERE ";
    const locations = Object.entries(params).filter(([key, value]) =>
        key === 'CountyName' || key === 'CityName' || key === 'FIPSCODE');

    if(locations.length <= 0)
        whereString = "";
    else if(locations.length === 1) {
        whereString += `${locations[0][0]} = ${locations[0][1]}`;
    }
    else {
        locations.forEach((e,i) => {
            if(i === locations.length - 1)
                whereString += `${e[0]} = ${e[1]} `
            else
                whereString += `${e[0]} = ${e[1]} AND `
        });
    }

    let query = `SELECT * ${fromString}${whereString}`
    console.log(query)
    res.send(query)
})
app.listen(process.env.port || 3000, console.info(`App listening `));