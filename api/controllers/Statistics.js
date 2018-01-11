const Routable = require('./Routable');
const order_field = require('../lib').order_field;

class Statistics extends Routable {
    constructor(router) {
        super(router);
    }
    async get(req, res) {
        let result;
        if (req.params.type == 'count_vehicles') {
            let query = `SELECT s.store_name, s.store_id, COUNT(vehicle_id) FROM
                stores AS s, vehicles AS v WHERE v.store_id = s.store_id
                GROUP BY s.store_id`;
            console.log("QUERY: " + query);
            try {
                [result] = await this.db.execute(query);
            } catch(e) {
                res.status(500);
                console.log(e);
                res.send(e);
            }
            res.status(200);
            res.send(result);
        } else if (req.params.type == 'good_clients') {
            let value = [];
            if (req.params.value) {
                value.push(req.params.value);
            } else {
                value.push(50);
            }

            let query = `SELECT c.first_name, c.last_name, AVG(r.amount) 
                FROM reservations AS r 
                JOIN clients AS c ON c.client_id = r.client_id
                GROUP BY c.client_id
                HAVING AVG(r.amount) >= ?`;
            console.log("QUERY: " + query);
            try {
                [result] = await this.db.execute(query, value);
            } catch(e) {
                res.status(500);
                console.log(e);
                res.send(e);
            }
            res.status(200);
            res.send(result);
        } else if (req.params.type == 'vehicles_service') {
            let query = `SELECT * from upcoming_services`;
            try {
                [result] = await this.db.execute(query);
                res.status(200);
                res.send(result);
            } catch(e) {
                res.status(500);
                console.log(e);
                res.send(e);
            }
        } else {
            res.status(400);
            res.send("Not found");
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
