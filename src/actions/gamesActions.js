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

    /**
     * We load all the games from the server with the structure:
     * platformName_white: {
     *  gameName: {
     *      gameData
     *  }
     * }
     * After that we check what games media (images and icons) we have on the local, so we do not
     * call the images and icons from the server, but we use the string data like name, acronym, etc.
     * because this data can change (for example FIFA, every year changes the name Fifa 20 -> Fifa 21)
     * and we do not want to upload the aplication for that kind of things
     */
    listOfPlatformsWithGames.forEach((platform) => {
        listOfGames[platform.key] = platform.val();
        platform.forEach((game) => {
            /**
             * If we have the game media on the local we replaces the icon and image field with references to the
             * local icon and image and we set the local flag to true, so we can render the image correctly on the
             * componentes
             */
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