const express = require('express');
const mysql = require('mysql');

const PORT = 3001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(PORT);
console.log('Express server listening on port ' + PORT + '..');
