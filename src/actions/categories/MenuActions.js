import axios from 'axios';
import {
    MENU_ERROR,
    MENU_CREATE_CATEGORY,
    MENU_CREATE_ITEM,
    MENU_GET_CATEGORIES,
    MENU_GET_ITEMS,
    MENU_CURRENT_CATEGORY_ID,
    MENU_CLEAR,
    MENU_SHOW_NEW_CATEGORY_MODAL,
    MENU_SHOW_NEW_ITEM_MODAL,
    MENU_DELETE_ITEM, MENU_DELETE_CATEGORY
} from "../types";
import {api, action, checkAccessToken} from "../utils";

export const createMenuCategory = (token, formProps, callback) => dispatch => {
    const TAG = 'createMenuCategory';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/menu/createMenuCategory`, formProps, headerConfig);

            console.log(`${TAG} response:`, response.data);

            dispatch(action(MENU_CREATE_CATEGORY, response.data));
            if (callback) callback(response.data.categoryId);

        } catch (error) {
            dispatch(action(MENU_ERROR, `${TAG} failed`));
        }
    });
};

export const createMenuItem = (token, formProps, callback) => dispatch => {
    const TAG = 'createMenuItem';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/menu/createMenuItem`, formProps, headerConfig);

            console.log(`${TAG} response:`, response);

            dispatch(action(MENU_CREATE_ITEM, ''));
            if (callback) callback();

        } catch (error) {
            dispatch(action(MENU_ERROR, `${TAG} failed`));
        }
    });
};

// Get the list of menu categories for a store and put it in Redux
export const getMenuCategories = (token, reqBody, callback) => dispatch => {
    const TAG = 'getMenuCategories';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/menu/getMenuCategories`, reqBody, headerConfig);

            console.log(`${TAG} response:`, response);

            dispatch(action(MENU_GET_CATEGORIES, response.data));
            if (callback) callback(TAG);

        } catch (error) {
            dispatch(action(MENU_ERROR, `${TAG} failed`));
        }
    });
};

export const getMenuItems = (token, reqBody, callback) => dispatch => {
    const TAG = 'getMenuItems';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;
            console.log(`${TAG} reqBody:`, reqBody);

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/menu/getMenuItems`, reqBody, headerConfig);

            console.log(`${TAG} response:`, response);

            dispatch(action(MENU_GET_ITEMS, response.data));

            if (callback) callback(TAG);

        } catch (error) {
            dispatch(action(MENU_ERROR, `${TAG} failed`));
        }
    });
};

export const saveCurrentCategoryId = (currentCategoryId) => dispatch => {
    console.log('saveCurrentCategoryId categoryId:', currentCategoryId);
    dispatch(action(MENU_CURRENT_CATEGORY_ID, currentCategoryId));
};

export const clearMenu = () => dispatch => {
    dispatch(action(MENU_CLEAR, ''));
};

export const showNewCategoryModal = (isShown) => dispatch => {
    dispatch(action(MENU_SHOW_NEW_CATEGORY_MODAL, isShown));
};

export const showNewItemModal = (isShown) => dispatch => {
    dispatch(action(MENU_SHOW_NEW_ITEM_MODAL, isShown));
};

export const deleteMenuCategory = (token, reqBody, callback) => dispatch => {
    const TAG = 'deleteMenuCategory';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            // const headerConfig = {headers: {authorization: accessToken}};
            const deleteParams = {
                data: reqBody,
                headers: {authorization: accessToken}
            };
            await axios.delete(`${api}/api/merchant/menu/deleteMenuCategory`, deleteParams);

            dispatch(action(MENU_DELETE_CATEGORY, ''));
            if (callback) callback(TAG);

        } catch (error) {
            dispatch(action(MENU_ERROR, `${TAG} failed`));
        }
    });
};

export const deleteMenuItem = (token, reqBody, callback) => dispatch => {
    const TAG = 'deleteMenuItem';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            // const headerConfig = {headers: {authorization: accessToken}};
            const deleteParams = {
                data: reqBody,
                headers: {authorization: accessToken}
            };
            await axios.delete(`${api}/api/merchant/menu/deleteMenuItem`, deleteParams);

            dispatch(action(MENU_DELETE_ITEM, ''));
            if (callback) callback(TAG);

        } catch (error) {
            dispatch(action(MENU_ERROR, `${TAG} failed`));
        }
    });
};