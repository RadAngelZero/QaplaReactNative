import { GET_LIST_OF_GAMES } from '../utilities/Constants';

const initialState = {
    games: {}
};

function gamesReducer(state = initialState, action) {
      switch (action.type) {
        case GET_LIST_OF_GAMES:
            return { ...state, games: action.payload };
        default:
            return state;
      }
};

export default gamesReducer;