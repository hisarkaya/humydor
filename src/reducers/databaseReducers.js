import _ from 'lodash';
import {
    CREATE_COUNTRY,
    EDIT_COUNTRY,
    FETCH_COUNTRIES,
    FETCH_COUNTRY,
    DELETE_COUNTRY
} from '../actions/types';

const defaultState = {
    countries: {},
    brands: {},
    names: {}
}

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_COUNTRIES:
            return { ...state, countries: { ...state.countries, ...payload } };
        case FETCH_COUNTRY:
            return { ...state, countries: { ...state.countries, [payload.id]: payload.country } };
        case CREATE_COUNTRY:
            return { ...state, countries: { ...state.countries, [payload.id]: payload.country } };
        case EDIT_COUNTRY:
            return { 
                    ...state, 
                    countries: { 
                        ...state.countries, 
                        [payload.id]: {  
                            ...state.countries[payload.id],
                            name: payload.name,
                            code: payload.code
                        } 
                    } 
                };
        case DELETE_COUNTRY:
            return _.omit(state.countries, payload);
        default:
            return state;
    }
};