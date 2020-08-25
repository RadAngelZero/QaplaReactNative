import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import Images from '../../../assets/images';
import { SHEET_MAX_HEIGHT, SHEET_MIDDLE_HEIGHT, SHEET_MIN_HEIGHT } from '../../utilities/Constants';

class RewardsBottomSheet extends Component {
    fall = new Animated.Value(1);

    renderContent = () => (
        <View style={styles.container}>
            <View style={styles.topBar}/>
            <View style={styles.rewardsInfoContainer}>
                <View style={styles.row}>
                    <Images.svg.rewardIcon />
                    <View style={styles.rewardsProgressContainer}>
                        <View style={styles.rewardsHeaderContainer}>
                            <View style={styles.row}>
                                <QaplaText style={styles.rewardsTitle}>
                                    Rewards
                                </QaplaText>
                                <Images.svg.infoIcon style={styles.infoIcon} />
                            </View>
                            <Images.svg.lifeIcon height={24} width={24} color='rgba(150, 150, 150, .5)' />
                        </View>
                        <View style={styles.progress}>
                            <View style={{ borderRadius: 20, width: 200, backgroundColor: '#0000FF', height: 10 }} />
                            <View style={styles.lifesContainer}>
                                <Images.svg.lifeIcon color='#FFD632' />
                                <Images.svg.lifeIcon color='#FFD632' />
                                <Images.svg.halfLifeIcon />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.transactionsContainer}>
                    <QaplaText style={styles.transactionsTitle}>
                        Transactions
                    </QaplaText>
                    <View style={styles.transactionsSummary}>
                        <View style={styles.transactionsSummaryDescriptions}>
                            <QaplaText style={styles.transactionDescription}>
                                Donation
                            </QaplaText>
                            <QaplaText style={styles.transactionDescription}>
                                Donation
                            </QaplaText>
                            <QaplaText style={styles.transactionDescription}>
                                Reward reedemed
                            </QaplaText>
                        </View>
                        <View style={styles.transactionSummaryValue}>
                            <QaplaText style={styles.transactionValue}>
                                100
                            </QaplaText>
                            <QaplaText style={styles.transactionValue}>
                                100
                            </QaplaText>
                            <QaplaText style={styles.transactionValue}>
                                2.5
                            </QaplaText>
                        </View>
                        <View style={styles.transactionSummaryValue}>
                            <Images.svg.donatedBitIcon
                                color='#FFF'
                                style={styles.transactionIcon} />
                            <Images.svg.donatedStarIcon
                                color='#FFF'
                                style={styles.transactionIcon} />
                            <Images.svg.lifeIcon
                                color='#FFF'
                                style={styles.transactionIcon}
                                height={14}
                                width={14} />
                        </View>
                    </View>
                    <QaplaText style={[styles.transactionDescription, { marginLeft: 20 }]}>
                        Fortnite BR Challenge
                    </QaplaText>
                </View>
            </View>
            <TouchableOpacity style={styles.redeemButtonContainer}>
                <QaplaText style={styles.redeemButtonText}>
                    Redeem Prize
                </QaplaText>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <>
                <Animated.View style={{ flex: 1, opacity: Animated.add(0.1, Animated.multiply(this.fall, 1)) }}>
                    {this.props.children}
                </Animated.View>
                <BottomSheet
                    ref={(ref) => this.sheetRef = ref}
                    snapPoints={[SHEET_MIN_HEIGHT, SHEET_MIDDLE_HEIGHT, SHEET_MAX_HEIGHT]}
                    borderRadius={20}
                    callbackNode={this.fall}
                    renderContent={this.renderContent} />
            </>
        );
    }
}

export default RewardsBottomSheet;
