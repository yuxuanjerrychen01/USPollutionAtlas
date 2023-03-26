// Imports
const express = require('express')
const app = express()
// const port = 5000
const path = require('path');
const router = express.Router();

// // Listen on Port 5000
// app.listen(port, () => console.info(`App listening on port ${port}`))

//add the router
app.use('/', router);
app.listen(process.env.port || 3000, console.info(`App listening `));

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/Frontend/index.html'));
});