//josep maria

import {
    GET_LIST_OF_GAMES,
    SHOW_MODAL_ADD_GAME_PROFILE,
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

export const showModalAddGameProfile = (value) => async (dispatch) => {
    console.log("Moo 2");
    dispatch(updateModalAddGameProfile(value));
}

export const updateModalAddGameProfile = (payload) => {
    return {
        type: SHOW_MODAL_ADD_GAME_PROFILE,
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