// josep.sanahuja - 26-08-2019 - us90 - File creation

import {
    SET_CURRENT_SCREEN_ID,
    GET_CURRENT_SCREEN_ID,
} from '../utilities/Constants';

const initialState = {
    currentScreenId: 'none'
};

function screensReducer(state = initialState, action) {
      switch (action.type) {
        case SET_CURRENT_SCREEN_ID:
        	console.log('Reducer: ' + action.payload)
        	
            return { ...state, currentScreenId: action.payload };
        case GET_CURRENT_SCREEN_ID:
            return {...state};
        default:
            return state;
      }
};

export default screensReducer;