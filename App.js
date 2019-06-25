import React, {Component} from 'react';
import Router from './src/Router';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <Router />
    );
  }
}
