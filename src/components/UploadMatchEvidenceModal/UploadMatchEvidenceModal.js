// josep.sanahuja - 12-08-2019 - us79 - File creation

import React, { Component } from 'react';
import { 
	View,
	Text,
	Modal,
	TouchableWithoutFeedback
} from 'react-native';

import styles from './style';

class UploadMatchEvidenceModal extends Component {
    
	/**
	 *	Callbacks used in render()
	 */

	/**
	 * Description:
	 * Deletes one notification from the database using the callback passed via props,
	 * and closes the modal after that. After closing the modal, cb1 and cb2 props can be
	 * called.
	 *
	 */
    action = async () => {
    	// Close the Modal
    	this.props.onClose();

    	// cb1 executes before cb2, and in case cb1 is not defined and cb2 is, then cb2 is excecuted
    	// even though cb1 is undefined.
    	if (this.props.cb1 != undefined && this.props.cb1 != null){
    		await this.props.cb1();	
    	}

    	if (this.props.cb2 != undefined && this.props.cb2 != null){
    		await this.props.cb2();
    	}
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
					<Text style={styles.headerText}>Sube tu evidencia :)</Text>
					<Text style={styles.paragraph}>Recuerda de subir tu evidencia de la partida que jugaste! En caso de haber una disputa por el resultado la evidencia será tu mejor prueba!</Text>
					<TouchableWithoutFeedback onPress={this.action}>
						<View style={styles.okButton}>
							<Text style={styles.text}>OK</Text>
						</View>

					</TouchableWithoutFeedback>
			    </View>
			  </View>
	        </Modal>
        );
    }
}

export default UploadMatchEvidenceModal;
