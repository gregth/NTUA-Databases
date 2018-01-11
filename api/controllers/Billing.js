const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Contact extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'billings',
            optionalField: {query: 'billingId', field_name: 'bd_id'},
            get: {
                allowed_search_keys: ['billing_id'],
                fields:  [],
            },
            post: {
                fields: ['is_company', 'name', 'street_number', 'street_name', 'city', 'postal_code', 'country', 'phone', 'trn']
            },
            put: {
                fields: ['is_company', 'name', 'street_number', 'street_name', 'city', 'postal_code', 'country', 'phone', 'trn']
            },
            delete: {
                queryField: 'bd_id'
            }
        }
    }
}

module.exports = Contact;
