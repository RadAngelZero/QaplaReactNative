// diego          - 04-09-2019 - us106 - Logic to delete notification implemented
// josep.sanahuja - 08-08-2019 - us85 - File creation

import React, { Component } from 'react';
import {
	View,
	Modal,
	TouchableWithoutFeedback
} from 'react-native';

import styles from './style';
import {
	deleteNotification
} from '../../services/database';
import {
	withNavigation
} from 'react-navigation';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
QaplaText

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
			                <QaplaText style={styles.headerText}>{translate('notEnoughQaploinsModal.header')}</QaplaText>
			                <TouchableWithoutFeedback onPress={this.action}>
			                  <View style={styles.okButton}>
			                    <QaplaText style={styles.text}>{translate('notEnoughQaploinsModal.accept')}</QaplaText>
			                  </View>
			                </TouchableWithoutFeedback>
			                <QaplaText style={styles.smallText}>{translate('notEnoughQaploinsModal.warning')}</QaplaText>
		                </View>
		            </View>
	        </Modal>
        );
    }
}

export default withNavigation(NotEnoughQaploins);
