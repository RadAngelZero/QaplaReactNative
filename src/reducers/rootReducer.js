import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';

export default combineReducers({
    userReducer,
    gamesReducer
});