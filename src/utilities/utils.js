// diego     - 20-08-2019 - us89 - getPlatformNameWithKey and getUserGamesOrderedByPlatform created
// diego     - 06-08-2019 - us76 - Function to get the gamer tag key on string created
// diego     - 16-07-2019 - us30 - File creation

/**Generador ramdom de claves para retas
 * basado en el metodo de android
*/
const AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function randomString(){
    var string = '';
    for(var i = 0; i < 8; i++){
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
            }
            break;
        case 'ps4_white':
            return 'PSN';
        case 'xbox_white':
            return 'Xbox live';
        case 'switch_white':
            return 'NintendoID';
        default:
            break;
    }
}

/**
 * Return the name of the platform based on their key
 * @param {strink} platformKey Key of the platform
 * @returns {string} Platform name
 */
export function getPlatformNameWithKey(platformKey) {
    switch (platformKey) {
        case 'pc_white':
            return 'PC/Movil';
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
 * @param {Object} userGames List of the games from the user
 * @param {Object} allQaplaGames List that contains all the games on Qapla
 * @returns {Object} Sorted games by platform
 */
export function getUserGamesOrderedByPlatform(userGames, allQaplaGames) {
    let gamesOrderedByPlatform = {};
    Object.keys(allQaplaGames).map((gamePlatform) => {
        userGames.sort().map((gameToLoadKey) => {
            if(allQaplaGames[gamePlatform].hasOwnProperty(gameToLoadKey)) {
                if(!gamesOrderedByPlatform[gamePlatform]){
                    gamesOrderedByPlatform[gamePlatform] = {};
                }
                gamesOrderedByPlatform[gamePlatform][gameToLoadKey] = allQaplaGames[gamePlatform][gameToLoadKey];
            }
            userGames.slice(userGames.indexOf(gameToLoadKey), 1);
        });
    });

    return gamesOrderedByPlatform;
}