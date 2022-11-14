import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import WebView from 'react-native-webview';

import styles from './style';
import { retrieveData, storeData } from '../../utilities/persistance';

class CreateAvatarModal extends Component {
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

        await storeData('avatarId', avatarId);

        if (data.userId) {
            await storeData('rpmUid', data.userId);
        }

        /**
         * As the user probably made some changes in the avatar we assume every time that this is a new version
         * for the 2D image of the user
         */
        let imageVersion = Number(await retrieveData('avatarImageVersion'));

        imageVersion++;

        await storeData('avatarImageVersion', imageVersion.toString());

        this.props.onAvatarCreated(avatarId, data.userId);
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <WebView ref={(webview) => this.webview = webview}
                            source={{
                                uri: 'https://qapla.readyplayer.me/avatar?frameApi',
                            }}
                            style={styles.webView}
                            onLoad={this.subscribe}
                            onMessage={(message) => this.process(message.nativeEvent.data)} />
                    </View>
                </View>
            </Modal>
        );
    }
}

export default CreateAvatarModal;