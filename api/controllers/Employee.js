const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Employee extends Routable {
    constructor(router) {
        super(router);

        this.options = {
            table: 'employees',
            optionalField: {query: 'employeeId', field_name: 'employee_id'},
            get: {
                allowed_search_keys: ['employee_id', 'identity_number', 'first_name', 'last_name'],
                fields: [],
                orderBy: [order_field('first_name', 'ASC'), order_field('last_name', 'ASC')]
            },
            post: {
                fields: ['identity_number', 'first_name', 'last_name', 'street_name',
                    'street_number', 'postal_code', 'city', 'country', 'password',
                    'role', 'start_date', 'end_date', 'store_id']
            },
            put: {
                fields: ['identity_number', 'first_name', 'last_name', 'street_name',
                    'street_number', 'postal_code', 'city', 'country', 'password',
                    'role', 'start_date', 'end_date', 'store_id']
            },
            delete: {
                queryField: 'employee_id'
            }
        }
    }
}

module.exports = Employee;
