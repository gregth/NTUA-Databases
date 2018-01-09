const Routable = require('./Routable');

class Client extends Routable {
    get(req, res) {
        res.send('Show client profile!');
    }

    async post(req, res) {
        let param = {
            identity_number: req.body["identity_number"],
            first_name: req.body["first_name"],
            last_name: req.body["last_name"],
            street_name: req.body["street_name"],
            street_number: req.body["street_number"],
            postal_code : req.body["postal_code"],
            city: req.body["city"],
            country: req.body["country"],
            email: req.body["email"],
            password: req.body["password"],
        };
        console.log(param);
        let result = await this.db.insert('clients', param)
        res.send('Create client profile!');
        //console.log(result);

    }

    async put(req, res) {
        let param = {
            license_id: req.body["license_id"],
            identity_number: req.body["identity_number"],
            first_name: req.body["first_name"],
            last_name: req.body["last_name"],
            street_name: req.body["street_name"],
            street_number: req.body["street_number"],
            postal_code : req.body["postal_code"],
            city: req.body["city"],
            country: req.body["country"],
            email: req.body["email"],
            password: req.body["password"],
        };
        await this.db.update('clients', param)
        res.send('Update client profile!');
    }

    delete(req, res) {
        res.send('Delete client profile!');
    }
}

module.exports = Client;
