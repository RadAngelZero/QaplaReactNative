import React, { Component } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';
import { translate } from '../../utilities/i18';
import images from '../../../assets/images';
import styles from './style';

class SentModal extends Component {
    sendMoreReactions = () => {
        console.log('Send to send reactions');
    }

    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}>
                <Image style={styles.successImage}
                    source={images.png.checkCircleGlow.img} />
                <Text style={styles.modalTitle}>
                    {translate('greetingSearchStreamerScreen.sentModal.title')}
                </Text>
                <Text style={styles.modalSubtitle}>
                    Watch now on stream
                </Text>
                <TouchableOpacity style={styles.modalButton}
                    onPress={this.sendMoreReactions}>
                    <Text style={styles.modalButtonText}>
                        Send more reactions
                    </Text>
                </TouchableOpacity>
            </ModalWithOverlay>
        );
    }
}

export default SentModal;
