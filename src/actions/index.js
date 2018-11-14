import axios from 'axios';
import {AUTH_USER_ACCESS, AUTH_USER_REFRESH, AUTH_ERROR} from "./types";

const api = process.env.SERVINGGO_API || "http://localhost:3012";

export const signup = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        const response = await axios.post(`${api}/api/merchant/auth/signup`, formProps);

        dispatch({
            type: AUTH_USER_ACCESS,
            payload: response.data.token
        });
        localStorage.setItem('access_token', response.data.token.access_token);
        localStorage.setItem('refresh_token', response.data.token.refresh_token);
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
        localStorage.setItem('access_token', response.data.token.access_token);
        localStorage.setItem('refresh_token', response.data.token.refresh_token);
        callback();
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Sign in failed'
        });
    }
};

export const signout = (callback) => async dispatch => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch({
        type: AUTH_USER_ACCESS,
        payload: ''
    });
    callback();
};

export const refreshAccessToken = (refresh_token, callback) => async dispatch => {
    try {
        const headerConfig = {
            headers: {
                authorization: refresh_token
            }
        };
        const response = await axios.post(`${api}/api/merchant/auth/refresh`, {}, headerConfig);
        console.log('response:', response);
        dispatch({
            type: AUTH_USER_REFRESH,
            payload: response.data.access_token
        });
        localStorage.setItem('access_token', response.data.access_token);
        callback();
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Token refresh failed'
        });
    }
};