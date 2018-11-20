import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import * as actions from '../../actions/index';

import Navbar from './Navbar';
import StoresPage from './subpages/StoresPage';
import NewStore from './subpages/NewStore';
import StorePage from './subpages/store/StorePage';

class Dashboard extends Component {

    render() {
        // for getting current path
        const {match} = this.props;
        return (
            <BrowserRouter>
                <div>
                    <Navbar history={this.props.history}/>
                    <Switch>
                        <Route exact path={`${match.path}/stores`} component={StoresPage}/>
                        <Route path={`${match.path}/new-store`} component={NewStore}/>
                        <Route path={`${match.path}/stores/:storeId`} component={StorePage}/>
                        <Redirect from={`${match.path}`} to={`${match.path}/stores`}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default withRouter(
    connect(mapStateToProps, actions)(Dashboard)
);