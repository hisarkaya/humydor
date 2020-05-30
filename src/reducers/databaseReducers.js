import _ from 'lodash';
import {
    CREATE_COUNTRY,
    EDIT_COUNTRY,
    FETCH_COUNTRIES,
    FETCH_COUNTRY,
    DELETE_COUNTRY,
    CREATE_BRAND,
    FETCH_BRANDS,
    FETCH_BRAND,
    EDIT_BRAND,
    DELETE_BRAND
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
            return {
                ...state,
                countries: _.omit(state.countries, payload)
            }

        case FETCH_BRANDS:
            return { ...state, brands: { ...state.brands, ...payload } };
        case FETCH_BRAND:
            return { ...state, brands: { ...state.brands, [payload.id]: payload.brand } };
        case CREATE_BRAND:
            return { ...state, brands: { ...state.brands, [payload.id]: payload.brand } };
        case EDIT_BRAND:
            return {
                ...state,
                brands: {
                    ...state.brands,
                    [payload.id]: {
                        ...state.brands[payload.id],
                        name: payload.name,
                        code: payload.code
                    }
                }
            };
        case DELETE_BRAND:
            return {
                ...state,
                brands: _.omit(state.brands, payload)
            }

        default:
            return state;
    }
};