import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './categories/AuthReducer';
import storeReducer from './categories/StoreReducer';
import menuReducer from './categories/MenuReducer';
import tableReducer from './categories/TableReducer';
import componentReducer from './categories/ComponentReducer';

export default combineReducers({
    auth: authReducer,
    store: storeReducer,
    menu: menuReducer,
    table: tableReducer,
    comp: componentReducer,
    form: formReducer
});