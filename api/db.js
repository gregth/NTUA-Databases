const mysql = require('mysql2/promise');
const config = require('./config.json');
const dbConfig = config.db;
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.pass,
    database : dbConfig.name
})

module.exports = connection;
