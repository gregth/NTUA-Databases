const Routable = require('./Routable');

class Store extends Routable {
    get(req, res) {
        res.send('Show store.');
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
