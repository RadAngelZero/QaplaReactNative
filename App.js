import React from 'react';
import Router from './src/Router';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Router />
    );
  }
}
