// diego          - 06-09-2019 - us93 - Replace Switch for custom CheckBox component
// diego          - 06-08-2019 - us68 - File creation

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Modal from '../Modal/Modal';
import { storeData } from '../../utilities/persistance';
import CheckBox from '../CheckBox/CheckBox';

class AcceptChallengeModal extends Component {
    state = {
        dontShowModalAgain: false
    };

    /**
     * @description Method called when the user accepts to delete all the notifications of the same match
     */
    acceptDelete() {
        if (this.state.dontShowModalAgain) {
            storeData('dont-show-delete-notifications-modal', 'true');
        }
        
        this.props.acceptNotificationsDelete();
    }

    /**
     * @description Toogle the dontShowModalAgain flag to the selected state of the checkbox
     */
    setCheckBoxState = (newState) => {
        this.setState({ dontShowModalAgain: newState });
    }

    render() {
        return (
            <Modal open onClose={this.props.onClose}>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Al aceptar este desafio todos los otros desafios que te han hecho a esta reta 
                        seran eliminados.
                    </Text>
                    <CheckBox
                        style={styles.checkbox}
                        label='Entendido, no volver a mostrar este mensaje'
                        selected={this.state.dontShowModalAgain}
                        onPress={this.setCheckBoxState} />
                    <TouchableWithoutFeedback onPress={() => this.acceptDelete()}>
                        <View style={styles.gotItButton}>
                            <Text style={styles.gotItButtonText}>Continuar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        );
    }
}

export default AcceptChallengeModal;
