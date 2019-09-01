// diego           - 21-08-2019 - us89 - Add redirect logic to LoadGamesScreen
// diego           - 20-08-2019 - us89 - Show user statistics by game
//                                       Added BuyQaploinsModal
// diego           - 19-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import UserProfilePlatformGameList from '../../components/UserProfilePlatformGameList/UserProfilePlatformGameList';
import { getUserGamesOrderedByPlatform } from '../../utilities/utils';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';
import { isUserLogged } from '../../services/auth';

const QaploinExchangeIcon = images.svg.qaploinsIcon;

export class UserProfileScreen extends Component {
    state = {
        showBuyQaploinsModal: false
    };

    componentWillMount(){
        this.list = [
            
            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {

                    if(!isUserLogged()){
                        this.props.navigation.navigate('SignIn');
                    }
                }
            )
        ]
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    /**
     * Open the modal of buy qaploins
     */
    openBuyQaploinsModal = () => this.setState({ showBuyQaploinsModal: true });

    /**
     * Close the modal of buy qaploins
     */
    closeBuyQaploinsModal = () => this.setState({ showBuyQaploinsModal: false });

    /**
     * Redirect to LoadGames screen
     */
    addGame = () => this.props.navigation.navigate('LoadGames', { loadGamesUserDontHave: true });

    /**
     * Check if the given index is the last from a list of size quantityOfElements
     * 
     * @param {number} currentIndex Index to evaluate
     * @param {number} quantityOfElements Quantity of elements from the list to evaluate
     */
    isLastChild = (currentIndex, objectLength) => (currentIndex === objectLength - 1);

    render() {
        /**
         * userGames must be look like this:
         * userGames: {
         *     pc_white: {
         *         aClash: 'Clash royale'
         *     },
         *     ps4_white: {
         *         psFifa: 'Fifa 19'
         *     }
         * }
         * 
         * Similar to 'Games' node of the database but only with the games of the user
         */
        let userGames = {};
        
        if (this.props.userGames instanceof Array) {
            userGames = getUserGamesOrderedByPlatform(this.props.userGames, this.props.qaplaGames);   
        }

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.userInfoContainer}>
                    <View style={styles.imageAndNameContainer}>
                        {this.props.userProfilePhoto ?
                            <Image style={styles.avatarImage} source={{ uri: this.props.userProfilePhoto }} />
                            :
                            <View style={styles.avatarImage} />
                        }
                        <Text style={styles.userName}>{this.props.userName}</Text>
                    </View>
                    <View style={styles.manageQaploinsContainer}>
                        <View style={styles.qaploinInfoContainer}>
                            <QaploinExchangeIcon style={styles.qaploinImage} />
                            <Text style={styles.qaploinsAmount}>{this.props.userQaploins}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={this.openBuyQaploinsModal}>
                            <View style={styles.addQaploinsButton}>
                                <Text style={styles.addQaploinsButtonText}>Abonar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView>
                    {Object.keys(userGames).map((platform, index) => (
                        <UserProfilePlatformGameList
                            /**
                             * key is builded with the name of the platform and the index of the same platform
                             * e.g. pc_white-1
                             */
                            key={`${platform}-${index}`}
                            platform={platform}
                            userGames={userGames[platform]}
                            lastChild={this.isLastChild(index, Object.keys(userGames).length)} />
                    ))}
                </ScrollView>
                <TouchableWithoutFeedback onPress={this.addGame}>
                    <View style={styles.fab}>
                        <Text style={styles.fabText}>+</Text>
                    </View>
                </TouchableWithoutFeedback>
                <BuyQaploinsModal open={this.state.showBuyQaploinsModal} onClose={this.closeBuyQaploinsModal} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        userProfilePhoto: state.userReducer.user.photoUrl,
        userName: state.userReducer.user.userName,
        userQaploins: state.userReducer.user.credits,
        userGames: state.userReducer.user.gameList,
        qaplaGames: state.gamesReducer.games
    }
}

export default connect(mapStateToProps)(UserProfileScreen);
