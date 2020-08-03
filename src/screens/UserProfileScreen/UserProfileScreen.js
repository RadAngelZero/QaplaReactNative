import React, { Component } from 'react';
import { Linking, SafeAreaView, View, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';

import UserProfilePlatformGameList from '../../components/UserProfilePlatformGameList/UserProfilePlatformGameList';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';
import EditProfileImgBadge from '../../components/EditProfileImgBadge/EditProfileImgBadge';

import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { isUserLogged } from '../../services/auth';

import { getUserGamesOrderedByPlatform } from '../../utilities/utils';
import { translate } from '../../utilities/i18';
import { heightPercentageToPx, widthPercentageToPx, isIOSDevice } from '../../utilities/iosAndroidDim';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getDonationFormUrl } from '../../services/database';

const QaploinExchangeIcon = images.svg.qoinFlipIcon;
const BalanceExchangeIcon = images.svg.balanceFlipIcon;

export class UserProfileScreen extends Component {
    state = {
        showBuyQaploinsModal: false,
        showQaploinsToUser: true
    };

    componentWillMount() {
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('User Profile Screen');
                    if(!isUserLogged()){
                        this.props.navigation.navigate('Auth');
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
    openBuyQaploinsModal = () => {
        if (isUserLogged()) {
            trackOnSegment('User Profile Add Qaploins Button', { UserQaploins: this.props.userQaploins });
            this.setState({ showBuyQaploinsModal: true });
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

    /**
     * Begins the process of redeem qaploins
     */
    exchangeQaploins = async () => {
        const exchangeUrl = await getDonationFormUrl();
        if (exchangeUrl) {
            this.props.navigation.navigate('ExchangeQoinsScreen', { exchangeUrl });
        }
    }

    /**
     * Close the modal of buy qaploins
     */
    closeBuyQaploinsModal = () => this.setState({ showBuyQaploinsModal: false });

    /**
     * Redirect to LoadGames screen
     */
    addGame = () => {
        if (isUserLogged()) {
            this.props.navigation.navigate('AddGame', { loadGamesUserDontHave: true, onCloseGoTo: 'Perfil' });
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

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
            userGames = getUserGamesOrderedByPlatform(this.props.userGames, this.props.qaplaGames, true);
        }

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.userInfoContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <View>
                            {this.props.userProfilePhoto ?
                                <Image style={styles.avatarImage} source={{ uri: this.props.userProfilePhoto }} />
                                :
                                <View style={styles.avatarImage} />
                            }
                            <View style={styles.editImg}>
                                <EditProfileImgBadge />
                            </View>
                        </View>
                        {this.props.userName && this.props.userName.length < 10 ?
                            <QaplaText style={styles.userName}>
                                    {this.props.userName && this.props.userName}
                            </QaplaText>
                        :
                            <QaplaText style={styles.userName}>
                                {`${this.props.userName ? this.props.userName.substring(0, 10) : ''}...`}
                            </QaplaText>
                        }
                    </View>
                    <View style={styles.manageQaploinsContainer}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ showQaploinsToUser: !this.state.showQaploinsToUser })}>
                            <View style={styles.qaploinInfoContainer}>
                                {this.state.showQaploinsToUser ?
                                    <QaploinExchangeIcon
                                        height={heightPercentageToPx(4)}
                                        width={widthPercentageToPx(10)}
                                        style={styles.qaploinImage} />
                                    :
                                    <BalanceExchangeIcon
                                        height={heightPercentageToPx(4)}
                                        width={widthPercentageToPx(10)}
                                        style={styles.qaploinImage} />
                                }
                                <QaplaText style={styles.qaploinsAmount}>
                                    {this.state.showQaploinsToUser ? this.props.userQaploins : this.props.userBalance || 0}
                                </QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.buttonGroup}>
                            {!isIOSDevice() ?
                                <TouchableWithoutFeedback onPress={this.openBuyQaploinsModal}>
                                    <View style={styles.addQaploinsButton}>
                                        <QaplaText style={styles.addQaploinsButtonText}>{translate('userProfileScreen.buy')}</QaplaText>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <View />
                            }
                            <TouchableWithoutFeedback onPress={this.exchangeQaploins}>
                                <View style={styles.cashoutQaploins}>
                                    <QaplaText style={styles.addQaploinsButtonText}>{translate('userProfileScreen.exchange')}</QaplaText>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
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
                    openWhen='User wants to buy qaploins on profile'
                    body={translate('userProfileScreen.buyQaploinsModal.body')}
                    onClose={this.closeBuyQaploinsModal} />
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
            userBalance: state.userReducer.user.userBalance,
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
