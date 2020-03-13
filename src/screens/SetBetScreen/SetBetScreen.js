// diego          - 03-01-2020 - us191 - Adjust of UI based on supernova mockup
// josep.sanahuja - 12-12-2019 - us160 - 'Set Bet' -> 'Select Qaploins Screen' and custom header
// diego          - 04-12-2019 - us161 - Added body property to BuyQaploinsModal
// josep.sanahuja - 14-09-2019 - bug5 - Redirect backButton on Android from MatchExpireRememberModal
// diego          - 06-09-2019 - us93 - Convert modal to remember the time of life of the match on component: MatchExpireRememberModal
// diego          - 03-09-2019 - us96 - Removed X text icon (now this screen have custom header)
// diego          - 02-09-2019 - us91 - Add record screen segment statistic
// josep.sanahuja - 05-08-2019 - us84 - + SafeAreaView
// josep.sanahuja - 01-08-2019 - us57 - + Modal for 10 minutes msg when creating a match
// diego          - 24-07-2019 - us31 - Updated createMatch and decreaseBet to accept
//                                      bets from 0 qaploins
// diego          - 16-07-2019 - us34 - Substract of qaploins logic implemented
// diego          - 15-07-2019 - us27 - added increment bet option

import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from './../../../assets/images';

import {
    retrieveData
} from '@utilities/persistance'

import {
    getCurrentQaplaCommission,
    createPublicMatch,
    substractQaploinsToUser
} from '../../services/database';

import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import MatchExpireRememberModal from '../../components/MatchExpireRememberModal/MatchExpireRememberModal';
import TopNavOptions from '../../components/TopNavOptions/TopNavOptions';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

const QaploinsPrizeIcon = images.svg.qaploinsPrize;
const QaploinIcon = images.svg.qaploinsIcon;
const LessQaploinsIcon = images.svg.lessQaploins;
const MoreQaploinsIcon = images.svg.moreQaploins;

class SetBetScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: ({ props }) => (
            <TopNavOptions
                close
                navigation={navigation}
                back
                closeEvent={this.closeEvent} />)
    });

    constructor(props) {
        super(props);

        this.bets = [0, 15, 25, 50, 75, 150, 225, 300];
        this.state = {
            commission: 10,
            currentBet: this.bets.indexOf(75),
            open: false,
            loading: false,
            timeActionMsgOpen: false
        };
    }

    componentWillMount() {
        this.setQaplaComission();
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('Select Qaploins Screen');
                }
            )
        ]
    }

    componentWillUnmount() {

        //Remove willFocus listener on navigation
        this.list.forEach((item) => item.remove());
    }

    /**
     * Callback triggered in TopNavOptions when 'close' button is pressed.
     * Tracks info from user.
     */
    closeEvent = () => {
        trackOnSegment('Cancel Match Select Qaploins', {
            Bet: this.bets[this.state.currentBet],
            UserQaploins: this.props.userQaploins,
        });
    }

    /**
     * @description Retrieves the Qapla comission for transactions and sets it into the state.
     *
     */
    async setQaplaComission() {
        try {
            const commission = await getCurrentQaplaCommission();

            this.setState({ commission });
        } catch(err) {
            console.log(err);
        }
    }

    defineWinBet() {
        const totalBet = this.bets[this.state.currentBet] * 2;
        const qaploinsOfCommission = totalBet * this.state.commission / 100;

        return totalBet - qaploinsOfCommission;
    }

    incrementeBet() {
        const oldBet = this.state.currentBet;
        this.setState({ currentBet: oldBet < this.bets.length - 1 ? oldBet + 1 : oldBet });
    }

    decreaseBet() {
        const oldBet = this.state.currentBet;
        this.setState({ currentBet: oldBet > 0 ? oldBet - 1 : oldBet });
    }

    createMatch() {
        if (!this.state.loading) {
            this.setState({ loading: true }, async () => {
                if (this.props.userQaploins >= this.bets[this.state.currentBet]) {

                    try {
                        await createPublicMatch(this.props.uid, this.bets[this.state.currentBet], this.props.selectedGame);
                        await substractQaploinsToUser(this.props.uid, this.props.userQaploins, this.bets[this.state.currentBet]);

                        trackOnSegment('Match created', {
                            Bet: this.bets[this.state.currentBet],
                            Game: this.props.selectedGame.gameKey,
                            Platform: this.props.selectedGame.platform
                        });

                        // When retrieving the flag from AsyncStorage if it hasn't been stored yet, it will
                        // return a 'null' value, otherwise it would return a 'false' 'true' value from a
                        // previous flag update.
                        let openMsgFlag = JSON.parse(await retrieveData('create-match-time-action-msg'));

                        // When creating a match 'this.state.timeActionMsgOpen' is expected to be false,
                        // otherwise when loading the Component the Modal would automatically open, which is
                        // a behaviour we don't want.
                        if (openMsgFlag || openMsgFlag === null) {

                            // Tooggle modal state to open
                            this.setState({
                                timeActionMsgOpen: true
                            });
                        }
                        else {
                            this.props.navigation.dismiss();
                        }
                    } catch (error) {
                        // In case of error enable the button again, so the user can try again
                        this.setState({ loading: false });
                        console.log(error);
                    }
                } else {
                    this.setState({ open: !this.state.open, loading: false });
                }
            });
        }
    }

    /**
     * Close the modal and enable the button again
     */
    closeMatchExpireRememberModal = () => {

        this.setState({
            timeActionMsgOpen: false,
            loading: false
        });

        this.props.navigation.dismiss();
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <BuyQaploinsModal
                            open={this.state.open}
                            openWhen='User try to create a match'
                            body={translate('setBetScreen.buyQaploinsModal.body')}
                            onClose={() => this.setState({ open: false, loading: false })} />
                        <MatchExpireRememberModal
                            visible={this.state.timeActionMsgOpen}
                            onClose={this.closeMatchExpireRememberModal} />
                        <Text style={styles.titleText}>{translate('setBetScreen.title')}</Text>
                        <View style={styles.prizeImage}>
                            <QaploinsPrizeIcon
                                width={widthPercentageToPx(30)}
                                height={heightPercentageToPx(30)} />
                        </View>
                        <Text style={styles.winBet}>{this.defineWinBet()}</Text>
                        <View style={styles.qaploinIconContainer}>
                            <QaploinIcon height={24} width={24} />
                            <Text style={styles.qaploinIconText}>Qoins</Text>
                        </View>
                        <View style={styles.betContainer}>
                            <TouchableWithoutFeedback onPress={this.decreaseBet.bind(this)}>
                                <LessQaploinsIcon style={styles.changeBetIcon} />
                            </TouchableWithoutFeedback>
                            <View style={styles.betTextContainer}>
                                <Text style={styles.betText}>{this.bets[this.state.currentBet]}</Text>
                                <Text style={styles.betEntrada}>{translate('setBetScreen.entry')}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={this.incrementeBet.bind(this)}>
                                <MoreQaploinsIcon style={styles.changeBetIcon} />
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={this.createMatch.bind(this)}
                            disabled={this.state.loading}>
                            <View style={styles.createButton}>
                                <Text style={styles.createButtonText}>{translate('setBetScreen.createMatch')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        userQaploins: state.userReducer.user.credits,
        uid: state.userReducer.user.id,
        selectedGame: state.gamesReducer.selectedGame
    };
}

export default SetBetScreen = connect(mapDispatchToProps)(SetBetScreen);
