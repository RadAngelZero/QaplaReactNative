// diego                - 11-12-2019 - us165 - emptyLogros called on signOut
// diego                - 02-09-2019 - us91 - signOut function created
// diego                - 02-09-2019 - us91 - Added setUserIdOnSegment on different signins
// diego                - 24-07-2019 - us31 - removed unnecessary code from
//                                          getIdTokenFromUser function

import { auth, FBProvider, GoogleProvider } from './../utilities/firebase';
import { createUserProfile } from './database';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import {GoogleSignin} from 'react-native-google-signin';
import { setUserIdOnSegment } from './statistics';
import store from './../store/store';
import { signOutUser } from '../actions/userActions';
import { emptyLogros } from '../actions/logrosActions';

const webClientIdForGoogleAuth = '779347879760-3uud8furtp2778sskfhabbtqmg4qdlma.apps.googleusercontent.com';

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
                    setUserIdOnSegment(user.user.uid);

                    if (user.additionalUserInfo.isNewUser) {
                        createUserProfile(user.user.uid, user.user.email);
                        navigation.navigate('ChooseUserNameScreen', { uid: user.user.uid });
                    } else {
                        navigation.pop();
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
            setUserIdOnSegment(user.user.uid);

            if (user.additionalUserInfo.isNewUser) {
                createUserProfile(user.user.uid, user.user.email);
                navigation.navigate('ChooseUserNameScreen', { uid: user.user.uid });
            } else {
                navigation.pop();
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

export function signInWithEmailAndPassword(email, password, navigation) {
    auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
        setUserIdOnSegment(user.user.uid);
        navigation.popToTop();
        //Do something with the user data
    })
    .catch((error) => {
        console.log(error.code, error.message);
    });
}

/**
 * Send a SMS to the given number of the user to verify their phone number
 * @param {string} phoneNumber Phone number of the user
 */
export async function sendVerificationSMSToUser(phoneNumber) {

    /**
     * https://rnfirebase.io/docs/v5.x.x/auth/reference/auth#verifyPhoneNumber
     */
    return await auth.verifyPhoneNumber(phoneNumber, false, true);
}

/**
 * Link the current account of the user with the new cellphone account
 * @param {object} phoneCredential Phone credentials of firebase auth
 */
export async function linkUserAccountWithPhone(phoneCredential) {
    return await auth.currentUser.linkWithCredential(phoneCredential);
}

export function isUserLogged() {
    return auth.currentUser !== null;
}

export async function getIdTokenFromUser() {
    try {
        return await auth.currentUser.getIdToken(true);
    } catch(error) {
        console.log('Error: ', error);
    }
}

/**
 * Close the sesion of the user on auth
 * and remove data from redux
 */
export async function signOut() {
    try {
        await store.dispatch(emptyLogros());
        await store.dispatch(signOutUser());
        await auth.signOut();
    } catch (error) {
        console.error(error);
    }
}