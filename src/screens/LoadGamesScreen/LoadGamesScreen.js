// diego          - 21-08-2019 - us89 - Added loadGamesUserDontHave prop
//                                      GamerTag modal moved to independent file
// josep.sanahuja - 05-08-2019 - us84 - changed style from SafeAreaView
// josep.sanahuja - 22-07-2019 - bug2 - moved 'setSelectedGame' to 'componentDidMount'
//                                      && simplified 'openModal'
// diego          - 17-07-2019 - us30 - Modal and SafeAreaView added, also unnecesary
//                                      redux code was removed
// diego          - 22-07-2019 - bug3 - open modal logic modified and unnecesary code
//                                      removed
// diego          - 16-07-2019 - us30 - update navigation when GamerTag is added
// josep.sanahuja - 15-07-2019 - us26 - + CancelIcon
// josep.sanahuja - 15-07-2019 - us25 - + addGameProfile Modal logic

import React from 'react';

import { View, Text, TouchableWithoutFeedback, BackHandler, SafeAreaView } from 'react-native'

import styles from './style'
import Images from './../../../assets/images';
import VideoGamesList from '../../components/VideoGamesList/VideoGamesList';
import { connect } from 'react-redux';

import { setSelectedGame } from '../../actions/gamesActions';

import AddGamerTagModal from '../../components/AddGamerTagModal/AddGamerTagModal';

const BackIcon = Images.svg.backIcon;

class LoadGamesScreen extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
        
        // #bug2:
        // At the beginning of the components life, there should not be any game selected,
        // the way we ensure that is by overwriting the value it may have when the component
        // mounted.
        this.props.setSelectedGame(null);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    backToMatchTypeScreen = () => {
        this.props.navigation.navigate('ChooseMatchType');
        return true;
    }

    /**
     * Return true if some game is selected
     */
    isThereSelectedGame() {
        return this.props.selectedGame;
    }

    /**
     * Determine if the user have the selected game on their list
     */
    userHaveGame() {
        let result = true;
        if (this.isThereSelectedGame()) {

            result = this.props.userGameList instanceof Array ? this.props.userGameList.indexOf(this.props.selectedGame.gameKey) !== -1 : false;
        }

        return result;
    }

    /** 
     * If there are no games on the profile of the user and a game is selected
     * the modal should open
     */
    openAddGamerTagModal = () => !this.userHaveGame();

    /**
     * Close the modal by setting to null the selectedGame on redux
     */
    closeAddGamerTagModal = () => this.props.setSelectedGame(null);

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View style={styles.headerOptions}>
                        <TouchableWithoutFeedback onPress={this.backToMatchTypeScreen}>
                            <View style={styles.backIcon}>
                                <BackIcon />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.closeIcon} onPress={this.backToMatchTypeScreen}>X</Text>
                    </View>
                    <AddGamerTagModal
                        selectedGame={this.props.selectedGame}
                        uid={this.props.uid}
                        userName={this.props.userName}
                        open={this.openAddGamerTagModal()}
                        onClose={this.closeAddGamerTagModal}
                        loadGamesUserDontHave={this.props.navigation.getParam('loadGamesUserDontHave', false)} />
                    <VideoGamesList
                        gamesListToLoad={this.props.userGameList}
                        loadGamesUserDontHave={this.props.navigation.getParam('loadGamesUserDontHave', false)} />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        userGameList: state.userReducer.user.gameList,
        selectedGame: state.gamesReducer.selectedGame,
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedGame: (game) => setSelectedGame(game)(dispatch)
    };
}

export default LoadGamesScreen = connect(mapStateToProps, mapDispatchToProps)(LoadGamesScreen);