import {
    SET_WINDOW_LOADING,
    SET_CONTAINER_LOADING,
    SET_ITEM_LOADING,
    SET_FORM_MESSAGE
} from '../actions/types';

const defaultstate = {

    isWindowLoading: false,
    isContainerLoading: false,
    isItemLoading: false,
    errorWindow: null,
    errorItem: null,
    errorContainer: null,
    formMessage: {},

}

export default (state = defaultstate, { type, payload }) => {

    switch (type) {

        case SET_WINDOW_LOADING:
            return {
                ...state,
                isWindowLoading: payload.flag,
                errorWindow: payload.error
            }
        case SET_ITEM_LOADING:
            return {
                ...state,
                isItemLoading: payload.flag,
                errorItem: payload.error
            }
        case SET_CONTAINER_LOADING:
            return {
                ...state,
                isContainerLoading: payload.flag,
                errorContainer: payload.error
            }
        case SET_FORM_MESSAGE:
            return {
                ...state,
                formMessage: {
                    text: payload.text,
                    type: payload.type,
                    time: Date.now()
                }
            }
        default:
            return state;
    }
}