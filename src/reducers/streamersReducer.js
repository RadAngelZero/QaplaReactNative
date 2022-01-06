import {
	LOAD_STREAMERS,
    LOAD_SINGLE_STREAMER
} from '../utilities/Constants';

const initialState = {
    streamers: {}
};

function gamesReducer(state = initialState, action) {
      switch (action.type) {
        case LOAD_STREAMERS:
            return { ...state, streamers: action.payload };
        case LOAD_SINGLE_STREAMER:
            const streamers = { ...state.streamers };
            streamers[action.payload.key] = action.payload;
            return { ...state, streamers };
        default:
            return state;
      }
};

export default gamesReducer;