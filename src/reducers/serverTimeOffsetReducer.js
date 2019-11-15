// diego           - 14-11-2019 - us146 - File creation

import { SET_SERVER_TIME_OFFSET } from '../utilities/Constants';

const initialState = {
    serverTimeOffset: 0
};

function serverTimeOffsetReducer(state = initialState, action) {
      switch (action.type) {
        case SET_SERVER_TIME_OFFSET:
            return { serverTimeOffset: action.payload };
        default:
            return state;
      }
};

export default serverTimeOffsetReducer;