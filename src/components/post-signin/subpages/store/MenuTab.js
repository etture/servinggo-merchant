import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../actions/index';
import '../../../styles/div-panel-block.css';

import CenterView from '../../../layout_bulma/CenterView';
import MenuCategoryEntry from './menu-tab-sub/MenuCategoryEntry';
import MenuItemEntry from './menu-tab-sub/MenuItemEntry';
import NewMenuCategoryModal from './menu-tab-sub/NewMenuCategoryModal';
import NewMenuItemModal from './menu-tab-sub/NewMenuItemModal';
import YesOrNoModal from '../../../layout_bulma/YesOrNoModal';

class MenuTab extends Component {
    constructor(props) {
        super(props);
        console.log('BBBBB categoryId', props.currentCategoryId);

        // Reset Redux store for menus
        props.clearMenu();
    }

    componentWillMount() {
        const {token, currentStoreId} = this.props;

        // Make POST request to /menuCategories
        this.props.getMenuCategories(token, {storeId: currentStoreId}, (TAG) => {
            console.log(`${TAG} called`);

            const {currentCategoryId} = this.props;
            console.log('AAAA CategoryId:', token, currentCategoryId, currentStoreId);

            this.props.getMenuItems(token, {storeId: currentStoreId, categoryId: currentCategoryId});
        });
    }

    selectMenuCategory = (categoryId) => {
        this.props.saveCurrentCategoryId(categoryId);
        const {token, currentStoreId} = this.props;
        this.props.getMenuItems(token, {storeId: currentStoreId, categoryId});
    };

    renderMenuCategories = (props) => {
        let categoriesList = [];
        const {currentCategoryId, token, currentStoreId} = props;

        for (let i = 0; i < props.numOfCategories; i++) {
            const category = props.menuCategories[i];
            const isActive = (category.id === currentCategoryId);
            console.log('currentCategoryId:', currentCategoryId);

            const reqBody = {
                storeId: currentStoreId,
                categoryId: category.id
            };

            const deleteMenuCategory = () => {
                props.deleteMenuCategory(token, reqBody, (TAG) => {
                    console.log(`${TAG} called`);

                    // Make POST request to /menuCategories
                    props.getMenuCategories(token, {storeId: currentStoreId}, (TAG) => {
                        console.log(`${TAG} called`);

                        const {currentCategoryId} = this.props;
                        this.props.getMenuItems(token, {storeId: currentStoreId, categoryId: currentCategoryId});
                    });
                });
            };

            const config = {
                isActive, category,
                selectMenuCategory: this.selectMenuCategory,
                deleteMenuCategory
            };

            categoriesList.push(
                <MenuCategoryEntry config={config} key={category.id}/>
            );
        }
        return categoriesList;
    };

    renderMenuItems = (props) => {
        let menuItemsList = [];
        for (let i = 0; i < props.menuItems.length; i++) {
            const menuItem = props.menuItems[i];
            const {token, currentStoreId, currentCategoryId} = props;

            const reqBody = {
                storeId: currentStoreId,
                menuId: menuItem.id
            };

            const deleteMenuItem = () => {
                props.deleteMenuItem(token, reqBody, (TAG) => {
                    console.log(`${TAG} called`);
                    props.getMenuItems(token, {storeId: currentStoreId, categoryId: currentCategoryId});
                });
            };

            const config = {
                menuItem,
                deleteMenuItem
            };

            menuItemsList.push(
                <MenuItemEntry config={config} key={menuItem.id}/>
            );
        }
        return menuItemsList;
    };

    newMenuCategory = () => {
        this.props.showNewCategoryModal(true);
    };

    newMenuItem = () => {
        this.props.showNewItemModal(true);
    };

    render() {
        return (
            <div>
                <CenterView>
                    <div className="columns">
                        <nav className="column is-4 panel">
                            <div className="panel-heading">
                                <div className="level">
                                    <div className="level-left">
                                        <p className="is-size-5">메뉴 카테고리</p>
                                    </div>
                                    <div className="level-right">
                                        <p className="is-size-6">{this.props.numOfCategories}개</p>
                                    </div>
                                </div>
                            </div>
                            {this.renderMenuCategories(this.props)}
                            <div className="panel-block">
                                <button className="button is-dark is-outlined is-fullwidth"
                                        onClick={this.newMenuCategory}>
                                    메뉴 카테고리 추가
                                </button>
                            </div>
                        </nav>
                        <div className="column is-1"/>
                        <nav className="column is-7 panel">
                            <div className="panel-heading">
                                <div className="level">
                                    <div className="level-left">
                                        <p className="is-size-5">메뉴 항목</p>
                                    </div>
                                    <div className="level-right">
                                        <p className="is-size-6">{this.props.menuItems.length}개</p>
                                    </div>
                                </div>
                            </div>
                            {this.renderMenuItems(this.props)}
                            <div className="panel-block">
                                <button className="button is-dark is-outlined is-fullwidth"
                                        onClick={this.newMenuItem}>
                                    메뉴 추가
                                </button>
                            </div>
                        </nav>
                    </div>
                </CenterView>
                {/*Modals for adding new menu categories and items*/}
                <NewMenuCategoryModal/>
                <NewMenuItemModal/>
                <YesOrNoModal/>
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
        menuCategories: state.menu.menuCategories,
        numOfCategories: state.menu.numOfCategories,
        currentCategoryId: state.menu.currentCategoryId,
        menuItems: state.menu.menuItems,
        newCategoryModalShown: state.menu.newCategoryModalShown,
        newItemModalShown: state.menu.newItemModalShown
    };
}

export default connect(
    mapStateToProps,
    actions
)(MenuTab);