import { auth, FBProvider } from './../utilities/firebase';
import { createUserProfile } from './database';
import { LoginManager, AccessToken } from 'react-native-fbsdk'

export function signInWithFacebook() {
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
                    
                }).catch((error) => {
                    console.log('ERROR:',error);
                });
            });
        }
    });
}