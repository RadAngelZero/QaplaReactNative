// diego -      15-07-2019 - us 27 - added increment bet option
import React, { Component } from 'react';
import { SafeAreaView, View, Text, BackHandler, TouchableWithoutFeedback } from 'react-native';
import Svg from 'react-native-svg';
import styles from './style';
import images from './../../../assets/images';
import { getCurrentQaplaCommission } from '../../services/database';

const QaploinsPrizeIcon = images.svg.qaploinsPrize;
const QaploinIcon = images.svg.qaploinsIcon;
const LessQaploinsIcon = images.svg.lessQaploins;
const MoreQaploinsIcon = images.svg.moreQaploins;

class SetBetScreen extends Component {
    state = {
        commission: 10,
        currentBet: 150
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                <TouchableWithoutFeedback>
                    <View style={styles.createButton}>
                        <Text style={styles.createButtonText}>CREAR AHORA</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

export default SetBetScreen;
