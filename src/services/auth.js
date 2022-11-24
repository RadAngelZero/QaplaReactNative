import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
    auth,
    GoogleProvider,
    AppleProvider
} from './../utilities/firebase';
import { GoogleSignin } from '@react-native-community/google-signin';
import { setUserIdOnSegment } from './statistics';
import store from './../store/store';
import { signOutUser } from '../actions/userActions';
import { updateUserLoggedStatus, removeUserListeners } from './database';
import { unsubscribeUserFromAllSubscribedTopics } from './messaging';
import { cleanStreamsLists } from '../actions/streamsActions';

const webClientIdForGoogleAuth = '779347879760-3uud8furtp2778sskfhabbtqmg4qdlma.apps.googleusercontent.com';

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
        console.log(error);
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

export function isUserLogged() {
    return auth.currentUser !== null;
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
