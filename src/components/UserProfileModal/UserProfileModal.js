import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Image, Text, Switch, Linking, Alert } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import { styles } from './style';
import { signOut } from '../../services/auth';
import { trackOnSegment } from '../../services/statistics';
import { deleteUserAccount } from '../../services/functions';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import { updateNotificationSettings } from '../../services/database';
import { subscribeUserToTopic, unsubscribeUserFromTopic } from '../../services/messaging';
import { messaging } from '../../utilities/firebase';

class UserProfileModal extends Component {
    state = {
        mySupportOpen: false,
        notificateNewStreams: false,
        notificateScheduledStreams: false,
        twitchLinked: false,
    }

    linkTwitch = () => {
        console.log('link twitch');
    }

    toggleSupportDisplay = () => this.setState({ mySupportOpen: !this.state.mySupportOpen });

    addQreatorCode = () => {
        console.log('creator code screen');
    }

    toggleNewStreamsNotifications = () => {
        this.setState({ notificateNewStreams: !this.state.notificateNewStreams });
    }
    toggleScheduledStreamsNotifications = () => {
        this.setState({ notificateScheduledStreams: !this.state.notificateScheduledStreams });
    }

    openTermsAndConditions = () => {
        Linking.openURL('');
    }

    openPrivacy = () => {
        Linking.openURL('');
    }

    closeSession = async () => {
        await signOut();
        this.props.onClose();
    }

    deleteAccountConfirmation = () => {
        Alert.alert(
            translate('settingsMenuScreen.deleteAccount'),
            translate('settingsMenuScreen.deleteAccountDescription'),
            [
                {
                    text: translate('settingsMenuScreen.cancel'),
                    style: 'cancel'
                },
                {
                    text: translate('settingsMenuScreen.deleteAccount'),
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
                translate('settingsMenuScreen.accountDeleted'),
                translate('settingsMenuScreen.accountDeletedDescription'),
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
                translate('settingsMenuScreen.accountDeletionError'),
                translate('settingsMenuScreen.accountDeletionErrorDescription'),
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
                                        source={{ uri: this.props.photoUrl }}
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
                                onPress={this.linkTwitch}
                                disabled={twitchLinked}
                                style={twitchLinked ? styles.twitchLinkedButton : styles.twitchLinkButton}>
                                <images.svg.twitchIcon style={styles.twitchIcon} />
                                <Text style={styles.twitchLinkedText}>
                                    {twitchLinked ?
                                        <>
                                            {`Linked`}
                                        </>
                                        :
                                        <>
                                            {`Link Twitch`}
                                        </>
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.qoinsContainer}>
                            <View>
                                <Text style={styles.myQoinsText}>
                                    {`🏦 My Qoins`}
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
                                    {`Get Qoins`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={this.toggleSupportDisplay}
                            style={styles.subCategoryContanier}>
                            <View style={styles.mySupportSubContainer}>
                                <Text style={styles.subCategoryHeaderText}>
                                    {`💜 My support`}
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
                                        {`Total Qoins sent`}
                                    </Text>
                                </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.addQreatorCode}
                            style={[styles.subCategoryContanier, styles.marginTop24, styles.mySupportSubContainer]}>
                            <Text style={styles.subCategoryHeaderText}>
                                {`🎁 Add a Qreator Code`}
                            </Text>
                            <images.svg.plusIcon />
                        </TouchableOpacity>
                        <View style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <Text style={styles.subCategoryHeaderText}>
                                {`Notifications`}
                            </Text>
                            <View style={[styles.marginTop16, styles.switchGroupContainer]}>
                                <View style={styles.switchTextMaxWidth}>
                                    <Text style={styles.switchHeaderText}>
                                        {`New streams`}
                                    </Text>
                                    <Text style={styles.switchSubText}>
                                        {`Receive notifications when a streamer you follow, posts a new stream `}
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
                                        {`Scheduled streams`}
                                    </Text>
                                    <Text style={styles.switchSubText}>
                                        {`Receive notifications about the streams you scheduled in “My streams” `}
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
                                    {`Terms and Conditions`}
                                </Text>
                                <images.svg.shareArrowTransparent style={styles.externalLinkIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.openPrivacy}
                                style={[styles.marginTop16, styles.switchGroupContainer]}>
                                <Text style={[styles.subCategoryHeaderText, styles.fontSize16]}>
                                    {`Privacy Notice`}
                                </Text>
                                <images.svg.shareArrowTransparent style={styles.externalLinkIcon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={this.closeSession}
                            style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <Text style={styles.finalButtonsText}>
                                {`Log Out`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.deleteAccountConfirmation}
                            style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <Text style={[styles.finalButtonsText, styles.deleteTextColor]}>
                                {`Delete Account`}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.bottomSeparation} />
                    </ScrollView>
                </View>
            </Modal >
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
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions || {}
    };
}

export default connect(mapStateToProps)(UserProfileModal);