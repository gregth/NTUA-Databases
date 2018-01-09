const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Client extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.clientId) {
            var allowed_search_keys = ["identity_number", "first_name", "last_name"];
            conditions = this.filter_keys(req.query, allowed_search_keys);
            console.log(conditions);

            let fields = ["first_name", "last_name", "license_id", "identity_number"];
            let orderBy = [order_field("first_name", "ASC"), order_field("last_name", "ASC")];
            [result] = await this.db.select('clients', fields, conditions, orderBy);
        }
        else {
            [[result]] = await this.db.select('clients', [], {client_id: req.params.clientId});
            if (!result) {
                res.status(404);
                res.send("NOT FOUND");
            }
        }
        console.log(result);
        res.send(result);
    }

    async post(req, res) {
        let param = {
            identity_number: req.body["identity_number"],
            first_name: req.body["first_name"],
            last_name: req.body["last_name"],
            street_name: req.body["street_name"],
            street_number: req.body["street_number"],
            postal_code : req.body["postal_code"],
            city: req.body["city"],
            country: req.body["country"],
            email: req.body["email"],
            password: req.body["password"],
        };
        console.log(param);
        let result = await this.db.insert('clients', param)
        res.send('Create client profile!');
        //console.log(result);

    }

    async put(req, res) {
        let param = {
            license_id: req.body["license_id"],
            identity_number: req.body["identity_number"],
            first_name: req.body["first_name"],
            last_name: req.body["last_name"],
            street_name: req.body["street_name"],
            street_number: req.body["street_number"],
            postal_code : req.body["postal_code"],
            city: req.body["city"],
            country: req.body["country"],
            email: req.body["email"],
            password: req.body["password"],
        };
        await this.db.update('clients', param);
        res.send('Update client profile!');
    }

    delete(req, res) {
        let param = {
            client_id: req.body["client_id"],
        };
        //await this.db.delete('clients', param);
        res.send('Delete client profile!');
    }
}

module.exports = Client;
