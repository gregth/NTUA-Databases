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

    async get(req, res) {
        let result;
        let conditions = {};

        let methodOptions = this.options.get;
        let optionalField = methodOptions.optionalField;
        if (!req.params[optionalField]) {
            var allowed_search_keys = methodOptions.allowed_search_keys;
            conditions = this.filter_keys(req.query, allowed_search_keys);

            let fields = methodOptions.field;
            let orderBy = methodOptions.orderBy;

            [result] = await this.db.select(this.options.table, fields, conditions, orderBy);
        }
        else {
            conditions[optionalField] = req.params[optionalField];
            [[result]] = await this.db.select(this.options.table, [], conditions);

            if (!result) {
                res.status(404);
                res.send("NOT FOUND");
                return;
            }
        }

        console.log(result);
        res.send(result);
    }

    async post() {
        let methodOptions = this.options.post;

        let params = this.filter_keys(req.body, methodOptions.fields);
        try {
            let result = await this.db.insert(this.options.table, params)
            res.status(200);
            res.send('Success.');
        } catch(e) {
            console.log(e);
            res.status(500);
            res.send('Internal error.');
        }
    }

    async put() {
        let methodOptions = this.options.put;

        let params = this.filter_keys(req.body, methodOptions.fields);
        try {
            let result = await this.db.update(this.options.table, params);
            res.status(200);
            res.send('Success.');
        } catch(e) {
            console.log(e);
            res.status(500);
            res.send('Internal error.');
        }
    }

    async delete() {
        let methodOptions = this.options.delete;

        let param = {};
        param[methodOptions.queryField] = req.body[methodOptions.queryField]
        try {
            let result = await this.db.delete('clients', param);
            res.status(200);
            res.send('Success.');
        } catch(e) {
            console.log(e);
            res.status(500);
            res.send('Internal error.');
        }
    }

    filter_keys(params, allowed_keys) {
        let filtered_params = {};
        allowed_keys.forEach(key => {
            if (params[key]) {
                filtered_params[key] = params[key];
            }
        });
        return filtered_params;
    }
}

module.exports = Routable;
