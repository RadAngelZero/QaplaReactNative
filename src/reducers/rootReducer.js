import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import highlightsReducer from './highlightsReducer';
import logrosReducer from './logrosReducer';
import serverTimeOffsetReducer from './serverTimeOffsetReducer';
import screensReducer from './screensReducer';
import profileLeaderBoardReducer from './profileLeaderBoardReducer';

export default combineReducers({
    userReducer,
    gamesReducer,
    highlightsReducer,
    logrosReducer,
    serverTimeOffsetReducer,
    screensReducer,
    profileLeaderBoardReducer
});