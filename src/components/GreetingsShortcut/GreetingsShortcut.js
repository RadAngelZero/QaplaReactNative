import React, { Component } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import { getRandomAvatarAnimationGif } from '../../services/database';

class GreetingsShortcut extends Component {
    state = {
        greeting: undefined,
        gif: ''
    };

    componentDidMount() {
        this.getRandomGif();
    }

    getRandomGif = async () => {
        const gif = await getRandomAvatarAnimationGif();
        this.setState({ gif: gif.val() });
    }

    redirectOnPress = () => {
        if (this.props.uid) {
            if (this.props.greeting) {
                return this.props.navigation.navigate('GreetingStackNavigator');
            }

            return this.props.navigation.navigate('AvatarStackNavigator');
        } else {
            return this.props.navigation.navigate('Auth');
        }
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
                            disabled={this.props.greeting === undefined}
                            onPress={this.redirectOnPress}>
                            <Text style={styles.buttonText}>
                                {translate('greetingsShortcut.popUp')}
                            </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
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