import { database } from '../utilities/firebase';
import { SET_SERVER_TIME_OFFSET } from '../utilities/Constants';

const serverTimeOffsetRef = database.ref('.info/serverTimeOffset');

/**
 * Get the offset between the server timeStamps and the user
 */
export const getServerTimeOffset = () => async (dispatch) => {
    const offset = await serverTimeOffsetRef.once('value');
    return dispatch(setServerTimeOffset(offset.val()));
}

const setServerTimeOffset = (payload) => {
    return {
        type: SET_SERVER_TIME_OFFSET,
        payload
    }
}