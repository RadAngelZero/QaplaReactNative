// josep.sanahuja    - 22-11-2019 - us153 - Add CloseIcon
// josep.sanahuja    - 30-09-2019 - us118 - File creation

import React, { Component } from 'react';
import {
	Modal,
	SafeAreaView,
	TouchableWithoutFeedback,
	View
} from 'react-native';

import styles from './style';
import Images from './../../../../assets/images';

import ImagePicker from '../ImagePicker';

const CloseIcon = Images.svg.closeIcon;

class ImagePickerModal extends Component {
    /**
	 * Closes Modal and Cameraroll hiddes
	 */
    closeModal = async () => {
    	this.props.onClose();
    }

    /**
	 * Saves the picture and closes the Modal.
	 * Saving behaviour is determined by ImagePickerModal's parent
	 */
    saveImage = (picture) => {
    	this.props.saveImage(picture);
    	this.props.onClose();
  	}

    render() {
        return (
	        	<Modal
					animationType='fade'
					transparent={false}
					visible={this.props.visible}
					onRequestClose={this.props.onClose}>
					<SafeAreaView style={styles.sfvContainer}>
						<TouchableWithoutFeedback onPress={this.closeModal}>
                            <View style={styles.closeIcon}>
                                <CloseIcon />
                            </View>
                        </TouchableWithoutFeedback>
						<ImagePicker saveImage={this.saveImage} />
					</SafeAreaView>
		        </Modal>
        );
    }
}

export default ImagePickerModal;
