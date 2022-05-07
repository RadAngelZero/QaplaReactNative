import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
    auth,
    FBProvider,
    GoogleProvider,
    AppleProvider
} from './../utilities/firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin';
import { setUserIdOnSegment } from './statistics';
import store from './../store/store';
import { signOutUser } from '../actions/userActions';
import { updateUserLoggedStatus, removeUserListeners, removeLogrosListeners } from './database';
import { unsubscribeUserFromAllSubscribedTopics } from './messaging';
import { cleanStreamsLists } from '../actions/streamsActions';

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
        setUserIdOnSegment(finalUser.user.uid, finalUser.user.email);

        return finalUser;
    }
}

/**
 * Signin a user using Google
 */
export async function signInWithGoogle() {
    try {
        const googleResult = await GoogleSignin.signIn();
        const credential = GoogleProvider.credential(googleResult.idToken, googleResult.accessToken);
        const finalUser = await auth.signInWithCredential(credential);
        setUserIdOnSegment(finalUser.user.uid, finalUser.user.email);

        return finalUser;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Sign in a user using apple
 */
export async function signInWithApple() {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const { identityToken, nonce } = appleAuthRequestResponse;

        if (identityToken) {
            const appleCredential = AppleProvider.credential(identityToken, nonce);
            const user = await auth.signInWithCredential(appleCredential);
            setUserIdOnSegment(user.user.uid, user.user.email);

            return user;
        }

    } catch (error) {
        console.error(error);
    }
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
    const user = await auth.signInWithEmailAndPassword(email, password);
    setUserIdOnSegment(user.user.uid);

    return user;
}

export async function createAccountWitEmailAndPassword(email, password) {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    setUserIdOnSegment(user.user.uid);

    return user;
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
        const { uid } = auth.currentUser;
        updateUserLoggedStatus(false);
        await unsubscribeUserFromAllSubscribedTopics(uid);
        removeUserListeners(uid);
        await store.dispatch(signOutUser());
        // Reset streams lists and remove database listeners from event participants node
        store.dispatch(cleanStreamsLists(uid));
        await auth.signOut();
    } catch (error) {
        console.error(error);
    }
}
