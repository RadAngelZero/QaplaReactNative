// diego     - 06-09-2019 - us93 - Added isFunction to validate if a parameter is a function or not
// diego     - 20-08-2019 - us89 - Created getPlatformNameWithKey and getUserGamesOrderedByPlatform
// diego     - 06-08-2019 - us76 - Function to get the gamer tag key on string created
// diego     - 16-07-2019 - us30 - File creation

import { Linking, Clipboard } from 'react-native';
import { translate } from './i18';
import store from '../store/store';

/**Generador ramdom de claves para retas
 * basado en el metodo de android
*/
const AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function randomString(){
    var string = '';
    for(var i = 0; i < 12; i++){
        string += AB[parseInt(Math.random() * 61)];
    }
    return string;
}

/**
 * @description returns a user readable string that contains the name of the
 * tag in the diferent games and platforms
 * @param {string} platform The platform key (platform_white)
 * @param {string} game The key of the game
 */
export function getGamerTagStringWithGameAndPlatform(platform, game) {
    switch (platform) {
        case 'pc_white':
            if (game === 'aClash') {
                return 'Player tag';
            } else if (game === 'pcLol'){
                return 'Gamertag';
            } else if (game === 'pHearth' || game === 'pOver'){
                return 'BattleTag';
            } else {
                return 'GamerTag'
            }
        case 'ps4_white':
            return 'PSN';
        case 'xbox_white':
            return 'Xbox live';
        case 'switch_white':
            return 'NintendoID';
        default:
            return 'GamerTag'
    }
}

/**
 * @description returns a user readable string that contains the name of the
 * tag in different games and platforms
 * @param {string} platform The platform key (platform_white)
 * @param {string} game The key of the game
 */
export function getGamerTagKeyWithGameAndPlatform(platform, game) {
    switch (platform) {
        case 'pc_white':
            if (game === 'aClash') {
                return 'clashTag';
            } else if (game === 'pcLol'){
                return 'lolTag';
            } else if (game === 'pHearth' || game === 'pOver'){
                return 'battlenet';
            } else {
                return game;
            }
        case 'ps4_white':
            return 'psn';
        case 'xbox_white':
            return 'xboxLive';
        case 'switch_white':
            return 'NintendoID';
        default:
            break;
    }
}

/**
 * Return the name of the platform based on their key
 *
 * @param {string} platformKey Key of the platform
 * @returns {string} Platform name
 */
export function getPlatformNameWithKey(platformKey) {
    switch (platformKey) {
        case 'pc_white':
            return translate('platforms.mobile');
        case 'ps4_white':
            return 'Play Station 4';
        case 'xbox_white':
            return 'Xbox One';
        case 'switch_white':
            return 'Switch';
        default:
            return '';
    }
}

/**
 * Sort all the games from a user based on their platform
 *
 * @param {Array} userGames Array with all the game keys of the current user
 * @param {Object} allQaplaGames List that contains all the games on Qapla
 * @param {boolean} [loadHiddenGames = false] True if we want to show all the games, false if we want to hide
 * the games with the hide flag. False by default
 */
export function getUserGamesOrderedByPlatform(userGames, allQaplaGames, loadHiddenGames = false) {
    /**
     * Based on the qapla structure we need to get (from database) all the games, that games are in the following form:
     * Games: {
     *     PlatformName1: {
     *         GameKey1: GameName1,
     *         GameKey2: GameName2,
     *     }
     *     PlatformName2: {
     *         GameKey1: GameName1,
     *         GameKey2: GameName2,
     *     }
     * }
     * So we get the Games node, then we make a forEach (the first one) of that, this forEach iterate over the platforms,
     * then we iterate over all the games that the user have
     */
    let gamesOrderedByPlatform = {};

    Object.keys(allQaplaGames).forEach((gamePlatform) => {
        userGames.sort().forEach((gameToLoadKey) => {

            // If the platform on the current iteration have a child with key of the current user game
            if (allQaplaGames[gamePlatform].hasOwnProperty(gameToLoadKey)) {

                // Check if the user don't have games on that platform
                if (!gamesOrderedByPlatform[gamePlatform]){

                    // Create a child on the object for that platform
                    gamesOrderedByPlatform[gamePlatform] = {};
                }

                if (!allQaplaGames[gamePlatform][gameToLoadKey].hide || loadHiddenGames) {
                    // Add the game to the list of games
                    gamesOrderedByPlatform[gamePlatform][gameToLoadKey] = allQaplaGames[gamePlatform][gameToLoadKey];
                }
            }

            // Remove the game from the list of the user games
            userGames.slice(userGames.indexOf(gameToLoadKey), 1);
        });
    });

    return gamesOrderedByPlatform;
}

/**
 * @description Return true if the functionToCheck param is a function
 * otherwise return false
 *
 * @param {function} functionToCheck The function to verify
 */
export function isFunction(functionToCheck) {
    var getType = {};

    /**
     * Check first if the function is different from null
     * Check if the type of the object is [object function]
     */
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function withdrawQaploins() {
    Linking.openURL('whatsapp://send?text=Hola, quiero retirar mis qaploins&phone=+523312971299'/*<= Change for the suport number */);
}

/**
 * Check if the given game is a game that we have on the app
 * @param {string} platform Platform of the game
 * @param {string} game Game key
 */
export function isValidGame(platform, game) {
    return platform && store.getState().gamesReducer.games[platform] && store.getState().gamesReducer.games[platform][game];
}

/**
 * Save the given data on the users clipboard
 * @param {string} dataToCopy Data to save on the users clipboard
 */
export function copyDataToClipboard(dataToCopy) {
    console.log(dataToCopy.toString())
    Clipboard.setString(dataToCopy.toString());
}