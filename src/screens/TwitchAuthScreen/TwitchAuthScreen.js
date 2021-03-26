import React, { Component } from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';

import styles from './style';
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from '../../utilities/Constants';
import { getTwitchUserData } from '../../services/twitch';
import { saveTwitchData } from '../../services/database';
import { connect } from 'react-redux';

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

            if (this.props.uid) {
                saveTwitchData(this.props.uid, {
                    photoUrl: data.profile_image_url,
                    twitchAccessToken: access_token,
                    twitchId: data.id,
                    twitchUsername: data.display_name
                });

                this.props.navigation.navigate('Profile');
            }
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

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(TwitchAuthScreen);