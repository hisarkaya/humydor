import {
    CREATE_COUNTRY,
    FETCH_COUNTRIES,
    FETCH_COUNTRY,
    EDIT_COUNTRY,
    DELETE_COUNTRY
} from './types';

import history from '../history';
import { setContainerLoading } from './common';
import { firebase_core, firebase_store } from '../firebase';

const createCountrySuccess = payload => {
    return {
        type: CREATE_COUNTRY,
        payload
    }
}

export const createCountry = formValues => (dispatch, getState) => {
    const { uid } = getState().auth.smuUser;
    const { name, code } = formValues;

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("countries")
        .add({
            name,
            code,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createCountrySuccess({ id: docRef.id, country: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    history.push('/countries');
                })
                .catch(error => {
                    dispatch(setContainerLoading({ flag: false, error }));
                });
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchCountriesSuccess = payload => {
    return {
        type: FETCH_COUNTRIES,
        payload
    }
}

export const fetchCountries = () => dispatch => {

    var countries = {};
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("countries")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                countries[doc.id] = doc.data();
            });
            dispatch(setContainerLoading({ flag: false }));
            dispatch(fetchCountriesSuccess(countries));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}


const fetchCountrySuccess = payload => {
    return {
        type: FETCH_COUNTRY,
        payload
    }
}

export const fetchCountry = (countryId) => dispatch => {

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("countries")
        .doc(countryId)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch(fetchCountrySuccess({ id: countryId, country: doc.data() }));
            }
            dispatch(setContainerLoading({ flag: false }));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const editCountrySuccess = payload => {
    return {
        type: EDIT_COUNTRY,
        payload
    }
}

export const editCountry = (countryId, formValues) => dispatch => {

    const { name, code } = formValues;

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("countries")
        .doc(countryId)
        .update({ name, code })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editCountrySuccess({ id: countryId, name, code }));
            history.push('/countries');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteCountrySuccess = payload => {
    return {
        type: DELETE_COUNTRY,
        payload
    }
}

export const deleteCountry = countryId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("countries")
        .doc(countryId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteCountrySuccess(countryId));
            history.push('/countries');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}