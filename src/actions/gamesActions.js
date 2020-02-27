// josep.sanahuja    - 20-08-2019 - XXX - Load user games statistics

import {
    GET_LIST_OF_GAMES,
    SET_SELECTED_GAME,
} from '../utilities/Constants';

import { gamesRef } from '../services/database';
import { gamesResources } from '../utilities/GamesResources';

export const getListOfGames = () => async (dispatch) => {
    var listOfGames = {};
    const listOfPlatformsWithGames = await gamesRef.once('value');

    listOfPlatformsWithGames.forEach((platform) => {
        listOfGames[platform.key] = platform.val();
        platform.forEach((game) => {
            if (gamesResources[platform.key] && gamesResources[platform.key][game.key]){
                listOfGames[platform.key][game.key].icon = gamesResources[platform.key][game.key].icon;
                listOfGames[platform.key][game.key].image = gamesResources[platform.key][game.key].image;
                listOfGames[platform.key][game.key].local = true;
            } else {
                listOfGames[platform.key][game.key].local = false;
            }
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