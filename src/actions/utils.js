import jwtDecode from 'jwt-decode';
import {refreshAccessToken, signout} from "./categories/AuthActions";

export const api = process.env.REACT_APP_SERVINGGO_API || process.env.REACT_APP_LOCAL_API;

// Function to return object to be dispatched to Redux
export const action = (type, payload) => {
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
        signout();
    } else if (atDecoded.exp * 1000 < Date.now()){
        console.log('Access token expired!');
        console.log('Why is this blocking?');
        refreshAccessToken(refreshToken, callback);
    } else{
        callback();
    }
};