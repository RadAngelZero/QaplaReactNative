// josep.sanahuja - 15-07-2019 - us26 - + CancelIcon
// josep.sanahuja - 15-07-2019 - us25 - + addGameProfile Modal logic
// diego          - 16-07-2019 - us30 - update navigation when GamerTag is added
// diego          - 17-07-2019 - us30 - Modal and SafeAreaView added, also unnecesary
// redux code was removed
// diego          - 22-07-2019 - bug3 - open modal logic modified and unnecesary code
// removed

import React from 'react';

import { 
    View,
    Text, 
    TouchableWithoutFeedback, 
    BackHandler, 
    TextInput,
    SafeAreaView
} from 'react-native'

import styles from './style'
import Images from './../../../assets/images';
import VideoGamesList from '../../components/VideoGamesList/VideoGamesList';
import { connect } from 'react-redux';

import {
    setSelectedGame,
} from '../../actions/gamesActions';

import {
    addGameToUser
} from '../../services/database';
import Modal from '../../components/Modal/Modal';

const BackIcon = Images.svg.backIcon;

class LoadGamesScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          gamerTagText: ""
      };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    backToMatchTypeScreen = () => {
        this.props.navigation.navigate('ChooseMatchType');
        return true;
    }

    addSelectedGameToProfile = async (game, gamerTag) => {
        await addGameToUser(this.props.user.id, game.platform,
                            game.gameKey, gamerTag);
    }

    hasGamesOnProfile(){
        return this.props.userGameList === undefined ? false : true;                 
    }

    isValidGamerTag(gamerTag) {
        return gamerTag != undefined &&
               gamerTag != null &&
               gamerTag.length > 0;
    }

    isThereSelectedGame() {
        return this.props.selectedGame != null && this.props.selectedGame != undefined;
    }

    openModal() {
        //If the user has already selected a game
        if (this.isThereSelectedGame()) {
            //Check if the user have 1 or more games
            if (this.hasGamesOnProfile()) {
                const { gameKey, platform } = this.props.selectedGame;
                //Check if the user have the selected game on their gamerTags node
                //If the user have the game then return false (don't show the modal)
                //If the user don't have the game then return true (show the modal)
                switch (platform) {
                    case 'pc_white':
                        if (gameKey === 'aClash') {
                            return !this.props.user.gamerTags.hasOwnProperty('clashTag');
                        } else if (gameKey === 'pcLol') {
                            return !this.props.user.gamerTags.hasOwnProperty('lolTag');
                        } else if (gameKey === 'pHearth' || game === 'pOver') {
                            return !this.props.user.gamerTags.hasOwnProperty('battlenet');
                        }
                        break;
                    case 'ps4_white':
                        return !this.props.user.gamerTags.hasOwnProperty('psn');
                    case 'xbox_white':
                        return !this.props.user.gamerTags.hasOwnProperty('xboxLive');
                    case 'switch_white':
                        return !this.props.user.gamerTags.hasOwnProperty('NintendoID');
                    default:
                        break;
                }
            } else {
                //If the user don't have games then open the modal
                return true;
            }
        }
        return false;
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <SafeAreaView style={styles.safeAreaViewContainer}>
                <View style={styles.container}>
                    <View style={styles.headerOptions}>
                        <TouchableWithoutFeedback onPress={this.backToMatchTypeScreen}>
                            <View style={styles.backIcon}>
                                <BackIcon />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.closeIcon} onPress={this.backToMatchTypeScreen}>X</Text>
                    </View>
                    <Modal open={this.openModal()} onClose={() => this.props.setSelectedGame(null)}>
                            <View style={styles.modalContainer}>
                                <TextInput
                                    style={styles.gamerTagTextInput}
                                    placeholder="Escribe tu Gamer Tag"
                                    placeholderTextColor = 'white'
                                    onChangeText={(text) => {
                                        this.setState({
                                            gamerTagText: text 
                                        }); 
                                    }}
                                    value={this.state.gamerTagText} />
                                <Text style = {styles.modalText}>Se va a añadir el Juego {this.isThereSelectedGame() && this.props.selectedGame.name } a tu perfil con Gamertag {this.state.gamerTagText}. Estás seguro?</Text>
                                <TouchableWithoutFeedback
                                    disabled = {!this.isValidGamerTag(this.state.gamerTagText)}
                                    onPress={async () => {
                                        await this.addSelectedGameToProfile(this.props.selectedGame,
                                                                            this.state.gamerTagText);
                                        // Navigate to the screen where Qaploins are selected
                                        navigate('SetBet', {game: {gameKey: this.props.selectedGame.gameKey, platform: this.props.selectedGame.platform}});
                                        this.props.setSelectedGame(null);
                                    }}>
                                        <View style = {styles.confirmButton}>
                                            <Text style={styles.confirmButtonText}>Aceptar</Text>
                                        </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </Modal>
                    <VideoGamesList gamesListToLoad={this.props.userGameList} />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        userGameList: state.userReducer.user.gameList,
        selectedGame: state.gamesReducer.selectedGame,
        user: state.userReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedGame: (game) => setSelectedGame(game)(dispatch)
    };
}

export default LoadGamesScreen = connect(mapStateToProps, mapDispatchToProps)(LoadGamesScreen);