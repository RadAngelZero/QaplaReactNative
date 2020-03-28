import {
    saveFCMUserToken
} from '../services/database';

import {
    messaging
} from './firebase';

/**
 * Check if the user has granted the required permission to receive
 * our push notifications
 * @param {string} uid User identifier on the database
 */
export async function checkNotificationPermission(uid) {
    try {
        const notificationPermissionEnabled = await messaging.hasPermission();

        if (notificationPermissionEnabled) {
            handleUserToken(uid);
        } else {
            requestPermission(uid);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Ask the user for the required permission to receive our push notifications
 * @param {string} uid User identifier on the database
 */
async function requestPermission(uid) {
    try {

        /**
         * If the user don't grant permission we go to the catch block automatically
         */
        await messaging.requestPermission();

        /**
         * If the user grant permission we handle their token
         */
        handleUserToken(uid);
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
}

/**
 * Get and save the FCM token of the user on the database
 * @param {string} uid User identifier on the database
 */
async function handleUserToken(uid) {
    try {
        const FCMToken = await messaging.getToken();
        await saveFCMUserToken(uid, FCMToken);
    } catch (error) {
        console.error(error);
    }
}