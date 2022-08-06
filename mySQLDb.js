const mysql = require('mysql2/promise');
// ```https://www.npmjs.com/package/mysql2```
// ```I was having issues with authentication using the mysql module - switched to mysql2 and it worked```

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
const promisePool = pool//.promise();
module.exports.pool = promisePool;