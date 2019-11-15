// diego           - 14-11-2019 - us146 - File creation

import { database } from '../utilities/firebase';
import { SET_SERVER_TIME_OFFSET } from '../utilities/Constants';

const serverTimeOffsetRef = database.ref('.info/serverTimeOffset');

/**
 * Get the offset between the server timeStamps and the users timeStamp
 */
export const getServerTimeOffset = () => async (dispatch) => {
    try {
        const offset = await serverTimeOffsetRef.once('value');
        return dispatch(setServerTimeOffset(offset.val()));
    } catch (error) {
        console.error(error);
    }
}

const setServerTimeOffset = (payload) => {
    return {
        type: SET_SERVER_TIME_OFFSET,
        payload
    }
}