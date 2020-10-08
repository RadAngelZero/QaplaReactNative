import firebase from 'react-native-firebase';

/*import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import '@firebase/functions';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDBCB9kPA5NPKDR6gWSwTLbtVyR_9aCAA0",
    authDomain: "reactnativeprueba-8f6f8.firebaseapp.com",
    databaseURL: "https://reactnativeprueba-8f6f8.firebaseio.com",
    projectId: "reactnativeprueba-8f6f8",
    storageBucket: "reactnativeprueba-8f6f8.appspot.com",
    messagingSenderId: "614138734637",
    appId: "1:614138734637:web:7c5772f22f05f8fe"
};

firebase.initializeApp(firebaseConfig);*/

export const database = firebase.database();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const messaging = firebase.messaging();
export const notifications = firebase.notifications();
export const links = firebase.links();
export const firebaseLinks = firebase.links;
export const remoteConfig = firebase.config();

// Authentication providers
export const FBProvider = firebase.auth.FacebookAuthProvider;
export const GoogleProvider = firebase.auth.GoogleAuthProvider;
export const PhoneProvider = firebase.auth.PhoneAuthProvider;
export const AppleProvider = firebase.auth.AppleAuthProvider;

// Phone authentication states
export const phoneAuthErrorState = firebase.auth.PhoneAuthState.ERROR;
export const phoneAuthAutoVerifiedState = firebase.auth.PhoneAuthState.AUTO_VERIFIED; // <- Only android at the 19/12/2019

// TimeStamp
export const TimeStamp = firebase.database.ServerValue.TIMESTAMP;