// diego          - 06-09-2019 - us93 - File creation

import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import CheckBox from '../CheckBox/CheckBox';
import { storeData } from '../../utilities/persistance';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

export class MatchExpireRememberModal extends Component {
    state = {
        dontShowModalAgain: false
    };

    /**
     * @description It checks if the modal will be shown in future occasions and store the configuration so
     * that it remains in the future. It redirects to 'Public Matches Feed' screen.
     */
    confirmModal = () => {

        /**
         * If checkbox is selected then that means that this screen should
         * not show up again when creating a Match. This is why we set flag value
         * to false, indicating that the modal should not open again.
         */
        if (this.state.dontShowModalAgain) {
            storeData('create-match-time-action-msg', JSON.stringify(false));
        }
        this.props.onClose();

        this.props.navigation.navigate('Public');
    }

    /**
     * Toogle the dontShowModalAgain flag to the selected state of the checkbox
     */
    toogleCheckBox = (newState) => {
        this.setState({ dontShowModalAgain: newState });
    }

    render() {
        return (
            <Modal
                transparent
                animationType='fade'
                visible={this.props.visible}
                onRequestClose={this.props.onClose}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <View style={styles.containerMsgModal}>
                            <QaplaText style={styles.headerText}>{translate('matchExpireRememberModal.header')}</QaplaText>
                            <QaplaText style={styles.paragraph}>
                                {translate('matchExpireRememberModal.paragraph')}
                            </QaplaText>
                            <CheckBox
                                style={styles.checkbox}
                                label={translate('matchExpireRememberModal.dontShowItAgain')}
                                selected={this.state.dontShowModalAgain}
                                onPress={this.toogleCheckBox} />
                            <TouchableWithoutFeedback onPress={this.confirmModal}>
                                <View style={styles.okButton}>
                                    <QaplaText style={styles.buttonText}>{translate('matchExpireRememberModal.okButton')}</QaplaText>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default withNavigation(MatchExpireRememberModal);
