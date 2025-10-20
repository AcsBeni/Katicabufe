require('dotenv').config();
const logger = require('./logger');

var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '2025_katicabufe'
    /*
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME*/
});
pool.on('acquire', function(connection){
    console.log("Connection %d acquired", connection.threadId)

})
pool.on('connection', function(connection){
    console.log("Connection %d established", connection.threadId)
})

pool.on('enqueue', function(connection){
    console.log("Waiting for available connection slot", connection.threadId)
})
pool.on('release', function(connection){
    console.log("Connection %d released", connection.threadId)
})


module.exports = pool;