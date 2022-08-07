// require mysql2/promise
const mysql = require('mysql2/promise');

// setup database config options
require('dotenv').config();
var options = {
  connectionLimit: 10,
  host: process.env.DB_HOSTNAME,// Host name for database connection.
  port: process.env.DB_PORT,// Port number for database connection.
  user: process.env.DB_USERNAME,// Database user.
  password: process.env.DB_PASSWORD,// Password for the above database user.
  database: process.env.DB_DATABASE// Database name
};

var pool = mysql.createPool(options);
module.exports.pool = pool;

