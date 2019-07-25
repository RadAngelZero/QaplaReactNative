// diego -          24-07-2019 - us31 - updated createMatch and decreaseBet to accept
//                                      bets from 0 qaploins
// diego -          16-07-2019 - us 34 - Substract of qaploins logic implemented
// diego -          15-07-2019 - us 27 - added increment bet option

import React, { Component } from 'react';
import { SafeAreaView, View, Text, BackHandler, TouchableWithoutFeedback } from 'react-native';
import Svg from 'react-native-svg';
import { connect } from 'react-redux';
import styles from './style';
import images from './../../../assets/images';
import { getCurrentQaplaCommission, createPublicMatch, substractQaploinsToUser } from '../../services/database';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';

const QaploinsPrizeIcon = images.svg.qaploinsPrize;
const QaploinIcon = images.svg.qaploinsIcon;
const LessQaploinsIcon = images.svg.lessQaploins;
const MoreQaploinsIcon = images.svg.moreQaploins;

class SetBetScreen extends Component {
    state = {
        commission: 10,
        currentBet: 150,
        open: false,
        loading: false
    };

    async componentWillMount() {
        const com = await getCurrentQaplaCommission()
        this.setState({ commission: com });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);
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
            this.setState({ loading: true });
            try {
                await createPublicMatch(this.props.uid, this.state.currentBet, this.props.selectedGame);
                await substractQaploinsToUser(this.props.uid, this.props.userQaploins, this.state.currentBet);
                this.props.navigation.navigate('Publicas');
            } catch (error) {
                console.log(error);
            }
        } else {
            this.setState({ open: !this.state.open });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <BuyQaploinsModal open={this.state.open} onClose={() => this.setState({ open: false })} />
                <View style={styles.headerOptions}>
                    <Text style={styles.titleText}>¿Cuánto quieres ganar?</Text>
                    <Text style={styles.closeIcon} onPress={this.backToMatchTypeScreen}>X</Text>
                </View>
                <View style={styles.prizeImage}>
                    <Svg>
                        <QaploinsPrizeIcon />
                    </Svg>
                </View>
                <Text style={styles.winBet}>{this.defineWinBet()}</Text>
                <View style={styles.qaploinIconContainer}>
                    <Svg>
                        <QaploinIcon height={24} width={24} />
                    </Svg>
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
