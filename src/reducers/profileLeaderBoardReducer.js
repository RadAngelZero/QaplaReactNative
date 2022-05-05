import { SET_USER_IMAGE } from '../utilities/Constants';

const initialState = {
    userImage: null
};

function profileLeaderBoardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_IMAGE:
            const userImage = action.payload;
            return { ...state, userImage };
        default:
          return state;
    }
};

export default profileLeaderBoardReducer;