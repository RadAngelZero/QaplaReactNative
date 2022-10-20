import React, { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './style';
import { saveAvatarUrl, saveReadyPlayerMeAvatarId, saveReadyPlayerMeUserId } from '../../services/database';
import images from '../../../assets/images';

class AvatarCreator extends Component {
    webview = null;
    isSubscribed = false;
    count = 0;

    subscribe = () => {
        if (this.isSubscribed) {
            return;
        }

        this.isSubscribed = true;
        this.webview.postMessage(
            JSON.stringify({
                target: 'readyplayerme',
                type: 'subscribe',
                eventName: 'v1.avatar.exported'
            })
        );
    }

    process = (data) => {
        const json = JSON.parse(data);

        // Filter for only Ready Player Me Events
        if (json.source && json.source !== 'readyplayerme') {
            return;
        }

        if (json.eventName === 'v1.avatar.exported') {
            this.onAvatarExported(json.data);
        }

        if (json.eventName !== 'v1.subscription.deleted') {
            this.count++;

            if (this.count > 4) {
                this.webview.postMessage(
                    JSON.stringify({
                        target: 'readyplayerme',
                        type: 'unsubscribe'
                    })
                );
            }
        }
    }

    onAvatarExported = async (data) => {
        /**
         * data.url is always: https://models.readyplayer.me/{avatarId}.glb
         * so we extract the avatarId by doing a substring from the last '/' index + 1 and
         * then removing the '.glb'
         * As it is a route to a file the last '/' is before the {avatarId}.glb even if there are changes
         * on the base url, and also can not be nothing else after the '.glb' because it is a rout to a file
         */
        const avatarId = data.url.substring(data.url.lastIndexOf('/') + 1).replace('.glb', '');

        await saveReadyPlayerMeAvatarId(this.props.uid, avatarId);

        // Save url and user id
        await saveAvatarUrl(this.props.uid, `https://api.readyplayer.me/v1/avatars/${avatarId}.glb`);
        if (data.userId) {
            await saveReadyPlayerMeUserId(this.props.uid, data.userId);
        }

        // Navgate to other place
        this.props.navigation.navigate('AvatarChooseBackgroundScreen', { avatarId });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.onClose}
                    style={styles.closeIcon}>
                    <images.svg.closeIcon />
                </TouchableOpacity>
                <WebView ref={(webview) => this.webview = webview}
                    source={{
                        uri: 'https://qapla.readyplayer.me/avatar?frameApi',
                    }}
                    style={styles.webView}
                    onLoad={this.subscribe}
                    onMessage={(message) => this.process(message.nativeEvent.data)} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(AvatarCreator);