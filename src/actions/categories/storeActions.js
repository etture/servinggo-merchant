import axios from 'axios';
import {STORE_GET_STORES, STORE_LAST, STORE_ERROR, STORE_EDIT_DESC} from "../types";
import {checkAccessToken} from "./authActions";

const api = process.env.REACT_APP_SERVINGGO_API || process.env.REACT_APP_LOCAL_API;

const action = (type, payload) => {
    return {type, payload};
};

export const createNewStore = (token, formProps, callback) => dispatch => {
    checkAccessToken(token, async () => {
        try {
            console.log(formProps);

            const {accessToken} = token;
            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/store/createNewStore`, formProps, headerConfig);

            console.log('createNewStore response:', response);

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

export const saveLastStore = (storeId) => dispatch => {
    dispatch(action(STORE_LAST, storeId));
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