import axios from 'axios';
import {
    STORE_CREATE_NEW,
    STORE_GET_STORES,
    STORE_CURRENT_ID,
    STORE_EDIT_DESC,
    STORE_ERROR
} from "../types";
import {api, action, checkAccessToken} from "../utils";

export const createNewStore = (token, formProps, callback) => dispatch => {
    checkAccessToken(token, async () => {
        try {
            console.log(formProps);

            const {accessToken} = token;
            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/store/createNewStore`, formProps, headerConfig);

            console.log('createNewStore response:', response);

            dispatch(action(STORE_CREATE_NEW, ''));
            callback();

        } catch (err) {
            dispatch(action(STORE_ERROR, 'createNewStore failed'));
        }
    });
};

export const getStores = (token, callback) => dispatch => {
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.get(`${api}/api/merchant/store/getStores`, headerConfig);

            console.log('createNewStore response:', response);

            dispatch(action(STORE_GET_STORES, response.data));
            callback();

        } catch (err) {
            dispatch(action(STORE_ERROR, 'getStores failed'));
        }
    });

};

export const saveCurrentStoreId = (storeId) => dispatch => {
    dispatch(action(STORE_CURRENT_ID, storeId));
};

export const editStoreDesc = (token, formProps, callback) => dispatch => {
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;
            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.put(`${api}/api/merchant/store/editStoreDesc`, formProps, headerConfig);

            console.log('editDesc response:', response);

            dispatch(action(STORE_EDIT_DESC, response.data.newDescription));
            callback();
        } catch (error) {
            dispatch(action(STORE_ERROR, 'editStoreDesc failed'));
        }
    });

};