import React, { Component } from 'react';
import {Card, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ReservationItem from './ReservationItem';
import Subheader from 'material-ui/Subheader';

class Home extends Component {
    render() {
        const data = {
            start_date: '11 Jan 2017',
            end_date: '15 Jan 2017',
            vehicle_id: 12,
            customer_id: 33,
            reservation_id: 2,
            store_id: 2,
            amount: 143.2
        }

        return (
            <div className='Home'>
				<Card>
                    <CardMedia className='cardMedia'>
                        <div>
                            <Subheader>Reservations</Subheader>
                            <Divider />
                            <ReservationItem data={data} />
                            <ReservationItem data={data} />
                            <ReservationItem data={data} />
                            <div className='clear' />
                            <Subheader>Available stores</Subheader>
                            <Divider />
                        </div>
                    </CardMedia>
				</Card>
            </div>
        );
    }
}

export default Home;
