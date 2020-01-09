// josep.sanahuja - 12-08-2019 - us88 - File creation

import React, { Component } from 'react';
import {
	View,
	Text,
	Modal,
	TouchableWithoutFeedback
} from 'react-native';
import i18n from 'i18n-js';

import styles from './style';
import { withNavigation } from 'react-navigation';

class UploadMatchResultsModal extends Component {
	/**
	 *	Callbacks used in render()
	 */

	/**
	 * Description:
	 * Perform a series of actions for the Modal, including the main one which is 'closing the modal'
	 * and navigation to next screen. The other actions are performed via cb1 and cb2 props,
	 * which are executed sequentially, cb1 1st, cb2 2nd, and they are executed in a synchronous way.
	 */
    action = async () => {
    	// Close the Modal
    	this.closeModal();

    	// cb1 executes before cb2, and in case cb1 is not defined and cb2 is, then cb2 is excecuted
    	// even though cb1 is undefined.
    	if (this.props.cb1 !== undefined && this.props.cb1 !== null){
    		await this.props.cb1();
    	}

    	if (this.props.cb2 !== undefined && this.props.cb2 !== null){
    		await this.props.cb2();
    	}

    	// If there is no screen defined in props, the modal will close without any navigation
    	if (this.props.nextScreen) {
    		this.props.navigation.navigate(this.props.nextScreen);
    	}
    }

    /**
	 * Description:
	 * Closes the Modal by using the function given in props.
	 */
    closeModal = () => {
    	// Close the Modal
    	this.props.onClose();
    }

    render() {
        return (
        	<Modal
	          animationType='fade'
	          transparent={true}
	          visible={this.props.visible}
	          onRequestClose={this.props.onClose}>
	          <View style={styles.mainContainer}>
			    <View style={styles.container}>
					<Text style={styles.headerText}>{i18n.t('uploadClutchEvidenceScreen.uploadMatchResultsModal.header')}</Text>
					<Text style={styles.paragraph}>{i18n.t('uploadClutchEvidenceScreen.uploadMatchResultsModal.paragraph')}</Text>
					<TouchableWithoutFeedback onPress={this.action}>
						<View style={styles.okButton}>
							<Text style={styles.text}>{i18n.t('uploadClutchEvidenceScreen.uploadMatchResultsModal.okButton')}</Text>
						</View>
					</TouchableWithoutFeedback>
			    </View>
			  </View>
	        </Modal>
        );
    }
}

export default withNavigation(UploadMatchResultsModal);
