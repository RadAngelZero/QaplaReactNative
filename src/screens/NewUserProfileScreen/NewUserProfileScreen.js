import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Image, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';

import AnimatedCircleIndicator from '../../components/AnimatedCircleIndicator/AnimatedCircleIndicator';

import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { isUserLogged } from '../../services/auth';

import { translate } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getDonationFormUrl, getDonationQoinsBase } from '../../services/database';
import Colors from '../../utilities/Colors';
import RewardsStore from '../../components/RewardsStore/RewardsStore';

import RewardsBottomSheet from '../../components/RewardsBottomSheet/RewardsBottomSheet';
import EditProfileImgBadge from '../../components/EditProfileImgBadge/EditProfileImgBadge';
import { setScroll, setUserImage } from '../../actions/profileLeaderBoardActions';
import { retrieveData, storeData } from '../../utilities/persistance';
import { defaultUserImages } from '../../utilities/Constants';
import QaplaTooltip from '../../components/QaplaTooltip/QaplaTooltip';
import ZeroQoinsEventsModal from '../../components/ZeroQoinsEventsModal/ZeroQoinsEventsModal';

const BitsIcon = images.svg.bitsIcon;

export class NewUserProfileScreen extends Component {
    state = {
        qoinsToDonate: 0,
        donationCost: null,
        donationQoinBase: null,
        collapsableToolBarMaxHeight: heightPercentageToPx(50),
        previousScrollPosition: 0,
        isLeaderBoardCollapsed: true,
        userImage: { uri: true, img: this.props.userImage },
        openInfoTooltip: false,
        openRewardsTooltip: false,
        openedTooltips: 0,
        indexOfTooltipOpen: -1,
        openDonationFeedbackModal: false
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
        this.setUserDefaultImage();
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    /**
     * Check if the user has a profile image on the database
     * otherwise assign a random image and save it on the local storage
     */
    setUserDefaultImage = async () => {
        if (!this.props.userImage) {
            let userImageIndex = await retrieveData('default-user-image');

            if (!userImageIndex) {
                userImageIndex = Math.floor(Math.random() * defaultUserImages.length);

                storeData('default-user-image', `${userImageIndex}`);
            }

            this.setState({ userImage: { uri: false, img: defaultUserImages[userImageIndex].img } });
            this.props.setUserImage({ uri: false, img: defaultUserImages[userImageIndex].img });
        } else {
            this.props.setUserImage(this.state.userImage);
        }
    }

    /**
     * Load the donation cost and the donation qoin base for the user donations
     */
    setDonationCost = async () => {
        const donationQoinBase = await getDonationQoinsBase();
        if (donationQoinBase.exists()) {
            this.setState({
                donationQoinBase: donationQoinBase.val()
            });
        }
    };

    /**
     * Begins the process of redeem qaploins
     */
    exchangeQaploins = async () => {
        if (this.state.qoinsToDonate > 0 && this.props.userQoins >= this.state.qoinsToDonate) {
            let exchangeUrl = await getDonationFormUrl();
            if (exchangeUrl) {
                exchangeUrl += `#uid=${this.props.uid}&qoins=${this.state.qoinsToDonate}`;

                this.props.navigation.navigate('ExchangeQoinsScreen', { exchangeUrl });
                trackOnSegment('User support streamer',
                    {
                        SupportAmount: this.state.qoinsToDonate
                    }
                );
                this.setState({ qoinsToDonate: 0 });
            }
        } else {
            this.setState({ openDonationFeedbackModal: true });
        }
    }

    /**
     * Increase the amount of the user donation
     */
    addECoinToDonation = () => {
        const bitsToIncrease = this.state.donationQoinBase;
        if (this.props.userQoins >= this.state.qoinsToDonate + bitsToIncrease) {
            this.setState({ qoinsToDonate: this.state.qoinsToDonate + bitsToIncrease });
        } else {
            this.setState({ openDonationFeedbackModal: true });
        }
    }

    /**
     * Decrease the amount of the user donation
     */
    substractECoinToDonation = () => {
        if (this.state.qoinsToDonate > 0) {
            this.setState({ qoinsToDonate: this.state.qoinsToDonate - this.state.donationQoinBase });
        }
    }

    /**
     * Set the collapsableToolBarMaxHeight variable state based on the
     * height of the component
     */
    saveToolBarMaxHeight = ({ nativeEvent }) => this.setState({ collapsableToolBarMaxHeight: nativeEvent.layout.height });

    /**
     * Event called at the end of the scroll on scroll view
     * Handle the collapsable effect on the profile
     */
    scrollCollapsable = ({ nativeEvent }) => {
        if (this.state.isLeaderBoardCollapsed) {
            if (nativeEvent.contentOffset.y <= 50) {
                this.scrollView.scrollTo({ y: 0 });
            } else {
                this.scrollView.scrollToEnd({ animated: true });
                this.props.enableLeaderBoardScroll(true);
                this.setState({ isLeaderBoardCollapsed: false });
            }
        } else {
            if (nativeEvent.contentOffset.y < this.state.previousScrollPosition + 50) {
                this.scrollView.scrollTo({ y: 0 });
                this.props.enableLeaderBoardScroll(false);
                this.setState({ previousScrollPosition: nativeEvent.contentOffset.y, isLeaderBoardCollapsed: true });
            }
        }
    }

    /**
     * Save the last position in the Y axis on previousScrollPosition variable state
     */
    setLastScrollPosition = ({ nativeEvent }) => this.setState({ previousScrollPosition: nativeEvent.contentOffset.y });

    /**
     * Toggle the tooltip for donations
     */
    toggleInfoTooltip = () => {
        if (!this.state.openInfoTooltip) {
            this.setState({ openedTooltips: this.state.openedTooltips + 1, indexOfTooltipOpen: 0 });
        }

        this.setState({ openInfoTooltip: !this.state.openInfoTooltip });
    }

    /**
     * Toggle the tooltip for rewards
     */
    toggleRewardTooltip = () => {
        if (!this.state.openRewardsTooltip) {
            this.setState({ openedTooltips: this.state.openedTooltips + 1, indexOfTooltipOpen: 1 });
        }

        this.setState({ openRewardsTooltip: !this.state.openRewardsTooltip });
    }

    /**
     * Handle the logic to open the tooltips in a sequence
     * open all the tooltips always
     */
    tooltipAction = () => {
        const toggleFunctions = [this.toggleInfoTooltip, this.toggleRewardTooltip];
        if (this.state.openedTooltips < 2) {
            if (this.state.indexOfTooltipOpen == 0) {
                this.toggleInfoTooltip();
                this.toggleRewardTooltip();
            } else {
                this.toggleRewardTooltip();
                this.toggleInfoTooltip();
            }
        } else {
            toggleFunctions[this.state.indexOfTooltipOpen]();
            this.setState({ openedTooltips: 0, indexOfTooltipOpen: -1 });
        }
    }

    render() {
        const userLevel = Math.floor(this.props.qaplaLevel / 100);
        const userQoins = isNaN(this.props.userQoins - this.state.qoinsToDonate) ? 0 : this.props.userQoins - this.state.qoinsToDonate;

        return (
            <SafeAreaView style={styles.profileView} onLayout={this.saveToolBarMaxHeight}>
                <RewardsBottomSheet
                    rewards={this.props.rewards}
                    hide={this.props.enableScroll}
                    openRewardsTooltip={this.state.openRewardsTooltip}
                    toggleTooltip={this.toggleRewardTooltip}
                    openedTooltips={this.state.openedTooltips}
                    tooltipButtonAction={this.tooltipAction}>
                    <ScrollView
                        ref={(scrollView) => this.scrollView = scrollView}
                        onScrollEndDrag={this.scrollCollapsable}
                        onScroll={this.setLastScrollPosition}>
                        <Animated.View style={{ flex: 1 }}>
                            <View style={styles.qoinsView}>
                                <Image
                                    source={images.png.Qoin3D.img}
                                    style={styles.qoinsImage} />
                                <QaplaText style={styles.qoinsValue}>
                                    {userQoins}
                                </QaplaText>
                            </View>
                            <View style={styles.bitsCardContainer}>
                                <View style={styles.bitsModuleView}>
                                    <View>
                                        <View style={styles.infoImageContainer}>
                                            <QaplaTooltip
                                                style={styles.infoImage}
                                                toggleTooltip={this.toggleInfoTooltip}
                                                open={this.state.openInfoTooltip}
                                                content={translate('newUserProfileScreen.bitsTooltip')}
                                                buttonText={this.state.openedTooltips >= 2 ? translate('newUserProfileScreen.done') : translate('newUserProfileScreen.next')}
                                                buttonAction={this.tooltipAction} />
                                        </View>
                                        <BitsIcon style={styles.bits3dIconImage}/>
                                    </View>
                                    <View style={styles.donationValueContainer}>
                                        <View style={styles.bitsValueContainer}>
                                            <QaplaText style={styles.bitsNumber}>
                                                {this.state.qoinsToDonate}
                                            </QaplaText>
                                            <QaplaText style={styles.bitsTitle}>
                                                {translate('newUserProfileScreen.qoins')}
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
                                        fill={this.props.qaplaLevel - (userLevel * 100)}
                                        width={7}
                                        duration={750}
                                        fillComponent={() => (
                                            <EditProfileImgBadge style={styles.userImage}>
                                                <Image
                                                    style={styles.userImage}
                                                    source={this.state.userImage ? this.state.userImage.uri ? { uri: this.state.userImage.img } : this.state.userImage.img : null} />
                                            </EditProfileImgBadge>
                                        )}
                                        backgroundColor='#1F2750'
                                        tintColor={Colors.greenQapla}
                                        descriptionComponent={() => (
                                            <View style={styles.expTextContainer}>
                                                <QaplaText style={styles.expText}>
                                                    {`${translate('newUserProfileScreen.level')} ${userLevel}`}
                                                </QaplaText>
                                            </View>
                                        )} />
                                </View>
                            </View>
                        </Animated.View>
                        <View style={[styles.donationNavigatorContainer, { height: this.state.collapsableToolBarMaxHeight }]}>
                            <QaplaText style={styles.storeTitle}>
                                {translate('newUserProfileScreen.store')}
                            </QaplaText>
                            <RewardsStore />
                        </View>
                    </ScrollView>
                </RewardsBottomSheet>
                <ZeroQoinsEventsModal
                    open={this.state.openDonationFeedbackModal}
                    onClose={() => this.setState({ openDonationFeedbackModal: false })} />
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
            uid: state.userReducer.user.id,
            userQoins: state.userReducer.user.credits,
            userImage: state.userReducer.user.photoUrl,
            qaplaLevel: state.userReducer.user.qaplaLevel || 0,
            rewards: state.userReducer.user.UserRewards,
            enableScroll: state.profileLeaderBoardReducer.enableScroll
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
        qaplaLevel: 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        enableLeaderBoardScroll: (enableScroll) => setScroll(enableScroll)(dispatch),
        setUserImage: (userImage) => setUserImage(userImage)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserProfileScreen);
