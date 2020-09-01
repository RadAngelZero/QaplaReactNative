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
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getDonationFormUrl, getDonationsCosts, getDonationQoinsBase } from '../../services/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../utilities/Colors';
import RewardsStore from '../../components/RewardsStore/RewardsStore';

import RewardsBottomSheet from '../../components/RewardsBottomSheet/RewardsBottomSheet';
import EditProfileImgBadge from '../../components/EditProfileImgBadge/EditProfileImgBadge';

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
        width: widthPercentageToPx(30)
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
        width: widthPercentageToPx(30)
      }
    },
  });

const AppContainer = createAppContainer(DonationsNavigator);

export class NewUserProfileScreen extends Component {
    state = {
        bitsToDonate: 0,
        donationCost: null,
        donationQoinBase: null
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

    componentDidMount() {
        this.setDonationCost();
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    setDonationCost = async () => {
        const donationCost = await getDonationsCosts();
        const donationQoinBase = await getDonationQoinsBase();
        if (donationCost.exists() && donationQoinBase.exists()) {
            this.setState({
                donationCost: donationCost.val(),
                donationQoinBase: donationQoinBase.val()
            });
        }
    };

    /**
     * Begins the process of redeem qaploins
     */
    exchangeQaploins = async () => {
        const exchangeUrl = await getDonationFormUrl();
        if (exchangeUrl) {
            this.props.navigation.navigate('ExchangeQoinsScreen', { exchangeUrl });
        }
    }

    addECoinToDonation = () => {
        const bitsToIncrease = this.state.donationCost * this.state.donationQoinBase;
        if (this.state.donationCost && this.props.userQoins * this.state.donationCost > this.state.bitsToDonate + bitsToIncrease) {
            this.setState({ bitsToDonate: this.state.bitsToDonate + bitsToIncrease });
        }
    }

    substractECoinToDonation = () => {
        if (this.state.bitsToDonate > 0) {
            this.setState({ bitsToDonate: this.state.bitsToDonate - (this.state.donationCost * this.state.donationQoinBase) });
        }
    }

    render() {
        const userLevel = Math.floor(this.props.experience / 100);

        return (
            <SafeAreaView style={styles.profileView}>
                <RewardsBottomSheet rewards={this.props.rewards}>
                    <View style={styles.qoinsView}>
                        <Image
                            source={images.png.Qoin3D.img}
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
                            <View style={styles.donationValueContainer}>
                                <View style={styles.bitsValueContainer}>
                                    <QaplaText style={styles.bitsNumber}>
                                        {this.state.bitsToDonate}
                                    </QaplaText>
                                    <QaplaText style={styles.bitsTitle}>
                                        Bits/Estrellas
                                    </QaplaText>
                                </View>
                                <View style={styles.handleDonationContainer}>
                                    <TouchableOpacity style={styles.updateDonationIcon} onPress={this.addECoinToDonation}>
                                        <images.svg.plusBubble />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.updateDonationIcon} onPress={this.substractECoinToDonation}>
                                        <images.svg.minusBubble />
                                    </TouchableOpacity>
                                </View>
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
                                fill={this.props.experience - (userLevel * 100)}
                                width={7}
                                duration={750}
                                fillComponent={() => (
                                    <EditProfileImgBadge style={styles.userImage}>
                                        <Image
                                            style={styles.userImage}
                                            source={{ uri: this.props.userImage }} />
                                    </EditProfileImgBadge>
                                )}
                                backgroundColor='#1F2750'
                                tintColor={Colors.greenQapla}
                                description={`Level ${userLevel}`}
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
        console.log(state.userReducer.user.id);
        return {
            userQoins: state.userReducer.user.credits,
            userImage: state.userReducer.user.photoUrl,
            experience: state.userReducer.user.qaplaExperience || 0,
            rewards: state.userReducer.user.UserRewards
        }
    }

    /**
     * If the user is not logged, then the user will be rejected from this
     * screen, it doesn't matter this return, is just added because
     * the screen is showed (some miliseconds) and we must return an object
     * from this functions (redux requirements)
     */
    return {
        user: state.userReducer.user,
        experience: 0
    };
}

export default connect(mapStateToProps)(NewUserProfileScreen);
