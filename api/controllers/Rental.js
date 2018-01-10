const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Rental extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'rentals',
            optionalField: {query: 'rentalId', field_name: 'rental_id'},
            get: {
                table_alias: 'r',
                allowed_search_keys: ['client_id'],
                keys_lookup_table: {client_id: 'rv'},
                fields:  ['receiver_employee_id', 'deliverer_employee_id', 'r.reservation_id',
                    'r.start_date', 'r.end_date', 'damage_score', 'rv.start_date as reservation_start_date',
                    'rv.end_date as reservation_end_date', 'rv.vehicle_id', 'rv.client_id', 'rv.amount', 'rv.store_id'],
                orderBy: [order_field('r.start_date', 'ASC')],
                joins: [{ type: 'JOIN', table: 'reservations AS rv', on: 'rv.reservation_id = r.reservation_id'},
                    {type: 'JOIN', table: 'clients AS c', on: 'rv.client_id = c.client_id'}]
            },
            post: {
                fields: ['deliverer_employee_id', 'start_date', 'reservation_id']
            },
            put: {
                fields: ['receiver_employee_id', 'deliverer_employee_id', 'reservation_id', 'start_date', 'end_date', 'damage_score']
            },
            delete: {
                queryField: 'reservation_id'
            }
        }
    }
}

module.exports = Rental;
