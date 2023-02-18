const express = require('express');
const app = express();
const path = require('path');
const db = require("./models/database.js");

const apiRouter = require('./api.js');

db.sequelize.sync({ force: false }); // Synchronizes the databases in schema. The force option makes sure we don't drop existing tables.

app.use(express.static(path.join(__dirname,'../', 'client', 'build')));  // Here we use the build from react


app.use('/api', apiRouter); // Creating a router for the API.

app.get('/', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','client','build','index.html'));   // Loads the index.html that serves react components 
})

app.listen(5000, ()=> {console.log("Server started on port 5000...")});

module.exports = app;