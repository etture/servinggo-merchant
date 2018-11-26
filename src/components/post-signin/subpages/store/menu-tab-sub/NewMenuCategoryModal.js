import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {renderInput, renderInputRequired} from "../../../../layout_bulma/ReduxFields";
import {connect} from 'react-redux';
import {compose} from 'redux';

import * as actions from '../../../../../actions/index';

class NewMenuCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            categoryDesc: ''
        };
    }

    closeModal = () => {
        this.setState({
            categoryName: '',
            categoryDesc: ''
        });
        this.props.showNewCategoryModal(false);
    };

    onSubmit = (formProps) => {
        console.log('NewMenuCategoryModal submit, formProps:', formProps);
        const {token, currentStoreId} = this.props;

        formProps = {
            ...formProps,
            storeId: currentStoreId
        };

        this.props.createMenuCategory(token, formProps, (categoryId) => {
            this.closeModal();

            // Make POST request to /menuCategories
            this.props.getMenuCategories(token, {storeId: currentStoreId}, (TAG) => {
                console.log(`${TAG} called`);

                console.log('currentCategoryId:', categoryId);
                this.props.getMenuItems(token, {storeId: currentStoreId, categoryId});
            });
        });
    };

    onNameChange = (name) => {
        this.setState({
            categoryName: name
        });
        console.log('modal state:', this.state);
    };

    onDescChange = (desc) => {
        this.setState({
            categoryDesc: desc
        });
        console.log('modal state:', this.state);
    };

    render() {
        const {handleSubmit} = this.props;
        const className = this.props.newCategoryModalShown ? 'modal is-active' : 'modal';
        console.log('modal state:', this.state);

        return (
            <div className={className}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">메뉴 카테고리 추가</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal}/>
                    </header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <section className="modal-card-body">
                            <Field
                                placeholder="새로운 카테고리 입력 (필수)"
                                label="카테고리명"
                                name="name"
                                type="text"
                                autoComplete="none"
                                content={this.state.categoryName}
                                onChange={(e) => this.onNameChange(e.target.value)}
                                component={renderInputRequired}
                            />
                            <Field
                                placeholder="카테고리 설명 입력"
                                label="카테고리 설명"
                                name="description"
                                type="text"
                                autoComplete="none"
                                content={this.state.categoryDesc}
                                onChange={(e) => this.onDescChange(e.target.value)}
                                component={renderInput}
                            />
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-primary" type="submit">추가</button>
                            <button className="button" onClick={this.closeModal}>취소</button>
                        </footer>
                    </form>
                </div>
            </div>
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
        newCategoryModalShown: state.menu.newCategoryModalShown
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'newMenuCategory'})
)(NewMenuCategoryModal);