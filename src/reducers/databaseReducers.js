import _ from 'lodash';
import {
    CREATE_COUNTRY,
    EDIT_COUNTRY,
    FETCH_COUNTRIES,
    FETCH_COUNTRY,
    DELETE_COUNTRY,

    CREATE_COLOR,
    EDIT_COLOR,
    FETCH_COLORS,
    FETCH_COLOR,
    DELETE_COLOR,

    CREATE_SHAPE,
    FETCH_SHAPES,
    FETCH_SHAPE,
    EDIT_SHAPE,
    DELETE_SHAPE,

    CREATE_BRAND,
    FETCH_BRANDS,
    FETCH_BRANDS_BY_PAGE,
    FETCH_SORTED_BRANDS,
    FETCH_SERACHED_BRANDS,
    FETCH_BRAND,
    EDIT_BRAND,
    DELETE_BRAND,


    CREATE_SOURCE,
    FETCH_SOURCES,
    FETCH_SOURCES_BY_PAGE,
    FETCH_SORTED_SOURCES,
    FETCH_SEARCHED_SOURCES,
    FETCH_SOURCE,
    EDIT_SOURCE,
    DELETE_SOURCE,


    CREATE_NAME,
    FETCH_NAMES,
    FETCH_NAME,
    EDIT_NAME,
    DELETE_NAME


} from '../actions/types';


const getListedJSON = (json, page, pageSize, sortColumn, sortOrder, term) => {

    var collection = Object.keys(json).map(i => {
        var obj = json[i];
        return { ...obj, 'key': i }
    }),
        pg = page || 1,
        sc = sortColumn || 'name',
        so = sortOrder || 'asc',
        search = term || '',
        pgSize = pageSize || 10,
        offset = (pg - 1) * pgSize,
        items;

    if (search) {
        collection = _.filter(collection, o => o.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }
    items = _.orderBy(collection, [sc], [so]);
    items = _.drop(items, offset).slice(0, pgSize);

    return {
        page: pg,
        pageSize: pgSize,
        total: collection.length,
        totalPages: Math.ceil(collection.length / pgSize),
        sortColumn: sc,
        sortOrder: so,
        search,
        data: items
    };
}


const defaultState = {

    countries: {},
    brands: {},
    sources: {},
    colors: {},
    shapes: {},

    names: {},

    countriesFetched: false,
    brandsFetched: false,
    sourcesFetched: false,
    colorsFetched: false,
    shapesFteched: false,

    namesFetched: false,

    listedBrands: null,
    listedSources: null

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



        case FETCH_SHAPES:
            return { ...state, shapes: { ...state.shapes, ...payload }, shapesFetched: true };
        case FETCH_SHAPE:
            return { ...state, shapes: { ...state.shapes, [payload.id]: payload.shape } };
        case CREATE_SHAPE:
            return { ...state, shapes: { ...state.shapes, [payload.id]: payload.shape } };
        case EDIT_SHAPE:
            return {
                ...state,
                shapes: {
                    ...state.shapes,
                    [payload.id]: {
                        ...state.shapes[payload.id],
                        name: payload.name
                    }
                }
            };
        case DELETE_SHAPE:
            return {
                ...state,
                shapes: _.omit(state.shapes, payload)
            }



        case FETCH_COLORS:
            return { ...state, colors: { ...state.colors, ...payload }, colorsFetched: true };
        case FETCH_COLOR:
            return { ...state, colors: { ...state.colors, [payload.id]: payload.color } };
        case CREATE_COLOR:
            return { ...state, colors: { ...state.colors, [payload.id]: payload.color } };
        case EDIT_COLOR:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    [payload.id]: {
                        ...state.colors[payload.id],
                        name: payload.name,
                        code: payload.code
                    }
                }
            };
        case DELETE_COLOR:
            return {
                ...state,
                colors: _.omit(state.colors, payload)
            }



        case FETCH_BRANDS:
            return {
                ...state,
                brands: {
                    ...state.brands,
                    ...payload
                },
                brandsFetched: true
            };

        case FETCH_BRANDS_BY_PAGE:
            return {
                ...state,
                listedBrands: getListedJSON(
                    state.brands,
                    payload,
                    state.listedBrands && state.listedBrands.pageSize,
                    state.listedBrands && state.listedBrands.sortColumn,
                    state.listedBrands && state.listedBrands.sortOrder
                )
            }

        case FETCH_SORTED_BRANDS:

            return {
                ...state,
                listedBrands: getListedJSON(
                    state.brands,
                    state.listedBrands && state.listedBrands.page,
                    state.listedBrands && state.listedBrands.pageSize,
                    payload.column,
                    payload.order
                )
            };

        case FETCH_SERACHED_BRANDS:

            return {
                ...state,
                listedBrands: getListedJSON(
                    state.brands,
                    1,
                    state.listedBrands && state.listedBrands.pageSize,
                    state.listedBrands && state.listedBrands.sortColumn,
                    state.listedBrands && state.listedBrands.sortOrder,
                    payload
                )
            };



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
                        name: payload.name
                    }
                }
            };
        case DELETE_BRAND:
            return {
                ...state,
                brands: _.omit(state.brands, payload)
            }



        case FETCH_SOURCES:
            return {
                ...state,
                sources: {
                    ...state.sources,
                    ...payload
                },
                sourcesFetched: true
            };

        case FETCH_SOURCES_BY_PAGE:
            return {
                ...state,
                listedSources: getListedJSON(
                    state.sources,
                    payload,
                    state.listedSources && state.listedSources.pageSize,
                    state.listedSources && state.listedSources.sortColumn,
                    state.listedSources && state.listedSources.sortOrder
                )
            }

        case FETCH_SORTED_SOURCES:

            return {
                ...state,
                listedSources: getListedJSON(
                    state.sources,
                    state.listedSources && state.listedSources.page,
                    state.listedSources && state.listedSources.pageSize,
                    payload.column,
                    payload.order
                )
            };

        case FETCH_SEARCHED_SOURCES:

            return {
                ...state,
                listedSources: getListedJSON(
                    state.sources,
                    1,
                    state.listedSources && state.listedSources.pageSize,
                    state.listedSources && state.listedSources.sortColumn,
                    state.listedSources && state.listedSources.sortOrder,
                    payload
                )
            };



        case FETCH_SOURCE:
            return { ...state, sources: { ...state.sources, [payload.id]: payload.source } };
        case CREATE_SOURCE:
            return { ...state, sources: { ...state.sources, [payload.id]: payload.source } };
        case EDIT_SOURCE:
            return {
                ...state,
                sources: {
                    ...state.sources,
                    [payload.id]: {
                        ...state.sources[payload.id],
                        name: payload.name
                    }
                }
            };
        case DELETE_SOURCE:
            return {
                ...state,
                sources: _.omit(state.sources, payload)
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