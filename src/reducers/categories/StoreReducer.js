import {STORE_GET_STORES, STORE_LAST, STORE_EDIT_DESC, STORE_ERROR} from "../../actions/types";

const INITIAL_STATE = {
    numOfStores: 0,
    stores: [],
    lastStoreId: 0,
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case STORE_GET_STORES:
            // payload includes .accessToken and .refreshToken
            return {
                ...state,
                numOfStores: action.payload.numOfStores,
                stores: action.payload.stores,
                errorMessage: ''
            };
        case STORE_LAST:
            return {
                ...state,
                lastStoreId: action.payload,
                errorMessage: ''
            };
        case STORE_EDIT_DESC:
            return {
                ...state,
                stores: state.stores.map((store) => {
                    if (store.id === state.lastStoreId) {
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
}