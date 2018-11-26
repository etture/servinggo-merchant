import reduxThunk from "redux-thunk";
import {applyMiddleware, createStore, compose} from "redux";
import {persistReducer, persistStore} from 'redux-persist';
import reducers from "./index";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['menu']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}

export const store = compose(
    applyMiddleware(...middlewares)
)(createStore)(persistedReducer);
export const persistor = persistStore(store);
