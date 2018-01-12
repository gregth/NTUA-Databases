import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axiosWrapper from '../axiosWrapper';
import moment from 'moment';

class CustomerItem extends Component {
    handleRemove = () => {
        axiosWrapper.delete('http://localhost:3001/clients/' + this.props.customer.client_id)
            .then(() => {
                this.props.refreshData();
            });
    }

    render() {
        const {customer} = this.props;

        const fields = [
            {name: 'first_name', label: 'First Name'},
            {name: 'last_name', label: 'Last Name'},
            {name: 'street_name', label: 'Street Name'},
            {name: 'street_number', label: 'Street Number'},
            {name: 'postal_code', label: 'Postal Code'},
            {name: 'city', label: 'City'},
            {name: 'country', label: 'Country'},
            {name: 'email', label: 'Email'},
            {name: 'identity_number', label: 'Identification Number'},
            {name: 'avg_amount', label: 'Average amount $'},
        ];
        const customerDetails = fields.map((item, index) => (
            customer[item.name] ? (<ListItem
                key={index}
                disabled={true}
                primaryText={item.label}
                style={{padding: '8px 0'}}
                secondaryText={customer[item.name]}/>) : ''
        ));

        return (
            <Card className='customerItem'>
				<CardText>
					<List>
                        {customerDetails}
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
					<RaisedButton href={'/employee/customer/' + customer.client_id} label='Edit'/>
					<RaisedButton backgroundColor='#900' labelColor='#fff' label='Remove' onClick={this.handleRemove} />
				</CardActions>
            </Card>
        );
    }
}

export default CustomerItem;
