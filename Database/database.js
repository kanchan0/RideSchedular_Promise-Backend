const Bluebird = require("bluebird");
const mySQL = require("mysql");
const config = require("../config/keys")

const connection = mySQL.createConnection({
    host:"localhost",
    user:"root",
    password:config.db_password,
    database:config.database_name,
    });
    
 connection.connect(function(err){
     if(err) throw err
     console.log("mysql connected to user")

 })

global.db  = Bluebird.promisifyAll(connection);
module.exports = db;
