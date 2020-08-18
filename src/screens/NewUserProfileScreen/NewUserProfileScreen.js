import React, { Component } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import styles from './style';
import images from '../../../assets/images';

import AnimatedCircleIndicator from '../../components/AnimatedCircleIndicator/AnimatedCircleIndicator';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';

import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { isUserLogged } from '../../services/auth';

import { getUserGamesOrderedByPlatform } from '../../utilities/utils';
import { translate } from '../../utilities/i18';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getDonationFormUrl } from '../../services/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../utilities/Colors';
import RewardsStore from '../../components/RewardsStore/RewardsStore';

const QaploinExchangeIcon = images.svg.qaploinsIcon;
const BitsIcon = images.svg.bitsIcon;
const InfoIcon = images.svg.infoIcon;

const DonationsNavigator = createMaterialTopTabNavigator({
    Leaderboard: {
        screen: () => <View style={{ backgroundColor: '#FFF', height: 50, width: 50 }} />
    },
    Store: {
        screen: () =>
        <RewardsStore />
    }
},
{
    initialRouteName: 'Store',
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        backgroundColor: '#0C1021'
      },
      tabStyle: {
        width: widthPercentageToPx(35)
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: 'SFRounded-Ultralight',
        fontWeight: 'bold'
      },
      activeTintColor: '#FFF',
      inactiveTintColor: '#FFF',
      indicatorStyle: {
        borderBottomColor: '#36E5CE',
        borderBottomWidth: 2,
        width: widthPercentageToPx(35)
      }
    },
  });

const AppContainer = createAppContainer(DonationsNavigator);

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
            <SafeAreaView style={styles.profileView}>
				<View style={styles.qoinsView}>
                    <QaploinExchangeIcon
                        height={heightPercentageToPx(4)}
                        width={widthPercentageToPx(10)}
                        style={styles.qoinsImage} />
					<QaplaText style={styles.textThreeText}>
                        {this.props.userQoins}
                    </QaplaText>
				</View>
                <View style={styles.bitsCardContainer}>
                    <View style={styles.bitsModuleView}>
                        <InfoIcon style={styles.infoImage} />
                        <View
                            style={styles.bitsValueContainer}>
                            <QaplaText style={styles.bitsNumber}>
                                175
                            </QaplaText>
                            <QaplaText style={styles.bitsTitle}>
                                Bits/Estrellas
                            </QaplaText>
                        </View>
                        <TouchableOpacity style={styles.buttonView}>
                            <QaplaText style={styles.supportText}>
                                Support
                            </QaplaText>
                        </TouchableOpacity>
                    </View>
                    <BitsIcon style={styles.bits3dIconImage}/>
                    <View style={styles.levelModalView}>
                        <View
                            style={{
                                height: 119,
                            }}>
                            <AnimatedCircleIndicator
                                size={120}
                                fill={80}
                                width={7}
                                duration={750}
                                fillComponent={() => (
                                    <>
                                        <QaplaText style={styles.levelText}>
                                            Level
                                        </QaplaText>
                                        <QaplaText style={styles.levelValueText}>
                                            5
                                        </QaplaText>
                                    </>
                                )}
                                backgroundColor='#C4C4C4'
                                tintColor={Colors.greenQapla}
                                description='500 exp'
                                descriptionStyle={styles.expText} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 48 }}>
                    <AppContainer />
                </View>
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
            userQoins: state.userReducer.user.credits,
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
