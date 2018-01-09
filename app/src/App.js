import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router'
import Register from './Register';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Route path='/register' component={Register} />
            </div>
        );
    }
}

export default App;
