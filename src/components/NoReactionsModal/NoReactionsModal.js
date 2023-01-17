import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import images from '../../../assets/images';
import styles from './style';
import ModalWithOverlay from '../ModalWithOverlay/ModalWithOverlay';
import { translate } from '../../utilities/i18';
import { QOIN } from '../../utilities/Constants';

class NoReactionsModal extends Component {
    state = {
        upgradeCost: null,
        levelToUpgrade: null,
        neededZaps: null
    };

    getUpgradeCost = () => {
        let paidOptionFound = false;
        if (this.props.currentLevel !== 3) {
            if (this.props.costs[0] && this.props.costs[1] && this.props.costs[2]) {
                paidOptionFound = this.props.costs.some(({ type, cost }, index) => {
                    if ((index + 1) > this.props.currentLevel && type === QOIN) {
                        this.setState({ upgradeCost: cost, levelToUpgrade: (index + 1) });
                        return true;
                    }

                    return false;
                });
            }
        } else {
            this.setState({ upgradeCost: null });
        }

        if (!paidOptionFound) {
            this.setState({ neededZaps: this.props.costs[this.props.currentLevel - 1].cost - this.props.numberOfReactions });
        }
    }

    render() {
        return (
            <ModalWithOverlay open={this.props.open}
                onClose={this.props.onClose}
                onShow={this.getUpgradeCost}>
                <View style={styles.contentContainer}>
                    <Image source={images.png.channelPoints.img} />
                    <Text style={styles.title}>
                        {translate('noReactionsModal.title')}
                    </Text>
                    {(this.state.upgradeCost && this.state.levelToUpgrade) ?
                        <Text style={styles.instructions}>
                            <Text style={[styles.instructions, styles.bold]}>
                                {translate('noReactionsModal.noReactionsP1')}
                            </Text>
                            {translate('noReactionsModal.noReactionsP2')}
                        </Text>
                        :
                        <Text style={styles.instructions}>
                            <Text style={[styles.instructions, styles.bold, { color: '#00FFDD' }]}>
                                {translate('noReactionsModal.noEnoughZapsP1', { zaps: this.state.neededZaps })}
                            </Text>
                            {translate('noReactionsModal.noEnoughZapsP2')}
                        </Text>
                    }
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.upgradeButton}
                            onPress={() => (this.state.upgradeCost && this.state.levelToUpgrade) ? this.props.onUpgradeReaction(this.state.levelToUpgrade) : this.props.onGetReward()}>
                            <Text style={styles.upgradeButtonText}>
                            {(this.state.upgradeCost && this.state.levelToUpgrade) ?
                                translate('noReactionsModal.upgradeFor')
                                :
                                translate('noReactionsModal.getReward')
                            }
                            </Text>
                            {(this.state.upgradeCost && this.state.levelToUpgrade) &&
                                <>
                                <Text style={[styles.upgradeButtonText, { color: '#00FFDD' }]}>
                                    {this.state.upgradeCost}
                                </Text>
                                <images.svg.qoin height={16} width={16} />
                                </>
                            }
                        </TouchableOpacity>
                    </View>
                    {(this.state.upgradeCost && this.state.levelToUpgrade) &&
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.secondButton}
                                onPress={this.props.onGetReward}>
                                <Text style={styles.secondButtonText}>
                                    {translate('noReactionsModal.getReward')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </ModalWithOverlay>
        );
    }
}

export default NoReactionsModal;