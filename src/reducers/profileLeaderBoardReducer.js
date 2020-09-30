import { SET_ENABLE_SCROLL, SET_USER_IMAGE } from '../utilities/Constants';

const initialState = {
    enableScroll: false,
    userImage: null
};

function profileLeaderBoardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ENABLE_SCROLL:
            const enableScroll = action.payload;
            return { ...state, enableScroll };
        case SET_USER_IMAGE:
            const userImage = action.payload;
            return { ...state, userImage };
        default:
          return state;
    }
};

export default profileLeaderBoardReducer;