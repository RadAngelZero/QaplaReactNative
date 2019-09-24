// josep.sanahuja - 22-09-2019 - us123 - File creation

import React, { Component } from 'react';
import { 
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import styles from './style';
import { withNavigation } from 'react-navigation';

import Images from './../../../../assets/images';

const CloseIcon = Images.svg.closeIcon;

class QGCameraModal extends Component {
    /**
    *  Callbacks used in render()
    */

    /**
    * Description:
    * Perform a series of actions for the Modal, including the main one which is 'closing the modal'
    * and navigation to next screen. The other actions are performed via cb1 and cb2 props,
    * which are executed sequentially, cb1 1st, cb2 2nd, and they are executed in a synchronous way.
    * 
    * @param None
    */
    action = async () => {
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

      // Close the Modal
      this.closeModal();
    }

    /**
    * Description:
    * Closes the Modal by using the function given in props.
    * 
    * @param None
    */
    closeModal = async () => {
      // Close the Modal
      this.props.onClose();
    }

    render() {
        return (
        	<Modal
	          animationType="slide"
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
					            <Text style={styles.headerText}>{this.props.header}</Text>
					            <Image
		            	        source={{uri: this.props.pictureUri}}
		                      style={{width: 400, height: 400}} /> 
					            <TouchableWithoutFeedback onPress={this.action}>
						              <View style={styles.okButton}>
							                <Text style={styles.text}>{this.props.okTextButton}</Text>
						              </View>
					            </TouchableWithoutFeedback>
			            </View>
			        </View>
	        </Modal>
        );
    }
}

export default withNavigation(QGCameraModal);