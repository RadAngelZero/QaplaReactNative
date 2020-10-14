import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, TextInput } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../QaplaText/QaplaText';

const CloseIcon = Images.svg.closeIcon;

class DonationsFeedbackModal extends Component {
    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <QaplaIcon onPress={this.props.onClose} touchableStyle={styles.closeIcon}>
                            <CloseIcon />
                        </QaplaIcon>
                        <QaplaText style={styles.headerText}>
                            { translate('zeroQoinsEventModal.header') }
                        </QaplaText>
                        <QaplaText style={styles.paragraph}>
                            { translate('zeroQoinsEventModal.body') }
                        </QaplaText>
                        <TouchableOpacity onPress={this.props.onClose}>
                            <View style={styles.eventsButton}>
                                <QaplaText style={styles.bttnText}>{ translate('zeroQoinsEventModal.bttnText') }</QaplaText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default DonationsFeedbackModal;