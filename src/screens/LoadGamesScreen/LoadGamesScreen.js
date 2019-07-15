// josep.sanahuja - 15-07-2019 - us25 - + addGameProfile Modal logic

import React from 'react';

import { 
    View,
    Text, 
    TouchableWithoutFeedback, 
    TouchableHighlight, 
    BackHandler, 
    Modal, 
    SafeAreaView,
    TextInput
} from 'react-native'

import { Svg } from 'react-native-svg';
import styles from './style'
import images from './../../../assets/images';
import VideoGamesList from '../../components/VideoGamesList/VideoGamesList';
import { connect } from 'react-redux';

import {
    showModalAddGameProfile,
} from '../../actions/gamesActions';

import {
    getUserNode
} from '../../actions/userActions';

import {
    addGameToUser,
    getGamerTagWithUID
} from '../../services/database';

const BackIcon = images.svg.backIcon;

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
            <View style={styles.container}>
                <View style={styles.headerOptions}>
                    <TouchableWithoutFeedback onPress={this.backToMatchTypeScreen}>
                        <View style={styles.backIcon}>
                            <Svg>
                                <BackIcon />
                            </Svg>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.closeIcon} onPress={this.backToMatchTypeScreen}>X</Text>
                </View>
                <Modal
                    animationType = "fade"
                    transparent = {true}
                    visible = {this.props.smagp}
                    onRequestClose = {() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <SafeAreaView style={styles.safeAreaViewContainer}>
                        <View style={styles.modalContainer}>
                            {
                                !this.gameHasGamerTag()
                                ?
                                (
                                    <TextInput
                                      style={styles.gamerTagTextInput}
                                      placeholder="Escribe tu Gamer Tag"
                                      placeholderTextColor = 'white'
                                      onShow={this.onShowAddGameToProfile.bind(this)}
                                      onChangeText={(text) => {
                                          console.log("gamerTagText: " + text); 
                                          this.setState({
                                              gamerTagText: text 
                                          });
                                      }}
                                      value={this.state.gamerTagText}
                                    />
                                )
                                :
                                null
                            }
                            <Text style = {styles.modalText}>Se va a añadir el Juego {this.isThereSelectedGame() ? this.props.selectedGame.name : null} a tu perfil con Gamertag {this.state.gamerTagText}. Estás seguro?</Text>
                            <TouchableHighlight
                                style = {styles.confirmButton}
                                disabled = {!this.isValidGamerTag(this.state.gamerTagText)}
                                onPress={async () => {
                                    // Check if the user has no games in the profile
                                    // and if 0, then add the one selected.
                                    if (!this.hasGamesOnProfile()) {
                                        await this.addSelectedGameToProfile(this.props.selectedGame,
                                                                            this.state.gamerTagText);

                                        console.log("User: " + JSON.stringify(this.props.user));
                                        // Refresh game list from user // TODO: Check if necessary
                                        this.props.loadUserData(this.props.user.id);
                                        
                                        // Navigate to the screen where Qaploins are selected
                                        navigate('SetBet', {game: this.props.selectedGame});
                                        console.log("[render]: - hasNoGameOnProfile");
                                    }
                                    else{
                                        console.log("[render]: - hasGameOnProfile");
                                    }

                                    this.setModalVisible(!this.props.smagp);
                                }}
                                background='white'>

                                <Text style={styles.confirmButtonText}>Aceptar</Text>
                            </TouchableHighlight>
                        </View>
                  </SafeAreaView>
                </Modal>
                <VideoGamesList gamesListToLoad={this.props.userGameList} />
            </View>
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
        showModalAddGameProfile: (showMode) => showModalAddGameProfile(showMode)(dispatch),
        loadUserData: (uid) => getUserNode(uid)(dispatch)
    };
}

export default LoadGamesScreen = connect(mapStateToProps, mapDispatchToProps)(LoadGamesScreen);