# Database initialization code

This code initializes a database using the Sequelize ORM. It requires the installation of the Sequelize package and the dotenv package. 
The .env file is used to store the database name, host, dialect, and storage information.

# Requirements
- Node.js installed on your machine.
- A PostgreSQL, MySQL, SQLite or Microsoft SQL Server database
- Sequelize ORM package
- dotenv package
# Usage
- Clone the repository
- Install dependencies using npm install
- Create an .env file at the root of the project and define the following environment variables:
```DATABASE_NAME=your-database-name
HOST=your-host
DIALECT=your-dialect
STORAGE=your-storage-path
```
- Run the npm start command
# Code Overview
# Initializing Sequelize
The Sequelize package is imported and used to create a new Sequelize object with the configurations defined in the .env file.
```
const sequelize = new Sequelize({   
  database: process.env.DATABASE_NAME,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  storage: process.env.STORAGE
});
```
## Creating a DB object
An empty object named db is created to store all the models that will be created.
```
const db = {};
```
## Loading Models
The code reads all the .js files in the current directory and requires them. If a model is found in the required file, it is added to the db object.
```
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });
```
## Associating models
For each model in the `db` object, the code checks if there is an `associate` method defined. 
If there is, the method is called to create any necessary relationships between the tables.
```
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
```
## Exporting the db object
The `db` object is exported so that it can be used to interact with the database.
```
module.exports = db;
```
## Conclusion of the Database code
This code provides a flexible way to create and manage database tables using the Sequelize ORM. 
By defining models in separate files, it makes the code more organized and easier to manage. 
By using the .env file to store configuration details, it also ensures that sensitive information is not hard-coded into the application code.


# Express Server Code
This code initializes an Express server and defines routes for the API. It also serves a React app using the `build` folder. 
It requires the installation of the Express package and the `database.js` file, which exports an instance of the Sequelize ORM.
# Code Overview
The Express package is imported and used to create an instance of the server.
```
const express = require('express');
const app = express();
```
## Synchronizing the database
The `database.js` file is imported and used to synchronize the database tables with the schema. 
The `force` option is set to `false` to prevent the deletion of existing tables.
```
const db = require("./models/database.js");
db.sequelize.sync({ force: false });
```
## Serving the React app
The `express.static` middleware is used to serve the static files from the `build` directory of the React app.
```
app.use(express.static(path.join(__dirname,'../', 'client', 'build')));
```
## Creating the API router
The `api.js` file is imported to create a router for the API.
```
const apiRouter = require('./api.js');
app.use('/api', apiRouter);
```
## Serving the React app's index.html file
The `get` method is used to handle requests to the root URL. The `sendFile` method is used to serve the `index.html` file from the `build` directory.
```
app.get('/', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','client','build','index.html'));
})
```
## Starting the server
The `listen` method is used to start the server on port 5000.
```
app.listen(5000, ()=> {console.log("Server started on port 5000...")});
```
## Conclusion
This code provides a simple way to serve a React app and create an API using an Express server. 
By using the `database.js` file, it also allows for easy integration with the Sequelize ORM to create and manage database tables.

# API Server Code

## GET / route
The `router.get` method is used to create a route that returns all of the results from a join query in the `OrgData` model.
```
router.get("/", async (req,res)=>{
    const results = await OrgData.getAllJoinInfo();
    res.send(results);
})
```
## GET /:limit route
The `router.get` method is used to create a route that returns a limited number of results from a join query in the `OrgData` model. 
The limit is set by the `limit` parameter in the URL.
```
router.get('/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit);
    const results = await OrgData.getSomeJoinInfo(limit);
    res.send(results);
});
```
## Conclusion
This code provides a simple way to define API routes that retrieve information about an organization from a database. 
By using the `OrgData` model, it also allows for easy interaction with the database using the Sequelize ORM








