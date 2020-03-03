// diego                - 15-11-2019 - us149 - File creation

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './../reducers/rootReducer';

export default store = createStore(rootReducer, applyMiddleware(thunkMiddleware));