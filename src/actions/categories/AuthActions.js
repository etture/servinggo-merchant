import axios from 'axios';
import {
    AUTH_ERROR,
    AUTH_USER_ACCESS,
    AUTH_USER_REFRESH
} from "../types";
import {api, action} from '../utils';

export const signup = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        const response = await axios.post(`${api}/api/merchant/auth/signup`, formProps);

        dispatch(action(AUTH_USER_ACCESS, response.data.token));

        localStorage.setItem('accessToken', response.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.token.refreshToken);

        callback();
    } catch (err) {
        dispatch(action(AUTH_ERROR, 'Email is in use'));
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        console.log('api:', api);
        const response = await axios.post(`${api}/api/merchant/auth/signin`, formProps);

        dispatch(action(AUTH_USER_ACCESS, response.data.token));

        console.log('payload:', response.data.token);
        localStorage.setItem('accessToken', response.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.token.refreshToken);

        callback();
    } catch (err) {
        dispatch(action(AUTH_ERROR, 'Sign in failed'));
    }
};

export const signout = (callback) => dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    dispatch(action(AUTH_USER_ACCESS, ''));

    if(callback) callback();
};

export const refreshAccessToken = (refreshToken, callback) => async dispatch => {
    try {
        // Catch error for expired refresh token
        if(refreshToken === 'refreshToken expired') throw new Error('refreshToken expired');

        const headerConfig = {headers: {authorization: refreshToken}};
        const response = await axios.post(`${api}/api/merchant/auth/refresh`, {}, headerConfig);
        console.log('response:', response);

        dispatch(action(AUTH_USER_REFRESH, response.data.accessToken));

        localStorage.setItem('accessToken', response.data.accessToken);

        callback();
    } catch (err) {
        dispatch(action(AUTH_ERROR, 'Token refresh failed'));
    }
};

