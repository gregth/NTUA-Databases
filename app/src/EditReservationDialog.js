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
            reservation: props.reservation,
        };
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
        this.setState(state => state.reservation[type] = moment(date).format("YYYY-MM-DD HH:mm:ss"));
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

        /*
        let bookingMessage;
        if (this.props.bookingStatus !== 'idle') {
            actions = null;

            if (this.props.bookingStatus === 'success') {
                bookingMessage = (<h3>Your booking is complete! Redirecting..</h3>);
            }
        }
        */

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
            </Dialog>
        );
    }
}

export default EditReservationDialog;
