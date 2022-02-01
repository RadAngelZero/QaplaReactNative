import {
    LOAD_SINGLE_STREAMER,
    LOAD_STREAMERS
} from '../utilities/Constants';

import { getStreamerPublicProfile, getStreamersPublicProfileWithLimit } from '../services/database';

export const getStreamersData = (limit, cursor) => async (dispatch) => {
    const streamersData = await getStreamersPublicProfileWithLimit(limit, cursor);
    if (streamersData.exists()) {
        if (cursor) {
            const streamersToAdd = {};
            streamersData.forEach((streamer) => {
                if (streamer.key !== cursor) {
                    streamersToAdd[streamer.key] = streamer.val();
                }
            });

            dispatch(getStreamersDataSuccess(streamersToAdd));
        } else {
            dispatch(getStreamersDataSuccess(streamersData.val()));
        }
    }
}

export const getSingleStreamerData = (streamerId) => async (dispatch) => {
    const streamerData = await getStreamerPublicProfile(streamerId);
    if (streamerData.exists()) {
        dispatch(getSingleStreamerDataSuccess({ key: streamerData.key, ...streamerData.val() }));
    }
}

export const getStreamersDataSuccess = (payload) => {
    return {
        type: LOAD_STREAMERS,
        payload
    };
}

export const getSingleStreamerDataSuccess = (payload) => {
    return {
        type: LOAD_SINGLE_STREAMER,
        payload
    };
}
