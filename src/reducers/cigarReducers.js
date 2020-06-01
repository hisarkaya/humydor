import _ from 'lodash';
import {
    CREATE_CIGAR,
    FETCH_CIGARS,
    FETCH_CIGAR,
    EDIT_CIGAR,
    DELETE_CIGAR
} from '../actions/types';

export default (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_CIGAR:
            return { ...state, [payload.id]: payload.cigar };
        case FETCH_CIGARS:
            return { ...state, ...payload };

        case FETCH_CIGAR:
            return { ...state, [payload.id]: payload.cigar };

        case EDIT_CIGAR:
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    name: payload.name,
                    brand: payload.brand,
                    country: payload.country
                }
            };

        default:
            return state;
    }
}