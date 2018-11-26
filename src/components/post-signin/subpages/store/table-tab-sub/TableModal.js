import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../../actions/index';

class TableModal extends Component {
    closeModal = () => {
        this.props.showTableModal(false, 0);
    };

    downloadQR = (table) => {
        const {token, currentStoreId, selectedTableNum} = this.props;
        const reqBody = {
            storeId: currentStoreId,
            tableNum: selectedTableNum
        };
        this.props.downloadQR(token, reqBody);
    };

    render() {
        const {registeredTables, tableModalShown, selectedTableNum} = this.props;
        console.log('registeredTables, tableModalShown, selectedTableNum:', registeredTables, tableModalShown, selectedTableNum);

        let tableModal;

        if(tableModalShown){
            const table = registeredTables.filter((table) => table.table_num === selectedTableNum)[0];
            const className = tableModalShown ? 'modal is-active' : 'modal';
            console.log('selected table:', table);

            tableModal = (
                <div className={className}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">테이블 {table.table_num}</p>
                            <button className="delete" aria-label="close" onClick={this.closeModal}/>
                        </header>
                        <section className="modal-card-body">
                            <img src={table.qr_url} alt="qr_image"/>
                            <a className="button is-primary is-outlined" href={table.qr_url} download={`테이블${table.table_num}.png`} style={{textDecoration: "none"}} target="_blank">QR코드 이미지 다운로드 링크</a>
                            {/*<button className="button is-primary is-outlined" onClick={() => this.downloadQR(table)}>QR코드 이미지 다운로드</button>*/}
                        </section>
                    </div>
                </div>
            );
        }else{
            tableModal = <div/>;
        }

        return tableModal;
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
        tableModalShown: state.table.tableModalShown,
        selectedTableNum: state.table.selectedTableNum
    };
}

export default connect(mapStateToProps, actions)(TableModal);