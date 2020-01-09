// diego          - 04-09-2019 - us106 - Logic to delete notification implemented
// josep.sanahuja - 08-08-2019 - us85 - File creation

import React, { Component } from 'react';
import {
	View,
	Text,
	Modal,
	TouchableWithoutFeedback
} from 'react-native';
import i18n from 'i18n-js';

import styles from './style';
import {
	deleteNotification
} from '../../services/database';
import {
	withNavigation
} from 'react-navigation';

/**
 * Risky praxis, always call the components with the same name as the file (NotEnoughQaploinsModal in this case)
 */
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
		deleteNotification(this.props.uid, this.props.notificationKey);

		// Close the Modal
    	this.props.onClose();

		if (this.props.deletedFromMatchDetail) {
			this.props.navigation.goBack('NotificationRetas');
		}
    }

    render() {
        return (
        	<Modal
	        	animationType='slide'
	          	transparent={true}
	          	visible={this.props.visible}
	          	onRequestClose={this.props.onClose}>
	          		<View style={styles.mainContainer}>
              			<View style={styles.container}>
			                <Text style={styles.headerText}>{i18n.t('notEnoughQaploinsModal.header')}</Text>
			                <TouchableWithoutFeedback onPress={this.action}>
			                  <View style={styles.okButton}>
			                    <Text style={styles.text}>{i18n.t('notEnoughQaploinsModal.accept')}</Text>
			                  </View>
			                </TouchableWithoutFeedback>
			                <Text style={styles.smallText}>{i18n.t('notEnoughQaploinsModal.warning')}</Text>
		                </View>
		            </View>
	        </Modal>
        );
    }
}

export default withNavigation(NotEnoughQaploins);
