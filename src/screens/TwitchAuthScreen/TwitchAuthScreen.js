import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    SafeAreaView,
    Alert,
    Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

import styles from './style';
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from '../../utilities/Constants';
import { getTwitchUserData } from '../../services/twitch';
import { saveTwitchData, isNewTwitchId, uidExists } from '../../services/database';
import { connect } from 'react-redux';
import { generateAuthTokenForTwitchSignIn } from '../../services/functions';
import { auth } from '../../utilities/firebase';
import Colors from '../../utilities/Colors';
import { translate } from '../../utilities/i18';

class TwitchAuthScreen extends Component {
    alreadyLoaded = false;
    state = {
        hideWebView: false,
        userAllowTracking: false
    };

    componentDidMount() {
        this.requestTrackingPermission();
    }

    async requestTrackingPermission() {
        const trackingStatus = await requestTrackingPermission();
        if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
            this.setState({ userAllowTracking: true });
        } else {
            Alert.alert(
                translate('linkTwitchAccount.rejectTrakingTitle'),
                translate('linkTwitchAccount.rejectTrakingMessage'),
                [
                    {
                        text: translate('linkTwitchAccount.rejectTrackingCancel'),
                        onPress: this.props.onTrackingReject
                    },
                    {
                        text: translate('linkTwitchAccount.rejectTrackingSettings'),
                        onPress: Linking.openSettings
                    }
                ]
            );
        }
    }

    async handleNavigation(data) {
        const url = data.url;
        let regex = /[#&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;

        while ((match = regex.exec(url))) {
            params[match[1]] = match[2];
        }
        const { access_token } = params;
        if (!this.alreadyLoaded && access_token) {
            this.setState({ hideWebView: true });

            this.alreadyLoaded = true;
            const data = await getTwitchUserData(access_token);

            // If uid exists a user is trying to link their account with Twitch
            if (this.props.uid) {
                if (await isNewTwitchId(data.id)) {
                    await saveTwitchData(this.props.uid, {
                        photoUrl: data.profile_image_url,
                        twitchAccessToken: access_token,
                        twitchId: data.id,
                        twitchUsername: data.display_name
                    });

                    if (this.props.onLinkSuccess) {
                        this.props.onLinkSuccess();
                    }
                } else {
                    Alert.alert('Error', 'Twitch account already linked with other Qapla account',
                    [
                        { text: "OK", onPress: this.props.onFail }
                    ]);
                }
                // If no uid we assume a user is trying to signin/signup with Twitch from the auth
            } else {
                const qaplaCustomAuthToken = await generateAuthTokenForTwitchSignIn(data.id, data.display_name, data.email);
                if (qaplaCustomAuthToken.data && qaplaCustomAuthToken.data.token) {

                    // Uid´s of users created with Twitch accounts are their Twitch id´s
                    if (await uidExists(data.id)) {
                        const user = await auth.signInWithCustomToken(qaplaCustomAuthToken.data.token);
                        await saveTwitchData(user.user.uid, {
                            photoUrl: data.profile_image_url,
                            twitchAccessToken: access_token,
                            twitchId: data.id,
                            twitchUsername: data.display_name
                        });
                        if (this.props.onAuthSuccessful) {
                            this.props.onAuthSuccessful(user, false);
                        }
                    } else {
                        // If the twitchId is not linked to other Qapla account
                        if (await isNewTwitchId(data.id)) {
                            const user = await auth.signInWithCustomToken(qaplaCustomAuthToken.data.token);
                            await saveTwitchData(user.user.uid, {
                                photoUrl: data.profile_image_url,
                                twitchAccessToken: access_token,
                                twitchId: data.id,
                                twitchUsername: data.display_name
                            });
                            if (this.props.onAuthSuccessful) {
                                this.props.onAuthSuccessful(user, true);
                            }
                        } else {
                            Alert.alert('Error', 'Twitch account already linked with other Qapla account',
                            [
                                { text: "OK", onPress: this.props.onFail }
                            ]);
                        }
                    }
                }
            }
        }
    }

    render() {
        const uri = `https://id.twitch.tv/oauth2/authorize?` +
            `client_id=${TWITCH_CLIENT_ID}&` +
            `redirect_uri=${TWITCH_REDIRECT_URI}&` +
            'response_type=token&' +
            `scope=user:read:email%20user:read:subscriptions%20user:read:follows%20user:read:broadcast`;

        if (this.state.userAllowTracking) {
            return (
                <SafeAreaView style={styles.sfvContainer}>
                    {!this.state.hideWebView ?
                        <View style={[styles.container, { opacity: this.state.hideWebView ? 0 : 1 }]}>
                            <WebView
                                source={{ uri }}
                                onNavigationStateChange={(data) => this.handleNavigation(data)}
                                scalesPageToFit={true} />
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#131833' }}>
                            <ActivityIndicator size='large' color={Colors.greenQapla} />
                        </View>
                    }
                </SafeAreaView>
            );
        }

        return null;
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(TwitchAuthScreen);