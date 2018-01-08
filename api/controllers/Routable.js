const connection = require('../db');

class Routable {
    constructor(router) {
        const methods = ['get', 'post', 'put', 'delete']
        this.connection = connection;

        for (let method of methods) {
            router[method](this.requires_db(this[method]))
        }
    }

    requires_db(f) {
        return async (...args) => {
            this.db = await this.connection;
            return f.call(this, ...args);
        }
    }
    get() {
        throw 'Not implemented get()';
    }
    post() {
        throw 'Not implemented post()';
    }
    put() {
        throw 'Not implemented put()';
    }
    delete() {
        throw 'Not implemented delete()';
    }
}

module.exports = Routable;
