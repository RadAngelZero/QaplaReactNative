// diego           - 13-11-2019 - us89 - signOutUser created
// diego           - 20-08-2019 - us89 - Load user games statistics
// diego           - 01-08-2019 - us58 - Change the way to load the user data and the way for listen changes

import { UPDATE_USER_DATA, REMOVE_USER_DATA, SIGN_OUT_USER } from '../utilities/Constants';
import { usersRef, gamesRef, gamersRef } from '../services/database';

export const getUserNode = (uid) => async (dispatch) => {

    /*
        us58: The way to load the user data is now by listening the different events in the
        database
    */
    usersRef.child(uid).on('child_added', (childAdded) => {

        /*
            This event is triggered for two reasons, first when getUserNode is called
            and other when a new child is added to the users node, like the notifications
            or notificationMatch, that nodes appear and disappears constantly
        */
        dispatch(updateUserDataSuccess({ key: childAdded.key, value: childAdded.val() }));
    });

    usersRef.child(uid).on('child_changed', (childChanged) => {

        /*
            This event is triggered when a child of the user node already exists but is updated
            like the number of qaploins (credits child), always exists, but their value can change
            during the app is open
        */
        dispatch(updateUserDataSuccess({ key: childChanged.key, value: childChanged.val() }));
    });

    usersRef.child(uid).on('child_removed', (childRemoved) => {

        /*
            This event is triggered when a child of the user node is removed (deleted), as the
            child_added we can  think in the notifications or notificationMatch node, if the user
            have no notifications this nodes are removed, and we need to detect that
        */
        dispatch(removeUserData({ key: childRemoved.key, value: childRemoved.val() }));
    });

    const platformsWithGames = await gamesRef.once('value');

    /**
     * Based on the qapla structure we need to get (from database) all the games, that games are in the following form:
     * Games: {
     *     PlatformName1: {
     *         GameKey1: GameName1,
     *         GameKey2: GameName2,
     *     }
     *     PlatformName2: {
     *         GameKey1: GameName1,
     *         GameKey2: GameName2,
     *     }
     * }
     * So we get the Games node, then we make a forEach (the first one) of that, this forEach iterate over the platforms,
     * based on that we need to iterate over every platform to get the games of that platform and then with that data
     * (on the second) forEach we can make a query to gamersRef to get the experience, loses, wins, etc. and then add that
     * data on the user profile
     */
    platformsWithGames.forEach((platformGames) => {
        Object.keys(platformGames.val()).forEach((gameKey) => {
            gamersRef.child(gameKey).orderByChild('userUid').equalTo(uid).on('value', (gamerGameData) => {

                if (gamerGameData.exists()) {
                    gamerGameData.forEach((gamerProfile) => {
                        dispatch(updateUserDataSuccess({ key: gameKey, value: gamerProfile.val() }));
                    });
                }
            });
        });
    });
}

export const signOutUser = () => async (dispatch) => {
    try {
        dispatch(signOutUserSuccess());
    } catch (error) {
        console.error(error);
    }
}

export const signOutUserSuccess = () => {
    return {
        type: SIGN_OUT_USER
    }
}

export const updateUserDataSuccess = (payload) => {
    return {
        type: UPDATE_USER_DATA,
        payload
    }
}

export const removeUserData = (payload) => {
    return {
        type: REMOVE_USER_DATA,
        payload
    }
}