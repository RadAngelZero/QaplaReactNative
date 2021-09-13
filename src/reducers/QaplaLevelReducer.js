import { GET_QAPLA_LEVELS } from '../utilities/Constants';

const initialState = { levels: [] };

function userReducer(state = initialState, action) {
      switch (action.type) {
        case GET_QAPLA_LEVELS:
            return { ...state, levels: action.payload };
        default:
            return state;
      }
};

export default userReducer;