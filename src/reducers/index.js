import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducers from './authReducers';
import databaseReducers from './databaseReducers';

export default combineReducers({
    auth: authReducers,
    database: databaseReducers,
    form: formReducer
});