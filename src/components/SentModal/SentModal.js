import React, { Component } from 'react';
import { Image, Linking, Text, TouchableOpacity } from 'react-native';

import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';
import { translate } from '../../utilities/i18';
import images from '../../../assets/images';
import styles from './style';

class SentModal extends Component {
    openSelectedStreamerTwitchChannel = () => {
        Linking.openURL(`https://twitch.tv/${this.props.displayName.toLowerCase()}`);
    }

    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}>
                <Image style={styles.successImage}
                    source={images.png.checkCircleGlow.img} />
                <Text style={styles.modalsTitle}>
                    {translate('greetingSearchStreamerScreen.sentModal.title')}
                </Text>
                <TouchableOpacity style={styles.modalButton}
                    onPress={this.openSelectedStreamerTwitchChannel}>
                    <Text style={styles.modalButtonText}>
                        {translate('greetingSearchStreamerScreen.sentModal.goToStream')}
                    </Text>
                </TouchableOpacity>
            </ModalWithOverlay>
        );
    }
}

export default SentModal;
