import {
	GET_LIST_OF_GAMES,
	SHOW_MODAL_ADD_GAME_PROFILE,
	SET_SELECTED_GAME
} from '../utilities/Constants';

const initialState = {
    games: {},
    smagp: false,
    selectedGame: null
};

function gamesReducer(state = initialState, action) {
      switch (action.type) {
        case GET_LIST_OF_GAMES:
            return { ...state, games: action.payload };
        case SHOW_MODAL_ADD_GAME_PROFILE:
        	return {...state, smagp: action.payload};
        case SET_SELECTED_GAME:
        	return {...state, selectedGame: action.payload};
        default:
            return state;
      }
};

export default gamesReducer;