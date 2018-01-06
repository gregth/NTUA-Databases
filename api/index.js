const express = require('express');
const mysql = require('mysql2/promise');
const config = require('./config.json');
const EmployeeController = require('./controllers/EmployeeController');

const dbConfig = config.db;
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.pass,
    database : dbConfig.name
}).then((conn) => {
    setupServer(conn);
});

function setupServer(connection) {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello world!');
    });

    app.get('/employees/list', (req, res) => {
        const employees = EmployeeController.list(connection).then(rows => {
            console.log(rows);
        });

        res.send('it works');
    });

    app.listen(config.port);
    console.log('Express server listening on port ' + config.port + '..');
}
