// josep.sanahuja    - 13-08-2019 - bug6 - - acceptChallengeRequest
// josep.sanahuja    - 13-08-2019 - us88 - + UploadMatchResultsModal
// josep.sanahuja    - 12-08-2019 - us79 - + UploadMatchEvidenceModal
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// josep.sanahuja    - 30-07-2019 - us59 - + acceptChallengeRequest()

import React from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView
} from 'react-native'

import styles from './style'
import {functions} from '../../utilities/firebase'

import UploadMatchEvidenceModal from '../../components/UploadMatchEvidenceModal/UploadMatchEvidenceModal'
import UploadMatchResultsModal from '../../components/UploadMatchResultsModal/UploadMatchResultsModal'

export default class MockScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	textIdMatch: 'Type IdMatch',
    	textIdNotification: 'Type IdNotification',
    	textIdChallenged: 'Type IdChallenged',
    	openUploadEvModal: false,
    	openUploadResModal: false
    };
  }

 /**
  * Description:
  * Closes Modal that reminds to upload an evidence
  *
  * @param None
  */
  toogleUploadEvModal = async () => {
  	this.setState({
  		openUploadEvModal: !this.state.openUploadEvModal
  	})
  }

 /**
  * Description:
  * Closes Modal that reminds to upload a match result
  *
  * @param None
  */
  toogleUploadResModal = async () => {
  	this.setState({
  		openUploadResModal: !this.state.openUploadResModal
  	})
  }  

  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
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
				  onPress={this.toogleUploadEvModal}
				  title="Open Upload Ev Modal"
				  color="white"
				/>
				<Button
				  onPress={this.toogleUploadResModal}
				  title="Open Upload Res Modal"
				  color="white"
				/>
				<UploadMatchEvidenceModal
					visible={this.state.openUploadEvModal}
					onClose={this.toogleUploadEvModal} />
				<UploadMatchResultsModal
					visible={this.state.openUploadResModal}
					onClose={this.toogleUploadResModal}
					nextScreen={'Publicas'} />	
	      	</View>
	    </SafeAreaView>
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