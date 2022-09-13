import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Image, Text, Switch, Linking, Alert } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import images from '../../../assets/images';
import { styles } from './style';
import { signOut } from '../../services/auth';
import { trackOnSegment } from '../../services/statistics';
import { deleteUserAccount } from '../../services/functions';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import { getQlanData, updateNotificationSettings } from '../../services/database';
import { unsubscribeUserFromTopic } from '../../services/messaging';
import { messaging } from '../../utilities/firebase';
import { retrieveData, storeData } from '../../utilities/persistance';
import { defaultUserImages } from '../../utilities/Constants';
import LinkTwitchAccountModal from '../LinkTwitchAccountModal/LinkTwitchAccountModal';
import JoinQlanModal from '../JoinQlanModal/JoinQlanModal';

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
    }

    componentDidMount() {
        this.setUserDefaultImage();
        this.getUserQlanData();
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

    getUserQlanData = async () => {
        if (this.props.qlanId) {
            const qlanData = await getQlanData(this.props.qlanId);

            console.log(qlanData.val());
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

    refreshTwitchData = () => {
        console.log('new Twitch data');
    }

    render() {
        const twitchLinked = this.props.twitchId && this.props.twitchUsername;

        return (
            <Modal
                visible={this.props.open}
                transparent
                animationType='slide'
                onRequestClose={this.props.onClose}
            >
                <View style={styles.mainContainer}>
                    <BlurView
                        style={styles.blur}
                        blurAmount={5}
                        blurType="dark"
                        reducedTransparencyFallbackColor="black" />
                    <TouchableOpacity
                        onPress={this.props.onClose}
                        style={styles.closeIcon}
                    >
                        <images.svg.closeIcon />
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollView}
                        contentContainerStyle={styles.scrollViewContentContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.userInfoContainer}>
                                <View style={styles.userImageContainer}>
                                    <Image
                                        source={this.state.userImage.uri ? { uri: this.state.userImage.img } : this.state.userImage.img}
                                        style={styles.userImage}
                                    />
                                </View>
                                <Text style={styles.userUsername}
                                numberOfLines={1}
                                >
                                    {this.props.username}
                                </Text>
                            </View>
                            <TouchableOpacity
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
                        <TouchableOpacity
                            onPress={this.openJoinQlanModal}
                            style={[styles.subCategoryContanier, styles.marginTop24, styles.mySupportSubContainer]}>
                            <Text style={styles.subCategoryHeaderText}>
                                {`🎁 ${this.state.qlanData ? this.state.qlanData.name : translate('userProfileScreen.addQreatorCode')}`}
                            </Text>
                            {this.state.qlanData ?
                                <images.svg.editQreatorCodeIcon />
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
                    </ScrollView>
                </View>
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
            </Modal>
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
        qlanId: state.userReducer.user.qlanId
    };
}

export default connect(mapStateToProps)(withNavigation(UserProfileModal));