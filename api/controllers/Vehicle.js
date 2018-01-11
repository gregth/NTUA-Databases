const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Vehicle extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'vehicles',
            optionalField: {query: 'vehicleId', field_name: 'vehicle_id'},
            post: {
                fields: ["last_seen_at", "store_id", "type",
                    "brand", "model", "cc", "horse_power", "plate_number", "buy_date",
                    "kilometers", "last_service", "next_service", "insurance_expiration", "price"],
            },
            put: {
                fields: ["last_seen_at", "store_id", "type",
                    "brand", "model", "cc", "horse_power", "plate_number", "buy_date",
                    "kilometers", "last_service", "next_service", "insurance_expiration", "price"],
            },
            delete: {
                queryField: 'vehicle_id',
            }
        }
    }

    async get(req, res) {
        let result;
        let filters;
        if (!req.params.vehicleId) {
            var required_search_keys = ["start_date", "end_date", "store_id", "brand", "model", "type"];
            filters = this.filter_keys(req.query, required_search_keys);
            if (!Object.keys(filters).length) {
                res.status(500);
                res.send('Not enough filters');
                return;
            }

            if (!filters.start_date || !filters.end_date) {
                // search only based on storeid
                console.log(filters);
                [result] = await this.db.select('vehicles', [], {store_id: filters.store_id}, []);
            } else if (filters.start_date && filters.end_date && filters.store_id) {
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
            if (filters.type) {
                query += ` AND type = ?`;
                substitutions.push(filters.type);
            }
            try {
                [result] = await this.db.execute(query, substitutions);
            } catch(e) {
                res.status(500);
                console.log(e);
                res.send(e);
            }
        }
        else {
            try{
                [result] = await this.db.select('vehicles', [], {vehicle_id: req.params.vehicleId}, []);
            } catch(e) {
                res.status(500);
                console.log(e);
                res.send(e);
            }
        }

        res.status(200);
        res.send(result);
        return;
    }
}

module.exports = Vehicle;
