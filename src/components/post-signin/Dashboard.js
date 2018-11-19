import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import * as actions from '../../actions/index';

import Navbar from './Navbar';
import StoresPage from './subpages/StoresPage';
import NewStore from './subpages/store/NewStore';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar history={this.props.history}/>
                        <Switch>
                            <Route path="/dashboard/stores" component={StoresPage}/>
                            <Route path="/dashboard/new-store" component={NewStore}/>
                            <Redirect from="/dashboard" to="/dashboard/stores"/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default withRouter(connect(mapStateToProps, actions)(Dashboard));