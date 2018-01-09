const express = require('express');
const config = require('./config.json');
const Vehicle = require('./controllers/Vehicle');
const Client = require('./controllers/Client');
const Store = require('./controllers/Store');
const Employee = require('./controllers/Employee');
const Reservation = require('./controllers/Reservation');
const bodyParser = require('body-parser');

(async () => {
    const db = await require('./db')

    const app = express();

	app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
	app.use(bodyParser.json()); // for parsing application/json


    app.get('/', (req, res) => {
        res.send('Hello world!');
    });

    new Vehicle(app.route('/vehicles/:vehicleId?'))
    new Client(app.route('/clients/:clientId?'))
    new Store(app.route('/stores/:storeId?'))
    new Employee(app.route('/employee/:employeeId?'))
    new Reservation(app.route('/reservations/:reservationId?'))
	
    app.route('/stores/:storeId/vehicles/')
        .get((req, res) => {
            res.send('Show vehicles of store!');
        });

    app.listen(config.port);
    console.log('Express server listening on port ' + config.port + '..');
})()
