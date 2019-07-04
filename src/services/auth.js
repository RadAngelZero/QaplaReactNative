import { auth, FBProvider, GoogleProvider } from './../utilities/firebase';
import { createUserProfile } from './database';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import {GoogleSignin} from 'react-native-google-signin';

const webClientIdForGoogleAuth = '614138734637-rgvqccs2sk27ilb8nklg65sdcm33ka8v.apps.googleusercontent.com';

export function signInWithFacebook(navigation) {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then((result) => {
        if (result.isCancelled) {
            console.log('Facebook authentication cancelled');
        } else {
            AccessToken.getCurrentAccessToken()
            .then((data) => {
                const credential = FBProvider.credential(data.accessToken)
                auth.signInWithCredential(credential)
                .then((user) => {
                    if (user.additionalUserInfo.isNewUser) {
                        createUserProfile(user.user.uid, user.user.email);
                        navigation.navigate('ChooseUserNameScreen', { uid: user.user.uid });
                    } else {
                        navigation.navigate('Home');
                    }
                }).catch((error) => {
                    console.log('ERROR:',error);
                });
            });
        }
    });
}

export function signInWithGoogle(navigation) {
    GoogleSignin.signIn()
    .then((user) => {
        const credential = GoogleProvider.credential(user.idToken, user.accessToken);
        auth.signInWithCredential(credential)
        .then((user) => {
            if (user.additionalUserInfo.isNewUser) {
                createUserProfile(user.user.uid, user.user.email);
                navigation.navigate('ChooseUserNameScreen', { uid: user.user.uid });
            } else {
                navigation.navigate('Home');
            }
        }).catch((error) => {
            console.log('ERROR:',error);
        });
    })
    .catch((err) => {
        console.log(err);
    })
    .done();
}

export function setupGoogleSignin() {
    try {
      GoogleSignin.configure({
        webClientId: webClientIdForGoogleAuth,
        offlineAccess: false
      });
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
}

export function signInWithEmailAndPassword(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user.user.uid);
        //Do something with the user data
    })
    .catch((error) => {
        console.log(error.code, error.message);
    });
}

export function isUserLogged() {
    return auth.currentUser !== null;
}