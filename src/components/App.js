import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import * as actions from '../actions/index';

import './styles/App.css';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';

class App extends Component {
    componentWillMount() {
        const {accessToken, refreshToken} = this.props;
        console.log('access token:', accessToken);
        console.log('refresh token:', refreshToken);

        // at: access token, rt: refresh token
        let atDecoded, rtDecoded;
        if (refreshToken) {
            rtDecoded = jwtDecode(refreshToken);
            // rt expired
            if (rtDecoded.exp * 1000 < Date.now()) {
                console.log('Refresh token expired!');
                this.props.history.push('/signin');
            } else if (accessToken) {
                // rt not yet expired
                atDecoded = jwtDecode(accessToken);

                // at expired
                if(atDecoded.exp * 1000 < Date.now()){
                    console.log('Access token expired!');
                    // rt not yet expired, at expired
                    // request at with rt
                    this.props.refreshAccessToken(refreshToken, () => {
                        this.props.history.push('/dashboard');
                        console.log('Access token refreshed!')
                    });
                }else{
                    // at not yet expired (authenticated)
                    // proceed to dashboard
                    console.log('access, refresh tokens valid');
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
                    <Route path="/signup" component={Signup}/>
                    <Route path="/dashboard" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {accessToken: state.auth.accessToken, refreshToken: state.auth.refreshToken};
}

export default withRouter(connect(mapStateToProps, actions)(App));
