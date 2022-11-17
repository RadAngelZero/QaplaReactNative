import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import images from '../../../assets/images';

import styles from './style';
import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';

class NoReactionsModal extends Component {
    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}>
                <View style={styles.contentContainer}>
                    <Image source={images.png.channelPoints.img} />
                    <Text style={styles.title}>
                        You don´t have reactions
                    </Text>
                    <Text style={styles.instructions}>
                        <Text style={[styles.instructions, styles.bold]}>
                            Get a Qapla Reaction Reward
                        </Text>
                        on Twitch,
                        <Text style={[styles.instructions, styles.bold]}>
                            or upgrade your reaction
                        </Text>
                        to send your alert with Qoins
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.upgradeButton}
                            onPress={() => this.props.onUpgradeReaction(2)}>
                            <Text style={styles.upgradeButtonText}>
                                Upgrade for
                            </Text>
                            <Text style={[styles.upgradeButtonText, { color: '#00FFDD' }]}>
                                {this.props.upgradeCost}
                            </Text>
                            <images.svg.qoin height={16} width={16} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.secondButton}
                            onPress={this.props.onGetReward}>
                            <Text style={styles.secondButtonText}>
                                Get Channel Reward
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalWithOverlay>
        );
    }
}

export default NoReactionsModal;