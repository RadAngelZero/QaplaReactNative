import React, { Component } from 'react';
import { Keyboard, Modal, Text, TouchableOpacity, View } from 'react-native';

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