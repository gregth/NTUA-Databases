import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import EditReservationDialog from './EditReservationDialog';
import axios from 'axios';
import moment from 'moment';

class ReservationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
			dialogOpen: false,
            dataReady: false,
            store: null,
            vehicle: null,
            reservation: props.reservation,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({reservation: nextProps.reservation});
    }

    handleCancel = () => {
        axios.delete('http://localhost:3001/reservations/' + this.state.reservation.reservation_id)
            .then(() => {
                this.props.refreshData();
            });
    }

    handleEditSubmit = () => {
        console.log(this.state.reservation);
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    }

    componentWillMount() {
        const {reservation} = this.state;

        if (!reservation.store_id || !reservation.vehicle_id) {
            throw new Error('No store or vehicle id were defined.');
        }

        Promise.all([
            axios.get('http://localhost:3001/stores/' + reservation.store_id),
            axios.get('http://localhost:3001/vehicles/' + reservation.vehicle_id),
        ]).then(([store, vehicle]) => {
            this.setState({
                dataReady: true,
                store: store.data[0],
                vehicle: vehicle.data[0],
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        const {reservation, store, vehicle} = this.state;
        const dates = `${moment(reservation.start_date).format('ll')} - ${moment(reservation.end_date).format('ll')}`;
        const store_address = `${store.street_name} ${store.street_number}, ${store.postal_code} ${store.city}, ${store.country}`;
        const vehicle_name = `${vehicle.brand} ${vehicle.model}`;

        return (
            <Card className='reservationItem'>
                <CardMedia className='cardMedia'>
                    <img src='vehicles/tesla-model-3.png' alt='tesla' />
                </CardMedia>
				<CardTitle title={vehicle_name} />
				<CardText style={{paddingTop: 0}}>
					<List>
						<ListItem
                            disabled={true}
                            primaryText='Dates'
                            style={{padding: '8px 0'}}
                            secondaryText={dates}/>

						<ListItem
                            disabled={true}
                            primaryText='Pickup'
                            style={{padding: '8px 0'}}
                            secondaryText={store_address}>
                            <a className='list-right' target='_blank' href={'https://www.google.gr/maps/search/' + encodeURIComponent(store_address)}>Map</a>
                        </ListItem>

						<ListItem
                            disabled={true}
                            primaryText='Amount'
                            style={{padding: '8px 0'}}
                        >
                            <span style={{fontWeight: 'bold'}}className='list-right'>{reservation.amount} $</span>
                        </ListItem>
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
					<RaisedButton label='Edit' onClick={this.handleDialogOpen}/>
					<RaisedButton backgroundColor='#900' labelColor='#fff' label='Cancel' onClick={this.handleCancel} />
				</CardActions>

                <EditReservationDialog open={this.state.dialogOpen}
                handleDialogClose={this.handleDialogClose}
                handleDialogOpen={this.handleDialogOpen}
                refreshData={this.props.refreshData}
                dailyPrice={this.state.vehicle.price}
                reservation={this.state.reservation} />
            </Card>
        );
    }
}

export default ReservationItem;
