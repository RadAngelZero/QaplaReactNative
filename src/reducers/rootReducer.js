import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import highlightsReducer from './highlightsReducer';

export default combineReducers({
    userReducer,
    gamesReducer,
    highlightsReducer
});