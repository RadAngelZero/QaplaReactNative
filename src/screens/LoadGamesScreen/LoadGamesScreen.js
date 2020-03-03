// josep.sanahuja - 09-01-2020 - NA    - componentDidMount check this.props.userGameList is valid
// diego          - 30-12-2019 - us189 - Removed unnecesary BackHandler (removed code do the same that the default behavior)
//                                       SafeAreaView handled with react navigation SafeAreaView, to avoid bottom margin
// josep.sanahuja - 12-12-2019 - us160 - 'Load Games (Create Match)' -> Add Games Screen First Match
//                                       'Load Games (Add Game)'' -> 'Add Games Screen'
// diego          - 12-12-2019 - us169 - Redirect prop added on AddGamerTagModal
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
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation';

import styles from './style'
import VideoGamesList from '../../components/VideoGamesList/VideoGamesList';
import { connect } from 'react-redux';
import { setSelectedGame } from '../../actions/gamesActions';
import AddGamerTagModal from '../../components/AddGamerTagModal/AddGamerTagModal';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';

class LoadGamesScreen extends React.Component {
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
                    if (this.props.navigation.getParam('loadGamesUserDontHave', false)) {
                        recordScreenOnSegment('Clicked Add Games from profile');
                    } else {
                        recordScreenOnSegment('Add Games Screen');
                    }

                    if (this.props.userGameList && this.props.userGameList.length === 0) {
                    	recordScreenOnSegment('Add Games Screen First Match');
                    }
                }
            )
        ]

        // #bug2:
        // At the beginning of the components life, there should not be any game selected,
        // the way we ensure that is by overwriting the value it may have when the component
        // mounted.
        this.props.setSelectedGame(null);
    }

    componentWillUnmount() {
        //Remove willFocus listener on navigation
        this.list.forEach((item) => item.remove());
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
            <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.sfvContainer}>
                <View style={styles.container}>
                    <AddGamerTagModal
                        redirect
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
