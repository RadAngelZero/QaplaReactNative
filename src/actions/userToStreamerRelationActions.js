import { LOAD_TWITCH_RELATION_DATA } from '../utilities/Constants';
import { getUserToStreamerRelationData } from '../services/functions';

export const getUserToStreamerData = (userTwitchId, streamerUid) => async (dispatch) => {
    const relation = await getUserToStreamerRelationData(userTwitchId, streamerUid);
    dispatch(getUserToStreamerDataSuccess({ streamerUid, ...relation.data }));
}

const getUserToStreamerDataSuccess = (payload) => {
    return {
        type: LOAD_TWITCH_RELATION_DATA,
        payload
    };
}