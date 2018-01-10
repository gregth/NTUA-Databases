const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Reservation extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.reservationId) {
            var allowed_search_keys = ["client_id", "first_name", "last_name", "store_id"];
            conditions = this.filter_keys(req.query, allowed_search_keys);
            console.log(conditions);

            let orderBy = [order_field("start_date", "ASC")];
            [result] = await this.db.select('reservations', null, conditions, orderBy);
        }
        else {
            [result] = await this.db.select(`reservations JOIN clients
                ON clients.client_id = reservations.client_id`, 
                ["reservations.store_id", "clients.first_name", "clients.last_name",
                    "reservations.start_date", "reservations.end_date"],
                {reservation_id: req.params.reservationId}, []);
        }
        res.send(result);
    }

    async post(req, res) {
        var needed_parameters = ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let [result] = await this.db.insert(`reservations`, details)
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
        }
        res.send({reservation_number: result.insertId});
        res.status(200);
    }

    async put(req, res) {
        if (!req.params.reservationId) {
            res.status(500);
            res.send("Error");
        }
        var needed_parameters = ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let conditions = {reservation_id: req.params.reservationId};
        let [result] = await this.db.update('reservations', details, conditions)
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
        }
        //res.send({reservation_number: result.insertId});
        res.send(result);
        res.status(200);
    }

    delete(req, res) {
        let param = {
            client_id: req.body["client_id"],
        };
        //await this.db.delete('clients', param);
        res.send('Delete client profile!');
    }
}

module.exports = Reservation;

