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
    DELETE_BRAND,
    CREATE_NAME,
    FETCH_NAMES,
    FETCH_NAME,
    EDIT_NAME,
    DELETE_NAME

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

export const fetchCountries = () => (dispatch, getState) => {

    var tmpCountries;

    const { countriesFetched, countries } = getState().database;
    dispatch(setContainerLoading({ flag: true }));

    if (countriesFetched) {
        dispatch(setContainerLoading({ flag: false }));
        dispatch(fetchCountriesSuccess(countries));
    } else {

        console.log('firestore called for countries');
        
        tmpCountries = {};
        firebase_store.collection("countries")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                tmpCountries[doc.id] = doc.data();
            });
            dispatch(setContainerLoading({ flag: false }));
            dispatch(fetchCountriesSuccess(tmpCountries));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
    }
}

const fetchCountrySuccess = payload => {
    return {
        type: FETCH_COUNTRY,
        payload
    }
}

export const fetchCountry = countryId => (dispatch, getState) => {

    var tmpCountry;
    const { countriesFetched, countries } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (countriesFetched) {
        tmpCountry = countries[countryId];
        if (tmpCountry) {
            dispatch(fetchCountrySuccess({ id: countryId, country: tmpCountry }));
        }
        dispatch(setContainerLoading({ flag: false }));
        
    } else {

        console.log('firestore called for country');

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
    const { countries } = getState().database;
    const { name, countryId } = formValues;
    const country = countries[countryId];
    const countryObj = {
        id: countryId,
        name: country.name,
        code: country.code
    };

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("brands")
        .add({
            name,
            country: countryObj,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createBrandSuccess({ id: docRef.id, brand: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    history.push('/brands');
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

export const fetchBrands = () => (dispatch, getState) => {

    var tmpBrands;
    const { brandsFetched, brands } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (brandsFetched) {
        dispatch(setContainerLoading({ flag: false }));
        dispatch(fetchBrandsSuccess(brands));
    } else {

        console.log('firestore called for brands');
        
        tmpBrands = {};
        firebase_store.collection("brands")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                tmpBrands[doc.id] = doc.data();
            });
            dispatch(setContainerLoading({ flag: false }));
            dispatch(fetchBrandsSuccess(tmpBrands));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
    }
}

const fetchBrandSuccess = payload => {
    return {
        type: FETCH_BRAND,
        payload
    }
}

export const fetchBrand = (brandId) => (dispatch, getState) => {

    var tmpBrand;
    const { brandsFetched, brands } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (brandsFetched) {
        tmpBrand = brands[brandId];
        if (tmpBrand) {
            dispatch(fetchBrandSuccess({ id: brandId, brand: tmpBrand }));
        }
        dispatch(setContainerLoading({ flag: false }));
    } else {

        console.log('firestore called for brand');

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


}

const editBrandSuccess = payload => {
    return {
        type: EDIT_BRAND,
        payload
    }
}

export const editBrand = (brandId, formValues) => (dispatch, getState) => {

    const { countries } = getState().database;
    const { name, countryId } = formValues;
    const country = countries[countryId];
    const countryObj = {
        id: countryId,
        name: country.name,
        code: country.code
    };

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("brands")
        .doc(brandId)
        .update({ name, country: countryObj  })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editBrandSuccess({ id: brandId, name, country: countryObj }));
            history.push('/brands');
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
            history.push('/brands');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}



const createNameSuccess = payload => {
    return {
        type: CREATE_NAME,
        payload
    }
}

export const createName = formValues => (dispatch, getState) => {

    const { uid } = getState().auth.smuUser;
    const { brands } = getState().database;
    const { title, brandId } = formValues;
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

    firebase_store.collection("names")
        .add({
            title,
            country: countryObj,
            brand: brandObj,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createNameSuccess({ id: docRef.id, name: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    history.push('/names');
                })
                .catch(error => {
                    dispatch(setContainerLoading({ flag: false, error }));
                });
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchNamesSuccess = payload => {
    return {
        type: FETCH_NAMES,
        payload
    }
}

export const fetchNames = () => (dispatch, getState) => {

    var tmpNames;
    const { namesFetched, names } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if  (namesFetched) {
        dispatch(setContainerLoading({ flag: false }));
        dispatch(fetchNamesSuccess(names));
    } else {

        console.log('firestore called for names');
        
        tmpNames = {};
        firebase_store.collection("names")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                tmpNames[doc.id] = doc.data();
            });
            dispatch(setContainerLoading({ flag: false }));
            dispatch(fetchNamesSuccess(tmpNames));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
    }
}

const fetchNameSuccess = payload => {
    return {
        type: FETCH_NAME,
        payload
    }
}

export const fetchName = (nameId) => (dispatch, getState) => {

    var tmpName;
    const { namesFetched, names } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if  (namesFetched) {
        tmpName = names[nameId];
        if (tmpName) {
            dispatch(fetchNameSuccess({ id: nameId, name: tmpName }));
        }
        dispatch(setContainerLoading({ flag: false }));
    } else {

        console.log('firestore called for name');

        firebase_store.collection("names")
        .doc(nameId)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch(fetchNameSuccess({ id: nameId, name: doc.data() }));
            }
            dispatch(setContainerLoading({ flag: false }));
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
    }


}

const editNameSuccess = payload => {
    return {
        type: EDIT_NAME,
        payload
    }
}

export const editName = (nameId, formValues) => (dispatch, getState) => {

    const { brands } = getState().database;
    const { title, brandId } = formValues;
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
    firebase_store.collection("names")
        .doc(nameId)
        .update({ title, brand: brandObj, country: countryObj  })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editNameSuccess({ id: nameId, title,  brand: brandObj, country: countryObj }));
            history.push('/names');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteNameSuccess = payload => {
    return {
        type: DELETE_NAME,
        payload
    }
}

export const deleteName = nameId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("names")
        .doc(nameId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteNameSuccess(nameId));
            history.push('/names');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}