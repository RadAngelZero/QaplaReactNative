import React, { Component } from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';

import styles from './style';
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from '../../utilities/Constants';
import { getTwitchUserData } from '../../services/twitch';
import { getTwitchAuthUser } from '../../services/functions';
import { authWithCustomToken } from '../../services/auth';
import { getUidWithTwitchId, saveUidForTwitchUsers, saveTwitchAccessToken } from '../../services/database';

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
            const uid = await getUidWithTwitchId(data.id);
            let user = {};

            // If the user already exists
            if (uid.exists()) {
                const authData = await getTwitchAuthUser(data.display_name, data.profile_image_url, data.email, uid.val());
                user = await authWithCustomToken(authData.data.token);
                saveTwitchAccessToken(uid.val(), access_token);
            } else {
                // New user
                const authData = await getTwitchAuthUser(data.display_name, data.profile_image_url, data.email);
                user = await authWithCustomToken(authData.data.token);
                saveUidForTwitchUsers(user.user.uid, data.id);
                user.additionalUserInfo.isNewUser = true;
                saveTwitchAccessToken(user.user.uid, access_token);
            }


            const succesfullSignIn = this.props.navigation.getParam('succesfullSignIn');
            succesfullSignIn(user);
        }
    }

    render() {
        const url = `https://id.twitch.tv/oauth2/authorize?` +
            `client_id=${TWITCH_CLIENT_ID}&` +
            `redirect_uri=${TWITCH_REDIRECT_URI}&` +
            'response_type=token&' +
            `scope=user:read:email%20user:edit%20bits:read%20user:edit%20channel:read:subscriptions%20channel:manage:redemptions`;

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

export default TwitchAuthScreen;