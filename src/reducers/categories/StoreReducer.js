import {
    STORE_ERROR,
    STORE_CREATE_NEW,
    STORE_GET_STORES,
    STORE_CURRENT_ID,
    STORE_EDIT_DESC
} from "../../actions/types";

const INITIAL_STATE = {
    numOfStores: 0,
    stores: [],
    currentStoreId: 0,
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case STORE_CREATE_NEW:
            return {
                ...state,
                errorMessage: ''
            };
        case STORE_GET_STORES:
            // payload includes .accessToken and .refreshToken
            return {
                ...state,
                numOfStores: action.payload.numOfStores,
                stores: action.payload.stores,
                errorMessage: ''
            };
        case STORE_CURRENT_ID:
            return {
                ...state,
                currentStoreId: action.payload,
                errorMessage: ''
            };
        case STORE_EDIT_DESC:
            return {
                ...state,
                stores: state.stores.map((store) => {
                    if (store.id === state.currentStoreId) {
                        return {
                            ...store,
                            description: action.payload
                        };
                    } else {
                        return store;
                    }
                }),
                errorMessage: ''
            };
        case STORE_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};