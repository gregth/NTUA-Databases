const Routable = require('./Routable');

class Client extends Routable {
    get(req, res) {
        res.send('Show client profile!');
    }

    post() {
    }

    put(req, res) {
        res.send('Update client profile!');
    }

    delete(req, res) {
        res.send('Delete client profile!');
    }
}

module.exports = Client;
