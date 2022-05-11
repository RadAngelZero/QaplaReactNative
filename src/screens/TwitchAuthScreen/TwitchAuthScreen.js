import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Alert
} from 'react-native';
import { WebView } from 'react-native-webview';

import styles from './style';
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from '../../utilities/Constants';
import { getTwitchUserData } from '../../services/twitch';
import { saveTwitchData, isNewTwitchId, uidExists } from '../../services/database';
import { connect } from 'react-redux';
import { generateAuthTokenForTwitchSignIn } from '../../services/functions';
import { auth } from '../../utilities/firebase';

class TwitchAuthScreen extends Component {
    alreadyLoaded = false;

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

                    if (this.props.onSuccess) {
                        this.props.onSuccess();
                    }

                    if (this.props.navigation) {
                        const successLinkCallback = this.props.navigation.getParam('onSuccess', () => {});

                        successLinkCallback();

                        const back = this.props.navigation.getParam('back', false);
                        if (back) {
                            this.props.navigation.goBack();
                        } else {
                            this.props.navigation.dismiss();
                        }
                    }
                } else {
                    Alert.alert('Error', 'Twitch user already linked with other account',
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]);
                }
                // If no uid we assume a user is trying to signin/signup with Twitch from the auth
            } else {
                const qaplaCustomAuthToken = await generateAuthTokenForTwitchSignIn(data.id, data.display_name, data.email);
                console.log(qaplaCustomAuthToken);
                if (qaplaCustomAuthToken.data && qaplaCustomAuthToken.data.token) {
                    console.log(qaplaCustomAuthToken.data);
                    const user = await auth.signInWithCustomToken(qaplaCustomAuthToken.data.token);

                    if (await uidExists(user.user.uid)) {
                        console.log('Old user');
                        // User signing in (account already exists)
                    } else {
                        console.log('New user');
                        // User signing up (new account)
                    }
                }
            }
        }
    }

    render() {
        const url = `https://id.twitch.tv/oauth2/authorize?` +
            `client_id=${TWITCH_CLIENT_ID}&` +
            `redirect_uri=${TWITCH_REDIRECT_URI}&` +
            'response_type=token&' +
            `scope=user:read:email%20user:read:subscriptions%20user:read:follows%20user:read:broadcast`;

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <WebView
                        source={{
                            uri: url
                        }}
                        onNavigationStateChange={(data) => this.handleNavigation(data)}
                        scalesPageToFit={true} />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(TwitchAuthScreen);