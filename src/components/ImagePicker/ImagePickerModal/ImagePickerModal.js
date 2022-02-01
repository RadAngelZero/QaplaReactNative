// josep.sanahuja    - 22-11-2019 - us153 - Add CloseIcon
// josep.sanahuja    - 30-09-2019 - us118 - File creation

import React, { Component } from 'react';
import {
	Modal,
	SafeAreaView,
	Platform
} from 'react-native';

import styles from './style';
import Images from './../../../../assets/images';

import ImagePicker from '../ImagePicker';
import QaplaIcon from '../../QaplaIcon/QaplaIcon';
import { retrieveData, storeData } from '../../../utilities/persistance';
import GalleryPermissionsModaliOS from '../../GalleryPermissionsModaliOS/GalleryPermissionsModaliOS';

const CloseIcon = Images.svg.closeIcon;

class ImagePickerModal extends Component {
	state = {
		showIOSPermissionsModal: Platform.OS === 'ios' ? true : false,
		isSavingImage: false
	};

	componentDidMount() {
		this.checkPermissions();
	}

    /**
	 * Closes Modal and Cameraroll hiddes
	 */
    closeModal = async () => {
    	this.props.onClose();
    }

    /**
	 * Saves the picture.
	 * Saving behaviour is determined by ImagePickerModal's parent
	 */
    saveImage = async (picture) => {
		this.setState({ isSavingImage: true }, async () => {
			await this.props.saveImage(picture, () => {
				this.setState({ isSavingImage: false });
			});
		});
  	}

	checkPermissions = async () => {
		const granted = await retrieveData('iOS-gallery-permission');
		if (Platform.OS !== 'ios' || granted) {
			this.setState({ showIOSPermissionsModal: false });
		} else {
			this.setState({ showIOSPermissionsModal: true });
		}
	}

	markGalleryPermissionAsGranted = async () => {
		await storeData('iOS-gallery-permission', 'true');
		this.setState({ showIOSPermissionsModal: false });
	}

    render() {
        return (
			<Modal
				animationType='fade'
				transparent={false}
				visible={this.props.visible}
				onRequestClose={this.props.onClose}>
				{this.state.showIOSPermissionsModal ?
					<GalleryPermissionsModaliOS onClose={() => this.props.onClose()}
						onPress={this.markGalleryPermissionAsGranted} />
					:
					<SafeAreaView style={styles.sfvContainer}>
						<QaplaIcon onPress={this.closeModal} touchableStyle={styles.closeIcon}>
							<CloseIcon />
						</QaplaIcon>
						<ImagePicker isSavingImage={this.state.isSavingImage} saveImage={this.saveImage} />
					</SafeAreaView>
				}
			</Modal>
        );
    }
}

export default ImagePickerModal;
