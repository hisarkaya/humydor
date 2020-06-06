import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import commonReducers from './commonReducers';
import authReducers from './authReducers';
import databaseReducers from './databaseReducers';
import cigarReducers from './cigarReducers';

export default combineReducers({
    common: commonReducers,
    auth: authReducers,
    database: databaseReducers,
    cigars: cigarReducers, 
    form: formReducer
});