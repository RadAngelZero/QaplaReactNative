import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import highlightsReducer from './highlightsReducer';
import streamsReducer from './streamsReducer';
import serverTimeOffsetReducer from './serverTimeOffsetReducer';
import screensReducer from './screensReducer';
import profileLeaderBoardReducer from './profileLeaderBoardReducer';
import qaplaLevelReducer from './QaplaLevelReducer';
import streamersReducer from './streamersReducer';
import purchasesReducer from './purchasesReducer';

export default combineReducers({
    userReducer,
    gamesReducer,
    highlightsReducer,
    streamsReducer,
    serverTimeOffsetReducer,
    screensReducer,
    profileLeaderBoardReducer,
    qaplaLevelReducer,
    streamersReducer,
    purchasesReducer
});
