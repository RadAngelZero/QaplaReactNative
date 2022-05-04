import { heightPercentageToPx } from './iosAndroidDim';
import images from '../../assets/images';

// Segment key
export const SEGMENT_KEY = 'fCfir8yrQiZRVrpuwLHYRePN68SqW8AS';

// SendBird key
export const SENDBIRD_KEY = '7E54A9F8-DCE3-420E-8DC8-D3E8B081A2B0';

// Twitch Client Id
export const TWITCH_CLIENT_ID = '3cwpzmazn716nmz6g1087kh4ciu4sp';
export const TWITCH_REDIRECT_URI = 'https://dashboard.qapla.gg/';

// User constants
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

/* User redux object fields */
export const USER_BALANCE = 'userBalance';

// Streamers constants
export const LOAD_STREAMERS = 'LOAD_STREAMERS';
export const LOAD_SINGLE_STREAMER = 'LOAD_SINGLE_STREAMER';

// Games constants
export const GET_LIST_OF_GAMES = 'GET_LIST_OF_GAMES';
export const SET_SELECTED_GAME = 'SET_SELECTED_GAME';

// Highlights constants
export const GET_HIGHLIGHT_1_CREATE_MATCH = 'GET_HIGHLIGHT_1_CREATE_MATCH';
export const SET_HIGHLIGHT_1_CREATE_MATCH = 'SET_HIGHLIGHT_1_CREATE_MATCH';

// Server Time Offset constants
export const SET_SERVER_TIME_OFFSET = 'SET_SERVER_TIME_OFFSET';

// Screens REDUX constants
export const SET_CURRENT_SCREEN_ID = 'SET_CURRENT_SCREEN_ID';
export const SET_PREVIOUS_SCREEN_ID = 'SET_PREVIOUS_SCREEN_ID';

// Profile Leader Board REDUX constants
export const SET_USER_IMAGE = 'SET_USER_IMAGE';

// Crear Reta Button in PublicMatchesFeedScreen.js
export const HIGHLIGHT_1_CREATE_MATCH = 'HIGHLIGHT_1_CREATE_MATCH';
// Crear Reta Button in PublicMatchesFeedScreen.js Flag
export const HIGHLIGHT_1_CREATE_MATCH_FLAG = 'HIGHLIGHT_1_CREATE_MATCH_FLAG';
// Notification Button in HeaderBar.js
export const HIGHLIGHT_2_NOTIFICATIONS = 'HIGHLIGHT_2_NOTIFICATIONS';

// Streams constants
export const LOAD_FEATURED_STREAM = 'LOAD_FEATURED_STREAM';
export const UPDATE_FEATURED_STREAM = 'UPDATE_FEATURED_STREAM';
export const REMOVE_FEATURED_STREAM = 'REMOVE_FEATURED_STREAM';
export const LOAD_STREAMS_BY_DATE_RANGE = 'LOAD_STREAMS_BY_DATE_RANGE';
export const UPDATE_STREAM = 'UPDATE_STREAM';
export const REMOVE_STREAM = 'REMOVE_STREAM';
export const LOAD_LIVE_STREAM = 'LOAD_LIVE_STREAM';

// QaplaLevel constants
export const GET_QAPLA_LEVELS = 'GET_QAPLA_LEVELS';

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
export const Discord = {
	QAPLA_DISCORD_CHANNEL: 'https://discord.gg/6GBHn78',
	QAPLA_DISCORD_EXCHANGE_CHANNEL : 'https://discord.gg/AUQX2pV',
	FIND_ADVERSARY_DISCORD_CHANNEL : 'https://discordapp.com/channels/373252198773293066/676917105261805590',
	QAPLA_DISCORD_WEBHOOK_URL : 'https://discordapp.com/api/webhooks/692814768054206485/o67Lre8VrLIo26suoTZvEJFN199kWB1y_thRwFqFshzddMkgZP1ajyWs9mL4VLjjv8p2',
	QAPLA_DISCORD_WEBHOOK_URL_TEST : 'https://discordapp.com/api/webhooks/692800624017801287/E68ViYaO34VMvCdfiRuADcTVSo_B-azRz0RiSo_L6EU39gAofnDTuOuiyWEYHbbMGQZE',
	DISCORD_GAME_IMAGE_PLACEHOLDER : 'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/discord_images%2Fplaceholder.png?alt=media&token=83b5e192-6973-4650-9246-bc0afcf117ab'
};

// Date constants

export const ONE_HOUR_MILISECONDS = 3600000;
export const ONE_SECOND_IN_MILISECONDS = 1000;
export const HOURS_IN_DAY = 24;

// On sale qaploins packages
/**
 * In the future we are going to add more packages, obviusly this is not the solution,
 * the real solution is have this data on the database, this consts purpose is temporary and
 * informative (also is a suggestion for the moment when we build the structure on the database)
 */
export const QAPLOIN_PACKAGES = [ { qaploins: 300, price: '$2 USD' } ];

// New line separator used in DB text
export const DB_NEW_LINE_SEPARATOR = "QaplaMoo";

// Verification Process
export const VERIFICATION_COUNTDOWN_MILISECONDS = 60000;

// Navigation Top Bar Icons
export const NAV_TOPBAR_ICON_LEFT_MARGIN = 8;
export const NAV_TOPBAR_ICON_RIGHT_MARGIN = 8;
export const NAV_TOPBAR_ICON_TOP_MARGIN = 2.28;

// APP Header
export const HEADER_SIZE = 3.2;

// Firebase Cloud Messaging Topics
export const EVENTS_TOPIC = 'events';
export const GAMES_TOPICS = 'games';

// Firebase auth error
export const ACCOUNT_ALREADY_IN_USE = 'auth/credential-already-in-use';
export const ACCOUNT_ALREADY_LINKED_TO_USER_ACCOUNT = 'auth/unknown';
export const ACCOUNT_INVALID_CREDENTIAL = 'auth/invalid-credential';
export const ACCOUNT_ALREADY_LINKED_TO_USER_ACCOUNT_IOS =  'auth/provider-already-linked';

// IOS and Android store
export const IOS_STORE_LINK = 'https://apps.apple.com/mx/app/qapla-gaming/id1485332229';
export const ANDROID_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.qapla.gaming.app&hl=en';
export const APPSTORE_ID = '1485332229';

//App settings
export const IOS_BUNDLE_ID = 'org.Qapla.QaplaApp';
export const ANDROID_PACKAGE_NAME = 'com.qapla.gaming.app';

// Bottom Sheets
export const SHEET_MAX_HEIGHT = heightPercentageToPx(65);
export const SHEET_MIN_HEIGHT = heightPercentageToPx(26.5);

// Bottom bar
export const BOTTOM_NAVIGATION_BAR_HEIGHT = 85;

// Default user images
export const defaultUserImages = [
	images.png.profileImagePlaceholder1,
	images.png.profileImagePlaceholder2,
	images.png.profileImagePlaceholder3,
	images.png.profileImagePlaceholder4,
	images.png.profileImagePlaceholder5,
	images.png.profileImagePlaceholder6
];

// Activity types
export const XQ = 'xq';
export const QOINS = 'qoins';

export const STREAMERS_BLACKLIST = ['141617732-catskullgamer', '683167758-catskullgg', '613408163-dhvsll', '180517858-QaplaGG', '448926957-qaplita', '140436068-RadAngelZero', '528477359-mariyolo1bot'];