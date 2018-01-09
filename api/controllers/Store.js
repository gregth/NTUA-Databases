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
        res.send(result);
    }

    post() {
    }

    put(req, res) {
        res.send('Update store!');
    }

    delete(req, res) {
        res.send('Delete store!');
    }
}

module.exports = Store;
