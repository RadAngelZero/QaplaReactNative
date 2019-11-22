// diego           - 15-11-2019 - us149 - Check if user data is loaded on mapStateToProps
// diego           - 03-09-2019 - us96 - Send flag onCloseGoTo when add game, so the header knows
//                                       where go if the user closes the procces
// diego           - 02-09-2019 - us91 - Add record screen segment statistic
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
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';
import ImagePickerModal from '../../components/ImagePicker/ImagePickerModal/ImagePickerModal';

import { getUserGamesOrderedByPlatform } from '../../utilities/utils';
import { recordScreenOnSegment } from '../../services/statistics';
import { isUserLogged } from '../../services/auth';
import { saveUserProfileImg, getUserProfileImgUrl } from '../../services/storage';
import { updateUserProfileImg } from '../../services/database';

const QaploinExchangeIcon = images.svg.qaploinsIcon;

export class UserProfileScreen extends Component {
    state = {
        showBuyQaploinsModal: false,
        showImgPckModal: false,
        picture: ''
    };

    componentWillMount() {
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('User Profile');
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
    addGame = () => this.props.navigation.navigate('LoadGames', { loadGamesUserDontHave: true, onCloseGoTo: 'Perfil' });

    /**
     * Check if the given index is the last from a list of size quantityOfElements
     *
     * @param {number} currentIndex Index to evaluate
     * @param {number} quantityOfElements Quantity of elements from the list to evaluate
     */
    isLastChild = (currentIndex, objectLength) => (currentIndex === objectLength - 1);

    /**
     * Sends the selected picture by ImagePickerModal and sends it to 
     * Firebase Storage.
     * 
     * @params {Object} picture Picture selected in ImagePickerModal
     */
    saveImage = async (picture) => {
        this.setState({
            picture: picture
        });

        let task = saveUserProfileImg(this.props.uid, picture.node.image.uri);
        
        // In case the picture is successfully stored in Firebase Datastorage,
        // then an evidence of that picture will be saved in Firebase DB for
        // verification purposes.
        if (task !== null) {
            task.then(async () => {
                try {
                    const imgUrl = await getUserProfileImgUrl(this.props.uid);
                    
                    if (imgUrl !== null && imgUrl !== undefined){
                        updateUserProfileImg(this.props.uid, imgUrl);
                    }
                }
                catch(error) {

                }
            })
            
        }
    }

    /**
     * Closes ImagePickerModal
     */
    closeImgPckModal = () => {
        this.setState({
            showImgPckModal: false  
        });
    }

    /**
     * Opens ImagePickerModal
     */
    openImgPckModal = () => {
        this.setState({
            showImgPckModal: true  
        });
    }

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
                    <TouchableWithoutFeedback onPress={this.openImgPckModal}>
                    <View style={styles.imageAndNameContainer}>
                        {this.props.userProfilePhoto ?
                            <Image style={styles.avatarImagee} source={{ uri: this.props.userProfilePhoto }} />
                            :
                            <View style={styles.avatarImage} />
                        }
                        <Text style={styles.userName}>{this.props.userName}</Text>
                    </View>
                    </TouchableWithoutFeedback>
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
                         <Image source={images.png.addButton.img} />
                    </View>
                </TouchableWithoutFeedback>
                <BuyQaploinsModal 
                    open={this.state.showBuyQaploinsModal}
                    onClose={this.closeBuyQaploinsModal} />
                <ImagePickerModal
                      visible={this.state.showImgPckModal}
                      saveImage={this.saveImage}
                      onClose={this.closeImgPckModal} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    /**
     * Check if user object (in redux) contains data (when a user is not logged
     * or a user make signout their redux object is empty)
     */
    if (Object.keys(state.userReducer.user).length > 0) {
        return {
            userProfilePhoto: state.userReducer.user.photoUrl,
            userName: state.userReducer.user.userName,
            uid: state.userReducer.user.id,
            userQaploins: state.userReducer.user.credits,
            userGames: state.userReducer.user.gameList,
            qaplaGames: state.gamesReducer.games
        }
    }

    /**
     * If the user is not logged, then the user will be rejected from this
     * screen, it doesn't matter this return, is just added because
     * the screen is showed (some miliseconds) and we must return an object
     * from this functions (redux requirements)
     */
    return {
        user: state.userReducer.user
    };
}

export default connect(mapStateToProps)(UserProfileScreen);
