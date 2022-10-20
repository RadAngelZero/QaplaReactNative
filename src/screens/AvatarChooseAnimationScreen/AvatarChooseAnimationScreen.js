import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { getAvatarAnimations, saveUserGreetingAnimation } from '../../services/database';
import { translate } from '../../utilities/i18';

class AvatarChooseAnimationScreen extends Component {
    state = {
        currentAnimation: 'breakDance',
        aspect: 9/16,
        animations: {},
        webViewLoaded: false
    };

    componentDidMount() {
        this.loadAnimations();
    }

    loadAnimations = async () => {
        const animations = await getAvatarAnimations();
        this.setState({ animations: animations.val() });
    }

    onAnimationSelected = (animationId, animation) => {
        this.setState({ currentAnimation: animationId, webViewLoaded: false }, () => {
            setTimeout(() => {
                this.setState({ aspect: animation.camera.aspect });
            }, 1000);
        });
    }

    saveAnimation = async () => {
        const avatarId = this.props.navigation.getParam('avatarId');
        await saveUserGreetingAnimation(this.props.uid, avatarId, this.state.currentAnimation);
    }

    render() {
        const avatarId = this.props.navigation.getParam('avatarId');

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.webViewContainer}>
                    <View style={{ width: '100%', aspectRatio: this.state.aspect }}>
                        <WebView source={{
                                /* TODO: Replace uri with final url */
                                uri: `http://192.168.100.108:6969/avatar/animation/${avatarId}/${this.state.currentAnimation}`
                            }}
                            onLoadEnd={() => this.setState({ webViewLoaded: true })}
                            style={{ display: this.state.webViewLoaded ? 'flex' : 'none' }} />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.backIcon}>
                    <images.svg.backIcon />
                </TouchableOpacity>
                <View style={styles.selectorContainer}>
                    <View style={styles.optionsContainer}>
                        <ScrollView horizontal>
                            {Object.keys(this.state.animations).reverse().map((animationId) => (
                                <LinearGradient start={{x: 0.0, y: 1.0}}
                                    end={{x: 1.0, y: 1.0}}
                                    useAngle
                                    angle={135}
                                    colors={this.state.currentAnimation === animationId ? ['#FF9999', '#A87EFF'] : ['#141539', '#141539']}
                                    style={styles.optionButtonContainer}>
                                    <TouchableOpacity
                                        style={styles.optionButton}
                                        onPress={() => this.onAnimationSelected(animationId, this.state.animations[animationId])}>
                                        <Text style={styles.optionText}>
                                            {this.state.animations[animationId].name}
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.confirmButton} onPress={this.saveAnimation}>
                            <Text style={styles.confirmButtonText}>
                                {translate('avatarChooseAnimationScreen.confirmButton')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(AvatarChooseAnimationScreen);