const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Vehicle extends Routable {
    async get(req, res) {
        let result;
        let filters;
        if (!req.params.vehicleId) {
            var required_search_keys = ["start_date", "end_date", "store_id", "brand", "model", "type"];
            filters = this.filter_keys(req.query, required_search_keys);
            console.log(filters);
            if (!filters.start_date ||
                !filters.end_date ||
                !filters.store_id
            ) {
                res.status(500);
                res.send("Not enough criteria");
                return;
            }

            let query = `SELECT * FROM vehicles
                WHERE store_id = ?
                    AND vehicles.vehicle_id NOT IN 
                        (SELECT vehicles.vehicle_id FROM vehicles
                            JOIN reservations 
                                ON reservations.vehicle_id = vehicles.vehicle_id
                            WHERE start_date >= ? AND end_date <= ?
                                OR start_date <= ? AND end_date >= ?
                                OR start_date <= ? AND end_date >= ?)`;
            let substitutions = [filters.store_id,
                filters.start_date, filters.end_date,
                filters.start_date, filters.start_date, 
                filters.end_date, filters.end_date];

            if (filters.brand) {
                query += ` AND brand = ?`;
                substitutions.push(filters.brand);
            }
            if (filters.model) {
                query += ` AND brand = ?`;
                substitutions.push(filters.model);
            }
            if (filters.type) {
                query += ` AND type = ?`;
                substitutions.push(filters.type);
            }
            [result] = await this.db.execute(query, substitutions);
        }
        else {
            [result] = await this.db.select('vehicles', [], {vehicle_id: req.params.vehicleId}, []);
        console.log(result);
        }

        if (result.length == 0) {
            res.status(404);
            res.send("Vehicle not found");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async post(req, res) {
		if (req.params.vehicleId) {
			res.status(500);
			res.send("Operation not permited on individual vehicles");
            return;
		}

        var needed_parameters = ["last_seen_at", "store_id", "type",
            "brand", "model", "cc", "horse_power", "plate_number", "buy_date",
            "kilometers", "last_service", "next_service", "insurance_expiration"];
		let details = this.filter_keys(req.body, needed_parameters);
		let [result] = await this.db.insert(`vehicles`, details)

		console.log(result);
		if (result.affectedRows != 1) {
			res.status(500);
			res.send("Error");
            return;
		}
		res.send({vehicle_id: result.insertId});
		res.status(200);
    }


    async put(req, res) {
        if (!req.params.vehicleId) {
            res.status(500);
			res.send("You must specify vehicle to update");
            return;
        }

        var needed_parameters = ["last_seen_at", "store_id", "type",
            "brand", "model", "cc", "horse_power", "plate_number", "buy_date",
            "kilometers", "last_service", "next_service", "insurance_expiration"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let conditions = {vehicle_id: req.params.vehicleId};
        let [result] = await this.db.update('vehicles', details, conditions)

		console.log(result);
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async delete(req, res) {
        if (!req.params.vehicleId) {
            res.status(500);
            res.send("You must specify vehicle to delete");
            return;
        }

        let conditions = {vehicle_id: req.params.vehicleId};
        console.log(conditions);
        let [result] = await this.db.delete('vehicles', conditions)

		console.log(result);
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.send("Succesfully deleted vehicle");
        res.status(200);
    }
}

module.exports = Vehicle;
