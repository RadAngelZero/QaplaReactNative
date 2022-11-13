import React, { Component } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';

import styles from './style';
import images from './../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { getAvatarAnimations } from '../../services/database';

class AvatarReactionModal extends Component {
    state = {
        currentAnimation: 'breakDance',
        aspect: 9/16,
        animations: [],
        webViewLoaded: false
    };

    componentDidMount() {
        this.loadAnimations();
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

    onAnimationSelected = (animationId, animation) => {
        this.setState({ currentAnimation: animationId, webViewLoaded: false }, () => {
            setTimeout(() => {
                this.setState({ aspect: animation.camera.aspect });
            }, 1000);
        });
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                transparent>
                    <View style={styles.container}>
                        <View style={styles.mainContainer}>
                            <View style={styles.webViewContainer}>
                                <View style={{ width: '100%', aspectRatio: this.state.aspect }}>
                                    <WebView source={{
                                            uri: `https://web.qapla.gg/avatar/animation/${this.props.avatarId}/${this.state.currentAnimation}`
                                        }}
                                        onLoadEnd={() => this.setState({ webViewLoaded: true })}
                                        style={{ display: this.state.webViewLoaded ? 'flex' : 'none' }} />
                                </View>
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    top: 16,
                                    left: 16
                                }}
                                    onPress={this.props.onClose}>
                                    <images.svg.closeIcon />
                                </TouchableOpacity>
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
                                    <TouchableOpacity style={styles.confirmButton}
                                        onPress={() => this.props.onReactionSelected(this.state.currentAnimation)}>
                                        <Text style={styles.confirmButtonText}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
            </Modal>
        );
    }
}

export default AvatarReactionModal;