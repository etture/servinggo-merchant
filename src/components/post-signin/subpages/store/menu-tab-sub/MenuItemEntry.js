import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../../actions/index';

class MenuItemEntry extends Component {
    confirmDelete = (yesAction, menuName) => {
        this.props.showYesOrNoModal(true, yesAction, `이 메뉴를 삭제하시겠습니까? (${menuName})`);
    };

    render() {
        const {menuItem, deleteMenuItem} = this.props.config;

        return (
            <div className="panel-block">
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <div className="columns">
                                <div className="column is-9">
                                    {menuItem.name}
                                </div>
                                <div className="column is-3 text-right">
                                    {menuItem.price_krw}원
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="media-right">
                        <button className="button is-dark is-outlined is-rounded is-small"
                                style={{marginRight: '10px', height: '1.5rem', padding: '0px 7px 0px 7px'}}>수정</button>
                        <button className="delete"
                                onClick={() => this.confirmDelete(deleteMenuItem, menuItem.name)}/>
                    </div>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {state};
}

export default connect(mapStateToProps, actions)(MenuItemEntry);