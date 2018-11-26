import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../../actions/index';

class MenuCategoryEntry extends Component {
    confirmDelete = (yesAction, categoryName) => {
        this.props.showYesOrNoModal(true, yesAction, `이 카테고리를 삭제하시겠습니까? (${categoryName})`);
    };

    render() {
        const {isActive, category, selectMenuCategory, deleteMenuCategory} = this.props.config;
        const className = isActive ? 'panel-block is-active' : 'panel-block';

        return (
            <div className={className} onClick={() => selectMenuCategory(category.id)}>
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <div className="columns">
                                <div className="column is-9">
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="media-right">
                        <button className="button is-dark is-outlined is-rounded is-small"
                                style={{marginRight: '10px', height: '1.5rem', padding: '0px 7px 0px 7px'}}>수정
                        </button>
                        <button className="delete"
                                onClick={() => this.confirmDelete(deleteMenuCategory, category.name)}/>
                    </div>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {state};
}

export default connect(mapStateToProps, actions)(MenuCategoryEntry);