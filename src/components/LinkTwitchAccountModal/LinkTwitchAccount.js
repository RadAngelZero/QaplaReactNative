import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';
import TwitchAuthScreen from '../../screens/TwitchAuthScreen/TwitchAuthScreen';

class LinkTwitchAccount extends Component {
    state = {
        linking: false
    };

    goToTwitchLink = () => {
        this.setState({ linking: true });
    }

    successTwitchLink = () => {
        if (this.props.onLinkSuccessful) {
            this.props.onLinkSuccessful();
        }

        this.setState({ linking: false });
    }

    render() {
        return (
            <LinearGradient
                start={{
                    x: 0.03,
                    y: 0.08,
                }}
                end={{
                    x: 0.95,
                    y: 0.94,
                }}
                locations={[0, 1]}
                colors={['#A716EE', '#2C07FA']}
                style={styles.linkAccountContainer}>
                <View style={styles.fullHeightDialog}>
                    {!this.state.linking ?
                        <View style={styles.linkAccountBody}>
                            <View>
                                <images.svg.twitchExtrudedLogo />
                                <QaplaText style={styles.linkYouAccount}>
                                    Vincula tu cuenta
                                </QaplaText>
                                <Text style={styles.realTimeProgress}>
                                    ¡Tu progreso en tiempo real!
                                </Text>
                                <Text style={styles.linkDescription}>
                                    Recibe tus Qoins y XQ automáticamente al canjear puntos del canal de tu streamer.
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.linkButtonContainer}
                                onPress={this.goToTwitchLink}>
                                <Text style={styles.linkButtonText}>
                                    Vincular con Twitch
                                </Text>
                            </TouchableOpacity>
                        </View>
                    :
                        <TwitchAuthScreen onSuccess={this.successTwitchLink} />
                    }
                </View>
            </LinearGradient>
        );
    }
}

export default LinkTwitchAccount;
