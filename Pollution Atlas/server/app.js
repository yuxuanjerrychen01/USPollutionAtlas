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
// const connection =  mysql.createConnection({
//     host: '34.122.96.91',
//     user: 'root',
//     password: 'cs411truepikachu'
//    // database: 'test'
// });
// //
// connection.query(
//     "USE USPollutionAtlas1",
//     function(err, results, fields) {
//         console.log(err);
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

//add the router
app.use('/', router);
app.get('/',(req,res) => {
   // res.sendFile(path.join(__dirname+'/Frontend/index.html'));
    res.send('HELLO WORLD')
});
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
 * Expected format for JSON:
 * {
 *  "QUERY":
 *  [
 *      {"UPDATE": <Table>, "SET" : {<ColumnName> : <NewValue>, ...}, "WHERE" : {<ColumnName> : <Condition>, ...}},
 *      {"UPDATE": <Table>, "SET" : {<ColumnName> : <NewValue>, ...}, "WHERE" : {<ColumnName> : <Condition>, ...}},
 *      ...
 *  ]
 * }
 * Example JSON:
 * {
 *     "QUERY":  [
 *         {"UPDATE": "NO2", "SET": {"COL1":"VAL1", "COL2":"VAL2"}, "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}},
 *         {"UPDATE": "O3", "SET": {"COL1":"VAL1", "COL2":"VAL2"}, "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}}
 *     ]
 * }
 * Runs this query:
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
    let dbQuery = `BEGIN TRANSACTION;\n`;
    query.forEach((q) => {
        let update = `UPDATE ${q["UPDATE"]}`;
        let set = Object.entries(q["SET"]).map(k => {return `${k[0]} = ${k[1]}`});
        let where = Object.entries(q["WHERE"]).map(k => { return `${k[0]} = ${k[1]}`});
        dbQuery += `${update}\nSET ${set.join(', ')}\nWHERE ${where.join(' AND ')};\n`;
    });
    dbQuery += `COMMIT;`;
    console.log(dbQuery);
    res.send(dbQuery);
});

/**
 * Deletes from tables in the DB
 * Expected format for JSON:
 * {
 *  "QUERY":
 *  [
 *      {"DELETE": <Table>, "WHERE" : {<ColumnName> : <Condition>, ...}},
 *      {"DELETE": <Table>, "WHERE" : {<ColumnName> : <Condition>, ...}},
 *      ...
 *  ]
 * }
 * Example JSON:
 * {
 *     "QUERY":  [
 *         {"DELETE": "NO2", "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}},
 *         {"UPDATE": "O3", "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}}
 *     ]
 * }
 * Runs this query:
 * BEGIN TRANSACTION;
 * DELETE FROM NO2
 * WHERE COL11 = VAL12 AND COL22 = VAL22;
 * DELETE FROM O3
 * WHERE COL11 = VAL12 AND COL22 = VAL22;
 * COMMIT;
 */
app.put('/delete', (req, res) => {
    const query = req.body["QUERY"];
    let dbQuery = `BEGIN TRANSACTION;\n`;
    query.forEach((q) => {
        let del = `DELETE FROM ${q["DELETE"]}`;
        let where = Object.entries(q["WHERE"]).map(k => { return `${k[0]} = ${k[1]}`});
        dbQuery += `${del}\nWHERE ${where.join(' AND ')};\n`;
    });
    dbQuery += `COMMIT;`;
    console.log(dbQuery);
    res.send(dbQuery);
});

/**
 * Inserts rows into the db
 * Expected format for JSON (All arrays for the `VALUES` key MUST be the same length within each object):
 * {
 *  "QUERY":
 *  [
 *      {"INSERT": <Table>, "VALUES" : {<ColumnName> : [value1, value2, ...], <ColumnName> : [value1, value2, ...]}},
 *      {"INSERT": <Table>, "VALUES" : {<ColumnName> : [value1, value2, ...], <ColumnName> : [value1, value2, ...]}},
 *      ...
 *  ]
 * }
 * Example JSON:
 * {
 *     "QUERY":  [
 *         {"INSERT": "NO2", "VALUES": {"a":[1,2,3], "b":[4,5,6], "c":[7,8,9]}},
 *         {"INSERT": "O3", "VALUES": {"alpha":[1,2,3], "beta":[4,5,6], "gamma":[7,8,9]}}
 *     ]
 * }
 * Runs this query:
 * BEGIN TRANSACTION;
 * INSERT INTO NO2
 * (a,b,c)
 * VALUES
 * (1,4,7), (2,5,8), (3,6,9);
 * INSERT INTO O3
 * (alpha,beta,gamma)
 * VALUES
 * (1,4,7), (2,5,8), (3,6,9);
 * COMMIT;
 */
app.put('/insert', (req, res) => {
    const query = req.body["QUERY"];
    let dbQuery = `BEGIN TRANSACTION;\n`;
    query.forEach((q) => {
        const zip = (...arr) => Array(Math.max(...arr.map(a => a.length))).fill().map((_,i) => arr.map(a => a[i]));
        let columnNames = Object.keys(q["VALUES"]);
        let formattedValues = zip(...Object.values(q["VALUES"])).map(e => {return `(${e.toString()})`});
        dbQuery += `INSERT INTO ${q["INSERT"]}\n(${columnNames.toString()})\nVALUES\n${formattedValues.join(', ')};\n`;
    });
    dbQuery += `COMMIT;`;
    console.log(dbQuery);
    res.send(dbQuery);
});
app.listen(process.env.PORT || 3002, console.info(`App listening on port ${process.env.PORT}`));