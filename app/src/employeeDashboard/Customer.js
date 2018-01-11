import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ReservationItem from '../ReservationItem';
import RentalItem from './RentalItem';
import axios from 'axios';

class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            details: null,
            start_date: null,
            end_date: null,
            reservations: null,
            rentals: null,
            license:{
                license_number: '',
                car: 0,
                moto: 0,
                truck: 0,
                minivan: 0,
                atv: 0,
            }
        };
    }

    loadData() {
        const {customerId} = this.props.match.params;

        axios.get('http://localhost:3001/clients/' + customerId).then(response => {
            const client = response.data;
            this.setState({details: client, dataReady: true});

            if (client.license_id) {
                axios.get('http://localhost:3001/licenses/' + client.license_id).then(response => {
                    this.setState({license: response.data});
                });
            }
        });

        axios.get('http://localhost:3001/reservations/?client_id=' + customerId).then(response => {
            this.setState({reservations: response.data});
        });

        axios.get('http://localhost:3001/rentals/?client_id=' + customerId).then(response => {
            this.setState({rentals: response.data});
        });
    }

    componentWillMount() {
        this.loadData();
    }

    updateLicensePermit(event, value) {
        const state = this.state;
        state.license[event.target.name] = +value;
        this.setState(state);
    }

    handleInputChange = (event, value) => {
        event.persist();
        if (event.target.name == 'license_number') {
            this.setState(state => state.license[event.target.name] = value);
        } else {
            this.setState(state => state.details[event.target.name] = value);
        }
    }

    handleCustomerSave = () => {
        const {customerId} = this.props.match.params;

        const data = Object.assign({}, this.state.details);
        delete data.license_id; // license will be edited from elsewere
        axios.put('http://localhost:3001/clients/' + customerId, data)
            .then(res => {
                alert('User has been updated successfully.');
            });
    }

    handleLicenseSave = () => {
        const {customerId} = this.props.match.params;

        if (!this.state.details.license_id) {
            axios.post('http://localhost:3001/licenses/', this.state.license)
                .then(res => {
                    const insertId = res.data.resource_id;

                    return axios.put('http://localhost:3001/clients/' + customerId, {license_id: insertId});
                })
                .then(res => {
                    alert('The license has been inserted successfully.');
                });
        } else {
            axios.put('http://localhost:3001/licenses/' + this.state.license.license_id, this.state.license)
                .then(res => {
                    alert('License information has been updated successfully.');
                });
        }
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        let rentalItems = [];
        if (this.state.rentals) {
            rentalItems = this.state.rentals.map((item, index) => (<RentalItem key={index} rental={item} refreshData={this.loadData.bind(this)} employeeId={2} />));
        }

        let reservationItems = [];
        if (this.state.reservations) {
            reservationItems = this.state.reservations.map((item, index) => (<ReservationItem key={index} reservation={item} refreshData={this.loadData.bind(this)} employeeId={2} />));
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

        const licensePermits = ['car', 'moto', 'truck', 'minivan', 'atv'].map((item, index) => (
            <Checkbox
                key={index}
                label={item}
                name={item}
                checked={!!this.state.license[item]}
                onCheck={this.updateLicensePermit.bind(this)}
            />
        ));

        return (
            <Card className='store'>
				<CardText style={{paddingTop: 0}}>
                    <Subheader>Customer Details</Subheader>
                    <Divider />
                    {customerDetails}
                    <div className='clear' />
                    <RaisedButton label='Save' style={{margin: 'auto', display:
                    'block', width: '100px'}}
                    onClick={this.handleCustomerSave}/>

                    <Subheader style={{marginTop: '20px'}}>License</Subheader>
                    <Divider />
                    <TextField
                        style={{width: 160, marginRight: '10px', float: 'left'}}
                        name='license_number'
                        onChange={this.handleInputChange}
                        value={this.state.license.license_number}
                        floatingLabelText='License Number'
                        floatingLabelFixed={true}
                    />
                    {licensePermits}
                    <RaisedButton label='Save' style={{margin: 'auto', display:
                    'block', width: '100px'}}
                    onClick={this.handleLicenseSave}/>

                    <Subheader style={{marginTop: '20px'}}>Active rentals</Subheader>
                    <Divider />
                    {rentalItems.length ? rentalItems : ''}
                    <div className='clear' />

                    <Subheader style={{marginTop: '20px'}}>Reservations</Subheader>
                    <Divider />
                    {reservationItems.length ? reservationItems : ''}
                    <div className='clear' />
				</CardText>
            </Card>
        );
    }
}

export default Customer;
