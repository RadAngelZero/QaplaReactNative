// josep.sanahuja - 15-11-2019 - us147 - File creation

import {
    SET_CURRENT_SCREEN_ID,
    SET_PREVIOUS_SCREEN_ID
} from '../utilities/Constants';

const initialState = {
    currentScreenId: 'none',
    previousScreenId: 'none'
};

function screensReducer(state = initialState, action) {
      switch (action.type) {
        case SET_CURRENT_SCREEN_ID:
            return { ...state, currentScreenId: action.payload };
        case SET_PREVIOUS_SCREEN_ID:
            return { ...state, previousScreenId: action.payload };
        default:
            return state;
      }
};

export default screensReducer;