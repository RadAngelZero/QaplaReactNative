// diego          - 12-09-2019 - us99 - Added close icon to allow user back and upload evidence
// josep.sanahuja - 12-08-2019 - us79 - File creation

import React, { Component } from 'react';
import { 
	View,
	Text,
	Modal,
	TouchableWithoutFeedback
} from 'react-native';

import styles from './style';
import Images from './../../../assets/images';

const CloseIcon = Images.svg.closeIcon;

class UploadMatchEvidenceModal extends Component {
    
	/**
	 *	Callbacks used in render()
	 */

	/**
	 * Description:
	 * Perform a series of actions for the Modal, including the main one which is 'closing the modal'.
	 * The other actions are performed via cb1 and cb2 props, which are executed sequentially, cb1 1st,
	 * cb2 2nd, and they are executed in a synchronous way.
	 * 
	 * @param None
	 */
    action = async () => {
    	// Close the Modal
    	this.closeModal();

    	// cb1 executes before cb2, and in case cb1 is not defined and cb2 is, then cb2 is excecuted
    	// even though cb1 is undefined.
    	if (this.props.cb1 != undefined && this.props.cb1 != null){
    		await this.props.cb1();	
    	}

    	if (this.props.cb2 != undefined && this.props.cb2 != null){
    		await this.props.cb2();
    	}
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
	          transparent={true}
	          visible={this.props.visible}
	          onRequestClose={this.props.onClose}>
				<View style={styles.mainContainer}>
					<View style={styles.container}>
						<TouchableWithoutFeedback onPress={this.closeModal}>
							<View style={styles.closeIcon}>
								<CloseIcon />
							</View>
						</TouchableWithoutFeedback>
						<Text style={styles.headerText}>Sube tu evidencia :)</Text>
						<Text style={styles.paragraph}>Recuerda de subir tu evidencia de la partida que jugaste! En caso de haber una disputa por el resultado la evidencia será tu mejor prueba!</Text>
						<TouchableWithoutFeedback onPress={this.action}>
							<View style={styles.okButton}>
								<Text style={styles.text}>Entendido</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
	        </Modal>
        );
    }
}

export default UploadMatchEvidenceModal;
