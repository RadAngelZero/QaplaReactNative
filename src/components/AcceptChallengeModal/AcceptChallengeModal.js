// diego          - 06-08-2019 - us68 - File creation

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Switch } from 'react-native';

import styles from './style';
import Modal from '../Modal/Modal';
import { storeData } from '../../utilities/persistance';

class AcceptChallengeModal extends Component {
    state = {
        dontShowAgain: false
    };

    acceptDelete() {
        if (this.state.dontShowAgain) {
            storeData('dontShowDeleteNotificationsModal', 'true');
        }
        this.props.acceptNotificationsDelete();
    }

    render() {
        return (
            <Modal open onClose={this.props.onClose}>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Al aceptar este desafio todos los otros desafios que te han hecho a esta reta 
                        seran eliminados.
                    </Text>
                    <Text style={styles.smallText}>No mostrar de nuevo</Text>
                    <Switch onValueChange={(value) => this.setState({ dontShowAgain: value })} value={this.state.dontShowAgain} />
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
