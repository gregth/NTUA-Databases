const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Reservation extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'reservations',
            optionalField: {query: 'reservationId', field_name: 'reservation_id'},
            get: {
                table_alias: 'r',
                keys_lookup_table: {client_id: 'r'},
                allowed_search_keys: ["client_id", "first_name", "last_name", "store_id"],
                fields:  ["r.reservation_id", "r.store_id", "c.first_name", "c.last_name", "r.start_date", "r.end_date", "r.vehicle_id", "r.amount", "r.client_id"],
                orderBy: [order_field('r.start_date', 'ASC')],
                joins: [{ type: 'JOIN', table: 'clients AS c', on: 'r.client_id = c.client_id'}]
            },
            post: {
                fields: ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date", "bd_id"]
            },
            put: {
                fields: ["amount", "store_id", "client_id", "vehicle_id", "start_date", "end_date"]
            },
            delete: {
                queryField: 'reservation_id'
            }
        }
    }
}

module.exports = Reservation;

