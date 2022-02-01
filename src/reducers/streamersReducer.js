import {
	LOAD_STREAMERS,
    LOAD_SINGLE_STREAMER
} from '../utilities/Constants';

const initialState = {
    streamers: []
};

function gamesReducer(state = initialState, action) {
      switch (action.type) {
        case LOAD_STREAMERS:
            const streamersToAdd = Object.keys(action.payload).sort().filter((key) => !state.streamers.some((streamer) => streamer.key === key)).map((key) => ({ ...action.payload[key], key }));

            return { ...state, streamers: [ ...state.streamers, ...streamersToAdd] };
        case LOAD_SINGLE_STREAMER:
            const streamers = [ ...state.streamers ];
            streamers.push({ ...action.payload });

            return { ...state, streamers };
        default:
            return state;
      }
};

export default gamesReducer;