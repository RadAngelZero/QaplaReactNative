// josep.sanahuja    - 20-08-2019 - XXX - Load user games statistics

import {
    GET_LIST_OF_GAMES,
    SET_SELECTED_GAME,
} from '../utilities/Constants';

import { gamesRef } from '../services/database';

export const getListOfGames = () => async (dispatch) => {
    var listOfGames = {};
    await gamesRef.once('value').then((platformGames) => {
        platformGames.forEach((listOfPlatformGames) => {
            listOfGames[listOfPlatformGames.key] = listOfPlatformGames.val();
        });
    });
    dispatch(getGamesDataSuccess(listOfGames));
}

export const getGamesDataSuccess = (payload) => {
    return {
        type: GET_LIST_OF_GAMES,
        payload
    };
}

export const setSelectedGame = (value) => async (dispatch) => {
    dispatch(setGame(value));
}

export const setGame = (payload) => {
    return {
        type: SET_SELECTED_GAME,
        payload
    };
}
