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
    TouchableWithoutFeedback,
    Switch
} from 'react-native';

import styles from './style';

import Modal from '../../components/Modal/Modal'; 
import { connect } from 'react-redux';
import Svg from 'react-native-svg';
import images from './../../../assets/images';

import {
    storeData,
    retrieveData
} from '@utilities/persistance'

import {
    getCurrentQaplaCommission,
    createPublicMatch,
    substractQaploinsToUser
} from '../../services/database';

import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';

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
            timeActionMsgOpen: false,
            swtichTA: false
        };
    }

    componentWillMount() {
        this.setQaplaComission();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    componentWillUnmount() {
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
                    })
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
     * Description:
     * Toogles switchTA value
     */
    toggleSwitchTA() {
        this.setState({
            switchTA: !this.state.switchTA
        });
    }

    /**
     * Description:
     * It checks if the modal will be shown in future occasions and store the configuration so 
     * that it remains in the future. It redirects to 'Public Matches Feed' screen.
     *
     */
    confirmModal() {
        // If switch is activated then that means that this screen should
        // not show up again when creating a Match. This is why we set flag value
        // to false, indicating that the modal should not open again.
        if (this.state.switchTA) {
            storeData('create-match-time-action-msg', JSON.stringify(false));
        }

        this.props.navigation.navigate('Publicas')
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <BuyQaploinsModal open={this.state.open} onClose={() => this.setState({ open: false })} />
                    <Modal open={this.state.timeActionMsgOpen} onClose={() => {
                        this.setState({
                            timeActionMsgOpen: false,
                            loading: false
                        })}}>
                        <View style={styles.containerMsgModal}>
                            <Text style={styles.headerText}>Recuerda</Text>
                            <Text style={styles.paragraph}>
                                La Reta expirará después de 10 minutos si no recibe y se acepta un desafio de otro jugador.                  
                            </Text>
                            <Text style={[styles.smallText, styles.marginSmallText]}>No volver a mostrar este mensaje</Text>
                            <Switch
                                style = {styles.switch}
                                trackColor={{true: '#36E5CE', false: 'grey'}}
                                onValueChange = {this.toggleSwitchTA.bind(this)}
                                value = {this.state.switchTA} /> 
                            <TouchableWithoutFeedback onPress={this.confirmModal.bind(this)}>
                                <View style={styles.okButton}>
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>
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
                </View>
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
