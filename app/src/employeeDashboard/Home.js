import React, { Component } from 'react';
import {Card, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { Route } from 'react-router'
import StoreItem from '../StoreItem';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';
import moment from 'moment';
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
        };
    }

    loadData() {
        axios.get('http://localhost:3001/stores').then(response => {
            this.setState({stores: response.data});
        });
    }

    componentWillMount() {
        this.loadData();
    }

    handleInputChange = (event, value) => {
        event.persist();
        this.setState(state => state.customer_search[event.target.name] = value);
    }

    handleCustomerSearch = () => {
        let params = {};
        Object.keys(this.state.customer_search).forEach(key => {
            if (this.state.customer_search[key]) {
                params[key] = this.state.customer_search[key];
            }
        });

        axios.get('http://localhost:3001/clients/', {params})
            .then(res => {
                this.setState({customers: res.data});
            });
    }

    render() {
        let storeItems = [];
        if (this.state.stores) {
            storeItems = this.state.stores.map((item, index) => (<StoreItem key={index} store={item} rootPath='/employeeDashboard/' label='View Store' />));
        }

        let customerItems = [];
        if (this.state.customers.length) {
            customerItems = this.state.customers.map((item, index) => (<CustomerItem key={index} customer={item} refreshData={this.handleCustomerSearch} />));
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
                        </div>
                    </CardMedia>
				</Card>
            </div>
        );
   }
}

export default EmployeeHome;
