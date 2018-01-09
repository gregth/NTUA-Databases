import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Register extends Component {
    render() {
        return (
            <div className='register'>
				<Card>
					<CardHeader title='Create a new account' />

                    <CardMedia className='cardMedia'>
                        <TextField
                            fullWidth
                            floatingLabelText='First Name'
                            floatingLabelFixed={true}
                        />

                        <TextField
                            fullWidth
                            floatingLabelText='Last Name'
                            floatingLabelFixed={true}
                        />

                        <TextField
                            fullWidth
                            floatingLabelText='Street Name'
                            floatingLabelFixed={true}
                        />

                        <TextField
                            fullWidth
                            floatingLabelText='Street Number'
                            floatingLabelFixed={true}
                        />

                        <TextField
                            fullWidth
                            floatingLabelText='Postal Code'
                            floatingLabelFixed={true}
                        />

                        <TextField
                            fullWidth
                            floatingLabelText='Country'
                            floatingLabelFixed={true}
                        />

						<DropDownMenu
							autoWidth={false}
                            style={{width: '100%'}}
                            value={0}
						>
							<MenuItem value={0} primaryText='Identity Card' />
							<MenuItem value={1} primaryText='Passport' />
						</DropDownMenu>

                        <TextField
                            fullWidth
                            floatingLabelText='Identification Number'
                            floatingLabelFixed={true}
                        />
                    </CardMedia>

					<CardActions>
						<FlatButton label='Register' />
					</CardActions>
				</Card>
            </div>
        );
    }
}

export default Register;
