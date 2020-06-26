import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import Images from './../../../assets/images';
import { trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../QaplaText/QaplaText';

const CloseIcon = Images.svg.closeIcon;

class ZeroQoinsEventsModal extends Component {
    /**
     * Redirect to LogrosActivos screen
     */
    goToEvents = () => {
        trackOnSegment('Zero Qoins Events Modal', {
            Bet: this.props.bet,
            Origin: this.props.openWhen
        });

        this.props.navigation.navigate('LogrosActivos');
        this.props.onClose();
    }

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
                        <TouchableWithoutFeedback onPress={this.goToEvents}>
                            <View style={styles.eventsButton}>
                                <QaplaText style={styles.bttnText}>{ translate('zeroQoinsEventModal.bttnText') }</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default withNavigation(ZeroQoinsEventsModal);
