import { SET_ENABLE_SCROLL } from '../utilities/Constants';

const initialState = {
    enableScroll: false
};

function profileLeaderBoardReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ENABLE_SCROLL:
          const enableScroll = action.payload;
          return { ...state, enableScroll };
      default:
          return state;
    }
};

export default profileLeaderBoardReducer;