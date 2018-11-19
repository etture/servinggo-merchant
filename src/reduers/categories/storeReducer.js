import {STORE_GET_STORES, STORE_ERROR} from "../../actions/types";

const INITIAL_STATE = {
    numOfStores: 0,
    stores: []
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case STORE_GET_STORES:
            // payload includes .accessToken and .refreshToken
            return {...state, numOfStores: action.payload.numOfStores, stores: action.payload.stores};
        case STORE_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}