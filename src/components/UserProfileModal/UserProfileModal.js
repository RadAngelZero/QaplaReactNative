import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, Switch, Linking, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents, withNavigation } from 'react-navigation';
import Tooltip from 'react-native-walkthrough-tooltip';
import LinearGradient from 'react-native-linear-gradient';

import images from '../../../assets/images';
import { styles } from './style';
import { signOut } from '../../services/auth';
import { trackOnSegment } from '../../services/statistics';
import { deleteUserAccount, getTwitchDataCloudFunction } from '../../services/functions';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import {
    getQlanData,
    updateNotificationSettings,
    updateTwitchUsername,
    updateUserProfileImg,
    getUserGreetingData
} from '../../services/database';
import { unsubscribeUserFromTopic } from '../../services/messaging';
import { messaging } from '../../utilities/firebase';
import { retrieveData, storeData } from '../../utilities/persistance';
import { defaultUserImages } from '../../utilities/Constants';
import LinkTwitchAccountModal from '../LinkTwitchAccountModal/LinkTwitchAccountModal';
import JoinQlanModal from '../JoinQlanModal/JoinQlanModal';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

class UserProfileModal extends Component {
    state = {
        mySupportOpen: false,
        notificateNewStreams: false,
        notificateScheduledStreams: false,
        showLinkWithTwitchModal: false,
        showJoinQlanModal: false,
        userImage: { uri: true, img: this.props.photoUrl },
        qlanData: null,
        userWantsToJoinAQlan: false,
        updateProfileToolTip: false,
        updatingProfile: false,
        profileScrollEnabled: false,
        imageVersion: 0,
        greeting: null
    }

    componentDidMount() {
        this.setUserDefaultImage();
        this.getUserQlanData();
        this.getImageVersion();
        this.getUserGreeting();
    }

    getImageVersion = async () => {
        const imageVersion = await retrieveData('avatarImageVersion');

        this.setState({ imageVersion });
    }

    getQoins = () => {
        this.props.navigation.navigate('BuyQoins');
        this.props.onClose();
    }

    setUserDefaultImage = async () => {
        if (!this.props.photoUrl) {
            let userImageIndex = await retrieveData('default-user-image');

            if (!userImageIndex) {
                userImageIndex = Math.floor(Math.random() * defaultUserImages.length);

                storeData('default-user-image', `${userImageIndex}`);
            }

            this.setState({ userImage: { uri: false, img: defaultUserImages[userImageIndex].img } });
        }
    }

    toggleSupportDisplay = () => this.setState({ mySupportOpen: !this.state.mySupportOpen });

    toggleNewStreamsNotifications = () => {
        this.setState({ notificateNewStreams: !this.state.notificateNewStreams });
    }
    toggleScheduledStreamsNotifications = () => {
        this.setState({ notificateScheduledStreams: !this.state.notificateScheduledStreams });
    }

    openTermsAndConditions = () => {
        Linking.openURL(translate('userProfileScreen.termsAndConditionsUrl'));
    }

    openPrivacy = () => {
        Linking.openURL(translate('userProfileScreen.privacyNoticeUrl'));
    }

    closeSession = async () => {
        await signOut();
        this.props.onClose();
    }

    deleteAccountConfirmation = () => {
        Alert.alert(
            translate('userProfileScreen.deleteAccount'),
            translate('userProfileScreen.deleteAccountDescription'),
            [
                {
                    text: translate('userProfileScreen.cancel'),
                    style: 'cancel'
                },
                {
                    text: translate('userProfileScreen.deleteAccount'),
                    onPress: () => this.tryToDeleteAccount(),
                    style: 'destructive'
                }
            ],
            {
                cancelable: true
            }
        );
    }

    tryToDeleteAccount = async () => {
        try {
            trackOnSegment('User deleted their account', {
                uid: this.props.uid
            });

            await deleteUserAccount(this.props.uid);

            Alert.alert(
                translate('userProfileScreen.accountDeleted'),
                translate('userProfileScreen.accountDeletedDescription'),
                [
                    {
                        text: 'Ok',
                        onPress: async () => {
                            await signOut();
                            this.props.onClose();
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                translate('userProfileScreen.accountDeletionError'),
                translate('userProfileScreen.accountDeletionErrorDescription'),
                [
                    {
                        text: 'Ok'
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    toggleStreamsNotifications = () => {
        const enableNotifications = this.props.notificationSettings.streamersSubscriptions != null ? !this.props.notificationSettings.streamersSubscriptions : false;
        const userLanguage = getLocaleLanguage();

        if (enableNotifications) {
            Object.keys(this.props.userSubscriptions).forEach((streamerId) => {
                messaging.subscribeToTopic(`${streamerId}_reminders_${userLanguage}`);
                messaging.subscribeToTopic(`${streamerId}_cancelations_${userLanguage}`);
                messaging.subscribeToTopic(`${streamerId}_changes_${userLanguage}`);
            });
        } else {
            Object.keys(this.props.userSubscriptions).forEach((streamerId) => {
                unsubscribeUserFromTopic(`${streamerId}_reminders_${userLanguage}`);
                unsubscribeUserFromTopic(`${streamerId}_cancelations_${userLanguage}`);
                unsubscribeUserFromTopic(`${streamerId}_changes_${userLanguage}`);
            });
        }

        updateNotificationSettings(this.props.uid, 'streamersSubscriptions', enableNotifications);
    }

    getUserGreeting = async () => {
        const greeting = await getUserGreetingData(this.props.uid);
        this.setState({ greeting: greeting.val() });
    }

    getUserQlanData = async () => {
        if (this.props.qlanId) {
            const qlanData = await getQlanData(this.props.qlanId);

            this.setState({ qlanData: { ...qlanData.val() } });
        }
    }

    openJoinQlanModal = () => {
        this.setState({ userWantsToJoinAQlan: true }, () => {
            if (this.props.twitchId && this.props.twitchUsername) {
                this.setState({ showJoinQlanModal: true });
            } else {
                this.setState({ showLinkWithTwitchModal: true });
            }
        });
    }

    refreshTwitchData = async () => {
        this.setState({ updatingProfile: true });
        const user = await getTwitchDataCloudFunction(this.props.twitchId);
        if (user.data) {
            await updateUserProfileImg(this.props.uid, user.data.profile_image_url);
            await updateTwitchUsername(this.props.uid, user.data.display_name);
            this.setState({ userImage: { uri: true, img: user.data.profile_image_url } });
        }

        this.setState({ updatingProfile: false });
    }

    toolTipGoToTwitch = () => {
        this.setState({ updateProfileToolTip: false });
        Linking.openURL('https://www.twitch.tv/');
    }

    renderProfile = () => {
        const twitchLinked = this.props.twitchId && this.props.twitchUsername;

        return (
            <View style={styles.scrollView}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.userInfoContainer} onPress={() => this.setState({ updateProfileToolTip: true })}>
                        <View style={styles.userImageContainer}>
                            <Tooltip
                                isVisible={this.state.updateProfileToolTip}
                                content={
                                    <View style={{
                                        padding: 12,
                                    }}>
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 17,
                                            fontWeight: '700',
                                            lineHeight: 22,
                                        }}>
                                            {translate('userProfileScreen.updateProfile')}
                                        </Text>
                                        <TouchableOpacity style={{
                                            backgroundColor: '#141735',
                                            paddingHorizontal: 19,
                                            paddingVertical: 13,
                                            borderRadius: 50,
                                            marginTop: 11,
                                            alignSelf: 'flex-end',
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 11,
                                            },
                                            shadowOpacity: 0.55,
                                            shadowRadius: 14.78,

                                            elevation: 22,
                                        }}
                                            onPress={this.toolTipGoToTwitch}>
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 17,
                                                fontWeight: '700',
                                                lineHeight: 16,
                                            }}>
                                                {translate('userProfileScreen.goToTwitch')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                placement="bottom"
                                onClose={() => this.setState({ updateProfileToolTip: false })}
                                arrowStyle={{ color: '#3B4BF9' }}
                                topAdjustment={50}
                                displayInsets={{
                                    left: widthPercentageToPx(4.26),
                                }}
                                contentStyle={{
                                    backgroundColor: '#3B4BF9',
                                    width: 245,
                                    borderRadius: 15,
                                }}
                                backgroundColor="#0000"
                            >
                                <Image
                                    source={this.props.photoUrl ? { uri: this.props.photoUrl } : (this.state.userImage.uri ? { uri: this.state.userImage.img } : this.state.userImage.img)}
                                    style={styles.userImage} />
                            </Tooltip>
                            {!this.state.updatingProfile &&
                                <Image
                                    source={this.props.photoUrl ? { uri: this.props.photoUrl } : (this.state.userImage.uri ? { uri: this.state.userImage.img } : this.state.userImage.img)}
                                    style={styles.userImage} />
                            }
                        </View>
                        {!this.state.updatingProfile &&
                            <Text style={styles.userUsername}
                                numberOfLines={1}>
                                {this.props.twitchUsername ? this.props.twitchUsername : this.props.username}
                            </Text>
                        }
                        {this.state.updatingProfile &&
                            <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.updatingProfile}
                        onPress={() => twitchLinked ? this.refreshTwitchData() : this.setState({ showLinkWithTwitchModal: true })}
                        style={twitchLinked ? styles.twitchLinkedButton : styles.twitchLinkButton}>
                        <images.svg.twitchIcon style={styles.twitchIcon} />
                        <Text style={styles.twitchLinkedText}>
                            {twitchLinked ?
                                translate('userProfileScreen.refresh')
                                :
                                translate('userProfileScreen.linkAccount')
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.qoinsContainer}>
                    <View>
                        <Text style={styles.myQoinsText}>
                            {translate('userProfileScreen.myQoins')}
                        </Text>
                        <View style={[styles.qoinsDisplayContainer, styles.marginTop16]}>
                            <images.svg.qoin style={styles.bigQoin} />
                            <Text style={styles.qoinsNumber}>
                                {this.props.qoins}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={this.getQoins}
                        style={styles.getQoinsButton}>
                        <Text style={styles.getQoinsText}>
                            {translate('userProfileScreen.getQoins')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.toggleSupportDisplay}
                    style={styles.subCategoryContanier}>
                    <View style={styles.mySupportSubContainer}>
                        <Text style={styles.subCategoryHeaderText}>
                            {translate('userProfileScreen.mySupport')}
                        </Text>
                        <images.svg.arrowDownWhite style={{
                            transform: [{ rotate: !this.state.mySupportOpen ? '0deg' : '180deg' }],
                        }} />
                    </View>
                    {this.state.mySupportOpen &&
                        <View style={styles.marginTop16}>
                            <View style={styles.supportDataContainer}>
                                <images.svg.qoin style={styles.bigQoin} />
                                <Text style={styles.qoinsNumber}>
                                    {this.props.qoinsDonated}
                                </Text>
                            </View>
                            <Text style={styles.qoinsSubtext}>
                                {translate('userProfileScreen.totalQoinsSent')}
                            </Text>
                        </View>
                    }
                </TouchableOpacity>
                {this.state.greeting &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AvatarChooseAnimationScreen', { edit: true })}
                        style={[styles.subCategoryContanier, styles.marginTop24, styles.mySupportSubContainer]}>
                        <Text style={styles.subCategoryHeaderText}>
                            {translate('userProfileScreen.updatePopUp')}
                        </Text>
                        <images.svg.editSquare />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={this.openJoinQlanModal}
                    style={[styles.subCategoryContanier, styles.marginTop24, styles.mySupportSubContainer]}>
                    <Text style={styles.subCategoryHeaderText}>
                        {`🎁 ${this.state.qlanData ? this.state.qlanData.name : translate('userProfileScreen.addQreatorCode')}`}
                    </Text>
                    {this.state.qlanData ?
                        <images.svg.editSquare />
                        :
                        <images.svg.plusIcon />
                    }
                </TouchableOpacity>
                <View style={[styles.subCategoryContanier, styles.marginTop24]}>
                    <Text style={styles.subCategoryHeaderText}>
                        {translate('userProfileScreen.notifications')}
                    </Text>
                    <View style={[styles.marginTop16, styles.switchGroupContainer]}>
                        <View style={styles.switchTextMaxWidth}>
                            <Text style={styles.switchHeaderText}>
                                {translate('userProfileScreen.newStreams')}
                            </Text>
                            <Text style={styles.switchSubText}>
                                {translate('userProfileScreen.newStreamsDescription')}
                            </Text>
                        </View>
                        <Switch
                            onChange={this.toggleStreamsNotifications}
                            value={this.props.notificationSettings.streamersSubscriptions != null ? this.props.notificationSettings.streamersSubscriptions : true}
                        />
                    </View>
                    <View style={[styles.marginTop16, styles.switchGroupContainer]}>
                        <View style={styles.switchTextMaxWidth}>
                            <Text style={styles.switchHeaderText}>
                                {translate('userProfileScreen.scheduledStreams')}
                            </Text>
                            <Text style={styles.switchSubText}>
                                {translate('userProfileScreen.scheduledStreamsDescription')}
                            </Text>
                        </View>
                        <Switch
                            onChange={() => updateNotificationSettings(this.props.uid, 'scheduledStreams', this.props.notificationSettings.scheduledStreams != null ? !this.props.notificationSettings.scheduledStreams : false)}
                            value={this.props.notificationSettings.scheduledStreams != null ? this.props.notificationSettings.scheduledStreams : true}
                        />
                    </View>
                </View>
                <View style={[styles.subCategoryContanier, styles.marginTop24]}>
                    <TouchableOpacity
                        onPress={this.openTermsAndConditions}
                        style={styles.switchGroupContainer}>
                        <Text style={[styles.subCategoryHeaderText, styles.fontSize16]}>
                            {translate('userProfileScreen.termsAndConditions')}
                        </Text>
                        <images.svg.shareArrowTransparent style={styles.externalLinkIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.openPrivacy}
                        style={[styles.marginTop16, styles.switchGroupContainer]}>
                        <Text style={[styles.subCategoryHeaderText, styles.fontSize16]}>
                            {translate('userProfileScreen.privacyNotice')}
                        </Text>
                        <images.svg.shareArrowTransparent style={styles.externalLinkIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.closeSession}
                    style={[styles.subCategoryContanier, styles.marginTop24]}>
                    <Text style={styles.finalButtonsText}>
                        {translate('userProfileScreen.logOut')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.deleteAccountConfirmation}
                    style={[styles.subCategoryContanier, styles.marginTop24]}>
                    <Text style={[styles.finalButtonsText, styles.deleteTextColor]}>
                        {translate('userProfileScreen.deleteAccount')}
                    </Text>
                </TouchableOpacity>
                <View style={styles.bottomSeparation} />
            </View>
        );
    }

    render() {
        const avatarImage = `https://api.readyplayer.me/v1/avatars/${this.props.avatarId}.png?scene=fullbody-portrait-v1-transparent&version=${this.state.imageVersion}`;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                <View style={styles.mainContainer}>
                    {this.props.avatarBackground ?
                        <LinearGradient style={{ flex: 1 }}
                            useAngle
                            {...this.props.avatarBackground}>
                                <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}
                                    style={styles.closeIcon}>
                                    <images.svg.closeIcon />
                                </TouchableOpacity>
                                <View style={styles.editAvatarContainer}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('AvatarCreatorScreen', { edit: true })}
                                        style={styles.editButton}>
                                        <images.svg.editIcon style={{ marginRight: 8 }} />
                                        <Text style={styles.createAvatarButtonText}>
                                            {translate('userProfileScreen.editAvatar')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {this.renderProfile()}
                        </LinearGradient>
                        :
                        <>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={styles.closeIcon}>
                            <images.svg.closeIcon />
                        </TouchableOpacity>
                        <ImageBackground source={images.png.createAvatarCover.img}
                            style={styles.createAvatarBackgroundImage}>
                            <View />
                            <Text style={styles.createAvatarTitle}>
                                {translate('userProfileScreen.yourIdentity')}
                            </Text>
                            <TouchableOpacity style={styles.createAvatarButton}
                                onPress={() => this.props.navigation.navigate('AvatarStackNavigator')}>
                                <Text style={styles.createAvatarButtonText}>
                                    {translate('userProfileScreen.createAvatar')}
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                        {this.renderProfile()}
                        </>
                    }
                </View>
                </ScrollView>
                <LinkTwitchAccountModal open={this.state.showLinkWithTwitchModal}
                    onClose={() => this.setState({ showLinkWithTwitchModal: false })}
                    onLinkSuccessful={this.state.userWantsToJoinAQlan ? this.openJoinQlanModal : null}
                    linkingWithQreatorCode={this.state.userWantsToJoinAQlan} />
                <JoinQlanModal open={this.state.showJoinQlanModal}
                    onClose={() => this.setState({ showJoinQlanModal: false })}
                    uid={this.props.uid}
                    qlanId={this.props.qlanId}
                    userName={this.props.username}
                    twitchUsername={this.props.twitchUsername}
                    onSuccess={this.getUserQlanData} />
                <NavigationEvents onWillFocus={this.getImageVersion} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        username: state.userReducer.user.userName,
        photoUrl: state.userReducer.user.photoUrl,
        qoins: state.userReducer.user.credits,
        qoinsDonated: state.userReducer.user.UserRewards && state.userReducer.user.UserRewards.donations && state.userReducer.user.UserRewards.donations.qoins ? state.userReducer.user.UserRewards.donations.qoins : 0,
        twitchId: state.userReducer.user.twitchId,
        twitchUsername: state.userReducer.user.twitchUsername,
        notificationSettings: state.userReducer.user.notificationSettings || {},
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions || {},
        qlanId: state.userReducer.user.qlanId,
        avatarBackground: state.userReducer.user.avatarBackground,
        avatarId: state.userReducer.user.avatarId
    };
}

export default connect(mapStateToProps)(withNavigation(UserProfileModal));