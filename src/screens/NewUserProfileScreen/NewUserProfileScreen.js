import React, { Component } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, View, Image, Animated, TouchableOpacity, TouchableWithoutFeedback, Text, ImageBackground } from 'react-native';
import MaskedView from '@react-native-community/masked-view'
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';

import AnimatedCircleIndicator from '../../components/AnimatedCircleIndicator/AnimatedCircleIndicator';

import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { isUserLogged } from '../../services/auth';

import { getLocaleLanguage, translate } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getDonationQoinsBase, getQlanData } from '../../services/database';
import Colors from '../../utilities/Colors';
import RewardsStore from '../../components/RewardsStore/RewardsStore';

import RewardsBottomSheet from '../../components/RewardsBottomSheet/RewardsBottomSheet';
import EditProfileImgBadge from '../../components/EditProfileImgBadge/EditProfileImgBadge';
import { setScroll, setUserImage } from '../../actions/profileLeaderBoardActions';
import { retrieveData, storeData } from '../../utilities/persistance';
import { defaultUserImages } from '../../utilities/Constants';
import QaplaTooltip from '../../components/QaplaTooltip/QaplaTooltip';
import ZeroQoinsEventsModal from '../../components/ZeroQoinsEventsModal/ZeroQoinsEventsModal';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import SendCheersModal from '../../components/SendCheersModal/SendCheersModal';
import LevelInformationModal from '../../components/LevelInformationModal/LevelInformationModal';
import { getLevels } from '../../actions/QaplaLevelActions';
import JoinQlanModal from '../../components/JoinQlanModal/JoinQlanModal';
import LinearGradient from 'react-native-linear-gradient';

const BitsIcon = images.svg.bitsIcon;

const SeasonLevelIcons = {
    en: [
        images.svg.seasonLevelEn1,
        images.svg.seasonLevelEn2,
        images.svg.seasonLevelEn3,
        images.svg.seasonLevelEn4
    ],
    es: [
        images.svg.seasonLevelEs1,
        images.svg.seasonLevelEs2,
        images.svg.seasonLevelEs3,
        images.svg.seasonLevelEs4
    ]
}

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
        openDonationFeedbackModal: false,
        openLinkWitTwitchModal: false,
        openSendCheersModal: false,
        userWantsToSendCheers: false,
        userWantsToJoinAQlan: false,
        openLevelInformationModal: false,
        openQlanJoinModal: false,
        qlanData: {
            image: null,
            name: '',
            fetching: false
        }
    };

    componentWillMount() {
        this.list = [
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    if (!isUserLogged()) {
                        this.props.navigation.navigate('Auth');
                    } else {
                        this.getUserQlanData();
                        recordScreenOnSegment('User Profile Screen');
                    }
                }
            )
        ]
    }

    componentDidMount() {
        this.setDonationCost();
        this.setUserDefaultImage();
        this.props.loadQaplaLevels();
    }

    componentWillUnmount() {
        //Remove navigation listeners
        this.list.forEach((item) => item.remove());
    }

    getUserQlanData = async () => {
        if (this.props.qlanId) {
            this.setState({ qlanData: { ...qlanData, fetching: true } });
            const qlanData = await getQlanData(this.props.qlanId);
            if (qlanData.exists()) {
                this.setState({ qlanData: { ...qlanData.val(), fetching: false } });
            }
        }
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
            if (this.props.twitchId && this.props.twitchUsername) {

                this.setState({ openSendCheersModal: true });
                trackOnSegment('User support streamer',
                    {
                        SupportAmount: this.state.qoinsToDonate
                    }
                );
            } else {
                this.setState({ userWantsToSendCheers: true });
                this.linkTwitchAccount();
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

    linkTwitchAccount = () => this.setState({ openLinkWitTwitchModal: true });

    getUserSeasonLevel = () => {
        let currentLevel = 1;
        if (this.props.qaplaLevels) {
            this.props.qaplaLevels.forEach((level, index) => {
                if (this.props.seasonXQ >= level.requiredXQ) {
                    currentLevel = index + 1;
                }
            });
        }

        return currentLevel;
    }

    getNextLevelRequiredXQ = () => {
        if (this.props.qaplaLevels) {
            for (let i = 0; i < this.props.qaplaLevels.length; i++) {
                const qaplaLevel = this.props.qaplaLevels[i];
                if (this.props.seasonXQ < qaplaLevel.requiredXQ) {
                    return qaplaLevel.requiredXQ;
                }
            }
        }

        return 0;
    }

    getCurrentLevelRequiredXQ = () => {
        if (this.props.qaplaLevels) {
            for (let i = 0; i < this.props.qaplaLevels.length; i++) {
                const qaplaLevel = this.props.qaplaLevels[i];
                if (this.props.seasonXQ < qaplaLevel.requiredXQ) {
                    return i > 0 ? this.props.qaplaLevels[i - 1].requiredXQ : 0;
                }
            }
        }

        return 0;
    }

    openJoinQlanModal = () => {
        this.setState({ userWantsToJoinAQlan: true }, () => {
            if (this.props.twitchId && this.props.twitchUsername) {
                this.setState({ openQlanJoinModal: true });
            } else {
                this.linkTwitchAccount();
            }
        });
    }

    render() {
        const userLevel = this.props.qaplaLevels ? this.getUserSeasonLevel() : 0;
        const userQoins = isNaN(this.props.userQoins - this.state.qoinsToDonate) ? 0 : this.props.userQoins - this.state.qoinsToDonate;
        const userLanguage = getLocaleLanguage();

        const LastSeasonLevelIcon = SeasonLevelIcons[userLanguage] ? SeasonLevelIcons[userLanguage][this.props.lastSeasonLevel - 1] : null;

        const DefaultSeasonLevelIcon = SeasonLevelIcons[userLanguage][0];

        const circleIndicatorFill = 100 / (this.getNextLevelRequiredXQ() - this.getCurrentLevelRequiredXQ()) * (this.props.seasonXQ - this.getCurrentLevelRequiredXQ());

        return (
            <SafeAreaView style={styles.profileView} onLayout={this.saveToolBarMaxHeight}>
                <RewardsBottomSheet
                    rewards={this.props.rewards}
                    hide={this.props.enableScroll}
                    openRewardsTooltip={this.state.openRewardsTooltip}
                    toggleTooltip={this.toggleRewardTooltip}
                    openedTooltips={this.state.openedTooltips}
                    tooltipButtonAction={this.tooltipAction}>
                    <ScrollView>
                        <Animated.View style={{ flex: 1 }}>
                            <View style={styles.profileDetailsContainer}>
                                <View style={styles.qoinsView}>
                                    <Image
                                        source={images.png.Qoin3D.img}
                                        style={styles.qoinsImage} />
                                    <QaplaText style={styles.qoinsValue}>
                                        {userQoins}
                                    </QaplaText>
                                </View>
                                {this.props.twitchId && this.props.twitchUsername ?
                                    <TouchableOpacity style={styles.twitchButtonContainer} disabled>
                                        <View style={styles.twitchButtonContentContainer}>
                                            <images.svg.twitchIcon />
                                            <Text style={styles.twitchButtonText} numberOfLines={1}>
                                                {this.props.twitchUsername}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={styles.linkWithTwitchContainer}>
                                        <TouchableOpacity style={styles.linkWithTwitchButtonContainer} onPress={this.linkTwitchAccount}>
                                            <images.svg.twitchExtrudedLogo height={24}
                                                width={72}
                                                style={styles.twitchIconButton} />
                                        </TouchableOpacity>
                                        <Text style={styles.linkAccountText}>
                                            {translate('newUserProfileScreen.linkAccount')}
                                        </Text>
                                    </View>
                                }
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
                                        <BitsIcon style={styles.bits3dIconImage} />
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
                                        fill={isFinite(circleIndicatorFill) ? circleIndicatorFill : 100}
                                        width={7}
                                        duration={750}
                                        fillComponent={() => (
                                            <EditProfileImgBadge style={styles.userImage}>
                                                <Image
                                                    style={styles.userImage}
                                                    source={this.props.userImage ? { uri: this.props.userImage } : this.state.userImage ? this.state.userImage.uri ? { uri: this.state.userImage.img } : this.state.userImage.img : null} />
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
                                    <TouchableOpacity style={styles.lastSeasonLevelContainer} onPress={() => this.setState({ openLevelInformationModal: true })}>
                                        <QaplaText style={styles.lastSeasonCopie}>
                                            {translate('newUserProfileScreen.lastSeason')}
                                        </QaplaText>
                                        <View style={styles.seasonLevelContainer}>
                                            {this.props.lastSeasonLevel ?
                                                LastSeasonLevelIcon ?
                                                    <LastSeasonLevelIcon />
                                                    :
                                                    <DefaultSeasonLevelIcon />
                                                :
                                                <DefaultSeasonLevelIcon />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                        <View>
                            <QaplaText style={[styles.storeTitle, styles.myQlanTitle]}>
                                {translate('qlan.myQlan')}
                            </QaplaText>
                            {!this.props.qlanId &&
                                <TouchableWithoutFeedback onPress={this.openJoinQlanModal}>
                                    <View style={styles.myQlanContainer}>
                                        <Image source={images.png.joinQlanGlow.img} style={styles.joinQlanIcon} />
                                        <Text style={styles.joinQlanTitle}>{translate('qlan.joinQlan')}</Text>
                                        <Text style={styles.joinQlanSubtitle}>{translate('qlan.useCode')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                            {this.props.qlanId &&
                                (this.state.qlanData.fetching ?
                                    <ActivityIndicator size='large' color={Colors.greenQapla} />
                                    :
                                    <>
                                        <View style={styles.myQlanJoinedContainer}>
                                            <ImageBackground source={images.png.qlanProfile.img} style={styles.myQlanImageContainer}>
                                                <Image source={this.state.qlanData.image ? { uri: this.state.qlanData.image } : null} style={styles.myQlanImage} />
                                                <Text style={styles.myQlanText}>
                                                    {this.state.qlanData.name}
                                                </Text>
                                            </ImageBackground>
                                        </View>
                                        <View style={styles.updateContainer}>
                                            <TouchableOpacity onPress={this.openJoinQlanModal}>
                                                <View style={styles.updateInnerContainer}>
                                                    <View style={styles.updateIconContainer}>
                                                        <images.svg.editQlan />
                                                    </View>
                                                    <MaskedView maskElement={<Text style={styles.updateText}>{translate('qlan.update')}</Text>} style={{ alignContent: 'center' }}>
                                                        <LinearGradient
                                                            colors={['#FFCAFA', '#A1FFFF', '#AFFFE2']}
                                                            start={{ x: 0, y: 0 }}
                                                            end={{ x: 1, y: 1 }}
                                                            useAngle
                                                            angle={90}>
                                                            <Text style={[styles.updateText, styles.invisible]}>{translate('qlan.update')}</Text>
                                                        </LinearGradient>
                                                    </MaskedView>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    )
                            }
                        </View>
                        <View style={[styles.donationNavigatorContainer, { height: this.state.collapsableToolBarMaxHeight }]}>
                            <QaplaText style={styles.storeTitle}>
                                {translate('newUserProfileScreen.loots')}
                            </QaplaText>
                            <RewardsStore />
                        </View>
                    </ScrollView>
                </RewardsBottomSheet>
                <JoinQlanModal uid={this.props.uid}
                    userName={this.props.userName}
                    twitchUsername={this.props.twitchUsername}
                    open={this.state.openQlanJoinModal}
                    onClose={() => this.setState({ openQlanJoinModal: false, userWantsToJoinAQlan: false })}
                    onSuccess={this.getUserQlanData}
                    qlanId={this.props.qlanId} />
                <ZeroQoinsEventsModal
                    open={this.state.openDonationFeedbackModal}
                    onClose={() => this.setState({ openDonationFeedbackModal: false })} />
                <LinkTwitchAccountModal
                    open={this.state.openLinkWitTwitchModal}
                    onClose={() => this.setState({ openLinkWitTwitchModal: false, userWantsToSendCheers: false, userWantsToJoinAQlan: false })}
                    onLinkSuccessful={this.state.userWantsToSendCheers ? this.exchangeQaploins : (this.state.userWantsToJoinAQlan ? this.openJoinQlanModal : null)}
                    linkingWithQreatorCode={this.state.userWantsToJoinAQlan} />
                <SendCheersModal
                    open={this.state.openSendCheersModal}
                    onClose={() => this.setState({ openSendCheersModal: false, qoinsToDonate: 0 })}
                    qoinsToDonate={this.state.qoinsToDonate}
                    uid={this.props.uid}
                    twitchId={this.props.twitchId}
                    userName={this.props.userName}
                    userPhotoURL={this.props.userImage} />
                <LevelInformationModal open={this.state.openLevelInformationModal}
                    onClose={() => this.setState({ openLevelInformationModal: false })} />
            </SafeAreaView >
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
            lastSeasonLevel: state.userReducer.user.lastSeasonLevel || 0,
            seasonXQ: state.userReducer.user.seasonXQ || 0,
            rewards: state.userReducer.user.UserRewards,
            enableScroll: state.profileLeaderBoardReducer.enableScroll,
            twitchId: state.userReducer.user.twitchId,
            twitchUsername: state.userReducer.user.twitchUsername,
            userName: state.userReducer.user.userName,
            qlanId: state.userReducer.user.qlanId,
            qaplaLevels: state.qaplaLevelReducer.levels
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
        seasonXQ: 0,
        lastSeasonLevel: 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        enableLeaderBoardScroll: (enableScroll) => setScroll(enableScroll)(dispatch),
        setUserImage: (userImage) => setUserImage(userImage)(dispatch),
        loadQaplaLevels: () => getLevels()(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserProfileScreen);
