// josep-sanahuja          - 21-12-2019 - us152 - File creation

import React, { Component } from 'react';
import { Modal, View, SafeAreaView, ScrollView } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { getQaplaAppPrivacy } from '../../services/database';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../QaplaText/QaplaText';

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
                    <QaplaIcon onPress={this.closeModal} touchableStyle={styles.closeIcon}>
                        <CloseIcon />
                    </QaplaIcon>
                    <QaplaText style={styles.modalTitle}>Aviso Privacidad</QaplaText>
                    <ScrollView>
                        <View style={styles.scrollViewContainer}>
                            {this.state.privacyText.map((item, index) => (
                                <QaplaText key={index} style={styles.lineText}>{item}</QaplaText>)
                            )}
                            <View style={styles.separator} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }
}

export default PrivacyModal;
