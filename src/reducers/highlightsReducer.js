// josep.sanahuja - 26-08-2019 - us90 - File creation

import {
    GET_HIGHLIGHT_1_CREATE_MATCH,
    SET_HIGHLIGHT_1_CREATE_MATCH,
    HIGHLIGHT_1_CREATE_MATCH
} from '../utilities/Constants';

const initialState = {
    hg1CreateMatch: false
};

function highlightsReducer(state = initialState, action) {
      switch (action.type) {
        case GET_HIGHLIGHT_1_CREATE_MATCH:
            return { ...state, hg1CreateMatch: action.payload };
        case SET_HIGHLIGHT_1_CREATE_MATCH:
            return {...state, hg1CreateMatch: action.payload};
        default:
            return state;
      }
};

export default highlightsReducer;