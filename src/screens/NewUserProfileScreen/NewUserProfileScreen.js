import React, { Component } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import styles from './style';
import images from '../../../assets/images';

import AnimatedCircleIndicator from '../../components/AnimatedCircleIndicator/AnimatedCircleIndicator';

import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { isUserLogged } from '../../services/auth';

import { translate } from '../../utilities/i18';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getDonationFormUrl } from '../../services/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../utilities/Colors';
import RewardsStore from '../../components/RewardsStore/RewardsStore';

import RewardsBottomSheet from '../../components/RewardsBottomSheet/RewardsBottomSheet';

const QaploinExchangeIcon = images.svg.qaploinsIcon;
const BitsIcon = images.svg.bitsIcon;
const InfoIcon = images.svg.infoIcon;

const DonationsNavigator = createMaterialTopTabNavigator({
    Leaderboard: {
        screen: () => <View style={{ backgroundColor: '#FFF', height: 50, width: 50 }} />
    },
    Store: {
        screen: () => <RewardsStore />
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

export class NewUserProfileScreen extends Component {
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
     * Begins the process of redeem qaploins
     */
    exchangeQaploins = async () => {
        const exchangeUrl = await getDonationFormUrl();
        if (exchangeUrl) {
            this.props.navigation.navigate('ExchangeQoinsScreen', { exchangeUrl });
        }
    }

    render() {
        const userLevel = Math.floor(this.props.experience / 100);
        return (
            <SafeAreaView style={styles.profileView}>
                <RewardsBottomSheet>
                    <View style={styles.qoinsView}>
                        <QaploinExchangeIcon
                            height={heightPercentageToPx(4)}
                            width={widthPercentageToPx(10)}
                            style={styles.qoinsImage} />
                        <QaplaText style={styles.qoinsValue}>
                            {this.props.userQoins}
                        </QaplaText>
                    </View>
                    <View style={styles.bitsCardContainer}>
                        <View style={styles.bitsModuleView}>
                            <View>
                                <InfoIcon style={styles.infoImage} />
                                <BitsIcon style={styles.bits3dIconImage}/>
                            </View>
                            <View style={styles.bitsValueContainer}>
                                <QaplaText style={styles.bitsNumber}>
                                    175
                                </QaplaText>
                                <QaplaText style={styles.bitsTitle}>
                                    Bits/Estrellas
                                </QaplaText>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonView}
                                onPress={this.exchangeQaploins}>
                                <QaplaText style={styles.supportText}>
                                    Support
                                </QaplaText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.levelModalView}>
                            <AnimatedCircleIndicator
                                size={120}
                                fill={80}
                                width={7}
                                duration={750}
                                fillComponent={() => (
                                    <>
                                        <Image
                                            style={{ resizeMode: 'cover', height: 120, width: 120 }}
                                            source={{ uri: this.props.userImage }} />
                                    </>
                                )}
                                backgroundColor='#1F2750'
                                tintColor={Colors.greenQapla}
                                description='500 exp'
                                descriptionStyle={styles.expText} />
                        </View>
                    </View>
                    <View style={styles.donationNavigatorContainer}>
                        <AppContainer />
                    </View>
                </RewardsBottomSheet>
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
            userQoins: state.userReducer.user.credits,
            userImage: state.userReducer.user.photoUrl,
            experience: state.userReducer.user.qaplaExperience || 0
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

export default connect(mapStateToProps)(NewUserProfileScreen);
