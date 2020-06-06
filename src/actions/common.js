import {

    SET_WINDOW_LOADING,
    SET_CONTAINER_LOADING,
    SET_ITEM_LOADING,
    SET_FORM_MESSAGE

} from './types';

export const setContainerLoading = payload => {
    return {
        type: SET_CONTAINER_LOADING,
        payload
    }
}

export const setWindowLoading = payload => {
    return {
        type: SET_WINDOW_LOADING,
        payload
    }
}

export const setItemLoading = payload => {
    return {
        type: SET_ITEM_LOADING,
        payload
    }
}

export const setFormMessage = payload => {
    return {
        type: SET_FORM_MESSAGE,
        payload
    }
}