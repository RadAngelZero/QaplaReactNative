// diego                - 20-12-2019 - us179 - Phone auto verification logic added on sendVerificationSMSToUser
// diego                - 17-12-2019 - us172 - Navigation removed from signInWithEmailAndPassword function
// diego                - 11-12-2019 - us165 - emptyLogros called on signOut
// diego                - 02-09-2019 - us91 - signOut function created
// diego                - 02-09-2019 - us91 - Added setUserIdOnSegment on different signins
// diego                - 24-07-2019 - us31 - removed unnecessary code from
//                                          getIdTokenFromUser function

import {
    auth,
    FBProvider,
    GoogleProvider,
    phoneAuthErrorState,
    phoneAuthAutoVerifiedState,
} from './../utilities/firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';
import { setUserIdOnSegment } from './statistics';
import store from './../store/store';
import { signOutUser } from '../actions/userActions';
import { emptyLogros } from '../actions/logrosActions';

const webClientIdForGoogleAuth = '779347879760-3uud8furtp2778sskfhabbtqmg4qdlma.apps.googleusercontent.com';

/**
 * Signin a user using facebook
 */
export async function signInWithFacebook() {
    const facebookResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (facebookResult.isCancelled) {
        console.log('Facebook authentication cancelled');
    } else {
        const facebookToken = await AccessToken.getCurrentAccessToken();
        const credential = FBProvider.credential(facebookToken.accessToken);
        const finalUser = await auth.signInWithCredential(credential);
        
        setUserIdOnSegment(finalUser.user.uid);
        return finalUser;
    }
}

/**
 * Signin a user using Google
 */
export async function signInWithGoogle() {
    const googleResult = await GoogleSignin.signIn();
    const credential = GoogleProvider.credential(googleResult.idToken, googleResult.accessToken);
    const finalUser = await auth.signInWithCredential(credential);
    setUserIdOnSegment(finalUser.user.uid);
    return finalUser;
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

export async function signInWithEmailAndPassword(email, password) {
    await auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
        setUserIdOnSegment(user.user.uid);
    })
    .catch((error) => {
        console.log(error.code, error.message);
    });
}

/**
 * Send a SMS to the given number of the user to verify their phone number
 * @param {string} phoneNumber Phone number of the user
 * @param {function} isAutoVerified Callback called only if the phone is autoverifiable, must make the link of the account here
 */
export async function sendVerificationSMSToUser(phoneNumber, isAutoVerified) {
    /**
     * https://rnfirebase.io/docs/v5.x.x/auth/reference/auth#verifyPhoneNumber
     */
    return await auth.verifyPhoneNumber(phoneNumber, false, true).on('state_changed', (phoneAuth) => {
        switch (phoneAuth.state) {
            /**
             * This case only apply for both platforms (android and iOS)
             */
            case phoneAuthErrorState:
                console.error(phoneAuth.error);
                break;

            /**
             * This case only apply for android at the 19/12/2019
             */
            case phoneAuthAutoVerifiedState:
                isAutoVerified(phoneAuth.verificationId, phoneAuth.code);
                break;
            default:
                break;
        }
    });
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