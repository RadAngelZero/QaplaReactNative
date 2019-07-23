// diego -      15-07-2019 - us 27 - added increment bet option
// diego -          16-07-2019 - us 34 - Substract of qaploins logic implemented
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
        this.setState({ currentBet: oldBet > 150 ? oldBet - 75 : this.state.currentBet });
    }

    async createMatch() {
        if (!this.state.loading && this.props.userQaploins >= this.state.currentBet) {
            this.setState({ loading: true });
            await createPublicMatch(this.props.uid, this.state.currentBet, this.props.selectedGame).then(async (value) => {
                if (value !== undefined) {
                    console.log('Qaploins before substraction: ', this.props.userQaploins);
                    await substractQaploinsToUser(this.props.uid, this.props.userQaploins, this.state.currentBet)
                    .then(() => {
                        console.log('Qaploins after substraction: ', this.props.userQaploins);
                        this.props.navigation.navigate('MisRetas');
                    }, (rejected) => {
                        console.log('Substraction of qaploins rejected: ', rejected);
                    })
                } else {
                    console.log('Error al crear la reta');
                }
            });
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
