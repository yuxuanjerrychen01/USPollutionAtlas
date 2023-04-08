// Imports
const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
const cors = require('cors')
require('dotenv').config()

router.use(express.json());
// get the client
const mysql = require('mysql2/promise');
// const db = require('mysql2/promise');
// const mysql = require('mysql2');
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
const pool = mysql.createPool({
    host: '34.122.96.91',
    user: 'root',
    password: 'cs411truepikachu'
   // database: 'test'
});
// const db = require(path.resolve(__dirname, 'dbconfig.js'));
// db.setup();

// const queries = require(path.resolve(__dirname, "dbquery.js"));
// queries.setup(connection);
// connection.query(
//     "USE USPollutionAtlas1"
//
// );
// pool.getConnection().then(connection => connection.query('USE USPollutionAtlas1'));


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
 * Going to replace the old search
 * Expected format for JSON:
 * {
 *     "SELECT": [<field1>, <field2>, ...],
 *     "FROM": [<table1>, <table2>, ...],
 *     "WHERE": {
 *         <field>: value
 *         ...
 *     }
 * }
 * Example JSON:
 * {
 *      "SELECT": ["a","b","c"],
 *      "FROM": ["NO2", "SO3"],
 *      "WHERE": {
 *          "NO2MEAN" : 20.0,
 *          "AQI" : 5
 *      }
 * }
 * Runs this query:
 * SELECT a, b, c
 * FROM NO2 NATURAL JOIN SO3 NATURAL JOIN location NATURAL JOIN dates
 * WHERE NO2MEAN = 20 AND AQI = 5;
 */
app.put('/basicSearchNew', (req,res) => {
    const query = req.body;
    let select = query["SELECT"].length <= 0 ? 'SELECT *\n' : `SELECT ${query["SELECT"].join(', ')}\n`;
    let from = `FROM ${query["FROM"].join(" NATURAL JOIN ")} NATURAL JOIN location NATURAL JOIN dates\n`;
    let where = `WHERE ${Object.entries(query["WHERE"]).map(k => {return `${k[0]} = ${k[1]}`}).join(' AND ')}`;
    let dbQuery = `${select}${from}${where};`;
    console.log(dbQuery);
    res.send(dbQuery);
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
app.put('/update',  (req,res) => {
    const query = req.body["QUERY"];
    let dbQuery = '';//`START TRANSACTION; `;
    query.forEach((q) => {
        let update = `UPDATE ${q["UPDATE"]}`;
        let set = Object.entries(q["SET"]).map(k => {return `${k[0]} = ${k[1]}`});
        let where = Object.entries(q["WHERE"]).map(k => { return `${k[0]} = ${k[1]}`});
        dbQuery += `${update} SET ${set.join(', ')} WHERE ${where.join(' AND ')}; `;
    });
   // dbQuery += `COMMIT;`;
    console.log(dbQuery);
    pool.getConnection()
        .then(promiseConnection => {
            let conn = promiseConnection.connection;
            conn.beginTransaction( (e) => {
                conn.query('USE USPollutionAtlas1');
                conn.query(dbQuery, (err, results) => {
                    if (err) {
                        console.error(err)
                        res.send(400)
                    }
                    else {
                        conn.commit(() => conn.release())
                        console.log(results)
                        res.send(results)
                    }
                })
            });
        })
    // pool.getConnection().then(connection => {
    //     connection.beginTransaction(() => {
    //         connection.query(dbQuery).then(() =>
    //             connection.commit()
    //         ).then((r) => {
    //             console.log(r);
    //             connection.release()
    //             res.send(r)
    //         }).catch(
    //             (err) => {
    //                 connection.rollback();
    //                 connection.release();
    //                 console.error(err);
    //                 res.send(400)
    //             }
    //         )
    //     })
    // });
    // pool.getConnection().then(connection => {
    //     connection.query(dbQuery).then(() => connection.commit()
    //         .then((r) => {
    //             connection.release();
    //             console.log(r);
    //             res.send(r);
    //         }).catch((err) => {
    //             connection.rollback();
    //             connection.release();
    //             console.error(err);
    //             res.send(400);
    //         }))
    // })
    // connection.beginTransaction().then(() => {
    //
    // });
    // queries.update(connection, dbQuery, res);
    // res.send(dbQuery);
    // await connection.beginTransaction();
    // try {
    //     connection.query(
    //         dbQuery, (err, results, fields) => {
    //             console.log(err);
    //             console.log(results); // results contains rows returned by server
    //             console.log(fields); // fields contains extra meta data about results, if available
    //             if (err)
    //                 res.sendStatus(400);
    //             else
    //                 res.send(results);
    //         });
    //
    //     await connection.commit();
    // }
    // catch (error) {
    //     await connection.rollback();
    //     res.status(400);
    // }
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
    let dbQuery = `START TRANSACTION;\n`;
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
    let dbQuery = `START TRANSACTION;\n`;
    query.forEach((q) => {
        // zip source: stack overflow
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