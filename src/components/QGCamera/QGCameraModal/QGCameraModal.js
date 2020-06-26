// josep.sanahuja - 22-09-2019 - us123 - File creation

import React, { Component } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import styles from './style';
import { withNavigation } from 'react-navigation';

import Images from './../../../../assets/images';
import { translate } from '../../../utilities/i18';
import QaplaText from '../../QaplaText/QaplaText';

const CloseIcon = Images.svg.closeIcon;

class QGCameraModal extends Component {

    /**
    * Saves the picture taken by Camera, hides the modal and navigates
    * to a next screen in case of beeing it defined.
    */
    action = async () => {
      // Calls callback to save the picture
      this.props.savePicture();

      // Close the Modal
      this.closeModal();

      // If there is no screen defined in props, the modal will close without any navigation
      if (this.props.nextScreen && typeof this.props.nextScreen === 'string') {
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
	          transparent={false}
	          visible={this.props.visible}
	          onRequestClose={this.props.onClose}>
	            <View style={styles.mainContainer}>
			            <View style={styles.container}>
			                <TouchableWithoutFeedback onPress={this.closeModal}>
						              <View style={styles.closeIcon}>
							                <CloseIcon />
						              </View>
				              </TouchableWithoutFeedback>
					            <QaplaText style={styles.headerText}>{this.props.header}</QaplaText>
					            <Image
		            	        source={{uri: this.props.pictureUri}}
		                      style={styles.picture} />
					            <TouchableWithoutFeedback onPress={this.action}>
						              <View style={styles.okButton}>
							                <QaplaText style={styles.text}>{translate('qGCameraModal.selectImage')}</QaplaText>
						              </View>
					            </TouchableWithoutFeedback>
			            </View>
			        </View>
	        </Modal>
        );
    }
}

export default withNavigation(QGCameraModal);