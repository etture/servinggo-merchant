import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import * as actions from '../../../../actions/index';

// OverviewTab Tab
import OverviewTab from './OverviewTab';
import EditStoreInfo from './overview-sub/EditStoreDesc';
import MenuTab from './MenuTab';
import TableTab from './TableTab';

class StorePage extends Component {

    constructor() {
        super();
        this.storeId = 0;
        this.state = {
            tabStatus: {
                storeInfo: 'is-active',
                menuInfo: '',
                tableInfo: '',
                otherInfo: ''
            }
        };
    }

    componentWillMount() {
        // The current store, contains: {id, merchant_id, name, phone_num, address, account_num, description}
        this.storeId = this.props.location.storeId;
        console.log('this.storeId:', this.storeId);
        console.log('!this.storeId:', !this.storeId);
        this.myStore = '';
        if (this.storeId) {
            // Get myStore with store.id by filtering through props.stores
            // this.myStore = this.props.stores.filter((store) => store.id === this.storeId)[0]; // this returns a size-1 array
            this.props.saveLastStore(this.storeId);
            // console.log('this.storeId is NOT undefined, myStore is:', this.myStore);
        } else {
            // this.myStore = this.props.stores.filter((store) => store.id === this.props.lastStoreId)[0];
            // console.log('this.storeId is undefined, lastStore:', this.myStore);
        }
    }

    tabChange = (tab) => {
        this.setState({
            tabStatus: {
                storeInfo: '',
                menuInfo: '',
                tableInfo: '',
                otherInfo: '',
                ...tab
            }
        });
    };

    render() {
        // console.log('StorePage store:', this.myStore);
        const {match} = this.props;
        console.log('go to:', match.url);

        // Pass store as 'myStore' because setting prop name as 'store' causes conflicts
        // EDIT: actually, don't pass myStore, but pass storeId to reflect changes in state store
        return (
            <BrowserRouter>
                <div>
                    <div className="tabs is-medium">
                        <ul>
                            <li className={this.state.tabStatus.storeInfo}>
                                <Link to={`${match.url}`}
                                      onClick={() => this.tabChange({storeInfo: 'is-active'})}
                                      style={{textDecoration: "none"}}>
                                    매장 정보
                                </Link>
                            </li>
                            <li className={this.state.tabStatus.menuInfo}>
                                <Link to={`${match.url}/menus`}
                                      onClick={() => this.tabChange({menuInfo: 'is-active'})}
                                      style={{textDecoration: "none"}}>
                                    메뉴 정보
                                </Link>
                            </li>
                            <li className={this.state.tabStatus.tableInfo}>
                                <Link to={`${match.url}/tables`}
                                      onClick={() => this.tabChange({tableInfo: 'is-active'})}
                                      style={{textDecoration: "none"}}>
                                    테이블 관리
                                </Link>
                            </li>
                            <li className={this.state.tabStatus.otherInfo}>
                                <Link to={`${match.url}/others`}
                                      onClick={() => this.tabChange({otherInfo: 'is-active'})}
                                      style={{textDecoration: "none"}}>
                                    기타
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path={`${match.url}`}
                               render={(props) => <OverviewTab {...props} storeId={this.storeId}/>}/>
                        <Route path={`${match.url}/editDesc`}
                               render={(props) => <EditStoreInfo {...props} storeId={this.storeId}/>}/>
                        <Route path={`${match.url}/menus`} component={MenuTab}/>
                        <Route path={`${match.url}/tables`} component={TableTab}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        stores: state.store.stores,
        lastStoreId: state.store.lastStoreId
    };
}

export default withRouter(
    connect(mapStateToProps, actions)(StorePage)
);