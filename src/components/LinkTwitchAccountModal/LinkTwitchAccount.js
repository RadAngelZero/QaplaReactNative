import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';
import TwitchAuthScreen from '../../screens/TwitchAuthScreen/TwitchAuthScreen';
import { translate } from '../../utilities/i18';

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

    successTwitchAuth = (user, isNewUser) => {
        if (this.props.onAuthSuccessful) {
            this.props.onAuthSuccessful(user, isNewUser);
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
                                    {translate('linkTwitchAccount.linkAccount')}
                                </QaplaText>
                                <Text style={styles.linkDescription}>
                                    {this.props.linkingWithQreatorCode ?
                                        translate('linkTwitchAccount.descriptionQreatorCode')
                                        :
                                        translate('linkTwitchAccount.description')
                                    }
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.linkButtonContainer}
                                onPress={this.goToTwitchLink}>
                                <Text style={styles.linkButtonText}>
                                    {translate('linkTwitchAccount.linkButton')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    :
                        <TwitchAuthScreen onLinkSuccess={this.successTwitchLink}
                            onAuthSuccessful={this.successTwitchAuth}
                            onFail={this.props.onFail} />
                    }
                </View>
            </LinearGradient>
        );
    }
}

export default LinkTwitchAccount;
