import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Router from './src/Router';
import rootReducer from './src/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

console.disableYellowBox = true;

class App extends React.Component {
  render() {
    return <Router />
  }
}

const AppReduxContainer = () => (
  <Provider store={store}>
      <App />
  </Provider>
)

export default AppReduxContainer;