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

    app.get('/clients', (req, res) => {
        res.send('Log clients list!');
    });

    app.route('/clients/:cdlientId')
        .get((req, res) => {
            res.send('Show client profile!');
        })
        .delete((req, res) => {
            res.send('Delete client profile!');
        })
        .put((req, res) => {
            res.send('Update client profile!');
        });

    app.route('/vehicles/:vehicleId')
        .get((req, res) => {
            res.send('Show vehicle profile!');
        })
        .delete((req, res) => {
            res.send('Delete vehicle profile!');
        })
        .put((req, res) => {
            res.send('Update vehicle profile!');
        });

    app.route('/stores/:storeId')
        .get((req, res) => {
            res.send('Show store profile!');
        })
        .delete((req, res) => {
            res.send('Delete store profile!');
        })
        .put((req, res) => {
            res.send('Update store profile!');
        });

    app.route('/stores/:storeId/vehicles/')
        .get((req, res) => {
            res.send('Show vehicles of store!');
        });

    app.get('/employees/list', (req, res) => {
        const employees = EmployeeController.list(connection).then(rows => {
            console.log(rows);
        });
    });

    app.listen(config.port);
    console.log('Express server listening on port ' + config.port + '..');
};
