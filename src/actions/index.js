import axios from 'axios';
import {AUTH_USER_ACCESS, AUTH_USER_REFRESH, AUTH_ERROR} from "./types";

const api = process.env.REACT_APP_SERVINGGO_API || process.env.REACT_APP_LOCAL_API;

export const signup = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        const response = await axios.post(`${api}/api/merchant/auth/signup`, formProps);

        dispatch({
            type: AUTH_USER_ACCESS,
            payload: response.data.token
        });
        localStorage.setItem('accessToken', response.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.token.refreshToken);
        callback();
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Email is in use'
        });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        const response = await axios.post(`${api}/api/merchant/auth/signin`, formProps);

        dispatch({
            type: AUTH_USER_ACCESS,
            payload: response.data.token
        });
        console.log('payload:', response.data.token);
        localStorage.setItem('accessToken', response.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.token.refreshToken);
        callback();
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Sign in failed'
        });
    }
};

export const signout = (callback) => async dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({
        type: AUTH_USER_ACCESS,
        payload: ''
    });
    callback();
};

export const refreshAccessToken = (refreshToken, callback) => async dispatch => {
    try {
        const headerConfig = {
            headers: {
                authorization: refreshToken
            }
        };
        const response = await axios.post(`${api}/api/merchant/auth/refresh`, {}, headerConfig);
        console.log('response:', response);
        dispatch({
            type: AUTH_USER_REFRESH,
            payload: response.data.accessToken
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        callback();
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Token refresh failed'
        });
    }
};