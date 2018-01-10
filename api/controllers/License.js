const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class License extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'licenses',
            optionalField: {query: 'licenseId', field_name: 'license_id'},
            get: {
                allowed_search_keys: [],
                fields: [],
                orderBy: []
            },
            post: {
                fields: ["atv", "car", "moto", "minivan", "truck", "license_number"]
            },
            put: {
                fields: ["atv", "car", "moto", "minivan", "truck", "license_number"]
            },
            delete: {
                queryField: 'license_id'
            }
        }
    }
}

module.exports = License;
