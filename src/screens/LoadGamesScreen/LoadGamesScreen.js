// diego          - 03-09-2019 - us96 - Added custom header (TopNavOptions)
// diego          - 02-09-2019 - us91 - Add track and record screen segment statistic
// diego          - 21-08-2019 - us89 - Added loadGamesUserDontHave prop
//                                      GamerTag modal moved to independent file: components/AddGamerTagModal.js
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
import { View, BackHandler, SafeAreaView } from 'react-native'

import styles from './style'
import VideoGamesList from '../../components/VideoGamesList/VideoGamesList';
import { connect } from 'react-redux';
import { setSelectedGame } from '../../actions/gamesActions';
import AddGamerTagModal from '../../components/AddGamerTagModal/AddGamerTagModal';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import TopNavOptions from '../../components/TopNavOptions/TopNavOptions';

class LoadGamesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: ({ props }) => (
            <TopNavOptions
                close
                navigation={navigation}
                back={navigation.getParam('onCloseGoTo', '') !== 'Perfil'}
                onCloseGoTo={navigation.getParam('onCloseGoTo', '')} />)
    });

    constructor(props) {
      super(props);
      this.state = {
          gamerTagText: ""
      };
    }

    componentDidMount() {
        this.list = [
            
            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    if (this.props.navigation.getParam('loadGamesThatUserDontHave', false)) {
                        recordScreenOnSegment('Load Games (Add Game)');
                    } else {
                        recordScreenOnSegment('Load Games (Create Match)');
                    }
                }
            )
        ]
        this.props.navigation.setParams({ onCloseGoTo: this.props.navigation.getParam('onCloseGoTo', 'Home') });
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
        
        // #bug2:
        // At the beginning of the components life, there should not be any game selected,
        // the way we ensure that is by overwriting the value it may have when the component
        // mounted.
        this.props.setSelectedGame(null);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);

        //Remove willFocus listener on navigation
        this.list.forEach((item) => item.remove());
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
    closeAddGamerTagModal = () => {
        trackOnSegment('Add Gamer Tag Process Canceled');
        this.props.setSelectedGame(null);
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
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