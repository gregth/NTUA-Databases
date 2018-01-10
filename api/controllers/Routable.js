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

        let optionalField = this.options.optionalField;
        let methodOptions = this.options.get;
        if (!req.params[optionalField.query]) {
            var allowed_search_keys = methodOptions.allowed_search_keys;
            conditions = this.filter_keys(req.query, allowed_search_keys);

            let fields = methodOptions.field;
            let orderBy = methodOptions.orderBy;

            [result] = await this.db.select(this.options.table, fields, conditions, orderBy);
        }
        else {
            conditions[optionalField.field_name] = req.params[optionalField.query];
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

    async post(req, res) {
        let methodOptions = this.options.post;
        let optionalField = this.options.optionalField;

        if (req.params[optionalField.query]) {
            res.status(500);
			res.send("You can not post on individual resources");
            return;
        }

        let params = this.filter_keys(req.body, methodOptions.fields);
        try {
            let [result] = await this.db.insert(this.options.table, params)
            if (result.affectedRows != 1) {
                res.status(500);
                res.send("Error");
                return;
            }
            res.send({resource_id: result.insertId});
            res.status(200);
        } catch(e) {
            console.log(e);
            res.status(500);
            res.send('Internal error.');
        }
    }

    async put(req, res) {
        let optionalField = this.options.optionalField;

        if (!req.params[optionalField.query]) {
            res.status(500);
			res.send("You must specify individual resource to update");
            return;
        }
        let methodOptions = this.options.put;

        let params = this.filter_keys(req.body, methodOptions.fields);
        try {
            let condition = {};
            condition[optionalField.field_name] = req.params[optionalField.query];
            console.log(condition);
            let [result] = await this.db.update(this.options.table, params, condition);
            res.status(200);
            if (result.affectedRows != 1) {
                res.status(500);
                res.send("Error");
                return;
            }
            res.status(200);
            res.send(result);
            return;
        } catch(e) {
            console.log(e);
            res.status(500);
            res.send('Internal error.');
        }
    }

    async delete(req, res) {
        let methodOptions = this.options.delete;
        let optionalField = this.options.optionalField;

        if (!req.params[optionalField.query]) {
            res.status(500);
            res.send("You must specify unique resource to delete");
            return;
        }

        let param = {};
        param[optionalField.field_name] = req.params[optionalField.query]

        try {
            let [result] = await this.db.delete(this.options.table, param);
            console.log(result);
            if (result.affectedRows != 1) {
                res.status(500);
                res.send("Error");
                return;
            }
            res.status(200);
            res.send('Succesfule deleted resource.');
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
