import {
    CREATE_COUNTRY,
    FETCH_COUNTRIES,
    FETCH_COUNTRY,
    EDIT_COUNTRY,
    DELETE_COUNTRY,
    CREATE_BRAND,
    FETCH_BRANDS,
    FETCH_BRAND,
    EDIT_BRAND,
    DELETE_BRAND

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




const createBrandSuccess = payload => {
    return {
        type: CREATE_BRAND,
        payload
    }
}

export const createBrand = formValues => (dispatch, getState) => {
    const { uid } = getState().auth.smuUser;
    const { name, code } = formValues;

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("brands")
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
                    dispatch(createBrandSuccess({ id: docRef.id, brand: doc.data() }));
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

const fetchBrandsSuccess = payload => {
    return {
        type: FETCH_BRANDS,
        payload
    }
}

export const fetchBrands = () => dispatch => {

    var brands = {};
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("brands")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                brands[doc.id] = doc.data();
            });
            dispatch(setContainerLoading({ flag: false }));
            dispatch(fetchBrandsSuccess(brands));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchBrandSuccess = payload => {
    return {
        type: FETCH_BRAND,
        payload
    }
}

export const fetchBrand = (brandId) => dispatch => {

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("brands")
        .doc(brandId)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch(fetchBrandSuccess({ id: brandId, brand: doc.data() }));
            }
            dispatch(setContainerLoading({ flag: false }));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const editBrandSuccess = payload => {
    return {
        type: EDIT_BRAND,
        payload
    }
}

export const editBrand = (brandId, formValues) => dispatch => {

    const { name, code } = formValues;

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("brands")
        .doc(brandId)
        .update({ name, code })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editBrandSuccess({ id: brandId, name, code }));
            history.push('/countries');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteBrandSuccess = payload => {
    return {
        type: DELETE_BRAND,
        payload
    }
}

export const deleteBrand = brandId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("brands")
        .doc(brandId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteBrandSuccess(brandId));
            history.push('/countries');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}