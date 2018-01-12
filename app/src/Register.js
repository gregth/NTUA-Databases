import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axiosWrapper from './axiosWrapper';
import qs from 'qs';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            street_name: '',
            street_number: '',
            postal_code: '',
            city: '',
            country: '',
            identity_type: 0,
            identity_number: '',
            email: '',
            password: '',
        };
    }

    handleRegister = () => {
        axiosWrapper.post('http://localhost:3001/clients', qs.stringify(this.state))
            .then(res => {
                console.log(res.data);
                localStorage.setItem('clientId', res.data.resource_id);
                this.props.history.push('/home');
            });
    }

    handleInputChange = (event, value) => {
        event.persist();
        const state = this.state;
        state[event.target.name] = value;

        this.setState(state);
    }


    handleDrowdownChange = (name, event, key, value) => {
        const state = this.state;
        state[name] = value;
        this.setState(state);
    }

    render() {
        const fields = [
            {name: 'first_name', label: 'First Name'},
            {name: 'last_name', label: 'Last Name'},
            {name: 'street_name', label: 'Street Name'},
            {name: 'street_number', label: 'Street Number'},
            {name: 'postal_code', label: 'Postal Code'},
            {name: 'city', label: 'City'},
            {name: 'country', label: 'Country'},
            {name: 'identity_type', label: 'Identity Type', options: ['Identity Card', 'Passport']},
            {name: 'identity_number', label: 'Identification Number'},
            {name: 'email', label: 'Email'},
            {name: 'password', label: 'Password'},
        ];

        let inputElements = fields.map((item, index) => {
            if (item.options) {
                const {options} = item;

                const optionsElements = options.map((item, index) => <MenuItem key={index} value={index} primaryText={item} />);

                return (
                    <DropDownMenu
                        autoWidth={false}
                        key={index}
                        style={{width: '100%'}}
                        onChange={this.handleDrowdownChange.bind(this, item.name)}
                        name={item.name}
                        value={this.state[item.name]}>
                        {optionsElements}
                    </DropDownMenu>
                );
            } else {
                return (<TextField
                    key={index}
                    name={item.name}
                    onChange={this.handleInputChange}
                    value={this.state[item.name]}
                    fullWidth
                    type={item.name == 'password' ? 'password' : 'text'}
                    floatingLabelText={item.label}
                    floatingLabelFixed={true}
                />);
            }
        });
        
        return (
            <div className='register'>
				<Card>
					<CardHeader title='Create a new account' />

                    <CardMedia className='cardMedia'>
                        <div>
                            {inputElements}
                        </div>
                    </CardMedia>

					<CardActions>
						<FlatButton label='Register' onClick={this.handleRegister} />
					</CardActions>
				</Card>
            </div>
        );
    }
}

export default Register;
