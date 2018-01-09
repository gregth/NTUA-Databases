import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import moment from 'moment';
import ReservationDialog from './ReservationDialog';

class Vehicle extends Component {
    constructor(props) {
        super(props);

        const {data} = props;
        this.state = {
            vehicle_id: data.vehicle_id,
            dataReady: false,
            details: null,
			dialogOpen: false,
            bookingStatus: 'idle',
            reservationDetails: {
                start_date: moment(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
                end_date: moment(data.end_date).format("YYYY-MM-DD HH:mm:ss"),
                vehicle_id: data.vehicle_id,
                store_id: data.store_id,
                client_id: 11,
                has_paid: 0,
				company: false,
            },
        };
    }

    componentWillMount() {
        axios.get('http://localhost:3001/vehicles/' + this.state.vehicle_id).then(response => {
            this.setState({details: response.data[0], dataReady: true});
        });
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    }

    handleSubmit = (data) => {
        this.setState({bookingStatus: 'pending'});
        const price = this.state.details.price;
        const start_date = moment(this.state.reservationDetails.start_date);
        const end_date = moment(this.state.reservationDetails.end_date);
        const totalDays = Math.abs(end_date.diff(start_date, 'days'));
        const amount = totalDays * price

        const postData = this.state.reservationDetails;
        postData.amount = amount;

        axios.post('http://localhost:3001/reservations', postData)
            .then(response => {
                if (response.data.reservation_number) {
                    this.setState({bookingStatus: 'success'});
                    setTimeout(this.props.history.push.bind(this, '/home'), 3000);
                }
            });
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        const vehicle = this.state.details;

        return (
            <Card className='vehicleItem'>
                <CardMedia className='cardMedia'>
                    <img src='/vehicles/tesla-model-3.png' alt='tesla' />
                </CardMedia>
				<CardTitle title={vehicle.brand + ' ' + vehicle.model} />
				<CardText style={{paddingTop: 0}}>
					<List>
						<ListItem
                            disabled={true}
                            primaryText='Type'
                            style={{padding: '8px 0'}}
                            secondaryText={vehicle.type}/>

						<ListItem
                            disabled={true}
                            primaryText='CC'
                            style={{padding: '8px 0'}}
                            secondaryText={vehicle.cc}/>

						<ListItem
                            disabled={true}
                            primaryText='Horsepower'
                            style={{padding: '8px 0'}}
                            secondaryText={vehicle.horse_power + 'hp'}/>

						<ListItem
                            disabled={true}
                            primaryText='Kilometers'
                            style={{padding: '8px 0'}}
                            secondaryText={vehicle.kilometers}/>

						<ListItem
                            disabled={true}
                            primaryText='Price per day'
                            style={{padding: '8px 0'}}
                        >
                            <span style={{fontWeight: 'bold'}}className='list-right'>{vehicle.price} $</span>
                        </ListItem>
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
					<RaisedButton onClick={this.handleDialogOpen} backgroundColor='#090' labelColor='#fff' label='Book' fullWidth={true} />
				</CardActions>

                <ReservationDialog bookingStatus={this.state.bookingStatus} open={this.state.dialogOpen} handleDialogClose={this.handleDialogClose} handleDialogOpen={this.handleDialogOpen} onSubmit={this.handleSubmit}/>
            </Card>
        );
    }
}

export default Vehicle;
