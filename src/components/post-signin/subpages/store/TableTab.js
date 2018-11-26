import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import * as actions from '../../../../actions/index';

import CenterView from '../../../layout_bulma/CenterView';
import TableModal from './table-tab-sub/TableModal';

class TableTab extends Component {
    constructor(props){
        super(props);

        const {token, currentStoreId} = props;

        this.props.clearTable();

        this.props.getTables(token, {storeId: currentStoreId}, (TAG) => {
            console.log(`${TAG} run`);
        });
    }

    addTable = () => {
        const {token, currentStoreId, lastTableNum} = this.props;
        const reqBody = {
            storeId: currentStoreId,
            tableNum: lastTableNum + 1
        };
        this.props.addTable(token, reqBody, (TAG) => {
            console.log(`${TAG} run`);
            this.props.getTables(token, {storeId: currentStoreId});
        });
    };

    removeTable = () => {
        const {token, currentStoreId, lastTableNum} = this.props;
        const reqBody = {
            storeId: currentStoreId,
            tableNum: lastTableNum
        };
        if (lastTableNum !== 0){
            this.props.removeTable(token, reqBody, (TAG) => {
                console.log(`${TAG} run`);
                this.props.getTables(token, {storeId: currentStoreId});
            });
        }
    };

    selectTable = (tableNum) => {
        this.props.showTableModal(true, tableNum);
    };

    renderRegisteredTables = (props) => {
        let tablesList = [];

        for(let i = 0; i < props.registeredTables.length; i++){
            const table = props.registeredTables[i];

            tablesList.push(
                <div className="panel-block" key={table.table_num}
                    onClick={() => this.selectTable(table.table_num)}>
                    테이블 {table.table_num}
                </div>
            );
        }
        return tablesList;
    };

    render() {
        return (
            <BrowserRouter>
                <CenterView>
                    <div className="columns">
                        <div className="column is-3">
                            <div className="box">
                                <Link to="/" className="button is-dark is-outlined is-fullwidth"
                                      style={{textDecoration: "none", marginBottom: "0.5rem"}}>
                                    QR 스티커 주문
                                </Link>
                                <Link to="/" className="button is-dark is-outlined is-fullwidth"
                                      style={{textDecoration: "none"}}>
                                    QR 코드 재생성
                                </Link>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <div className="level">
                                        <div className="level-left">
                                            <p className="is-size-5">등록된 테이블</p>
                                        </div>
                                        <div className="level-right">
                                            <p className="is-size-6">{this.props.registeredTables.length}개</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-block">
                                    <div className="columns">
                                        <div className="column is-6">
                                            <button className="button is-dark is-outlined is-rounded is-fullwidth"
                                                    onClick={this.addTable}>
                                                추가하기
                                            </button>
                                        </div>
                                        <div className="column is-6">
                                            <button className="button is-dark is-outlined is-rounded is-fullwidth"
                                                    onClick={this.removeTable}>
                                                빼기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{overflowY: "scroll", maxHeight: "10rem"}}>
                                    {this.renderRegisteredTables(this.props)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <TableModal/>
                </CenterView>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: {
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken
        },
        currentStoreId: state.store.currentStoreId,
        registeredTables: state.table.registeredTables,
        lastTableNum: state.table.lastTableNum
    };
}

export default withRouter(
    connect(mapStateToProps, actions)(TableTab)
);