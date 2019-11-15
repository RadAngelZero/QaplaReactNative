// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';

export class UserDontHaveGameModal extends Component {
    render() {
        return (
            <Modal
	          animationType='fade'
	          transparent={true}
	          visible={this.props.visible}
	          onRequestClose={this.props.onClose}>
	          <View style={styles.mainContainer}>
			    <View style={styles.container}>
					<Text style={styles.headerText}>Error</Text>
					<Text style={styles.paragraph}>
                        Para desafiar a {this.props.userToChallenge} agrega {this.props.gameName} a tus juegos desde tu perfil.
                    </Text>
					<TouchableWithoutFeedback onPress={this.props.onClose}>
						<View style={styles.okButton}>
							<Text style={styles.textButton}>Entendido</Text>
						</View>
					</TouchableWithoutFeedback>
			    </View>
			  </View>
	        </Modal>
        );
    }
}

export default UserDontHaveGameModal;
