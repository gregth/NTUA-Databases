const Routable = require('./Routable');

class Employee extends Routable {
    async get(req, res) {
        if (!req.params.employeeId) {
			let [rows, fields] = await this.db.execute('SELECT * FROM employees');
            res.send(rows);
        }
    }

    post() {
    }

    put(req, res) {
        res.send('Update employee profile!');
    }

    delete(req, res) {
        res.send('Delete employee profile!');
    }
}

module.exports = Employee;
