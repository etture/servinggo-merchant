import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import * as actions from '../../../../actions/index';

// OverviewTab Tab
import OverviewTab from './OverviewTab';
import EditStoreDesc from './overview-tab-sub/EditStoreDesc';
import MenuTab from './MenuTab';
import TableTab from './TableTab';

class StorePage extends Component {

    constructor(props) {
        super(props);
        this.storeId = 0;
        this.state = {
            tabStatus: {
                storeInfo: 'is-active',
                menuInfo: '',
                tableInfo: '',
                otherInfo: ''
            }
        };
        props.clearComp();
    }

    componentWillMount() {
        // The current store, contains: {id, merchant_id, name, phone_num, address, account_num, description}
        this.storeId = this.props.location.storeId;
        console.log('this.storeId:', this.storeId);
        console.log('!this.storeId:', !this.storeId);

        if (this.storeId) {
            this.props.saveCurrentStoreId(this.storeId);
            console.log('this.storeId is NOT undefined, currentStoreId is:', this.storeId);
        } else {
            this.storeId = this.props.currentStoreId;
            console.log('this.storeId is undefined, currentStoreId:', this.storeId);
        }
    }

    tabChange = (tab) => {
        this.setState({
            tabStatus: {
                storeInfo: '',
                menuInfo: '',
                tableInfo: '',
                orderInto: '',
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
                    <div className="tabs is-small">
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
                            <li className={this.state.tabStatus.orderInfo}>
                                <Link to={`${match.url}/orders`}
                                      onClick={() => this.tabChange({orderInfo: 'is-active'})}
                                      style={{textDecoration: "none"}}>
                                    주문 관리
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
                        <Route exact path={`${match.url}`} component={OverviewTab}/>
                        <Route path={`${match.url}/editDesc`} component={EditStoreDesc}/>
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
        currentStoreId: state.store.currentStoreId
    };
}

export default withRouter(
    connect(mapStateToProps, actions)(StorePage)
);