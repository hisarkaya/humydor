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
    DELETE_BRAND,
    CREATE_NAME,
    FETCH_NAMES,
    FETCH_NAME,
    EDIT_NAME,
    DELETE_NAME
} from '../actions/types';

const defaultState = {
    countries: {},
    brands: {},
    names: {},
    countriesFetched: false,
    brandsFetched: false,
    namesFetched: false

}

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_COUNTRIES:
            return { ...state, countries: { ...state.countries, ...payload }, countriesFetched: true };
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
            return { ...state, brands: { ...state.brands, ...payload }, brandsFetched: true };
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
                        country: payload.country
                    }
                }
            };
        case DELETE_BRAND:
            return {
                ...state,
                brands: _.omit(state.brands, payload)
            }



        case FETCH_NAMES:
            return { ...state, names: { ...state.names, ...payload }, namesFetched: true };
        case FETCH_NAME:
            return { ...state, names: { ...state.names, [payload.id]: payload.name } };
        case CREATE_NAME:
            return { ...state, names: { ...state.names, [payload.id]: payload.name } };
        case EDIT_NAME:
            return {
                ...state,
                names: {
                    ...state.names,
                    [payload.id]: {
                        ...state.names[payload.id],
                        title: payload.title,
                        brand: payload.brand,
                        country: payload.country
                    }
                }
            };
        case DELETE_NAME:
            return {
                ...state,
                names: _.omit(state.names, payload)
            }

        default:
            return state;
    }
};