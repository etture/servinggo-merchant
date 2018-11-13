import axios from 'axios';
import {AUTH_USER, AUTH_ERROR} from "./types";

export const signup = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        const response = await axios.post('http://localhost:3012/api/merchant/auth/signup', formProps);
        dispatch({
            type: AUTH_USER,
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
        const response = await axios.post('http://localhost:3012/api/merchant/auth/signin', formProps);
        dispatch({
            type: AUTH_USER,
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
        type: AUTH_USER,
        payload: ''
    });
    callback();
};