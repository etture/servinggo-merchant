import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../actions/index';

import CenterView from '../../layout_bulma/CenterView';

class StoresPage extends Component {
    componentWillMount() {
        const {token} = this.props;
        this.props.getStores(token, () => {
            console.log("getStores run, numOfStores:", this.props.numOfStores);
            console.log('stores:', this.props.stores);
        });
    }

    componentDidMount() {
        console.log('StorePage componentDidMount:', this.props.stores);
    }

    renderStores(props) {
        let storesList = [];
        for (let i = 0; i < props.numOfStores; i++) {
            const store = props.stores[i];
            // Pass store as props to <Link/> through the toParams object
            const toParams = {
                pathname: `${props.match.path}/${store.name}`,
                storeId: store.id
            };
            storesList.push(
                <li key={store.id}>
                    <Link to={toParams}>{store.name}</Link>
                </li>
            );
        }
        return storesList;
    }

    render() {
        return (
            <CenterView>
                    <ul>
                        {this.renderStores(this.props)}
                    </ul>
                    <Link
                        to="/dashboard/new-store"
                        className="button is-primary"
                        style={{textDecoration: "none"}}>
                        새 매장 등록하기
                    </Link>
            </CenterView>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: {
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken
        },
        numOfStores: state.store.numOfStores,
        stores: state.store.stores
    };
}

export default connect(mapStateToProps, actions)(StoresPage);
