import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import axios from 'axios';

class EditReservationDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reservation: Object.assign({}, props.reservation),
        };
    }

    getTotalAmount(state) {
        const price = this.props.dailyPrice;
        const start_date = moment(state.reservation.start_date);
        const end_date = moment(state.reservation.end_date);
        const totalDays = Math.abs(end_date.diff(start_date, 'days'));
        const amount = totalDays * price

        return amount;
    }

    handleSubmit = () => {
        const {reservation} = this.state;
        axios.put('http://localhost:3001/reservations/' + reservation.reservation_id, reservation)
            .then(() => {
                this.props.handleDialogClose();
                this.props.refreshData();
            });
    }

    handleDateChange(type, event, date) {
        const state = this.state;
        this.state.reservation[type] = moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.state.reservation.amount = this.getTotalAmount(state);

        this.setState(state);
    }

    render() {
		let actions = [
			<FlatButton
				label='Cancel'
				onClick={this.props.handleDialogClose}
			/>,
			<FlatButton
				label='Update'
				primary={true}
				onClick={this.handleSubmit}
			/>,
		];

        return (
            <Dialog
                title='Billing Details'
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDialogClose}
            >
                <DatePicker
                    floatingLabelText='Start Date'
                    minDate={new Date()}
                    maxDate={new Date(this.state.reservation.end_date) || null}
                    value={new Date(this.state.reservation.start_date)}
                    style={{float: 'left', marginRight: '20px'}}
                    onChange={this.handleDateChange.bind(this, 'start_date')}
                />
                <DatePicker
                    floatingLabelText='End Date'
                    onChange={this.handleDateChange.bind(this, 'end_date')}
                    minDate={new Date(this.state.reservation.start_date) || new Date()}
                    value={new Date(this.state.reservation.end_date)}
                />
                <h3>New amount: {this.state.reservation.amount} $</h3>
            </Dialog>
        );
    }
}

export default EditReservationDialog;
