import { GET_USER_DATA } from '../utilities/Constants';
import { usersRef } from '../services/database';

export const getUserNode = (uid) => (dispatch) => {
    usersRef.child(uid).on('value', (user) => {
        dispatch(getUserDataSuccess(user.val()));
    });
}

export const getUserDataSuccess = (payload) => {
    return {
        type: GET_USER_DATA,
        payload
    };
}