// diego          - 04-09-2019 - us106 - Logic to accept challenge implemented
// diego          - 06-08-2019 - us68 - File creation

import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, Switch } from 'react-native';

import styles from './style';
import { storeData } from '../../utilities/persistance';
import { acceptChallengeRequest } from '../../services/functions';
import { withNavigation } from 'react-navigation';

class AcceptChallengeModal extends Component {
    state = {
        dontShowModalAgain: false
    };

    /**
     * @description Method called when the user accepts to delete all the notifications of the same match
     */
    acceptDelete = () => {
        if (this.state.dontShowModalAgain) {
            storeData('dont-show-delete-notifications-modal', 'true');
        }
        
        acceptChallengeRequest(this.props.notification, this.props.uid);
        this.props.navigation.navigate('MisRetas');
    }

    toogleSwitchValue = (value) => this.setState({ dontShowModalAgain: value });

    render() {
        return (
            <Modal
                animationType='none'
                transparent
                visible={this.props.visible}
                onRequestClose={this.props.onClose}>
                    <View style={styles.mainContainer}>
                        <View style={styles.container}>
                            <Text style={styles.paragraph}>
                                Al aceptar este desafio todos los otros desafios que te han hecho a esta reta seran eliminados.
                            </Text>
                            <Text style={styles.smallText}>No mostrar de nuevo</Text>
                            <Switch
                                onValueChange={this.toogleSwitchValue}
                                value={this.state.dontShowModalAgain} />
                            <TouchableWithoutFeedback onPress={this.acceptDelete}>
                                <View style={styles.gotItButton}>
                                    <Text style={styles.gotItButtonText}>Continuar</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
            </Modal>
        );
    }
}

export default withNavigation(AcceptChallengeModal);
