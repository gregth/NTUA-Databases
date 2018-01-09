const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Vehicle extends Routable {
    async get(req, res) {
        let result;
        let filters;
        if (!req.params.vehicleId) {
            var required_search_keys = ["start_date", "end_date", "store_id", "brand", "model", "type"];
            filters = this.filter_keys(req.query, required_search_keys);
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
            console.log(filters);
            [result] = await this.db.execute(query, substitutions);
        }
        else {
            [result] = await this.db.select('vehicles', [], {vehicle_id: req.params.vehicleId}, []);
        }
        //console.log(result);
        res.send(result);
    }

    post() {
    }

    put(req, res) {
        res.send('Update vehicle profile!');
    }

    delete(req, res) {
        res.send('Delete vehicle profile!');
    }
}

module.exports = Vehicle;
