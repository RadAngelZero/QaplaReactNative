import { LOAD_TWITCH_RELATION_DATA } from '../utilities/Constants';

const initialState = {
    streamerUid: '',
    isFollower: false,
    isSubscribed: false,
    subscriptionTier: null
};

function userToStreamerRelationReducer(state = initialState, action) {
      switch (action.type) {
        case LOAD_TWITCH_RELATION_DATA:
            if (action.payload) {
                const { streamerUid, isFollower, isSubscribed, subscriptionTier } = action.payload;

                return { ...state, streamerUid, isFollower, isSubscribed, subscriptionTier };
            }

            return state;
        default:
            return state;
      }
};

export default userToStreamerRelationReducer;
