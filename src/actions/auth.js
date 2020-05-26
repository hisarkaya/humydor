import {

    SET_WINDOW_LOADING,
    SET_CONTAINER_LOADING,
    SET_ITEM_LOADING,
    GET_SMU_SUCCESS,
    GET_USER_SUCCESS,
    SET_AUTH_WARNING,
    CREATE_USER_SUCCESS,
    SIGNOUT_SUCCESS

} from './types';

import history from '../history';
import { firebase_core, firebase_auth, firebase_store } from '../firebase';

const setWindowLoading = payload => {
    return {
        type: SET_WINDOW_LOADING,
        payload
    }
}

const getSMUSuccess = smuUser => {
    return {
        type: GET_SMU_SUCCESS,
        payload: smuUser
    }
}

const getUserSuccess = user => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    }
}

export const verifyAuth = () => dispatch => {
    dispatch(setWindowLoading({ flag: true }));
    firebase_auth.onAuthStateChanged(smuUser => {
        if (smuUser !== null) {
            dispatch(getSMUSuccess(smuUser));
            firebase_store.collection('users').doc(smuUser.uid).get()
                .then(snapshot => {
                    var user = snapshot.data();
                    if (user) {
                        dispatch(getUserSuccess(user));
                    }
                    dispatch(setWindowLoading({ flag: false }));
                })
                .catch(error => {
                    dispatch(setWindowLoading({ flag: false, error }));
                });
        } else {
            dispatch(setWindowLoading({ flag: false }));
        }
    });
};

export const setAuthWarning = type => {
    return {
        type: SET_AUTH_WARNING,
        payload: type
    }
}

export const getAuth = (type, provider, source) => dispatch => {

    var _provider;

    switch (provider) {
        case 'facebook':
            _provider = new firebase_core.auth.FacebookAuthProvider();
            _provider.addScope('email');
            if (type === 'popup') {
                _provider.setCustomParameters({
                    'display': 'popup'
                });
            }
            break;
        case 'google':
            _provider = new firebase_core.auth.GoogleAuthProvider();
            break;
        default:
            _provider = null;
    }

    if (type === 'popup') {
        dispatch(setContainerLoading({ flag: true }));
        firebase_auth.signInWithPopup(_provider)
            .then(result => {
                var smuUser = result.user;
                dispatch(getSMUSuccess(smuUser));
                firebase_store.collection('users')
                    .doc(smuUser.uid)
                    .get()
                    .then(snapshot => {
                        var user = snapshot.data();
                        dispatch(setContainerLoading({ flag: false }));
                        if (!user) {
                            if (source === 'signin') {
                                dispatch(setAuthWarning('signup'));
                            }
                            history.push(`/signup-form`);
                        } else {
                            dispatch(getUserSuccess(user));
                            if (source === 'signup') {
                                dispatch(setAuthWarning('signin'));
                            }
                            history.push('/');
                        }
                    })
                    .catch(error => {
                        dispatch(setContainerLoading({ flag: false, error }));
                    });
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    } else {
        firebase_auth.signInWithRedirect(_provider);
    }
}

const setItemLoading = payload => {
    return {
        type: SET_ITEM_LOADING,
        payload
    }
}

const setContainerLoading = payload => {
    return {
        type: SET_CONTAINER_LOADING,
        payload
    }
}

export const getUsername = username => dispatch => {

    const regexUsername = /^[a-zA-Z0-9\-_]+$/;

    username = username && username.trim();

    dispatch(setItemLoading({ flag: true }));

    if (regexUsername.test(username)) {

        if (username.length < 6) {
            dispatch(setItemLoading({ flag: false, error: 'At least 6 characters' }));
            return;
        }
        if (username.length > 50) {
            dispatch(setItemLoading({ flag: false, error: 'At most 50 characters' }));
            return;
        }
        firebase_store.collection("users")
            .where("username", "==", username)
            .get()
            .then(snapshot => {
                var isAvailable = snapshot.docs.length === 0;
                dispatch(setItemLoading({ flag: false, error: isAvailable ? '' : 'Not available' }));
            })
            .catch(error => {
                dispatch(setItemLoading({ flag: false, error: '' }));
                dispatch(setContainerLoading({ flag: false, error }));
            });
    } else {
        dispatch(setItemLoading({ flag: false, error: 'Only characters, numbers, dash and underscore' }));
    }
}

const createUserSuccess = user => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: user
    }
}

export const createUser = (uid, user) => dispatch => {

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("users").doc(uid)
        .set({
            ...user,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            dispatch(createUserSuccess(user));
            dispatch(setContainerLoading({ flag: false }));
            history.push('/');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}


export const receiveSignout = () => {
    return {
        type: SIGNOUT_SUCCESS
    }
}

export const signout = () => dispatch => {

    dispatch(setWindowLoading({ flag: true }));

    firebase_auth
        .signOut()
        .then(() => {
            dispatch(receiveSignout());
            dispatch(setWindowLoading({ flag: false }));
            history.push('/signin');
        })
        .catch(error => {
            dispatch(setWindowLoading({ flag: false, error }));
        });
}




