import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducers from './authReducers';
import databaseReducers from './databaseReducers';
import cigarReducers from './cigarReducers';

export default combineReducers({
    auth: authReducers,
    database: databaseReducers,
    cigars: cigarReducers, 
    form: formReducer
});