const path = require('path');
// const connection = require(path.resolve(__dirname, 'dbconfig.js'));
module.exports = {
    setup: async (connection) => {
        try {
            await connection.query("USE USPollutionAtlas1").then( ([rows,fields]) => {
                console.log(rows);
            })
        }
        catch(error) {
           console.error('SAD')
        }
        // await connection.query("USE USPollutionAtlas1").then( ([rows,fields]) => {
        //     console.log(rows);
        // })
    },
    update: async (connection, q, res) => {
        try {
            await connection.beginTransaction();
            await connection.query(q).then( ([rows,fields]) => {
                console.log(rows);
            });
            await connection.commit().then(([rows,fields]) => {
                console.log(rows);
            });
        }
        catch(error) {
            await connection.rollback();
            res.send(400)
        }
    }
};