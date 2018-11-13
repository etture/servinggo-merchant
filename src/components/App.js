import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import * as actions from '../actions/index';

import './styles/App.css';
import Signin from './Signin';
import Dashboard from './Dashboard';

class App extends Component {
    componentWillMount() {
        console.log('access token:', this.props.access_token);
        console.log(Date.now());
        const {access_token, refresh_token} = this.props;

        // at: access token, rt: refresh token
        let at_decoded, rt_decoded;
        if (refresh_token) {
            rt_decoded = jwt_decode(refresh_token);
            // rt expired
            if (rt_decoded.exp * 1000 < Date.now()) {
                console.log('Refresh token expired!');
                this.props.history.push('/signin');
            } else if (access_token) {
                // rt not yet expired
                at_decoded = jwt_decode(access_token);

                // at expired
                if(at_decoded.exp * 1000 < Date.now()){
                    console.log('Access token expired!');
                    // rt not yet expired, at expired
                    // request at with rt
                }else{
                    // at not yet expired (authenticated)
                    // proceed to dashboard
                    this.props.history.push('/dashboard');
                }
            }
        } else {
            // no rt
            this.props.history.push('/signin');
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/home">
                        <div className="App">
                            <h1>Hello</h1>
                        </div>
                    </Route>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/dashboard" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {access_token: state.auth.access_token, refresh_token: state.auth.refresh_token};
}

export default withRouter(connect(mapStateToProps, actions)(App));
