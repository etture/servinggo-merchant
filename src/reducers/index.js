import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './categories/AuthReducer';
import storeReducer from './categories/StoreReducer';

export default combineReducers({
    auth: authReducer,
    store: storeReducer,
    form: formReducer
});