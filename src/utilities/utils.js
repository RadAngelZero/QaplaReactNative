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