import React, { Component } from 'react';
import {Card, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import StoreItem from '../StoreItem';
import Subheader from 'material-ui/Subheader';
import axiosWrapper from '../axiosWrapper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CustomerItem from './CustomerItem';

class EmployeeHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: null,
            customer_search: {
                first_name:  '',
                last_name: '',
                identity_number: '',
            },
            customers: [],
            bestCustomers: [],
        };
    }

    loadData() {
        axiosWrapper.get('http://localhost:3001/stores').then(response => {
            this.setState({stores: response.data});

            axiosWrapper.get('http://localhost:3001/statistics/count_vehicles').then(response => {
                const state = this.state;
                response.data.forEach(storeInfo => {
                    state.stores.forEach(store => {
                        if (store.store_id === storeInfo.store_id) {
                            store.vehicle_count = storeInfo.count;
                        }
                    });

                    this.setState(state);
                });
            });
        });

        axiosWrapper.get('http://localhost:3001/statistics/good_clients')
            .then(res => {
                this.setState({bestCustomers: res.data});
            });
    }

    componentWillMount() {
        this.loadData();
    }

    handleInputChange = (event, value) => {
        event.persist();
        const state = this.state;
        state.customer_search[event.target.name] = value;

        this.setState(state);
    }

    handleCustomerSearch = () => {
        let params = {};
        Object.keys(this.state.customer_search).forEach(key => {
            if (this.state.customer_search[key]) {
                params[key] = this.state.customer_search[key];
            }
        });

        axiosWrapper.get('http://localhost:3001/clients/', {params})
            .then(res => {
                this.setState({customers: res.data});
            });
    }

    render() {
        let storeItems = [];
        if (this.state.stores) {
            storeItems = this.state.stores.map((item, index) => (<StoreItem key={index} store={item} rootPath='/employee/' label='View Store' />));
        }

        let customerItems = [];
        if (this.state.customers.length) {
            customerItems = this.state.customers.map((item, index) => (<CustomerItem key={item.client_id} customer={item} refreshData={this.handleCustomerSearch} />));
        }

        let bestCustomerItems = [];
        if (this.state.bestCustomers.length) {
            bestCustomerItems = this.state.bestCustomers.map((item, index) => (<CustomerItem key={item.client_id} customer={item} refreshData={this.handleCustomerSearch} />));
        }

        const fields = [
            {name: 'first_name', label: 'First Name'},
            {name: 'last_name', label: 'Last Name'},
            {name: 'identity_number', label: 'Identification Number'},
        ];

        let inputElements = fields.map((item, index) => {
            return (<TextField
                style={{width: 160, marginRight: '10px'}}
                key={index}
                name={item.name}
                onChange={this.handleInputChange}
                value={this.state[item.name]}
                floatingLabelText={item.label}
                floatingLabelFixed={true}
            />);
        });

        return (
            <div className='EmployeeHome'>
				<Card>
                    <CardMedia className='cardMedia'>
                        <div>
                            <Subheader>Customers</Subheader>
                            <Divider />
                            {inputElements}
                            <RaisedButton label='Search' style={{position:
                            'relative', top: '-12px'}}
                            onClick={this.handleCustomerSearch}/>

                            <Divider />

                            {customerItems}

                            <div className='clear' />
                            <Subheader>Stores</Subheader>
                            <Divider />
                            {storeItems.length ? storeItems : ''}
                            <div className='clear' />

                            <Subheader>Best clients</Subheader>
                            <Divider />
                            {bestCustomerItems.length ? bestCustomerItems : ''}
                            <div className='clear' />
                        </div>
                    </CardMedia>
				</Card>
            </div>
        );
   }
}

export default EmployeeHome;
