import React, { Component } from 'react';
import { Modal, View, Image, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import Images from './../../../assets/images';
import { trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../QaplaText/QaplaText';
import images from './../../../assets/images';

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

        this.props.navigation.navigate('Explore');
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
                        <Image source={images.png.notEnoughQoins.img} style={styles.dogAssImage} />
                        <QaplaIcon onPress={this.props.onClose} touchableStyle={styles.closeIcon}>
                            <CloseIcon />
                        </QaplaIcon>
                        <Text style={styles.headerText}>
                            { translate('zeroQoinsEventModal.header') }
                        </Text>
                        <Text style={styles.paragraph}>
                            { translate('zeroQoinsEventModal.body') }
                        </Text>
                        <TouchableOpacity onPress={this.goToEvents}>
                            <View style={styles.eventsButton}>
                                <Text style={styles.bttnText}>
                                    {translate('zeroQoinsEventModal.bttnText')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default withNavigation(ZeroQoinsEventsModal);
