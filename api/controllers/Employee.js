const Routable = require('./Routable');

class Employee extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.employeeId) {
            [result] = await this.db.select('employees');
        }
        else {
            [result] = await this.db.select('employees', [], {employee_id: req.params.employeeId}, []);
        }

        console.log(result);
        if (result.length == 0) {
            res.status(404);
            res.send("Employee not found");
            return;
        }
        res.status(200);
        res.send(result);
        return;
    }

    async post(req, res) {
		if (req.params.employeeId) {
			res.status(500);
			res.send("Operation not permited on individual employees");
            return;
		}

		var needed_parameters = ["license_id",
			"store_id", "identity_number", "first_name",
			"last_name", "street_name", "postal_code", "city",
			"country", "street_number", "role", "start_date", "end_date"];
		let details = this.filter_keys(req.body, needed_parameters);
		let [result] = await this.db.insert(`employees`, details)

		console.log(result);
		if (result.affectedRows != 1) {
			res.status(500);
			res.send("Error");
            return;
		}
		res.send({employee_id: result.insertId});
		res.status(200);
    }

    async put(req, res) {
        if (!req.params.employeeId) {
            res.status(500);
			res.send("You must specify employee to update");
            return;
        }

		var needed_parameters = ["license_id",
			"store_id", "identity_number", "first_name",
			"last_name", "street_name", "postal_code", "city",
			"country", "street_number", "role", "start_date", "end_date"];
        let details = this.filter_keys(req.body, needed_parameters);
        console.log(details);
        let conditions = {employee_id: req.params.employeeId};
        let [result] = await this.db.update('employees', details, conditions)

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
        if (!req.params.employeeId) {
            res.status(500);
            res.send("You must specify employee to delete");
            return;
        }

        let conditions = {employee_id: req.params.employeeId};
        console.log(conditions);
        let [result] = await this.db.delete('employees', conditions)

		console.log(result);
        if (result.affectedRows != 1) {
            res.status(500);
            res.send("Error");
            return;
        }
        res.send("Succesfully deleted employee");
        res.status(200);
    }
}

module.exports = Employee;
