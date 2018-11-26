import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {renderInput, renderInputRequired} from "../../../../layout_bulma/ReduxFields";
import {connect} from 'react-redux';
import {compose} from 'redux';


import * as actions from '../../../../../actions/index';

class NewMenuItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuName: '',
            menuDesc: '',
            menuPrice: ''
        };
    }

    closeModal = () => {
        this.setState({
            menuName: '',
            menuDesc: '',
            menuPrice: ''
        });
        this.props.showNewItemModal(false);
    };

    onSubmit = (formProps) => {
        const {token, currentStoreId, currentCategoryId} = this.props;

        formProps = {
            ...formProps,
            storeId: currentStoreId,
            categoryId: currentCategoryId,
            priceKrw: parseInt(formProps.priceKrw)
        };

        console.log('formProps:', formProps);

        this.props.createMenuItem(token, formProps, () => {
            this.closeModal();
            this.props.getMenuItems(token, {storeId: currentStoreId, categoryId: currentCategoryId});
        });
    };

    onNameChange = (name) => {
        this.setState({
            menuName: name
        });
        console.log('modal state:', this.state);
    };

    onDescChange = (desc) => {
        this.setState({
            menuDesc: desc
        });
        console.log('modal state:', this.state);
    };

    onPriceChange = (price) => {
        this.setState({
            menuPrice: price
        });
        console.log('modal state:', this.state);
    };

    render() {
        const {newItemModalShown, menuCategories, currentCategoryId, handleSubmit} = this.props;
        const className = newItemModalShown ? 'modal is-active' : 'modal';
        console.log('currentCategoryId:', currentCategoryId);

        // Get currentCategory object; if categoryId is not yet in Redux store, make dummy category object
        let currentCategory = menuCategories.filter((category) => category.id === currentCategoryId)[0];
        if (!currentCategory) currentCategory = {name: ''};

        console.log('currentCategory:', currentCategory);

        return (
            <div className={className}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">메뉴 추가 ({currentCategory.name})</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal}/>
                    </header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <section className="modal-card-body">
                            <Field
                                placeholder="새로운 메뉴 입력 (필수)"
                                label="메뉴명"
                                name="name"
                                type="text"
                                autoComplete="none"
                                content={this.state.menuName}
                                onChange={(e) => this.onNameChange(e.target.value)}
                                component={renderInputRequired}
                            />
                            <Field
                                placeholder="메뉴 설명 입력"
                                label="메뉴 설명"
                                name="description"
                                type="text"
                                autoComplete="none"
                                content={this.state.menuDesc}
                                onChange={(e) => this.onDescChange(e.target.value)}
                                component={renderInput}
                            />
                            <Field
                                placeholder="메뉴 가격 입력"
                                label="메뉴 가격"
                                name="priceKrw"
                                type="number"
                                autoComplete="none"
                                content={this.state.menuPrice}
                                min="0"
                                onChange={(e) => this.onPriceChange(e.target.value)}
                                component={renderInputRequired}
                            />
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-primary">추가</button>
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
        currentCategoryId: state.menu.currentCategoryId,
        newItemModalShown: state.menu.newItemModalShown,
        menuCategories: state.menu.menuCategories
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'newMenuItem'})
)(NewMenuItemModal);