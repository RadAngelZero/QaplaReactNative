import React, { Component } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import EmoteSelector from '../EmojiSelector/EmoteSelector';

class EmoteRainModal extends Component {
    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
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
                            <Image source={{
                                uri: 'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/AppGifs%2Femote-raid.gif?alt=media&token=6738263c-df25-440e-802d-56d93f0e9c26'
                            }}
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