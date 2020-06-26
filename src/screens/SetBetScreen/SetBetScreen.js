import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';

import styles from './style';
import images from './../../../assets/images';
import { retrieveData } from '@utilities/persistance'
import { getCurrentQaplaCommission, createPublicMatch, substractQaploinsToUser } from '../../services/database';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';
import ZeroQoinsEventsModal from '../../components/ZeroQoinsEventsModal/ZeroQoinsEventsModal';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import MatchExpireRememberModal from '../../components/MatchExpireRememberModal/MatchExpireRememberModal';
import TopNavOptions from '../../components/TopNavOptions/TopNavOptions';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx, heightPercentageToPx, isIOSDevice } from '../../utilities/iosAndroidDim';
import { getPlatformNameWithKey } from '../../utilities/utils';
import { dplCreateLinkMatchCard } from '../../services/links';
import { discordPublishMessageToChannel } from '../../services/discord';
import QaplaText from '../../components/QaplaText/QaplaText';

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
        /**
         * if the previous index of the array is not the last index then set the current index to
         * the last index + 1, otherwise keep the previous index
         */
        this.setState({ currentBet: oldBet < this.bets.length - 1 ? oldBet + 1 : oldBet });
    }

    decreaseBet() {
        const oldBet = this.state.currentBet;
        /**
         * if the previous index of the array is not the first index then set the current index to
         * the last index - 1, otherwise keep the previous index
         */
        this.setState({ currentBet: oldBet > 0 ? oldBet - 1 : oldBet });
    }

    /**
     * Creates a deep link for a MatchCard and publishes it to Discord
     * @param {object} ctx Context object containing required data to publish to Discord
     */
    async shareMatchToDiscord(ctx) {
        // TODO: try with a promise returned to make it faster
        const url = await dplCreateLinkMatchCard(ctx.matchId, ctx);

        ctx.url = url;
        ctx.userDiscordTag = this.props.userDiscordTag;
        discordPublishMessageToChannel(ctx);
    }

    createMatch() {
        if (!this.state.loading) {
            this.setState({ loading: true }, async () => {
                if (this.props.userQaploins >= this.bets[this.state.currentBet]) {

                    try {
                        const matchId = await createPublicMatch(this.props.uid, this.bets[this.state.currentBet], this.props.selectedGame);
                        await substractQaploinsToUser(this.props.uid, this.props.userQaploins, this.bets[this.state.currentBet]);

                        trackOnSegment('Match created', {
                            Bet: this.bets[this.state.currentBet],
                            Game: this.props.selectedGame.gameKey,
                            Platform: this.props.selectedGame.platform,
                            MatchId: matchId,
                            Uid: this.props.uid
                        });

                        // TODO: move that into an asyn cfunction to be much quicker when the user
                        // presses the crear reta button 
                        // publish match created on link on Discord channel
                        const game = this.props.selectedGame;

                        this.shareMatchToDiscord({
                            winBet: this.defineWinBet(),
                            bet: this.bets[this.state.currentBet],
                            game: game.name,
                            platform: getPlatformNameWithKey(game.platform),
                            creatorUid: this.props.uid,
                            matchId,
                            discordImg: game.discordImg,
                            discordTag: this.props.userDiscordTag
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
                        {isIOSDevice() ?
                            <ZeroQoinsEventsModal
                                open={this.state.open}
                                bet={this.bets[this.state.currentBet]}
                                openWhen='User try to create a match'
                                onClose={() => this.setState({ open: false, loading: false })}
                            />
                            :
                            <BuyQaploinsModal
                                open={this.state.open}
                                openWhen='User try to create a match'
                                body={translate('setBetScreen.buyQaploinsModal.body')}
                                onClose={() => this.setState({ open: false, loading: false })} />
                        }
                        <MatchExpireRememberModal
                            visible={this.state.timeActionMsgOpen}
                            onClose={this.closeMatchExpireRememberModal} />
                        <QaplaText style={styles.titleText}>{translate('setBetScreen.title')}</QaplaText>
                        <View style={styles.prizeImage}>
                            <QaploinsPrizeIcon
                                width={widthPercentageToPx(30)}
                                height={heightPercentageToPx(30)} />
                        </View>
                        <QaplaText style={styles.winBet}>{this.defineWinBet()}</QaplaText>
                        <View style={styles.qaploinIconContainer}>
                            <QaploinIcon height={24} width={24} />
                            <QaplaText style={styles.qaploinIconText}>Qoins</QaplaText>
                        </View>
                        <View style={styles.betContainer}>
                            <TouchableWithoutFeedback onPress={this.decreaseBet.bind(this)}>
                                <LessQaploinsIcon style={styles.changeBetIcon} />
                            </TouchableWithoutFeedback>
                            <View style={styles.betTextContainer}>
                                <QaplaText style={styles.betText}>{this.bets[this.state.currentBet]}</QaplaText>
                                <QaplaText style={styles.betEntrada}>{translate('setBetScreen.entry')}</QaplaText>
                            </View>
                            <TouchableWithoutFeedback onPress={this.incrementeBet.bind(this)}>
                                <MoreQaploinsIcon style={styles.changeBetIcon} />
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={this.createMatch.bind(this)}
                            disabled={this.state.loading}>
                            <View style={styles.createButton}>
                                <QaplaText style={styles.createButtonText}>{translate('setBetScreen.createMatch')}</QaplaText>
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
        selectedGame: state.gamesReducer.selectedGame,
        userDiscordTag: state.userReducer.user.discordTag
    };
}

export default SetBetScreen = connect(mapDispatchToProps)(SetBetScreen);
