import React, { Component } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import styles from './style';
import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';
import { translate } from '../../utilities/i18';
import { getRandomStreamerOfflineGif } from '../../services/database';
import { withNavigation } from 'react-navigation';

class StreamerOfflineModal extends Component {
    state = {
        fallbackGifUrl: ''
    };

    getFallbackGif = async () => {
        const gif = await getRandomStreamerOfflineGif();
        this.setState({ fallbackGifUrl: gif.val() });
    }

    followStreamer = () => {
        this.props.onClose();
        this.props.navigation.navigate('StreamerProfile', { streamerId: this.props.streamerUid })
    }

    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}
                onShow={this.getFallbackGif}>
                <Image style={styles.streamerOfflineImage}
                    source={{ uri: this.state.fallbackGifUrl }} />
                <Text style={[styles.modalTitle, { marginTop: 32 }]}>
                    {translate('greetingSearchStreamerScreen.streamerOfflineModal.title')}
                </Text>
                <Text style={styles.modalDescriptions}>
                    {translate('greetingSearchStreamerScreen.streamerOfflineModal.descriptionP1')}
                    <Text style={{ color: '#00FFDD' }}>
                        {translate('greetingSearchStreamerScreen.streamerOfflineModal.streamerName', { streamerName: this.props.streamerDisplayName })}
                    </Text>
                    {translate('greetingSearchStreamerScreen.streamerOfflineModal.descriptionP2')}
                </Text>
                <TouchableOpacity style={styles.modalButton}
                    onPress={this.followStreamer}>
                    <Text style={styles.modalButtonText}>
                        {translate('greetingSearchStreamerScreen.streamerOfflineModal.follow')}
                    </Text>
                </TouchableOpacity>
            </ModalWithOverlay>
        );
    }
}

export default withNavigation(StreamerOfflineModal);