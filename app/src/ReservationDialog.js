import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class ReservationDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: false,
            name: '',
            trn: '',
            phone: '',
            street_name: '',
            street_number: '',
            postal_code: '',
            city: '',
            country: '',
        };
    }

    updateCompanyCheck(event, value) {
        const state = this.state;
        state.company = value;
        this.setState(state);
    }

    handleInputChange = (event, value) => {
        event.persist();
        this.setState(state => state[event.target.name] = value);
    }

    handleSubmit = () => {
        const data = {
            is_company: +this.state.company,
            name: this.state.name,
            trn: this.state.trn,
            phone: this.state.phone,
            street_name: this.state.street_name,
            street_number: this.state.street_number,
            postal_code: this.state.postal_code,
            city: this.state.city,
            country: this.state.country,
        }
        if (!this.state.company) {
            delete data.trn;
        }

        this.props.onSubmit(data);
    }

    render() {
		let actions = [
			<FlatButton
				label='Cancel'
				onClick={this.props.handleDialogClose}
			/>,
			<FlatButton
				label='Confirm Booking'
				primary={true}
				onClick={this.handleSubmit}
			/>,
		];

        const fields = [
            {name: 'name', label: this.state.company ? 'Company Name' : 'Full Name'},
            {name: 'trn', label: 'TRN'},
            {name: 'phone', label: 'Phone Number'},
            {name: 'street_name', label: 'Street Name'},
            {name: 'street_number', label: 'Street Number'},
            {name: 'postal_code', label: 'Postal Code'},
            {name: 'city', label: 'City'},
            {name: 'country', label: 'Country'},
        ];

        let inputElements = fields.map((item, index) => {
            let disabled = false;
            if (!this.state.company && item.name == 'trn') {
                disabled = true;
            }

            return (<TextField
                key={index} name={item.name}
                onChange={this.handleInputChange}
                value={this.state[item.name]}
                style={{width: '45%', marginRight: '20px'}}
                disabled={disabled}
                floatingLabelText={item.label}
                floatingLabelFixed={true}
            />);
        });

        let bookingMessage;
        if (this.props.bookingStatus === 'success') {
            actions = null;
            bookingMessage = (<h3>Your booking is complete! Redirecting..</h3>);
        }

        return (
            <Dialog
                title='Billing Details'
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDialogClose}
            >
                {this.props.bookingStatus == 'error' ? (
                    <span style={{color: '#900', display: 'block'}}>There was an error saving the reservation. Try again.</span>
                ) : ''}
                {this.props.bookingStatus !== 'success' ? (
                <div>
                    <Checkbox
                        label='Company'
                        checked={this.state.company}
                        onCheck={this.updateCompanyCheck.bind(this)}
                    />
                    {inputElements}
                </div>
                ) : bookingMessage}
            </Dialog>
        );
    }
}

export default ReservationDialog;
