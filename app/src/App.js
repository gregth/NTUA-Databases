import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router'
import Register from './Register';
import Home from './Home';
import Store from './Store';
import EmployeeRouter from './EmployeeRouter';
import Customer from './employeeDashboard/Customer';

class App extends Component {
	handleTitleClick = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div className='App'>
                <Route path='/register' component={Register} />
                <Route path='/home' component={Home} />
                <Route path='/employee' component={EmployeeRouter} />
                <Route path='/store/:storeId' component={Store} />
            </div>
        );
    }
}

export default App;
