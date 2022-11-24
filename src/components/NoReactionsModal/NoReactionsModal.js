import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import images from '../../../assets/images';

import styles from './style';
import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';
import { translate } from '../../utilities/i18';

class NoReactionsModal extends Component {
    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}>
                <View style={styles.contentContainer}>
                    <Image source={images.png.channelPoints.img} />
                    <Text style={styles.title}>
                        {translate('noReactionsModal.noReactionsP1')}
                    </Text>
                    <Text style={styles.instructions}>
                        <Text style={[styles.instructions, styles.bold]}>
                            {translate('noReactionsModal.noReactionsP2')}
                        </Text>
                        {translate('noReactionsModal.noReactionsP3')}
                        <Text style={[styles.instructions, styles.bold]}>
                            {translate('noReactionsModal.noReactionsP4')}
                        </Text>
                        {translate('noReactionsModal.noReactionsP5')}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.upgradeButton}
                            onPress={() => this.props.onUpgradeReaction(2)}>
                            <Text style={styles.upgradeButtonText}>
                                {translate('noReactionsModal.upgradeFor')}
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
                                {translate('noReactionsModal.getReward')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalWithOverlay>
        );
    }
}

export default NoReactionsModal;