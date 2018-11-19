import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './categories/authReducer';
import storeReducer from './categories/storeReducer';

export default combineReducers({
    auth: authReducer,
    store: storeReducer,
    form: formReducer
});