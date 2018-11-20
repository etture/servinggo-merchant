import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../../actions/index';

import CenterView from '../../../layout_bulma/CenterView';

class OverviewTab extends Component {

    render() {
        const {match} = this.props;
        // const {myStore} = this.props;
        const myStore = this.props.stores.filter((store) => store.id === this.props.lastStoreId)[0];
        console.log('OverviewTab myStore:', myStore, this.props.lastStoreId);

        return (
            <CenterView>
                <h1>매장 정보</h1>
                <h2>{myStore.name}</h2>
                <p>{myStore.description}</p>

                <Link to={match.path + '/editDesc'}
                      className="button is-primary"
                      style={{textDecoration: "none"}}>
                    매장정보 수정
                </Link>
            </CenterView>
        );
    }
}

function mapStateToProps(state) {
    return {
        lastStoreId: state.store.lastStoreId,
        stores: state.store.stores
    };
}

export default connect(mapStateToProps, actions)(OverviewTab);