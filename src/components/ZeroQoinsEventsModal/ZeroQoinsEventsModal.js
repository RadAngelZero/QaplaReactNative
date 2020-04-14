import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import { trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';

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
                        <Text style={styles.headerText}>
                            { translate('zeroQoinsEventModal.header') }
                        </Text>
                        <Text style={styles.paragraph}>
                            { translate('zeroQoinsEventModal.body') }
                        </Text>
                        <TouchableWithoutFeedback onPress={this.goToEvents}>
                            <View style={styles.eventsButton}>
                                <Text style={styles.bttnText}>{ translate('zeroQoinsEventModal.bttnText') }</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default withNavigation(ZeroQoinsEventsModal);
