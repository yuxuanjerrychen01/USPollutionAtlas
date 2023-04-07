// Imports
const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
const cors = require('cors')
require('dotenv').config()

router.use(express.json());
// get the client
const mysql = require('mysql2');

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'PUT',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
// create the connection to database
const connection =  mysql.createConnection({
    host: '34.122.96.91',
    user: 'root',
    password: 'cs411truepikachu'
   // database: 'test'
});
//
connection.query(
    "USE USPollutionAtlas1",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

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
// app.use(cors)

app.get('/',(req,res) => {
   // res.sendFile(path.join(__dirname+'/Frontend/index.html'));
    res.send('HELLO WORLD')
});

/**
 * Returns a SQL query for DB tuples for 1 to all pollutants at the county, state or FIPSCODE level
 * Expected format for req.query:
 * {
 *     <Pollutant>: 1,
 *     <Location> : <LocationName>,
 *     ....
 * }
 * Example JSON:
 * {
 *     "NO2" : 1,
 *     "FIPSCODE: [value]
 * }
 * Will return SQL Query:
 * SELECT * FROM NO2 NATURAL JOIN Location WHERE FIPSCODE = 55132
 */

/**
 * Expected format for JSON:
 * {
 *     "SELECT": {
 *         <field> : 1
 *          ...
 *     },
 *
 *     "FROM": {
 *         <tableName> : 1,
 *         ...
 *     },
 *
 *     "WHERE": {
 *         <field>: value
 *         ...
 *     }
 * }
 */
app.put('/basicSearch', (req, res) => {
   let select = req.body["SELECT"];
   let from = req.body["FROM"];
   let where = req.body["WHERE"];

   const selectArray = Object.entries(select);
   const fromArray = Object.entries(from);
   const whereArray = Object.entries(where);

   // Build select string
   let selectString = 'SELECT ';
   if (Object.keys(select).length <= 0)
       selectString = 'SELECT * ';
   selectArray.forEach((e, i)=> {
       // console.log(`${key[0]}${key[1]}`);
       if (i === selectArray.length - 1)
           selectString += `${e[0]} `;
       else
           selectString += `${e[0]}, `;
   });

   // Build from string
    let fromString = "FROM ";

    if(fromArray.length <= 0) {
        fromString += "NO2 NATURAL JOIN CO NATURAL JOIN SO2 NATURAL JOIN O3 ";
    }
    fromArray.forEach((e, i) => {
        if(i === fromArray.length - 1)
            fromString += `${e[0]} `;
        else
            fromString += `${e[0]} NATURAL JOIN `;
    });
    fromString += "NATURAL JOIN location NATURAL JOIN dates ";

    // Build where string
    let whereString = "WHERE ";
    if(whereArray.length <= 0)
        whereString = "";

    whereArray.forEach((e,i) => {
        if(i === whereArray.length - 1)
            whereString += `${e[0]} = ${e[1]} `;
        else
            whereString += `${e[0]} = ${e[1]} AND `;
    });
    const query = `${selectString}${fromString}${whereString}`;
    console.log(query);
    // run the query
    connection.query(
    query, (err, results, fields) => {
        console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        if(err)
            res.sendStatus(400);
        else
            res.send(results);
    });
});

/**
 * Updates tables in the DB
 * Expected format for req.body:
 * {
 *  "QUERY":
 *  [
 *      {"UPDATE": <Table>, "SET" : {<ColumnName> : <NewValue>, ...}, "WHERE" : {<ColumnName> : <Condition>, ...}},
 *      {"UPDATE": <Table>, "SET" : {<ColumnName> : <NewValue>, ...}, "WHERE" : {<ColumnName> : <Condition>, ...}},
 *      ...
 *  ]
 * }
 * Example Query:
 * {
 *     "QUERY":  [
 *         {"UPDATE": "NO2", "SET": {"COL1":"VAL1", "COL2":"VAL2"}, "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}},
 *         {"UPDATE": "O3", "SET": {"COL1":"VAL1", "COL2":"VAL2"}, "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}}
 *     ]
 * }
 * Returns:
 * BEGIN TRANSACTION;
 * UPDATE NO2
 * SET COL1 = VAL1, COL2 = VAL2
 * WHERE COL11 = VAL12 AND COL22 = VAL22;
 * UPDATE O3
 * SET COL1 = VAL1, COL2 = VAL2
 * WHERE COL11 = VAL12 AND COL22 = VAL22;
 * COMMIT;
 */
app.put('/update', (req,res) => {
    const query = req.body["QUERY"];
    let dbQuery = `BEGIN TRANSACTION;\n`
    query.forEach((q) => {
        let update = `UPDATE ${q["UPDATE"]}`;
        let set = Object.entries(q["SET"]).map(k => {return `${k[0]} = ${k[1]}`});
        let where = Object.entries(q["WHERE"]).map(k => { return `${k[0]} = ${k[1]}`})
        dbQuery += `${update}\nSET ${set.join(', ')}\nWHERE ${where.join(' AND ')};\n`
    });
    dbQuery += `COMMIT;`;
    console.log(dbQuery);
    res.send(dbQuery)
});
app.put('/delete', (req, res) => {

});
app.put('/insert', (req, res) => {

});
app.listen(process.env.PORT || 3002, console.info(`App listening on port ${process.env.PORT}`));