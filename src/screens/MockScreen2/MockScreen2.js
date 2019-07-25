import React from 'react';

import {
  View,
  Text,
  Button,
  TextInput
} from 'react-native'

import styles from './style'
import {database, functions} from '../../utilities/firebase'

export default class MockScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
       <View style={styles.container}>
        	<Text >Miau!</Text>
        	<Text >To get started, edit App.js</Text>
        	<TextInput
		    	style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
		        onChangeText={(text) => this.setState({text})}
		        value={this.state.text}
		    />
        	<Button
			  onPress={cancelMatch.bind(this, this.state.text)}
			  title="CancelMatch"
			  color="white"
			/>
      </View>
    );
  }
}

function incrCount() {
	var mooMoo = functions.httpsCallable('mooMooIsFlying');
	
	mooMoo().then(function(result) {
	  // Read result of the Cloud Function.
	  console.log("[MockScreen1] - incrCount - res: " + JSON.stringify(result));
	  // ...
	});
}

function cancelMatch(idMatch) {
	var cloudFunc = functions.httpsCallable('cancelMatch');

	try {
		let res = cloudFunc({idMatch: idMatch});
	}
	catch (err) {
		console.log("[MockScreen] - Error - " + error.toString());
	}
}