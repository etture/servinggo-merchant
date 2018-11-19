import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../actions/index';

class StoresPage extends Component {
    componentWillMount() {
        const {accessToken} = this.props;
        this.props.getStores(accessToken, () => {
            console.log("getStores run, numOfStores:", this.props.numOfStores);
        });
    }

    renderStores(props) {
        let storesList = [];
        for (let i = 0; i < props.numOfStores; i++) {
            storesList.push(<li key={props.stores[i].id}>{props.stores[i].name}</li>);
        }
        return storesList;
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-2"/>
                <div className="column">
                    <br/>
                    <ul>
                        {this.renderStores(this.props)}
                    </ul>
                    <Link to="/dashboard/new-store" className="text">새 매장 등록하기</Link>
                </div>
                <div className="column is-2"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {accessToken: state.auth.accessToken, numOfStores: state.store.numOfStores, stores: state.store.stores};
}

export default connect(mapStateToProps, actions)(StoresPage);
