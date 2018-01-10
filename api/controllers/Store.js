const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Store extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'stores',
            optionalField: {query: 'storeId', field_name: 'store_id'},
            get: {
                allowed_search_keys: ['client_id', 'identity_number', 'first_name', 'last_name'],
                fields: [],
                orderBy: [] 
            },
            post: {
                fields: ['street_number', 'street_name', 'postal_code', 'city', 'country', 'store_name']
            },
            put: {
                fields: ['street_number', 'street_name', 'postal_code', 'city', 'country', 'store_name']
            },
            delete: {
                queryField: 'store_id'
            }
        }
    }
}

module.exports = Store;
