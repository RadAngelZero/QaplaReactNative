//diego         - 16-07-2019 - us30 - TimeStamp const created

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDBCB9kPA5NPKDR6gWSwTLbtVyR_9aCAA0",
    authDomain: "reactnativeprueba-8f6f8.firebaseapp.com",
    databaseURL: "https://reactnativeprueba-8f6f8.firebaseio.com",
    projectId: "reactnativeprueba-8f6f8",
    storageBucket: "reactnativeprueba-8f6f8.appspot.com",
    messagingSenderId: "614138734637",
    appId: "1:614138734637:web:7c5772f22f05f8fe"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();

//Authentication providers
export const FBProvider = firebase.auth.FacebookAuthProvider;
export const GoogleProvider = firebase.auth.GoogleAuthProvider;

//TimeStamp
export const TimeStamp = firebase.database.ServerValue.TIMESTAMP;