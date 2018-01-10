const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Store extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.storeId) {
            [result] = await this.db.select('stores');
        }
        else {
            [result] = await this.db.select('stores', [], {store_id: req.params.storeId}, []);
        }

        console.log(result);
        if (result.length == 0) {
            res.status(404);
            res.send("Store not found");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async post(req, res) {
		if (req.params.storeId) {
			res.status(500);
			res.send("Operation not permited on individual stores");
            return;
		}

		var needed_parameters = ["street_number", "street_name", "postal_code", "city", "country", "store_name"];
		let details = this.filter_keys(req.body, needed_parameters);
		let [result] = await this.db.insert(`stores`, details)

		console.log(result);
		if (result.affectedRows != 1) {
			res.status(500);
			res.send("Error");
            return;
		}
		res.send({store_id: result.insertId});
		res.status(200);
    }

    async put(req, res) {
        if (!req.params.storeId) {
            res.status(500);
			res.send("You must specify store to update");
            return;
        }

		var needed_parameters = ["street_number", "street_name", "postal_code", "city", "country", "store_name"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let conditions = {store_id: req.params.storeId};
        let [result] = await this.db.update('stores', details, conditions)

		console.log(result);
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async delete(req, res) {
        if (!req.params.storeId) {
            res.status(500);
            res.send("You must specify store to delete");
            return;
        }

        let conditions = {store_id: req.params.storeId};
        console.log(conditions);
        let [result] = await this.db.delete('stores', conditions)

		console.log(result);
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.send("Succesfully deleted store");
        res.status(200);
    }
}

module.exports = Store;
