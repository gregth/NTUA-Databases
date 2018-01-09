import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import moment from 'moment';

class Vehicle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle_id: props.id,
            dataReady: false,
            details: null,
        };
    }

    componentWillMount() {
        axios.get('http://localhost:3001/vehicles/' + this.state.vehicle_id).then(response => {
            this.setState({details: response.data[0], dataReady: true});
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
					<RaisedButton backgroundColor='#090' labelColor='#fff' label='Book' fullWidth={true} />
				</CardActions>
            </Card>
        );
    }
}

export default Vehicle;
