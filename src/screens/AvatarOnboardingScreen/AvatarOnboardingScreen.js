import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import LinearGradient from 'react-native-linear-gradient';
import { translate } from '../../utilities/i18';

class AvatarOnboardingScreen extends Component {
    state = {
        step: 0,
    };

    scrollView = null;

    handleScroll = ({ nativeEvent: { contentOffset } }) => {
        this.setState({ step: Math.round(contentOffset.x / widthPercentageToPx(100)) });
    }

    handleButton = () => {
        if (this.state.step === 0) {
            this.scrollView.scrollTo({ x: widthPercentageToPx(100), animated: false });
            this.setState({ step: 1 });
        } else {
            this.props.navigation.navigate('AvatarCreatorScreen');
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView ref={(scrollView) => this.scrollView = scrollView}
                    style={styles.scrollView}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={1}>
                    <View style={styles.reactionSample}>
                        <Image source={images.png.reactionSample.img} />
                    </View>
                    <View style={styles.reactionSample}>
                        <Image style={styles.animationGif} source={images.gif.swing.img} />
                    </View>
                </ScrollView>
                <View style={styles.stepsContainer}>
                    <View style={[styles.steps, { opacity: this.state.step === 0 ? 1 : 0.5, marginRight: 16 }]} />
                    <View style={[styles.steps, { opacity: this.state.step === 1 ? 1 : 0.5 }]} />
                </View>
                <LinearGradient style={styles.modal}
                    useAngle
                    angle={136.25}
                    colors={['#A716EE', '#2C07FA']}>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalTextTitle}>
                            {this.state.step === 0 ?
                                translate('avatarOnboardingScreen.react')
                            :
                                translate('avatarOnboardingScreen.powerUpSub')
                            }
                        </Text>
                        <Text style={styles.modalTextDescription}>
                            {this.state.step === 0 ?
                                translate('avatarOnboardingScreen.description1')
                            :
                                translate('avatarOnboardingScreen.description2')
                            }
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.handleButton}>
                        <Text style={styles.buttonText}>
                            {this.state.step === 0 ?
                                translate('avatarOnboardingScreen.next')
                            :
                                translate('avatarOnboardingScreen.createMyAvatar')
                            }
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

export default AvatarOnboardingScreen;