const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Client extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'clients',
            optionalField: {query: 'clientId', field_name: 'client_id'},
            get: {
                allowed_search_keys: ['client_id', 'identity_number', 'first_name', 'last_name'],
                fields: ['client_id', 'license_id', 'identity_number', 'first_name', 'last_name', 'street_name',
                    'street_number', 'postal_code', 'city', 'country', 'email'],
                orderBy: [order_field('first_name', 'ASC'), order_field('last_name', 'ASC')],
            },
            post: {
                fields: ['identity_type', 'identity_number', 'first_name', 'last_name', 'street_name',
                    'street_number', 'postal_code', 'city', 'country', 'email', 'password'],
            },
            put: {
                fields: ['license_id', 'identity_number', 'first_name', 'last_name',
                    'street_name', 'street_number', 'postal_code', 'city', 'country', 'email'],
            },
            delete: {
                queryField: 'client_id',
            }
        }
    }
}

module.exports = Client;
