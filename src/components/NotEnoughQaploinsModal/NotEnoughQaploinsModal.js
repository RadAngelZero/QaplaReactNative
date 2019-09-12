// josep.sanahuja - 08-08-2019 - us85 - File creation

import React, { Component } from 'react';
import { 
	View,
	Text,
	Modal,
	TouchableWithoutFeedback
} from 'react-native';

import styles from './style';

class NotEnoughQaploins extends Component {
    
	/**
	 *	Callbacks used in render()
	 */

	/**
	 * Description:
	 * Deletes one notification from the database using the callback passed via props,
	 * and closes the modal after that.
	 *
	 */
    action = () => {
    	// Delete Notification from DB
    	this.props.deleteNotificationFromDB();

    	// Close the Modal
    	this.props.onClose();
    }

    render() {
        return (
        	<Modal
	          animationType="slide"
	          transparent={true}
	          visible={this.props.visible}
	          onRequestClose={this.props.onClose}>
	          <View style={styles.mainContainer}>
			    <View style={styles.container}>
					<Text style={styles.headerText}>Adversario sin Qaploins</Text>
					<TouchableWithoutFeedback onPress={this.action}>
						<View style={styles.okButton}>
							<Text style={styles.text}>Entendido</Text>
						</View>
					</TouchableWithoutFeedback>
					<Text style={styles.smallText}>La notificación se borrará de la lista</Text>
			    </View>
			  </View>
	        </Modal>
        );
    }
}

export default NotEnoughQaploins;
