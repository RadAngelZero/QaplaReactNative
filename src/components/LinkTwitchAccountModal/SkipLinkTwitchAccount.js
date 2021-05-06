import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';

class SkipLinkTwitchAccount extends Component {
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
                colors={['#FA8A07', '#EE1661']}
                style={styles.linkAccountContainer}>
                <View style={styles.fullHeightDialog}>
                    <View style={styles.linkAccountBody}>
                        <View>
                            <images.svg.twitchExtrudedLogo />
                            <View style={styles.alertContainer}>
                                <images.svg.alertIcon />
                                <QaplaText style={styles.important}>
                                    Importante
                                </QaplaText>
                            </View>
                            <Text style={styles.reminder}>
                                Te recordamos que las cuentas no vinculadas con Twitch no podrán recibir sus canjes del canal 😭 
                            </Text>
                            <Text style={styles.linkDescription}>
                                Pero no te preocupes, siempre puedes vincular tu cuenta desde tu perfil 😉
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.skipLinkButtonContainer}>
                            <Text style={styles.skipLinkButtonText}>
                                Deseo continuar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

export default SkipLinkTwitchAccount;
