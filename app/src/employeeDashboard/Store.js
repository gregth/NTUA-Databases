import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Vehicle from './Vehicle';
import AddVehicleDialog from './AddVehicleDialog';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
			dialogOpen: false,
            dataReady: false,
            details: null,
            start_date: null,
            end_date: null,
            vehicles: null,
        };
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    }

    handleNewVehicle = (data) => {
        data.last_seen_at = +this.props.match.params.storeId;
        data.store_id = +this.props.match.params.storeId;
        axios.post('http://localhost:3001/vehicles', data)
            .then(res => {
                alert('Vehicle added successfully');
                this.handleDialogClose();
                this.loadData();
            })
            .catch(e => {
                alert(e);
                console.log(e);
            });
    }

    loadData = () => {
        const {storeId} = this.props.match.params;

        axios.get('http://localhost:3001/stores/' + storeId).then(response => {
            this.setState({details: response.data, dataReady: true});
        });

        const vehicleParams = {
            store_id: this.props.match.params.storeId
        };
        axios.get('http://localhost:3001/vehicles', {params: vehicleParams})
            .then(res => {
                this.setState({vehicles: res.data});
            });
    }

    componentWillMount() {
        this.loadData();
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        const store = this.state.details;
        let store_address = `${store.street_name} ${store.street_number}, ${store.postal_code} ${store.city}, ${store.country}`;
        let store_phone = '6983317150';
        let store_email = 'Kaisariani@rental.com';

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
                return (<Vehicle data={data} key={index} refreshData={this.loadData} />);
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
                                primaryText='Telephone'
                                style={{padding: '8px 0'}}
                                secondaryText={store_phone}/>

                            <ListItem
                                disabled={true}
                                primaryText='Email'
                                style={{padding: '8px 0'}}
                                secondaryText={store_email}/>
                        </List>
                        <div className='clear' />
                    </div>

                    <Subheader style={{marginTop: '20px'}}>Vehicles</Subheader>
                    <Divider />
					<RaisedButton onClick={this.handleDialogOpen} label='Add' />
                    <div className='clear' />
                    {vehicleItems ? vehicleItems : 'Please choose start and end date to show the available vehicles.'}
                    <div className='clear' />
				</CardText>

                <AddVehicleDialog open={this.state.dialogOpen}
                handleDialogClose={this.handleDialogClose}
                handleDialogOpen={this.handleDialogOpen}
                refreshData={this.props.refreshData}
                onSubmit={this.handleNewVehicle} />
            </Card>
        );
    }
}

export default Store;
