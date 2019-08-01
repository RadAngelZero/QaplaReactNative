// diego -          01-08-2019 - us58 - Change the way to load the user data and the way for listen changes
import { UPDATE_USER_DATA, REMOVE_USER_DATA } from '../utilities/Constants';

const initialState = {
    user: {}
};

function userReducer(state = initialState, action) {
      const user = {...state.user};
      switch (action.type) {
        case UPDATE_USER_DATA:
            user[action.payload.key] = action.payload.value;
            return { ...state, user };
        case REMOVE_USER_DATA:
            delete user[action.payload.key];
            return { ...state, user };
        default:
            return state;
      }
};

export default userReducer;