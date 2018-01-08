const Routable = require('./Routable');

class Vehicle extends Routable {
    get(req, res) {
        res.send('Show vehicle profile!');
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
