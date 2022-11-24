import React, { Component } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import { translate } from '../../utilities/i18';
import { getRandomAvatarAnimationGif, getUserGreetingData } from '../../services/database';
import SignUpModal from '../SignUpModal/SignUpModal';

class GreetingsShortcut extends Component {
    state = {
        greeting: undefined,
        gif: '',
        openSignUpModal: false,
        greeting: undefined
    };

    componentDidMount() {
        this.getRandomGif();
        this.getUserGreeting();
    }

    getUserGreeting = async () => {
        const greeting = await getUserGreetingData(this.props.uid);
        if (greeting.exists() && greeting.val().TTS && greeting.val().animation) {
            this.setState({ greeting: greeting.val() });
        } else {
            this.setState({ greeting: null });
        }
    }

    getRandomGif = async () => {
        const gif = await getRandomAvatarAnimationGif();
        this.setState({ gif: gif.val() });
    }

    redirectOnPress = () => {
        if (this.props.uid) {
            this.setState({ openSignUpModal: false });
            if (this.state.greeting) {
                return this.props.navigation.navigate('GreetingStackNavigator');
            }

            return this.props.navigation.navigate('AvatarStackNavigator');
        } else {
            this.setState({ openSignUpModal: true });
        }
    }

    onSignUpSuccess = async () => {
        await this.getUserGreeting();
        this.redirectOnPress();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageBackground}>
                    <ImageBackground style={styles.backgroundGif}
                        source={this.state.gif ? { uri: this.state.gif } : null}>
                        <View>
                            <Text style={styles.title}>
                                {translate('greetingsShortcut.showUp')}
                            </Text>
                            <Text style={styles.subtitle}>
                                {translate('greetingsShortcut.usingAvi')}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.button}
                            disabled={this.state.greeting === undefined}
                            onPress={this.redirectOnPress}>
                            <Text style={styles.buttonText}>
                                {translate('greetingsShortcut.popUp')}
                            </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <SignUpModal open={this.state.openSignUpModal}
                    onClose={() => this.setState({ openSignUpModal: false })}
                    title={translate('signUpModalGreetingsShortcut.title')}
                    benefits={[
                        translate('signUpModalGreetingsShortcut.benefit1'),
                        translate('signUpModalGreetingsShortcut.benefit2')
                    ]}
                    onSignUpSuccess={this.onSignUpSuccess}
                    gifLibrary='CreateAvatar' />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}


export default connect(mapStateToProps)(withNavigation(GreetingsShortcut));