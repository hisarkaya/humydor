import {
    CREATE_COUNTRY,
    FETCH_COUNTRIES,
    FETCH_COUNTRY,
    EDIT_COUNTRY,
    DELETE_COUNTRY,

    CREATE_SHAPE,
    FETCH_SHAPES,
    FETCH_SHAPE,
    EDIT_SHAPE,
    DELETE_SHAPE,

    CREATE_COLOR,
    FETCH_COLORS,
    FETCH_COLOR,
    EDIT_COLOR,
    DELETE_COLOR,

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

} from './types';

import history from '../history';
import { setContainerLoading, setFormMessage } from './common';
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
                    dispatch(setFormMessage({ text: 'country created sucessfully.' }));
                    history.push(`/countries/edit/${docRef.id}`);
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
            dispatch(setFormMessage({ text: 'country updated sucessfully.' }));
            history.push(`/countries/edit/${countryId}`);
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
            dispatch(setFormMessage({ text: 'country deleted sucessfully.' }));
            history.push('/countries');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}







const createShapeSuccess = payload => {
    return {
        type: CREATE_SHAPE,
        payload
    }
}

export const createShape = formValues => (dispatch, getState) => {
    const { uid } = getState().auth.smuUser;
    const { name } = formValues;

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("shapes")
        .add({
            name,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createShapeSuccess({ id: docRef.id, shape: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    dispatch(setFormMessage({ text: 'shape created sucessfully.' }));
                    history.push(`/shapes/edit/${docRef.id}`);
                })
                .catch(error => {
                    dispatch(setContainerLoading({ flag: false, error }));
                });
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchShapesSuccess = payload => {
    return {
        type: FETCH_SHAPES,
        payload
    }
}

export const fetchShapes = () => (dispatch, getState) => {

    var tmpShapes;

    const { shapesFetched, shapes } = getState().database;
    dispatch(setContainerLoading({ flag: true }));

    if (shapesFetched) {
        dispatch(setContainerLoading({ flag: false }));
        dispatch(fetchShapesSuccess(shapes));
    } else {

        tmpShapes = {};
        firebase_store.collection("shapes")
            .orderBy("name")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    tmpShapes[doc.id] = doc.data();
                });
                dispatch(setContainerLoading({ flag: false }));
                dispatch(fetchShapesSuccess(tmpShapes));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }
}

const fetchShapeSuccess = payload => {
    return {
        type: FETCH_SHAPE,
        payload
    }
}

export const fetchShape = shapeId => (dispatch, getState) => {

    var tmpShape;
    const { shapesFetched, shapes } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (shapesFetched) {
        tmpShape = shapes[shapeId];
        if (tmpShape) {
            dispatch(fetchShapeSuccess({ id: shapeId, shape: tmpShape }));
        }
        dispatch(setContainerLoading({ flag: false }));

    } else {

        firebase_store.collection("shapes")
            .doc(shapeId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    dispatch(fetchShapeSuccess({ id: shapeId, shape: doc.data() }));
                }
                dispatch(setContainerLoading({ flag: false }));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }
}

const editShapeSuccess = payload => {
    return {
        type: EDIT_SHAPE,
        payload
    }
}

export const editShape = (shapeId, formValues) => dispatch => {

    const { name} = formValues;

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("shapes")
        .doc(shapeId)
        .update({ name })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editShapeSuccess({ id: shapeId, name }));
            dispatch(setFormMessage({ text: 'shape updated sucessfully.' }));
            history.push(`/shapes/edit/${shapeId}`);
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteShapeSuccess = payload => {
    return {
        type: DELETE_SHAPE,
        payload
    }
}

export const deleteShape = shapeId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("shapes")
        .doc(shapeId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteShapeSuccess(shapeId));
            dispatch(setFormMessage({ text: 'shape deleted sucessfully.' }));
            history.push('/shapes');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}








const createColorSuccess = payload => {
    return {
        type: CREATE_COLOR,
        payload
    }
}

export const createColor = formValues => (dispatch, getState) => {
    const { uid } = getState().auth.smuUser;
    const { name, code, order } = formValues;

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("colors")
        .add({
            name,
            code,
            order,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createColorSuccess({ id: docRef.id, color: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    dispatch(setFormMessage({ text: 'color created sucessfully.' }));
                    history.push(`/colors/edit/${docRef.id}`);
                })
                .catch(error => {
                    dispatch(setContainerLoading({ flag: false, error }));
                });
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchColorsSuccess = payload => {
    return {
        type: FETCH_COLORS,
        payload
    }
}

export const fetchColors = () => (dispatch, getState) => {

    var tmpColors;

    const { colorsFetched, colors } = getState().database;
    dispatch(setContainerLoading({ flag: true }));

    if (colorsFetched) {
        dispatch(setContainerLoading({ flag: false }));
        dispatch(fetchColorsSuccess(colors));
    } else {

        tmpColors = {};
        firebase_store.collection("colors")
            .orderBy("order")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    tmpColors[doc.id] = doc.data();
                });
                dispatch(setContainerLoading({ flag: false }));
                dispatch(fetchColorsSuccess(tmpColors));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }
}

const fetchColorSuccess = payload => {
    return {
        type: FETCH_COLOR,
        payload
    }
}

export const fetchColor = colorId => (dispatch, getState) => {

    var tmpColor;
    const { colorsFetched, colors } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (colorsFetched) {
        tmpColor = colors[colorId];
        if (tmpColor) {
            dispatch(fetchColorSuccess({ id: colorId, color: tmpColor }));
        }
        dispatch(setContainerLoading({ flag: false }));

    } else {

        firebase_store.collection("colors")
            .doc(colorId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    dispatch(fetchColorSuccess({ id: colorId, color: doc.data() }));
                }
                dispatch(setContainerLoading({ flag: false }));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }
}

const editColorSuccess = payload => {
    return {
        type: EDIT_COLOR,
        payload
    }
}

export const editColor = (colorId, formValues) => dispatch => {

    const { name, code, order } = formValues;

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("colors")
        .doc(colorId)
        .update({ name, code, order })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editColorSuccess({ id: colorId, name, code, order }));
            dispatch(setFormMessage({ text: 'color updated sucessfully.' }));
            history.push(`/colors/edit/${colorId}`);
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteColorSuccess = payload => {
    return {
        type: DELETE_COLOR,
        payload
    }
}

export const deleteColor = colorId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("colors")
        .doc(colorId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteColorSuccess(colorId));
            dispatch(setFormMessage({ text: 'color deleted sucessfully.' }));
            history.push('/colors');
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
    const { name } = formValues;

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("brands")
        .add({
            name,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createBrandSuccess({ id: docRef.id, brand: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    dispatch(setFormMessage({ text: 'brand created sucessfully.' }));
                    history.push(`/brands/edit/${docRef.id}`);
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
                dispatch(fetchBrandsByPage(1));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }
}

export const fetchBrandsByPage = page => {
    return {
        type: FETCH_BRANDS_BY_PAGE,
        payload: page
    }
}

export const fetchSortedBrands = (column, order) => {
    return {
        type: FETCH_SORTED_BRANDS,
        payload: { column, order }
    }
}

export const fetchSearchedBrands = term => {
    return {
        type: FETCH_SERACHED_BRANDS,
        payload: term
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

export const editBrand = (brandId, formValues) => (dispatch) => {

    const { name } = formValues;

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("brands")
        .doc(brandId)
        .update({ name })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editBrandSuccess({ id: brandId, name }));
            dispatch(setFormMessage({ text: 'brand updated sucessfully.' }));
            history.push(`/brands/edit/${brandId}`);
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
            dispatch(setFormMessage({ text: 'brand deleted sucessfully.' }));
            history.push('/brands');
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });

}







const createSourceSuccess = payload => {
    return {
        type: CREATE_SOURCE,
        payload
    }
}

export const createSource = formValues => (dispatch, getState) => {

    const { uid } = getState().auth.smuUser;
    const { name } = formValues;

    dispatch(setContainerLoading({ flag: true }));

    firebase_store.collection("sources")
        .add({
            name,
            userId: uid,
            state: 1,
            created: firebase_core.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
            docRef.get()
                .then(doc => {
                    dispatch(createSourceSuccess({ id: docRef.id, source: doc.data() }));
                    dispatch(setContainerLoading({ flag: false }));
                    dispatch(setFormMessage({ text: 'source created sucessfully.' }));
                    history.push(`/sources/edit/${docRef.id}`);
                })
                .catch(error => {
                    dispatch(setContainerLoading({ flag: false, error }));
                });
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const fetchSourcesSuccess = payload => {
    return {
        type: FETCH_SOURCES,
        payload
    }
}

export const fetchSources = () => (dispatch, getState) => {

    var tmpSources;
    const { sourcesFetched, sources } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (sourcesFetched) {
        dispatch(setContainerLoading({ flag: false }));
        dispatch(fetchSourcesSuccess(sources));
    } else {

        tmpSources = {};
        firebase_store.collection("sources")
            .orderBy("name")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    tmpSources[doc.id] = doc.data();
                });
                dispatch(setContainerLoading({ flag: false }));
                dispatch(fetchSourcesSuccess(tmpSources));
                dispatch(fetchSourcesByPage(1));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }
}

export const fetchSourcesByPage = page => {
    return {
        type: FETCH_SOURCES_BY_PAGE,
        payload: page
    }
}

export const fetchSortedSources = (column, order) => {
    return {
        type: FETCH_SORTED_SOURCES,
        payload: { column, order }
    }
}

export const fetchSearchedSources = term => {
    return {
        type: FETCH_SEARCHED_SOURCES,
        payload: term
    }
}

const fetchSourceSuccess = payload => {
    return {
        type: FETCH_SOURCE,
        payload
    }
}

export const fetchSource = (sourceId) => (dispatch, getState) => {

    var tmpSource;
    const { sourcesFetched, sources } = getState().database;

    dispatch(setContainerLoading({ flag: true }));

    if (sourcesFetched) {
        tmpSource = sources[sourceId];
        if (tmpSource) {
            dispatch(fetchSourceSuccess({ id: sourceId, source: tmpSource }));
        }
        dispatch(setContainerLoading({ flag: false }));
    } else {

        firebase_store.collection("sources")
            .doc(sourceId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    dispatch(fetchSourceSuccess({ id: sourceId, source: doc.data() }));
                }
                dispatch(setContainerLoading({ flag: false }));
            })
            .catch(error => {
                dispatch(setContainerLoading({ flag: false, error }));
            });
    }


}

const editSourceSuccess = payload => {
    return {
        type: EDIT_SOURCE,
        payload
    }
}

export const editSource = (sourceId, formValues) => (dispatch) => {

    const { name } = formValues;

    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("sources")
        .doc(sourceId)
        .update({ name })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editSourceSuccess({ id: sourceId, name }));
            dispatch(setFormMessage({ text: 'source updated sucessfully.' }));
            history.push(`/sources/edit/${sourceId}`);
        })
        .catch(error => {
            dispatch(setContainerLoading({ flag: false, error }));
        });
}

const deleteSourceSuccess = payload => {
    return {
        type: DELETE_SOURCE,
        payload
    }
}

export const deleteSource = sourceId => dispatch => {
    dispatch(setContainerLoading({ flag: true }));
    firebase_store.collection("sources")
        .doc(sourceId)
        .delete()
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(deleteSourceSuccess(sourceId));
            dispatch(setFormMessage({ text: 'source deleted sucessfully.' }));
            history.push('/sources');
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

    if (namesFetched) {
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

    if (namesFetched) {
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
        .update({ title, brand: brandObj, country: countryObj })
        .then(() => {
            dispatch(setContainerLoading({ flag: false }));
            dispatch(editNameSuccess({ id: nameId, title, brand: brandObj, country: countryObj }));
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