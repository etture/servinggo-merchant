import axios from 'axios';
import {STORE_GET_STORES, STORE_ERROR} from "../types";

const api = process.env.REACT_APP_SERVINGGO_API || process.env.REACT_APP_LOCAL_API;

const action = (type, payload) => {
    return {type, payload};
};

export const createNewStore = (accessToken, formProps, callback) => async dispatch => {
    try {
        console.log(formProps);

        // Configure header to contain accessToken
        const headerConfig = {headers: {authorization: accessToken}};
        const response = await axios.post(`${api}/api/merchant/store/createNewStore`, formProps, headerConfig);

        console.log('createNewStore response:', response);

        callback();

    } catch (err) {
        dispatch(action(STORE_ERROR, 'createNewStore failed'));
    }
};

export const getStores = (accessToken, callback) => async dispatch => {
    try {
        // Configure header to contain accessToken
        const headerConfig = {headers: {authorization: accessToken}};
        const response = await axios.get(`${api}/api/merchant/store/getStores`, headerConfig);

        console.log('createNewStore response:', response);

        dispatch(action(STORE_GET_STORES, response.data));
        callback();

    } catch (err) {
        dispatch(action(STORE_ERROR, 'getStores failed'));
    }
};