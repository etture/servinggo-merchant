import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../../actions/index';

import CenterView from '../../../layout_bulma/CenterView';

class OverviewTab extends Component {

    render() {
        const {match} = this.props;
        // const {myStore} = this.props;
        const myStore = this.props.stores.filter((store) => store.id === this.props.currentStoreId)[0];
        console.log('OverviewTab myStore:', myStore, this.props.currentStoreId);

        return (
            <CenterView>
                <p className="title">{myStore.name}</p>
                <div className="level"
                     style={{marginBottom: "0.3rem"}}>
                    <div className="level-left">
                        <p className="level-item label">매장 소개</p>
                    </div>
                    <div className="level-right">
                        <Link to={match.path + '/editDesc'}
                              className="level-item button is-dark is-outlined is-rounded is-small"
                              style={{textDecoration: "none"}}>
                            매장 소개 수정
                        </Link>
                    </div>
                </div>
                <p className="box">{myStore.description}</p>

            </CenterView>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentStoreId: state.store.currentStoreId,
        stores: state.store.stores
    };
}

export default connect(mapStateToProps, actions)(OverviewTab);