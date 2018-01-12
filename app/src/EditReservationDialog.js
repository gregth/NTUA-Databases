import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import axiosWrapper from './axiosWrapper';

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
        reservation.start_date = moment(reservation.start_date).format('YYYY-MM-DD HH:mm:ss')
        reservation.end_date = moment(reservation.end_date).format('YYYY-MM-DD HH:mm:ss')

        axiosWrapper.put('http://localhost:3001/reservations/' + reservation.reservation_id, reservation)
            .then(() => {
                this.props.handleDialogClose();
                this.props.refreshData();
            });
    }

    handleDateChange(type, event, date) {
        const state = this.state;
        state.reservation[type] = date;
        state.reservation.amount = this.getTotalAmount(state);

        this.setState(state);
    }

    render() {
		let actions = [
			<FlatButton
				label='Close'
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
