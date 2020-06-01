import {
    CREATE_CIGAR,
    FETCH_CIGARS,
    FETCH_CIGAR,
    EDIT_CIGAR,
    DELETE_CIGAR

} from './types';

import history from '../history';
import { setContainerLoading } from './common';
import { firebase_core, firebase_store } from '../firebase';



const createCigarSuccess = payload => {
    return {
        type: CREATE_CIGAR,
        payload
    }
}

export const createCigar = formValues => (dispatch, getState) => {

    const { uid } = getState().auth.smuUser;
    const { brands } = getState().database;
    const { name, brandId } = formValues;
    const brand = brands[brandId];

    const countryObj = {
        id: brand.country.id,
        name: brand.country.name,
        code: brand.country.code
    };
    const brandObj = {
        id: brandId,
        name: brand.name
    };

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("cigars")
        .add({
            name,
            country: countryObj,
            brand: brandObj,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createCigarSuccess({ id: docRef.id, cigar: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    history.push('/cigars');
                })
                .catch(error => {
                    dispatch(setContainerLoading({ flag: false, error }));
                });
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchCigarsSuccess = payload => {
    return {
        type: FETCH_CIGARS,
        payload
    }
}

export const fetchCigars = () => (dispatch, getState) => {

    var tmpCigars;
    const { uid } = getState().auth.smuUser;

    tmpCigars = {};
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("cigars")
        .where("userId", "==", uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                tmpCigars[doc.id] = doc.data();
            });
            dispatch(setContainerLoading({ flag: false }));
            dispatch(fetchCigarsSuccess(tmpCigars));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}

const fetchCigarSuccess = payload => {
    return {
        type: FETCH_CIGAR,
        payload
    }
}

export const fetchCigar = (cigarId) => (dispatch) => {


    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("cigars")
        .doc(cigarId)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch(fetchCigarSuccess({ id: cigarId, cigar: doc.data() }));
            }
            dispatch(setContainerLoading({ flag: false }));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });



}

const editCigarSuccess = payload => {
    return {
        type: EDIT_CIGAR,
        payload
    }
}

export const editCigar = (cigarId, formValues) => (dispatch, getState) => {

    const { brands } = getState().database;
    const { name, brandId } = formValues;
    const brand = brands[brandId];

    const countryObj = {
        id: brand.country.id,
        name: brand.country.name,
        code: brand.country.code
    };
    const brandObj = {
        id: brandId,
        name: brand.name
    };

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("cigars")
        .doc(cigarId)
        .update({ name, brand: brandObj, country: countryObj })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editCigarSuccess({ id: cigarId, name, brand: brandObj, country: countryObj }));
            history.push('/cigars');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteCigarSuccess = payload => {
    return {
        type: DELETE_CIGAR,
        payload
    }
}

export const deleteName = cigarId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("names")
        .doc(cigarId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteCigarSuccess(cigarId));
            history.push('/names');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}