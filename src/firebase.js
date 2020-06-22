import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyArPmtdy2KCDHXh0hpemSLnQf2yABGpU3o",
    authDomain: "humydor-2455f.firebaseapp.com",
    databaseURL: "https://humydor-2455f.firebaseio.com",
    projectId: "humydor-2455f",
    storageBucket: "humydor-2455f.appspot.com",
    messagingSenderId: "870585432982",
    appId: "1:870585432982:web:3dcf9a75ecb8f2dfec3bb7",
    measurementId: "G-RXTY63XT44"
  };

  export const firebase_core = firebase;
  firebase_core.initializeApp(config);
  export const firebase_auth = firebase_core.auth();
  export const firebase_analytics = firebase_core.analytics();
  export const firebase_store = firebase_core.firestore();
  export const firebase_storage = firebase_core.storage();