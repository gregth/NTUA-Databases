const express = require('express');
const mysql = require('mysql');
const config = require('./config.json');

const dbConfig = config.db;
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.pass,
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(config.port);
console.log('Express server listening on port ' + config.port + '..');
