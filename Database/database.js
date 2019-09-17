const Bluebird = require("bluebird");
const mySQL = require("mysql");

const connection = mySQL.createConnection({
    host:"localhost",
    user:"root",
    password:"New@12345",
    database:"user",
    });
    
 connection.connect(function(err){
     if(err) throw err
     console.log("mysql connected to user")

 })

global.db  = Bluebird.promisifyAll(connection);
module.exports = db;
