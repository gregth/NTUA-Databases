const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Contact extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'contacts',
            optionalField: {query: 'contactId', field_name: 'contact_id'},
            get: {
                allowed_search_keys: ['store_id'],
                fields:  [],
            },
            post: {
                fields: ['type', 'value']
            },
            put: {
                fields: ['type', 'value']
            },
            delete: {
                queryField: 'contact_id'
            }
        }
    }
}

module.exports = Contact;
