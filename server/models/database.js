const Sequelize = require('sequelize');
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
require('dotenv').config();

const sequelize = new Sequelize({   // uses the .env file to initiate a database using Sequelize ORM.
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE
  });

const db = {}  // Creates the empty DB object.
  
db.sequelize = sequelize 
fs.readdirSync(__dirname).filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) &&  // This code reads all the current files in the directory and filters out all tha don't have an .js extenstion
        (file.slice(-3) === '.js');
      })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize,
        Sequelize); // it then requires all the files that have .js extenstion and adds it to the db object with the model name as the key. 
        db[model.name] = model; // This means that the DB object will have one entry for each model inside the models directory.
        console.log(db) 
    }); 

Object.keys(db).forEach(modelName => {  // This will take each model inside the DB and check if it has an assosicate method. If it has, then it assosicates the table. 
  if (db[modelName].associate) { // This refers to adding foreign key relationships and properly creating relationships between the tables
    db[modelName].associate(db);
  }
});

module.exports = db