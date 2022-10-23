import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import { getAvatarAnimationCameraAspectRatio, getAvatarAnimations, getUserGreetingAnimation, saveUserGreetingAnimation } from '../../services/database';
import { translate } from '../../utilities/i18';

class AvatarChooseAnimationScreen extends Component {
    state = {
        currentAnimation: 'breakDance',
        aspect: 9/16,
        animations: [],
        webViewLoaded: false
    };

    componentDidMount() {
        this.loadAnimations();
        const edit = this.props.navigation.getParam('edit', false);
        if (edit) {
            this.loadUserAnimation();
        }
    }

    loadAnimations = async () => {
        const animationsSnap = await getAvatarAnimations();
        const animations = [];

        // Put the animations in the array is not yet relevant but it will be in a near future
        animationsSnap.forEach((animation) => {
            animations.push({ ...animation.val(), key: animation.key });
        });

        this.setState({ animations });
    }

    loadUserAnimation = async () => {
        const userAnimation = await getUserGreetingAnimation(this.props.uid);
        const aspectRatio = await getAvatarAnimationCameraAspectRatio(userAnimation.val().animationId);

        this.setState({
            aspect: aspectRatio.val(),
            currentAnimation: userAnimation.val().animationId
        });
    }

    onAnimationSelected = (animationId, animation) => {
        this.setState({ currentAnimation: animationId, webViewLoaded: false }, () => {
            setTimeout(() => {
                this.setState({ aspect: animation.camera.aspect });
            }, 1000);
        });
    }

    saveAnimation = async () => {
        await saveUserGreetingAnimation(this.props.uid, this.state.currentAnimation);

        const edit = this.props.navigation.getParam('edit', false);
        this.props.navigation.navigate('AvatarChooseGreetingMessageScreen', { edit });
    }

    render() {
        const avatarId = this.props.navigation.getParam('avatarId');

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.webViewContainer}>
                    <View style={{ width: '100%', aspectRatio: this.state.aspect }}>
                        <WebView source={{
                                uri: `https://web.qapla.gg/avatar/animation/${avatarId}/${this.state.currentAnimation}`
                            }}
                            onLoadEnd={() => this.setState({ webViewLoaded: true })}
                            style={{ display: this.state.webViewLoaded ? 'flex' : 'none' }} />
                    </View>
                </View>
                <View style={styles.selectorContainer}>
                    <View style={styles.optionsContainer}>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false}>
                            {this.state.animations.map((animation) => (
                                <LinearGradient start={{x: 0.0, y: 1.0}}
                                    end={{x: 1.0, y: 1.0}}
                                    useAngle
                                    angle={135}
                                    colors={this.state.currentAnimation === animation.key ? ['#FF9999', '#A87EFF'] : ['#141539', '#141539']}
                                    style={styles.optionButtonContainer}>
                                    <TouchableOpacity
                                        style={styles.optionButton}
                                        onPress={() => this.onAnimationSelected(animation.key, animation)}>
                                        <Text style={styles.optionText}>
                                            {animation.name}
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