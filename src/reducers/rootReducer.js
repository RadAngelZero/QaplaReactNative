// josep.sanahuja - 26-08-2019 - us90 - + highlightsReducer

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import highlightsReducer from './highlightsReducer';
import logrosReducer from './logrosReducer';

export default combineReducers({
    userReducer,
    gamesReducer,
    highlightsReducer,
    logrosReducer
});