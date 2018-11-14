import {AUTH_USER_ACCESS, AUTH_USER_REFRESH, AUTH_ERROR} from "../actions/types";

const INITIAL_STATE = {
    access_token: '',
    refresh_token: '',
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case AUTH_USER_ACCESS:
            // payload includes .access_token and .refresh_token
            return {...state, access_token: action.payload.access_token, refresh_token: action.payload.refresh_token};
        case AUTH_USER_REFRESH:
            // payload includes .access_token
            return {...state, access_token: action.payload.access_token};
        case AUTH_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}