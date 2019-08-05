// diego -          01-08-2019 - us58 - Change the way to load the user data and the way for listen changes

import {
    UPDATE_USER_DATA,
    REMOVE_USER_DATA
} from '../utilities/Constants';
import { usersRef } from '../services/database';

export const getUserNode = (uid) => (dispatch) => {
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