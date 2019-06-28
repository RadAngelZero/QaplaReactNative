import React from 'react';
import Router from './src/Router';
import {retrieveData} from '@utilities/persistance'

console.disableYellowBox = true;

export default class App extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {st: undefined};
  }

  componentDidMount() {
  	this.getConfData();
  }

  async getConfData() {
  	const v = await retrieveData('tutorial-done');
  	console.log("muu: " + v)
  	this.setState({
  		st: v
  	})
  }

  render() {
  	show = true;
    if (this.state.st == undefined) {
    	console.log("[App] : st is undefined")
	    show = false;
    }
    
    console.log("[App] : st is st " + JSON.stringify(this.state))

    return <Router tutorial={show == true}/>
  }
}
