// josep-sanahuja          - 21-12-2019 - us152 - File creation

import React, { Component } from 'react';
import { Modal, View, SafeAreaView, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { getQaplaAppPrivacy } from '../../services/database';

const CloseIcon = Images.svg.closeIcon;

class PrivacyModal extends Component {
    state = {
        privacyText: []
    };

    componentDidUpdate(prevProps) {
        if ((prevProps.open === false) && this.props.open) {
            this.loadPrivacy();
        }
    }

    /**
     * Clean the local state and then close the modal
     */
    loadPrivacy = async () => {
        const privacyText = await getQaplaAppPrivacy();

        this.setState({ privacyText });
    }

    /**
     * Clean the local state and then close the modal
     */
    closeModal = () => {
        this.setState({
            privacyText: []
        });

        this.props.onClose();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <SafeAreaView style={styles.sfvContainer}>
                    <TouchableWithoutFeedback onPress={this.closeModal}>
                        <View style={styles.closeIcon}>
                            <CloseIcon />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.modalTitle}>Aviso Privacidad</Text>
                    <ScrollView contentContainerStyle={styles.textContainer}>
                        {this.state.privacyText.map((item, index) => (
                            <Text key={index} style={styles.lineText}>{item}</Text>)
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }
}

export default PrivacyModal;
