import React, { Component } from 'react';
import {Card, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ReservationItem from './ReservationItem';
import StoreItem from './StoreItem';
import Subheader from 'material-ui/Subheader';
import axiosWrapper from './axiosWrapper';
import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: null,
            reservations: null,
            clientId: localStorage.getItem('clientId'),
        };
    }

    loadData() {
        axiosWrapper.get('http://localhost:3001/stores').then(response => {
            this.setState({stores: response.data});
        });

        axiosWrapper.get('http://localhost:3001/reservations/?client_id=' + this.state.clientId).then(response => {
            const reservations = response.data;
            reservations.forEach(item => {
                item.start_date = moment(item.start_date).format("YYYY-MM-DD HH:mm:ss");
                item.end_date = moment(item.end_date).format("YYYY-MM-DD HH:mm:ss");
            });

            this.setState({reservations});
        });
    }

    componentWillMount() {
        this.loadData();
    }

    render() {
        let reservationItems = [];
        if (this.state.reservations) {
            reservationItems = this.state.reservations.map((item, index) => (<ReservationItem key={index} reservation={item} refreshData={this.loadData.bind(this)} />));
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
                            {reservationItems.length ? reservationItems : ''}
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
