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
    password: 'cs411truepikachu',
    multipleStatements: true
   // database: 'test'
});

//add the router
app.use('/', router);
app.get('/',(req,res) => {
   // res.sendFile(path.join(__dirname+'/Frontend/index.html'));
    res.send('HELLO WORLD')
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
app.put('/basicSearch', (req,res) => {
    const query = req.body;
    let select = query["SELECT"].length <= 0 ? 'SELECT *\n' : `SELECT ${query["SELECT"].join(', ')}\n`;
    let from = `FROM ${query["FROM"].join(" NATURAL JOIN ")} NATURAL JOIN location NATURAL JOIN dates\n`;
    let where = Object.entries(query["WHERE"]).length > 0 ? `WHERE ${Object.entries(query["WHERE"]).map(k => {return `${k[0]} = ${k[1]}`}).join(' AND ')} ` : "";
    let dbQuery = `${select}${from}${where};`;
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
                });
            });
        })
});

app.get('/showAQITable', (req, res) => {
    pool.getConnection()
        .then(promiseConnection => {
            let conn = promiseConnection.connection;

            conn.beginTransaction( (e) => {
                conn.query('USE USPollutionAtlas1');
                conn.query('SELECT * FROM AQITable ORDER BY AVGAQI DESC', (err, results) => {
                    if (err) {
                        console.error(err)
                        res.send(400)
                    }
                    else {
                        conn.commit(() => conn.release())
                        console.log(results)
                        res.send(results)
                    }
                });
            });
        })
})

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
                });
            });
        })
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
 *         {"DELETE": "O3", "WHERE": {"COL11":"VAL12", "COL22":"VAL22"}}
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
    let dbQuery = '';
    query.forEach((q) => {
        let del = `DELETE FROM ${q["DELETE"]}`;
        let where = Object.entries(q["WHERE"]).map(k => { return `${k[0]} = ${k[1]}`});
        dbQuery += `${del}\nWHERE ${where.join(' AND ')};\n`;
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
                });
            });
        })
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
    // let dbQuery = `START TRANSACTION;\n`;
    let dbQuery = '';
    query.forEach((q) => {
        const zip = (...arr) => Array(Math.max(...arr.map(a => a.length))).fill().map((_,i) => arr.map(a => a[i]));
        let columnNames = Object.keys(q["VALUES"]);
        let formattedValues = zip(...Object.values(q["VALUES"])).map(e => {return `(${e.toString()})`});
        dbQuery += `INSERT INTO ${q["INSERT"]}\n(${columnNames.toString()})\nVALUES\n${formattedValues.join(', ')};\n`;
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
                });
            });
        })
    // res.send(dbQuery);
});
/**
 * Returns the MAX AQI data for each fipscode
 * Expected format for JSON:
 * {
 *  "QUERY": [<pollutantType>, ...]
 * }
 * Example JSON:
 * {
 *     "QUERY": ["SO2", "O3", "NO2", "CO"]
 * }
 * Runs this query:
 * BEGIN TRANSACTION;
 * SELECT FIPSCODE, MAX(`SO2 AQI`), MAX(`O3 AQI`), MAX(`NO2 AQI`), MAX(`CO AQI`)
 * FROM SO2 NATURAL JOIN O3 NATURAL JOIN NO2 NATURAL JOIN CO NATURAL JOIN dates
 * GROUP BY FIPSCODE;
 * COMMIT;
 */
app.put('/maxAqi', (req, res) => {
    const query = req.body["QUERY"];
    // let selection = query.map(q => {return `MAX(\`${q} AQI\`)`});
    let select = `SELECT FIPSCODE, ${query.map(q => {return `MAX(\`${q} AQI\`)`}).join(', ')}\n`;
    let from = `FROM ${query.join(' NATURAL JOIN ')} NATURAL JOIN dates\n`;
    let dbQuery = `${select}${from}GROUP BY FIPSCODE;`;
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
                });
            });
        });
});
/**
 * Returns the counties where a given pollutant is present above average
 * Expected format for JSON:
 * {
 *  "QUERY": <pollutantType>
 * }
 * Example JSON:
 * {
 *     "QUERY": "NO2"
 * }
 * Runs this query:
 * BEGIN TRANSACTION;
 * SELECT CountyName, AVG(`NO2 MEAN`)
 * FROM location NATURAL JOIN NO2
 * GROUP BY CountyName
 * HAVING AVG(`NO2 MEAN`) > (SELECT AVG(`NO2 MEAN`) FROM NO2);
 * COMMIT;
 */
app.put('/aboveAveragePollutant', (req, res) => {
    const pollutant = req.body["QUERY"];
    let dbQuery = `SELECT CountyName, AVG(\`${pollutant} MEAN\`)\nFROM location NATURAL JOIN ${pollutant}\nGROUP BY CountyName\nHAVING AVG(\`${pollutant} MEAN\`) > (SELECT AVG(\`${pollutant} MEAN\`) FROM ${pollutant});`
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
                });
            });
        });
});

/**
 * Returns the average pollution for each state
 * SELECT StateName, AVG(`SO2 MEAN`) AS SO2, AVG(`O3 MEAN`) AS O3, AVG(`NO2 MEAN`) AS NO2, AVG(`CO MEAN`) AS CO
 * FROM SO2 NATURAL JOIN O3 NATURAL JOIN NO2 NATURAL JOIN CO NATURAL JOIN location
 * GROUP BY StateName;
 */
app.get('/statePollution', (req, res) => {
    const dbQuery = 'SELECT StateName, AVG(`SO2 MEAN`) AS SO2, AVG(`O3 MEAN`) AS O3, AVG(`NO2 MEAN`) AS NO2, AVG(`CO MEAN`) AS CO\n' +
        'FROM SO2 NATURAL JOIN O3 NATURAL JOIN NO2 NATURAL JOIN CO NATURAL JOIN location\n' +
        'GROUP BY StateName;'
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
                });
            });
        });
});

/**
 * Logs the user in
 * Expected format for JSON:
 * {
 *     "Username": <username>,
 *     "Password": <password>
 * }
 * Example JSON:
 * {
 *     "Username": "'truepikachu'",
 *     "Password": "123456"
 * }
 */
app.put('/login', (req, res) => {
    let user = req.body['Username']
    let pass = req.body['Password']
    let dbQuery = `SELECT UserID FROM userLogin WHERE Username = "${user}" AND Password = "${pass}";`
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
                        if (results.length < 1)
                            res.sendStatus(401)
                        else
                            res.sendStatus(200)
                    }
                });
            });
        });
})

/**
 * Create the table for AQIs greater than some threshold
 * Expected format for JSON:
 * {
 *      "threshold" : <value>
 * }
 * Example JSON:
 * {
 *     "threshold": 2.0,
 * }
 */
app.put('/makeAQITable', (req, res) => {
    let threshold = req.body['threshold'];
    let dbQuery = `CALL BestAQI(${threshold})`;
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
                        if (results.length < 1)
                            res.sendStatus(401)
                        else
                            res.sendStatus(200)
                    }
                });
            });
        });
});


app.listen(process.env.PORT || 3002, console.info(`App listening on port ${process.env.PORT}`));