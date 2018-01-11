import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import EndRentalDialog from './EndRentalDialog';
import axios from 'axios';
import moment from 'moment';

class RentalItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
			dialogOpen: false,
            dataReady: false,
            store: null,
            vehicle: null,
        }
    }

    handleRentalEnd = (damage_score) => {
        const rentalData = {
            receiver_employee_id: this.props.employeeId,
            end_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            damage_score,
        }
        axios.put('http://localhost:3001/rentals/' + this.props.rental.rental_id, rentalData)
            .then(res => {
                console.log(res);
                this.handleDialogClose();
                this.props.refreshData();
            });
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    }

    componentWillMount() {
        const {rental} = this.props;

        if (!rental.vehicle_id || !rental.store_id) {
            throw new Error('No store or vehicle id were defined.');
        }

        Promise.all([
            axios.get('http://localhost:3001/stores/' + rental.store_id),
            axios.get('http://localhost:3001/vehicles/' + rental.vehicle_id),
        ]).then(([store, vehicle]) => {
            this.setState({
                dataReady: true,
                store: store.data,
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

        const {rental} = this.props;
        const {store, vehicle} = this.state;
        const reservation_dates = `${moment(rental.reservation_start_date).format('ll')} - ${moment(rental.reservation_end_date).format('ll')}`;
        const rental_start_date = moment(rental.start_date).format('ll')
        const vehicle_name = `${vehicle.brand} ${vehicle.model}`;

        return (
            <Card className='rentalItem'>
                <CardMedia className='cardMedia'>
                    <img src='/vehicles/tesla-model-3.png' alt='tesla' />
                </CardMedia>
				<CardTitle title={vehicle_name} />
				<CardText style={{paddingTop: 0}}>
					<List>
						<ListItem
                            disabled={true}
                            primaryText='Store Name'
                            style={{padding: '8px 0'}}
                            secondaryText={store.store_name}/>

						<ListItem
                            disabled={true}
                            primaryText='Reservation dates'
                            style={{padding: '8px 0'}}
                            secondaryText={reservation_dates}/>

						<ListItem
                            disabled={true}
                            primaryText='Rental start'
                            style={{padding: '8px 0'}}
                            secondaryText={rental_start_date}/>

						<ListItem
                            disabled={true}
                            primaryText='Amount'
                            style={{padding: '8px 0'}}
                        >
                            <span style={{fontWeight: 'bold'}}className='list-right'>{rental.amount} $</span>
                        </ListItem>
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
                    <RaisedButton
                    backgroundColor='#900' labelColor='#fff' label='End rental'
                    onClick={this.handleDialogOpen} />
				</CardActions>

                <EndRentalDialog open={this.state.dialogOpen}
                handleDialogClose={this.handleDialogClose}
                handleDialogOpen={this.handleDialogOpen}
                refreshData={this.props.refreshData}
                onSubmit={this.handleRentalEnd} />
            </Card>
        );
    }
}

export default RentalItem;
