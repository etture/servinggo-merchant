import {AUTH_USER_ACCESS, AUTH_USER_REFRESH, AUTH_ERROR} from "../../actions/types";

const INITIAL_STATE = {
    accessToken: '',
    refreshToken: '',
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case AUTH_USER_ACCESS:
            // payload includes .accessToken and .refreshToken
            return {...state, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken};
        case AUTH_USER_REFRESH:
            // payload includes .accessToken
            return {...state, accessToken: action.payload.accessToken};
        case AUTH_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}