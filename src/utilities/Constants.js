// diego          - 21-10-2019 - us135 - Create QAPLOIN_PACKAGES constant
// josep.sanahuja - 26-08-2019 - us90 - Add Highlights constants
// diego          - 05-08-2019 - us105 - Added activity notification constants
// diego          - 01-08-2019 - us58 - Update user constants for the new way to load their data

// Segment key
export const SEGMENT_KEY = 'Jngk5nWegue5IJe5XPV86T46qrA1nRCQ';

// User constants
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';

// Games constants
export const GET_LIST_OF_GAMES = 'GET_LIST_OF_GAMES';
export const SET_SELECTED_GAME = 'SET_SELECTED_GAME';

// Highlights constants
export const GET_HIGHLIGHT_1_CREATE_MATCH = 'GET_HIGHLIGHT_1_CREATE_MATCH';
export const SET_HIGHLIGHT_1_CREATE_MATCH = 'SET_HIGHLIGHT_1_CREATE_MATCH';

// Crear Reta Button in PublicMatchesFeedScreen.js
export const HIGHLIGHT_1_CREATE_MATCH = 'HIGHLIGHT_1_CREATE_MATCH';
// Crear Reta Button in PublicMatchesFeedScreen.js Flag
export const HIGHLIGHT_1_CREATE_MATCH_FLAG = 'HIGHLIGHT_1_CREATE_MATCH_FLAG';
// Notification Button in HeaderBar.js
export const HIGHLIGHT_2_NOTIFICATIONS = 'HIGHLIGHT_2_NOTIFICATIONS';

// Logros constants
export const LOAD_USER_VERIFICATION_STATUS = 'LOAD_USER_VERIFICATION_STATUS';
export const LOAD_LOGROS_ACTIVOS = 'LOAD_LOGROS_ACTIVOS';
export const REMOVE_LOGRO_ACTIVO = 'REMOVE_LOGRO_ACTIVO';
export const LOAD_LOGROS_COMPLETOS = 'LOAD_LOGROS_COMPLETOS';

// Adversary numbers
export const ADVERSARY_1_NUMBER = 1;
export const ADVERSARY_2_NUMBER = 2;

// Activity notification constants
export const NOTIFICATION_TYPE_WINNER = 'resultadoW';
export const NOTIFICATION_TYPE_LOSER = 'resultadoL';
export const NOTIFICATION_TYPE_RESULT = 'resultado';
export const NOTIFICATION_TYPE_REVISION = 'revision';
export const NOTIFICATION_TYPE_TIE = 'empate';
export const NOTIFICATION_MATCH_ACCEPTED = 'retaA';

// Posible match results constants
export const WON_RESULT = '1';
export const LOST_RESULT = '0';
export const OTHER_RESULT = '7';
export const TIE_RESULT = '3';

// Discord Qapla Channel link
export const QAPLA_DISCORD_CHANNEL = 'https://discordapp.com/invite/6GBHn78';

// Date constants

export const ONE_HOUR_MILISECONDS = 3600000;
export const HOURS_IN_DAY = 24;

// On sale qaploins packages
/**
 * In the future we are going to add more packages, obviusly this is not the solution,
 * the real solution is have this data on the database, this consts purpose is temporary and
 * informative (also is a suggestion for the moment when we build the structure on the database)
 */
export const QAPLOIN_PACKAGES = [ { qaploins: 300, price: '$2 USD' } ];