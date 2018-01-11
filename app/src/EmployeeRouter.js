import React, { Component } from 'react';
import { Route } from 'react-router'
import EmployeeHome from './employeeDashboard/Home';
import Customer from './employeeDashboard/Customer';
import Store from './employeeDashboard/Store';
import AppBar from 'material-ui/AppBar';

class EmployeeRouter extends Component {
	handleTitleClick = () => {
        this.props.history.push('/employee/home');
    }

    render() {
        return (
            <div className='EmployeeApp'>
				<AppBar
					title={<span style={{cursor: 'pointer'}}>Employee Dashboard</span>}
					onTitleClick={this.handleTitleClick}
					iconElementLeft={null}
				/>

                <Route path='/employee/home' component={EmployeeHome} />
                <Route path='/employee/customer/:customerId' component={Customer} />
                <Route path='/employee/store/:storeId' component={Store} />
            </div>
        );
    }
}

export default EmployeeRouter;
