import { GET_LIST_OF_GAMES } from '../utilities/Constants';
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