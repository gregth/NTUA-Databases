import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import moment from 'moment';

class EndRentalId extends Component {
    constructor(props) {
        super(props);

        this.state = this.defaultValues();
    }

    defaultValues() {
        return {
            type: '',
            brand: '',
            model: '',
            cc: '',
            horse_power: '',
            plate_number: '',
            buy_date: '',
            kilometers: '',
            last_service: '',
            next_service: '',
            insurance_expiration: '',
            price: '',
        };
    }

    handleInputChange = (event, value) => {
        event.persist();
        const state = this.state;
        state[event.target.name] = value;

        this.setState(state);
    }

    handleSubmit = () => {
        const data = {
            type: this.state.type,
            brand: this.state.brand,
            model: this.state.model,
            cc: this.state.cc,
            horse_power: this.state.horse_power,
            plate_number: this.state.plate_number,
            buy_date: moment(this.state.buy_date).format("YYYY-MM-DD HH:mm:ss"),
            kilometers: +this.state.kilometers,
            last_service: moment(this.state.last_service).format("YYYY-MM-DD HH:mm:ss"),
            next_service: moment(this.state.next_service).format("YYYY-MM-DD HH:mm:ss"),
            insurance_expiration: moment(this.state.insurance_expiration).format("YYYY-MM-DD HH:mm:ss"),
            price: +this.state.price,
        };

        this.props.onSubmit(data);
        this.setState(this.defaultValues());
    }

    render() {
		let actions = [
			<FlatButton
				label='Close'
				onClick={this.props.handleDialogClose}
			/>,
			<FlatButton
				label='Add vehicle'
				primary={true}
				onClick={this.handleSubmit}
			/>,
		];

        const fields = [
            {name: 'type', label: 'Vehicle Type'},
            {name: 'brand', label: 'Brand'},
            {name: 'model', label: 'Model'},
            {name: 'cc', label: 'CC'},
            {name: 'horse_power', label: 'Horse Power'},
            {name: 'plate_number', label: 'Plate Number'},
            {name: 'buy_date', label: 'Buy Date (YYYY-MM-DD)'},
            {name: 'kilometers', label: 'Kilometers'},
            {name: 'last_service', label: 'Last Service (YYYY-MM-DD)'},
            {name: 'next_service', label: 'Next Service (YYYY-MM-DD)'},
            {name: 'insurance_expiration', label: 'Insurance Expire (YYYY-MM-DD)'},
            {name: 'price', label: 'Price $'},
        ];
        const vehicleDetails = fields.map((item, index) => (
            <TextField
                    key={index}
                    name={item.name}
                    onChange={this.handleInputChange}
                    value={this.state[item.name]}
                    floatingLabelText={item.label}
                    floatingLabelFixed={true}
                    style={{width: '45%', marginRight: '20px'}}
                />
        ));

        return (
            <Dialog
                title='New vehicle'
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDialogClose}
            >
                {vehicleDetails}
            </Dialog>
        );
    }
}

export default EndRentalId;
