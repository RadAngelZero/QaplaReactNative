import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';
import { translate } from '../../utilities/i18';

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
                                    {translate('skipLinkTwitchAccount.important')}
                                </QaplaText>
                            </View>
                            <Text style={styles.reminder}>
                                {translate('skipLinkTwitchAccount.reminder')}
                            </Text>
                            <Text style={styles.linkDescription}>
                                {translate('skipLinkTwitchAccount.description')}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.skipLinkButtonContainer}>
                            <Text style={styles.skipLinkButtonText}>
                                {translate('skipLinkTwitchAccount.continue')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

export default SkipLinkTwitchAccount;
