import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';

class ReservationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            store: null,
            vehicle: null,
            reservation: props.data,
        }
    }

    componentWillMount() {
        const {data} = this.props;

        if (!data.store_id || !data.vehicle_id) {
            throw new Error('No store or vehicle id were defined.');
        }

        Promise.all([
            axios.get('http://localhost:3001/stores/' + data.store_id),
            axios.get('http://localhost:3001/vehicles/' + data.vehicle_id),
        ]).then(([store, vehicle]) => {
            this.setState({
                dataReady: true,
                store: store.data,
                vehicle: vehicle.data,
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
        const dates = `${reservation.start_date} - ${reservation.end_date}`; 
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
					<RaisedButton label='Edit' />
					<RaisedButton backgroundColor='#900' labelColor='#fff' label='Cancel' />
				</CardActions>
            </Card>
        );
    }
}

export default ReservationItem;
