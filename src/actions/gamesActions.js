import {
    GET_LIST_OF_GAMES,
    SET_SELECTED_GAME,
} from '../utilities/Constants';

import { listenForGamesResourcesChanges } from '../services/database';

export const getListOfGames = () => async (dispatch) => {
    let listOfGames = {};
    listenForGamesResourcesChanges((listOfPlatformsWithGames) => {
        if (listOfPlatformsWithGames.exists()) {

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
                    listOfGames[platform.key][game.key].local = false;
                });
            });

            dispatch(getGamesDataSuccess(listOfGames));
        }
    });
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
