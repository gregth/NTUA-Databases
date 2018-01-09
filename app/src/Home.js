import React, { Component } from 'react';
import {Card, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ReservationItem from './ReservationItem';
import StoreItem from './StoreItem';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: null
        };
    }

    componentWillMount() {
        axios.get('http://localhost:3001/stores').then(response => {
            this.setState({stores: response.data});
        });
    }

    render() {
        const data = {
            start_date: '11 Jan 2017',
            end_date: '15 Jan 2017',
            vehicle_id: 12,
            customer_id: 33,
            reservation_id: 2,
            store_id: 1,
            amount: 143.2
        }

        let storeItems = [];
        if (this.state.stores) {
            storeItems = this.state.stores.map((item, index) => (<StoreItem key={index} store={item} />));
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
                            {storeItems.length ? storeItems : ''}
                            <div className='clear' />
                        </div>
                    </CardMedia>
				</Card>
            </div>
        );
   }
}

export default Home;
