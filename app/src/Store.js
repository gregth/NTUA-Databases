import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Vehicle from './Vehicle';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            details: null,
            start_date: null,
            end_date: null,
            vehicles: null,
            phones: [],
            emails: [],
        };
    }

    componentWillMount() {
        const {storeId} = this.props.match.params;

        axios.get('http://localhost:3001/stores/' + storeId).then(response => {
            this.setState({details: response.data, dataReady: true});
        });

        axios.get('http://localhost:3001/contacts/?store_id=' + storeId).then(response => {
            const phones = [];
            const emails = [];
            response.data.forEach(item => {
                if (item.type == 'telephone') {
                    phones.push(item.value);
                } else if (item.type == 'email') {
                    emails.push(item.value);
                }
            })

            this.setState({emails, phones});
        });
    }

    searchVehicles(state) {
        const params = {
            start_date: moment(state.start_date).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(state.end_date).format('YYYY-MM-DD HH:mm:ss'),
            store_id: this.props.match.params.storeId,
        }
        axios.get('http://localhost:3001/vehicles', {params})
            .then(res => {
                this.setState({vehicles: res.data});
            });
    }

    handleDateChange(type, event, date) {
        const state = this.state;
        state[type] = date;
        this.setState(state);

        if (this.state.start_date && this.state.end_date) {
            this.searchVehicles(state);
        }
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        const store = this.state.details;
        let store_address = `${store.street_name} ${store.street_number}, ${store.postal_code} ${store.city}, ${store.country}`;

        let vehicleItems = null;
        if (this.state.vehicles) {
            vehicleItems = this.state.vehicles.map((vehicle, index) => {
                const data = {
                    vehicle_id: vehicle.vehicle_id,
                    vehicle,
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    store_id: store.store_id,
                }
                return (<Vehicle data={data} key={index} history={this.props.history} />);
            });
        }

        return (
            <Card className='store'>
				<CardText style={{paddingTop: 0}}>
                    <div className='store-data'>
                        <div className='store-img'>
                            <img src='/stores/store.png' alt='store' />
                        </div>
                        <List className='store-details'>
                            <ListItem disabled={true}
                                primaryText={store.store_name}
                                style={{padding: '8px 0', fontSize: '18px'}} />

                            <ListItem
                                disabled={true}
                                primaryText='Address'
                                style={{padding: '8px 0'}}
                                secondaryText={store_address}>
                                <a className='list-right' target='_blank' href={'https://www.google.gr/maps/search/' + encodeURIComponent(store_address)}>Map</a>
                            </ListItem>

                            <ListItem
                                disabled={true}
                                primaryText='Telephones'
                                style={{padding: '8px 0'}}
                                secondaryText={this.state.phones.join(', ')}/>

                            <ListItem
                                disabled={true}
                                primaryText='Emails'
                                style={{padding: '8px 0'}}
                                secondaryText={this.state.emails.join(', ')}/>
                        </List>
                        <div className='clear' />
                    </div>

                    <Subheader style={{marginTop: '20px'}}>Vehicles</Subheader>
                    <Divider />
					<DatePicker
						floatingLabelText='Start Date'
						minDate={new Date()}
                        style={{float: 'left', marginRight: '20px'}}
                        onChange={this.handleDateChange.bind(this, 'start_date')}
					/>
					<DatePicker
						floatingLabelText='End Date'
                        onChange={this.handleDateChange.bind(this, 'end_date')}
						minDate={this.state.start_date || new Date()}
					/>
                    <div className='clear' />
                    {vehicleItems ? vehicleItems : 'Please choose start and end date to show the available vehicles.'}
                    <div className='clear' />
				</CardText>
            </Card>
        );
    }
}

export default Store;
