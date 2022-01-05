import {
    LOAD_STREAMERS
} from '../utilities/Constants';

import { getStreamersPublicProfileWithLimit } from '../services/database';

export const getStreamersData = (limit, cursor) => async (dispatch) => {
    const streamersData = await getStreamersPublicProfileWithLimit(limit, cursor);
    if (streamersData.exists()) {
        dispatch(getStreamersDataSuccess(streamersData.val()));
    }
}

export const getStreamersDataSuccess = (payload) => {
    return {
        type: LOAD_STREAMERS,
        payload
    };
}

export const setSelectedGame = (value) => async (dispatch) => {
    dispatch(setGame(value));
}
