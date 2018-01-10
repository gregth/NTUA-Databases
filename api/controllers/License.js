const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class License extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.licenseIlicenseId) {
            [result] = await this.db.select('licenses');
        }
        else {
            [result] = await this.db.select('licenses', [], {license_id: req.params.licenseId}, []);
        }

        console.log(result);
        if (result.length == 0) {
            res.status(404);
            res.send("License not found");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async post(req, res) {
		if (req.params.licenseId) {
			res.status(500);
			res.send("Operation not permited on individual licenses");
            return;
		}
		var needed_parameters = ["atv", "car", "moto", "minivan", "truck", "license_number"];
		let details = this.filter_keys(req.body, needed_parameters);
		let [result] = await this.db.insert(`licenses`, details)

		console.log(result);
		if (result.affectedRows != 1) {
			res.status(500);
			res.send("Error");
            return;
		}
		res.send({license_id: result.insertId});
		res.status(200);
    }

    async put(req, res) {
        if (!req.params.licenseId) {
            res.status(500);
			res.send("You must specify licenses to update");
            return;
        }

		var needed_parameters = ["atv", "car", "moto", "minivan", "truck", "license_number"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let conditions = {license_id: req.params.licenseId};
        let [result] = await this.db.update('licenses', details, conditions)

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
        if (!req.params.licenseId) {
            res.status(500);
            res.send("You must specify licenses to delete");
            return;
        }

        let conditions = {license_id: req.params.licenseId};
        console.log(conditions);
        let [result] = await this.db.delete('licenses', conditions)

		console.log(result);
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.send("Succesfully deleted licenses");
        res.status(200);
    }
}

module.exports = License;
