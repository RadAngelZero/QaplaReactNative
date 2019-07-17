// josep.sanahuja - 15-07-2019 - us26 - + CancelIcon
// josep.sanahuja - 15-07-2019 - us25 - + addGameProfile Modal logic
// diego          - 16-07-2019 - us30 - update navigation when GamerTag is added
// diego          - 17-07-2019 - us30 - Modal and SafeAreaView added, also unnecesary
// redux code was removed

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
    addGameToUser,
    getGamerTagWithUID
} from '../../services/database';
import Modal from '../../components/Modal/Modal';

const BackIcon = Images.svg.backIcon;

class LoadGamesScreen extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {
          gamerTagText: "",
          hasGamerTag: false
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

    // TODO: Figure out a way to have a Modal1Text2Button component that does not
    // have conflict with redux state and prop dispatch. At the moment we leave it this 
    // way for simplicity. Come up with such solutio seems a bit trickier if we want it
    // to be simple and maimtainable.
    setModalVisible(visible) {
        console.log("[LoadGamesScreen] : setModalVisible - visible: " + visible);
        this.props.showModalAddGameProfile(visible);
    }

    addSelectedGameToProfile = async (game, gamerTag) => {
        // Add Game to profile. TODO: Check what returns in the new version of the function
        // that Diego added but didn't merge yet to the release
        console.log("Marramiau User : " + JSON.stringify(this.props.user.id) + " game: " + JSON.stringify(game) + " gamerTag: " + gamerTag);
        
        await addGameToUser(this.props.user.id, game.platform,
                            game.gameKey, gamerTag);
    }

    hasGamesOnProfile(){
        return this.props.userGameList === undefined ? false : true;                 
    }

    gameHasGamerTag() {
        return this.state.hasGamerTag;
    }

    isValidGamerTag(gamerTag) {
        return gamerTag != undefined &&
               gamerTag != null &&
               gamerTag.length > 0;
    }

    isThereSelectedGame() {
        return this.props.selectedGame != null && this.props.selectedGame != undefined;
    }

    onShowAddGameToProfile = async () => {
        // Retrieve the gamertag from the game, if there is no gamertag then
        // no gamertag found.
        //
        // NOTE (15-07-2019): It could be retrieved by storing it in redux from GameCard.js
        const gtag = await getGamerTagWithUID(this.props.user, this.props.selectedGame.gameKey,
                                              this.props.selectedGame.platform);
        
        if (gtag.gamerTag != undefined && gtag.gamerTag != null){
            this.setState({
                gamerTagText: gtag.gamerTag,
                hasGamerTag: true
            });
        }    
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
                    <Modal open={this.isThereSelectedGame()} onClose={() => this.props.setSelectedGame(null)}>
                            <View style={styles.modalContainer}>
                                <TextInput
                                    style={styles.gamerTagTextInput}
                                    placeholder="Escribe tu Gamer Tag"
                                    placeholderTextColor = 'white'
                                    onChangeText={(text) => {
                                        console.log("gamerTagText: " + text); 
                                        this.setState({
                                            gamerTagText: text 
                                        }); 
                                    }}
                                    value={this.state.gamerTagText} />
                                <Text style = {styles.modalText}>Se va a añadir el Juego {this.isThereSelectedGame() && this.props.selectedGame.name } a tu perfil con Gamertag {this.state.gamerTagText}. Estás seguro?</Text>
                                <TouchableWithoutFeedback
                                    disabled = {!this.isValidGamerTag(this.state.gamerTagText)}
                                    onPress={async () => {
                                        // Check if the user has no games in the profile
                                        // and if 0, then add the one selected.
                                        if (!this.hasGamesOnProfile()) {
                                            await this.addSelectedGameToProfile(this.props.selectedGame,
                                                                                this.state.gamerTagText);

                                            console.log("User: " + JSON.stringify(this.props.user));
                                            
                                            // Navigate to the screen where Qaploins are selected
                                            navigate('SetBet', {game: {gameKey: this.props.selectedGame.gameKey, platform: this.props.selectedGame.platform}});
                                            console.log("[render]: - hasNoGameOnProfile");
                                        }
                                        else{
                                            console.log("[render]: - hasGameOnProfile");
                                        }

                                        this.props.setSelectedGame(null)
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
        smagp: state.gamesReducer.smagp,
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