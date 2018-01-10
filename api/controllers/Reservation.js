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

        console.log(result);
        if (result.length == 0) {
            res.status(404);
            res.send("Reservation not found");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async post(req, res) {
		if (req.params.reservationId) {
			res.status(500);
			res.send("Operation not permited on individual reservations");
            return;
		}

		var needed_parameters = ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date"];
		let details = this.filter_keys(req.body, needed_parameters);
		console.log(details);
		let [result] = await this.db.insert(`reservations`, details)

		if (result.affectedRows != 1) {
			res.status(500);
			res.send("Error");
            return;
		}
		res.status(200);
		res.send({reservation_number: result.insertId});
        return;
    }

    async put(req, res) {
        if (!req.params.reservationId) {
            res.status(500);
			res.send("You must specify reservation to update");
            return;
        }

        var needed_parameters = ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let conditions = {reservation_id: req.params.reservationId};
        let [result] = await this.db.update('reservations', details, conditions)

        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.send(result);
        res.status(200);
    }

    async delete(req, res) {
        if (!req.params.reservationId) {
            res.status(500);
            res.send("You must specify reservation to delete");
            return;
        }

        let conditions = {reservation_id: req.params.reservationId};
        let [result] = await this.db.delete('reservations', conditions)

        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.send("Succesfully deleted reservation");
        res.status(200);
    }
}

module.exports = Reservation;

