const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Reservation extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.clientId) {
            var allowed_search_keys = ["client_id", "first_name", "last_name", "store_id"];
            conditions = this.filter_keys(req.query, allowed_search_keys);
            console.log(conditions);

            let orderBy = [order_field("start_date", "ASC")];
            [result] = await this.db.select('reservations', null, conditions, orderBy);
        }
        else {
            [result] = await this.db.select('reservations', [], {reservation_id: req.params.reservationId}, []);
        }
        res.send(result);
    }

    async post(req, res) {
        var needed_parameters = ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let [result] = await this.db.insert('reservations', details)
        res.send({reservation_number: result.insertId});
        res.status(200);
    }

    async put(req, res) {
        let param = {
            license_id: req.body["license_id"],
            identity_number: req.body["identity_number"],
            first_name: req.body["first_name"],
            last_name: req.body["last_name"],
            street_name: req.body["street_name"],
            street_number: req.body["street_number"],
            postal_code : req.body["postal_code"],
            city: req.body["city"],
            country: req.body["country"],
            email: req.body["email"],
            password: req.body["password"],
        };
        await this.db.update('clients', param);
        res.send('Update client profile!');
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

