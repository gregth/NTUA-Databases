import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router'
import Register from './Register';
import Home from './Home';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Route path='/register' component={Register} />
                <Route path='/home' component={Home} />
            </div>
        );
    }
}

export default App;
