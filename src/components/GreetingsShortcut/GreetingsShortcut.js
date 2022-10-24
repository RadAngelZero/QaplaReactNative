import React, { Component } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import { getRandomAvatarAnimationGif, getUserGreetingData } from '../../services/database';

class GreetingsShortcut extends Component {
    state = {
        greeting: undefined,
        gif: ''
    };

    componentDidMount() {
        this.getUserGreeting();
        this.getRandomGif();
    }

    getUserGreeting = async () => {
        const greeting = await getUserGreetingData(this.props.uid);
        this.setState({ greeting: greeting.val() });
    }

    getRandomGif = async () => {
        const gif = await getRandomAvatarAnimationGif();
        this.setState({ gif: gif.val() });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ImageBackground style={styles.imageBackground}
                    source={images.png.popUpBackground.img}>
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
                            onPress={() => this.state.greeting ? this.props.navigation.navigate('GreetingStackNavigator') : this.props.navigation.navigate('AvatarStackNavigator')}>
                            <Text style={styles.buttonText}>
                                {translate('greetingsShortcut.popUp')}
                            </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </ImageBackground>
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