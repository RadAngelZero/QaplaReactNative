// diego -          01-08-2019 - us58 - Change the way to load the user data and the way for listen changes
import { UPDATE_USER_DATA, REMOVE_USER_DATA } from '../utilities/Constants';
import { usersRef } from '../services/database';

export const getUserNode = (uid) => (dispatch) => {
    usersRef.child(uid).on('child_added', (childAdded) => {
        dispatch(updateUserDataSuccess({ key: childAdded.key, value: childAdded.val() }));
    });
    usersRef.child(uid).on('child_changed', (childChanged) => {
        dispatch(updateUserDataSuccess({ key: childChanged.key, value: childChanged.val() }));
    });
    usersRef.child(uid).on('child_removed', (childRemoved) => {
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