const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Statistics extends Routable {
    constructor(router) {
        super(router);
    }
    async get(req, res) {
        try {
            let result;
            if (req.params.type == 'count_vehicles') {
                let query = `SELECT s.store_name, s.store_id, COUNT(vehicle_id) FROM
                    stores AS s, vehicles AS v WHERE v.store_id = s.store_id
                    GROUP BY s.store_id`;
                    [result] = await this.db.execute(query);
                    res.status(200);
                    res.send(result);
            }
            else {
                res.status(400);
                res.send("Not found");
            }
        } catch(e) {
                res.status(500);
                console.log(e);
                res.send(e);
        }
    }
    post() {
        res.status(500);
        res.send("Wrong method");
    }
    put() {
        res.status(500);
        res.send("Wrong method");
    }
    delete() {
        res.status(500);
        res.send("Wrong method");
    }

}

module.exports = Statistics;
