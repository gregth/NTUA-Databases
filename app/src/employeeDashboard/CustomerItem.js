import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import moment from 'moment';

class CustomerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
			dialogOpen: false,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({reservation: nextProps.reservation});
    }

    handleRemove = () => {
        axios.delete('http://localhost:3001/clients/' + this.props.customer.client_id)
            .then(() => {
                this.props.refreshData();
            });
    }

    handleEditSubmit = () => {
        console.log(this.state.reservation);
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
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
        ];
        const customerDetails = fields.map((item, index) => (
            <ListItem
                key={index}
                disabled={true}
                primaryText={item.label}
                style={{padding: '8px 0'}}
                secondaryText={customer[item.name]}/>
        ));

        return (
            <Card className='customerItem'>
				<CardText>
					<List>
                        {customerDetails}
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
					<RaisedButton label='Edit' onClick={this.handleDialogOpen}/>
					<RaisedButton backgroundColor='#900' labelColor='#fff' label='Remove' onClick={this.handleRemove} />
				</CardActions>
            </Card>
        );
    }
}

export default CustomerItem;
