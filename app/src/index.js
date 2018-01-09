import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import routes from './routes';

const customHistory = createBrowserHistory()

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={customHistory}>
            {routes}
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);
