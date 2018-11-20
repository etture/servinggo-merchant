import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AUTH_USER_ACCESS, AUTH_USER_REFRESH, AUTH_ERROR} from "../types";

const api = process.env.REACT_APP_SERVINGGO_API || process.env.REACT_APP_LOCAL_API;

const action = (type, payload) => {
    return {type, payload};
};

// Function to check if accessToken is expired
// If so, refresh the accessToken first before calling the callback
export const checkAccessToken = (token, callback) => {
    const {accessToken, refreshToken} = token;
    const atDecoded = jwtDecode(accessToken);
    const rtDecoded = jwtDecode(refreshToken);

    if (rtDecoded.exp * 1000 < Date.now()) {
        console.log('Refresh token expired!');
        refreshAccessToken('refreshToken expired');
    } else if (atDecoded.exp * 1000 < Date.now()){
        console.log('Access token expired!');
        refreshAccessToken(refreshToken, callback);
    } else{
        callback();
    }
};

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

    callback();
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

