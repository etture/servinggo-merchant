import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reduers';
import App from './components/App';

const store = createStore(
    reducers,
    {
        auth: {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token')
        }
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

//TODO create logic for refreshing access token

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();