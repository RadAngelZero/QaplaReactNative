import React, { Component } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';
import { translate } from '../../utilities/i18';
import { getRandomStreamerOfflineGif } from '../../services/database';

class ReactionsSnoozedModal extends Component {
    state = {
        fallbackGifUrl: ''
    };

    getFallbackGif = async () => {
        const gif = await getRandomStreamerOfflineGif();
        this.setState({ fallbackGifUrl: gif.val() });
    }

    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}
                onShow={this.getFallbackGif}>
                <Image style={styles.streamerOfflineImage}
                    source={{ uri: this.state.fallbackGifUrl }} />
                <Text style={[styles.modalTitle, { marginTop: 32 }]}>
                    {translate('reactionsSnoozedModal.title')}
                </Text>
                <Text style={styles.modalDescriptions}>
                    {translate('reactionsSnoozedModal.description')}
                </Text>
                <TouchableOpacity style={styles.modalButton}
                    onPress={this.props.onClose}>
                    <Text style={styles.modalButtonText}>
                        {translate('reactionsSnoozedModal.understood')}
                    </Text>
                </TouchableOpacity>
            </ModalWithOverlay>
        );
    }
}

export default withNavigation(ReactionsSnoozedModal);