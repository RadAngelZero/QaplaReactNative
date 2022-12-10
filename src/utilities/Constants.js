import { heightPercentageToPx } from './iosAndroidDim';

// Segment key
export const SEGMENT_KEY = 'fCfir8yrQiZRVrpuwLHYRePN68SqW8AS';

// Giphy API hey
export const GIPHY_KEY = 'VDvH7301JvDdgFGQY41bv0Sr8zl5v4In';

// Giphy media types
export const GIPHY_GIFS = 'gif';
export const GIPHY_STICKERS = 'sticker';
export const GIPHY_CLIPS = 'video';
export const GIPHY_TEXT = 'text';

// Twitch Client Id
export const TWITCH_CLIENT_ID = '3cwpzmazn716nmz6g1087kh4ciu4sp';
export const TWITCH_REDIRECT_URI = 'http://localhost:3000';

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

// Purchases reducer
export const ON_PURCHASE_FINISHED = 'ON_PURCHASE_FINISHED';

// User To Streamer Relation Reducer
export const LOAD_TWITCH_RELATION_DATA = 'LOAD_TWITCH_RELATION_DATA';

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
export const REMOVE_LIVE_STREAM = 'REMOVE_LIVE_STREAM';
export const CLEAN_ALL_STREAMS = 'CLEAN_ALL_STREAMS';

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
export const BOTTOM_NAVIGATION_BAR_HEIGHT = 75;

// Default user images
export const defaultUserImages = [
	'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/DefaultUsersImages%2Fpic-big-eyes.jpg?alt=media&token=40903ec7-bb87-4b03-88c4-f1b3b37f235f',
	'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/DefaultUsersImages%2Fpic-big-smile.jpg?alt=media&token=ab741fce-acd8-412c-a6b4-cb211b7db11d',
	'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/DefaultUsersImages%2Fpic-green-glasses.jpg?alt=media&token=04024f24-cb24-4eff-b017-062353948bbc',
	'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/DefaultUsersImages%2Fpic-one-eye-hat.jpg?alt=media&token=d6979c4f-def1-448f-831a-1ff96ada5a93',
	'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/DefaultUsersImages%2Fpic-one-eye.jpg?alt=media&token=9970f8a5-915c-4d1b-9577-2b7a8feacff9',
	'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/DefaultUsersImages%2Fpic-twinkle.jpg?alt=media&token=376b3079-87a2-431f-a53a-15980174c41d'
];

// Activity types
export const XQ = 'xq';
export const QOINS = 'qoins';

// Media types for cheers
export const MEME = 'meme';
export const EMOJI = 'emoji';
export const EMOTE = 'emote';
export const TTS = 'tts';
export const AVATAR = 'avatar';
export const CUSTOM_TTS_VOICE = 'customTTSVoice';

export const STREAMERS_BLACKLIST = ['141617732-catskullgamer', '683167758-catskullgg', '613408163-d_h_v_s', '698301557-QaplaGaming', '448926957-qaplita', '528477359-mariyolo1bot'];

// Default image for streams where we can not load thumbnail URL
export const DEFAULT_404_TWITCH_PREVIEW_URL = 'https://static-cdn.jtvnw.net/ttv-static/404_preview-480x270.jpg';

export const MAX_CHAR_FOR_TTS = 100;

export const TWITCH_PARTNER = 'partner';
export const TWITCH_AFFILIATE = 'affiliate';

export const GIPHY_TEXT_GENERATOR_URL = 'https://dashboard.qapla.gg/giphyTextGenerator/';

export const VALID_MEMES_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png'
];

export const ELASTIC_URL = 'https://elastic-qapla-test.es.us-central1.gcp.cloud.es.io';