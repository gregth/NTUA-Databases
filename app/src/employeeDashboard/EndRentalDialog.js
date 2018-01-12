import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class EndRentalId extends Component {
    constructor(props) {
        super(props);

        this.state = {
            damage_score: '',
        }
    }

    handleInputChange = (event, value) => {
        event.persist();
        this.setState({damage_score: value});
    }

    handleSubmit = () => {
        this.props.onSubmit(+this.state.damage_score);
    }

    render() {
		let actions = [
			<FlatButton
				label='Close'
				onClick={this.props.handleDialogClose}
			/>,
			<FlatButton
				label='End Rental'
				primary={true}
				onClick={this.handleSubmit}
			/>,
		];

        return (
            <Dialog
                title='Rental review'
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDialogClose}
            >
                <TextField
                    style={{width: 200, margin: 'auto', display: 'block'}}
                    name='damage_score'
                    onChange={this.handleInputChange}
                    value={this.state.damage_score}
                    floatingLabelText='Damage Score (0% - 100%)'
                    floatingLabelFixed={true}
                />
            </Dialog>
        );
    }
}

export default EndRentalId;
