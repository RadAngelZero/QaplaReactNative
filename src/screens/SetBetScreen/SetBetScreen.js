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
    View,
    Text,
    BackHandler,
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
import { ScrollView } from 'react-native-gesture-handler';

const QaploinsPrizeIcon = images.svg.qaploinsPrize;
const QaploinIcon       = images.svg.qaploinsIcon;
const LessQaploinsIcon  = images.svg.lessQaploins;
const MoreQaploinsIcon  = images.svg.moreQaploins;

class SetBetScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            commission: 10,
            currentBet: 150,
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
                    recordScreenOnSegment('Set Bet');
                }
            )
        ]
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    componentWillUnmount() {

        //Remove willFocus listener on navigation
        this.list.forEach((item) => item.remove());
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    /**
     * Description:
     * Retrieves the Qapla comission for transactions and sets it into the state.
     * 
     * Params NONE
     */
    async setQaplaComission() {
        try {
            const com = await getCurrentQaplaCommission(); 

            this.setState({
                commission: com
            });   
        } catch(err) {
            console.log(err);
        }
    }

    backToMatchTypeScreen = () => {
        this.props.navigation.navigate('LoadGames');
        return true;
    }

    defineWinBet() {
        const totalBet = this.state.currentBet*2;
        const qaploinsOfCommission = totalBet * this.state.commission/100;
        return totalBet - qaploinsOfCommission;
    }

    incrementeBet() {
        const oldBet = this.state.currentBet;
        this.setState({ currentBet: oldBet < 300 ? oldBet + 75 : this.state.currentBet });
    }

    decreaseBet() {
        const oldBet = this.state.currentBet;
        this.setState({ currentBet: oldBet > 0 ? oldBet - 75 : this.state.currentBet });
    }

    async createMatch() {
       if (!this.state.loading && this.props.userQaploins >= this.state.currentBet) {
            // this.state.loading is used as a mechanism to prevent users to press the 
            // Android back button and create several matches at the same time
            this.setState({ loading: true });

            try {
                await createPublicMatch(this.props.uid, this.state.currentBet, this.props.selectedGame);
                await substractQaploinsToUser(this.props.uid, this.props.userQaploins, this.state.currentBet);

                trackOnSegment('Match created', {
                    bet: this.state.currentBet,
                    gameKey: this.props.selectedGame.gameKey,
                    platform: this.props.selectedGame.platform
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
                else{
                    this.props.navigation.navigate('Publicas');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            this.setState({ open: !this.state.open });
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
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <BuyQaploinsModal open={this.state.open} onClose={() => this.setState({ open: false })} />
                        <MatchExpireRememberModal
                            visible={this.state.timeActionMsgOpen}
                            onClose={this.closeMatchExpireRememberModal} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>¿Cuánto quieres ganar?</Text>
                        </View>
                        <View style={styles.prizeImage}>
                            <QaploinsPrizeIcon />
                        </View>
                        <Text style={styles.winBet}>{this.defineWinBet()}</Text>
                        <View style={styles.qaploinIconContainer}>
                            <QaploinIcon height={24} width={24} />
                            <Text style={styles.qaploinIconText}>Qaploins</Text>
                        </View>
                        <View style={styles.betContainer}>
                            <TouchableWithoutFeedback onPress={this.decreaseBet.bind(this)}>
                                <LessQaploinsIcon style={styles.changeBetIcon} />
                            </TouchableWithoutFeedback>
                            <View style={styles.betTextContainer}>
                                <Text style={styles.betText}>{this.state.currentBet}</Text>
                                <Text style={styles.betEntrada}>Entrada</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={this.incrementeBet.bind(this)}>
                                <MoreQaploinsIcon style={styles.changeBetIcon} />
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback onPress={this.createMatch.bind(this)}>
                            <View style={styles.createButton}>
                                <Text style={styles.createButtonText}>CREAR AHORA</Text>
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
