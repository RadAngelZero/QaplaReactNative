import { UPDATE_USER_DATA, REMOVE_USER_DATA, SIGN_OUT_USER } from '../utilities/Constants';

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
        case SIGN_OUT_USER:
            return { ...state, user: {} };
        default:
            return state;
      }
};

export default userReducer;
