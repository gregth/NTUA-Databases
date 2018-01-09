const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Vehicle extends Routable {
    async get(req, res) {
        let result;
        let conditions = {};
        if (!req.params.vehicleId) {
            let orderBy = [order_field("brand", "ASC"), order_field("model", "ASC")];
            [result] = await this.db.select('vehicles', null, null, orderBy);
        }
        else {
            [result] = await this.db.select('vehicles', [], {vehicle_id: req.params.vehicleId}, []);
        }
        console.log(result);
        res.send(result);
    }

    post() {
    }

    put(req, res) {
        res.send('Update vehicle profile!');
    }

    delete(req, res) {
        res.send('Delete vehicle profile!');
    }
}

module.exports = Vehicle;
