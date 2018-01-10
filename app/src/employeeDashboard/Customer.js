import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ReservationItem from '../ReservationItem';
import axios from 'axios';

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            details: null,
            start_date: null,
            end_date: null,
            reservations: null,
        };
    }

    loadData() {
        const {customerId} = this.props.match.params;

        axios.get('http://localhost:3001/clients/' + customerId).then(response => {
            this.setState({details: response.data, dataReady: true});
        });

        axios.get('http://localhost:3001/reservations/?client_id=' + customerId).then(response => {
            this.setState({reservations: response.data});
        });
    }

    componentWillMount() {
        this.loadData();
    }

    handleDateChange(type, event, date) {
        this.setState(state => state[type] = date);
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        let reservationItems = [];
        if (this.state.reservations) {
            reservationItems = this.state.reservations.map((item, index) => (<ReservationItem key={index} reservation={item} refreshData={this.loadData.bind(this)} />));
        }

        const fields = [
            {name: 'first_name', label: 'First Name'}, {name: 'last_name', label: 'Last Name'},
            {name: 'street_name', label: 'Street Name'},
            {name: 'street_number', label: 'Street Number'},
            {name: 'postal_code', label: 'Postal Code'},
            {name: 'city', label: 'City'},
            {name: 'country', label: 'Country'},
            {name: 'email', label: 'Email'},
            {name: 'identity_number', label: 'Identification Number'},
        ];
        const customerDetails = fields.map((item, index) => (
            <TextField
                style={{width: 160, marginRight: '10px'}}
                key={index}
                name={item.name}
                onChange={this.handleInputChange}
                value={this.state.details[item.name]}
                floatingLabelText={item.label}
                floatingLabelFixed={true}
            />
        ));

        return (
            <Card className='store'>
				<CardText style={{paddingTop: 0}}>
                    <Subheader>Customer Details</Subheader>
                    <Divider />
                    {customerDetails}
                    <div className='clear' />
                    <RaisedButton label='Save'
                    style={{margin: 'auto', display: 'block', width: '100px'}}
                    onClick={this.handleCustomerSearch}/>

                    <Subheader style={{marginTop: '20px'}}>Reservations</Subheader>
                    <Divider />
                    {reservationItems.length ? reservationItems : ''}
                    <div className='clear' />
				</CardText>
            </Card>
        );
    }
}

export default Store;
