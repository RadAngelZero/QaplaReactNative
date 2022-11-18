import React, { Component } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import EmoteSelector from '../EmojiSelector/EmoteSelector';
import { getRandomGifByLibrary } from '../../services/database';

class EmoteRainModal extends Component {
    state = {
        gif: undefined
    };

    loadRandomGif = async () => {
        const gif = await getRandomGifByLibrary('level3Reactions');
        this.setState({ gif: gif.val() });
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                onShow={this.loadRandomGif}
                onDismiss={() => this.setState({ gif: undefined })}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={this.props.onClose}
                                style={styles.closeIcon}>
                                <images.svg.closeIcon />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Let it rain 👇
                            </Text>
                            {/* Trick to center text */}
                            <View style={[styles.closeIcon, { opacity: 0 }]}>
                                <images.svg.closeIcon />
                            </View>
                        </View>
                        <View style={styles.emoteRainGifContainer}>
                            <Image source={this.state.gif ? {
                                    uri: this.state.gif
                                }
                                :
                                null
                            }
                            style={styles.emoteRainGif} />
                        </View>
                        <View style={styles.emotesContainer}>
                            <EmoteSelector data={this.props.emotes}
                                onEmoteSelect={this.props.onEmoteSelected}
                                {...this.props.userToStreamerRelation} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default EmoteRainModal;