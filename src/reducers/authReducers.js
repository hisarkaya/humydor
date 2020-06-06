import {

    // SET_WINDOW_LOADING,
    // SET_CONTAINER_LOADING,
    // SET_ITEM_LOADING,
    GET_SMU_SUCCESS,
    GET_USER_SUCCESS,
    SET_AUTH_WARNING,
    CREATE_USER_SUCCESS,   
    SIGNOUT_SUCCESS,
} from '../actions/types';

const defaultstate = {

    // isWindowLoading: false,
    // isContainerLoading: false,
    // isItemLoading: false,
    // errorWindow: null,
    // errorItem: null,
    // errorContainer: null,
    isAuthenticated: false,
    smuUser: {},
    user: {},
    _username: null,
    auth_warning: null
}

export default (state = defaultstate, { type, payload }) => {

    const regexExcludeUsername = /[^a-zA-Z0-9\-_]/gi;

    var email_splitted, proposed_username;

    switch (type) {

        // case SET_WINDOW_LOADING:
        //     return {
        //         ...state,
        //         isWindowLoading: payload.flag,
        //         errorWindow: payload.error
        //     }
        // case SET_ITEM_LOADING:
        //     return {
        //         ...state,
        //         isItemLoading: payload.flag,
        //         errorItem: payload.error
        //     }
        // case SET_CONTAINER_LOADING:
        //     return {
        //         ...state,
        //         isContainerLoading: payload.flag,
        //         errorContainer: payload.error
        //     }
        case GET_SMU_SUCCESS:
            email_splitted = payload.email && payload.email.split('@')[0].replace(regexExcludeUsername, '');
            proposed_username = email_splitted ? email_splitted + '-' + payload.uid.substr(-6).replace(regexExcludeUsername, '').toLowerCase() : '';
            return {
                ...state,
                smuUser: payload,
                _username: proposed_username
            };
        case SET_AUTH_WARNING:
            return {
                ...state,
                auth_warning: payload
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };
        case SIGNOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                smuUser: {},
                _username: null,
                user: {}
            };
        default:
            return state;
    }
}