import {
	LOAD_STREAMERS
} from '../utilities/Constants';

const initialState = {
    streamers: {}
};

function gamesReducer(state = initialState, action) {
      switch (action.type) {
        case LOAD_STREAMERS:
            return { ...state, streamers: action.payload };
        default:
            return state;
      }
};

export default gamesReducer;