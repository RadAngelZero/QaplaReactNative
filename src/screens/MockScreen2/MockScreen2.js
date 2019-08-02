// josep.sanahuja    - 30-07-2019 - us59 - + acceptChallengeRequest()

import React from 'react';

import {
  View,
  Text,
  Button,
  TextInput
} from 'react-native'

import styles from './style'
import {functions} from '../../utilities/firebase'

export default class MockScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	textIdMatch: 'Type IdMatch',
    	textIdNotification: 'Type IdNotification',
    	textIdChallenged: 'Type IdChallenged'
    };
  }

  render() {
    return (
       <View style={styles.container}>
        	<Text >Miau!</Text>
        	<Text >To get started, edit App.js</Text>
        	<TextInput
		    	style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
		        onChangeText={(text) => this.setState({textIdMatch: text})}
		        value={this.state.textIdMatch}
		    />
		    <TextInput
		    	style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
		        onChangeText={(text) => this.setState({textIdChallenged: text})}
		        value={this.state.textIdChallenged}
		    />
		    <TextInput
		    	style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
		        onChangeText={(text) => this.setState({textIdNotification: text})}
		        value={this.state.textIdNotification}
		    />
        	<Button
			  onPress={cancelMatch.bind(this, this.state.textIdMatch)}
			  title="CancelMatch"
			  color="white"
			/>
			<Button
			  onPress={acceptChallengeRequest.bind(this,
			  	this.state.textIdChallenged,
			  	this.state.textIdNotification)}
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

/**
 * Description:
 * Cancel public match with id idMatch
 *
 * @param {string} idMatch id of the match to cancel
 *
 */
function cancelMatch(idMatch) {
	var cloudFunc = functions.httpsCallable('cancelMatch');

	try {
		let res = cloudFunc({idMatch: idMatch});
	}
	catch (err) {
		console.log("[MockScreen] - Error - " + error.toString());
	}
}

/**
 * Description:
 * Accept challenge for idMatch
 *
 * @param {string} idMatch    id of the Match to be challenged
 * @param {string} idRequest  id from the match request
 * @param {string} idSender   id from the user that sends the challenge request
 *
 */
function acceptChallengeRequest(idChallenged, idNotification) {
	let cloudFunc = functions.httpsCallable('acceptChallengeRequest');

	try {
		let res = cloudFunc({idNotification: idNotification, idChallenged: idChallenged});
	}
	catch (err) {
		console.log("[MockScreen] - acceptChallengeRequest - Error - " + error.toString());
	}
}