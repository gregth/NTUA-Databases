import React, { Component } from 'react';
import { Route } from 'react-router'
import EmployeeHome from './employeeDashboard/Home';
import Customer from './employeeDashboard/Customer';

class EmployeeRouter extends Component {
    render() {
        return (
            <div className='EmployeeApp'>
                <Route path='/employeehome/dashboard' component={EmployeeHome} />
                <Route path='/employeehome/customer/:customerId' component={Customer} />
            </div>
        );
    }
}

export default EmployeeRouter;
