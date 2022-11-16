import React, { Component } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';

import styles from './style';
import images from './../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { createUserName, createUserProfile, getRandomGifByLibrary, getRandomSignUpGif, updateUserLoggedStatus, userHaveTwitchId } from '../../services/database';
import { setupGoogleSignin, signInWithApple, signInWithGoogle } from '../../services/auth';
import TwitchAuthScreen from '../../screens/TwitchAuthScreen/TwitchAuthScreen';
import LinkTwitchAccountModal from '../LinkTwitchAccountModal/LinkTwitchAccountModal';

class SignUpModal extends Component {
    state = {
        gif: null,
        gifAspectRatio: 1,
        linkingWithTwitch: false,
        showLinkWitTwitchModal: false
    };

    componentDidMount() {
        setupGoogleSignin();
    }

    getGif = async () => {
        const gif = await getRandomGifByLibrary(this.props.gifLibrary);
        Image.getSize(gif.val(), (width, height) => {
            this.setState({ gif: gif.val(), gifAspectRatio: width / height });
        });
    }

    signUpWithApple = async () => {
        const user = await signInWithApple();
        await this.successfulSignIn(user);
    }

    successfulSignIn = async (user) => {
        if (user.additionalUserInfo.isNewUser) {
            if (user.user.providerData && user.user.providerData[0] && user.user.providerData[0].displayName) {
                createUserName(user.user.uid, user.user.providerData[0].displayName);
            }
            this.setState({ showLinkWitTwitchModal: true });
        } else {
            updateUserLoggedStatus(true, user.user.uid);

            if (user.user.providerData && user.user.providerData[0] && user.user.providerData[0].displayName) {
                createUserName(user.user.uid, user.user.providerData[0].displayName);
            }

            const userHaveTwitchLinked = await userHaveTwitchId(user.user.uid);
            if (!userHaveTwitchLinked) {
                this.setState({ showLinkWitTwitchModal: true });
            } else {
                return this.props.onSignUpSuccess();
            }
        }
    }

    successfulTwitchSignIn = (user, isNewUser) => {
        this.setState({ uid: user.user.uid, email: user.user.email }, async () => {
            if (isNewUser) {
                await createUserProfile(user.user.uid, user.user.email, user.user.displayName);
            }

            updateUserLoggedStatus(true, user.user.uid);

            return this.props.onSignUpSuccess();
        })
    }

    signWithGoogle = async () => {
        const user = await signInWithGoogle();
        await this.successfulSignIn(user);
    }

    closeTwitchLinkModal = () => {
        this.props.onClose();
        this.setState({ showLinkWitTwitchModal: false });
    }

    render() {
        let showIOSButton = Platform.OS === 'ios' && appleAuth.isSignUpButtonSupported;

        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                onShow={this.getGif}
                transparent>
                <ScrollView contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'>
                    <LinearGradient useAngle
                        angle={135.64}
                        colors={['#A716EE', '#2C07FA']}
                        style={styles.mainContainer}>
                        {this.state.linkingWithTwitch ?
                            <TwitchAuthScreen onAuthSuccessful={this.successfulTwitchSignIn}
                                onFail={() => this.setState({ linkingWithTwitch: false })} />
                        :
                            <>
                            <View style={styles.closeIconContainer}>
                                <TouchableOpacity onPress={this.props.onClose}>
                                    <images.svg.closeIcon />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signUpContainer}>
                                <View style={styles.signUpGifContainer}>
                                    <Image style={[styles.signUpGif, {
                                            aspectRatio: this.state.gifAspectRatio
                                        }]}
                                        source={this.state.gif ?
                                            {
                                                uri: this.state.gif
                                            }
                                            :
                                            null
                                        } />
                                </View>
                                <Text style={styles.title}>
                                    {this.props.title}
                                </Text>
                                <View style={styles.benefitsList}>
                                    {this.props.benefits.map((benefit) => (
                                        <Text style={styles.benefit}>
                                            {benefit}
                                        </Text>
                                    ))}
                                </View>
                                <View style={styles.signUpOptions}>
                                    {showIOSButton ?
                                        <TouchableOpacity style={[styles.signUpOption, styles.appleSignUp]}
                                            onPress={this.signUpWithApple}>
                                            {/* Padding not necessary because icon already include it */}
                                            <images.svg.appleAuth />
                                            <Text style={styles.appleSignUpText}>
                                                Continue with Apple
                                            </Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={[styles.signUpOption, styles.appleSignUp]}
                                            onPress={this.signWithGoogle}>
                                            <View style={{ padding: 10 }}>
                                                <images.svg.googleIcon />
                                            </View>
                                            <Text style={styles.appleSignUpText}>
                                                Continue with Google
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity style={[styles.signUpOption, styles.twitchSignUp]}
                                        onPress={() => this.setState({ linkingWithTwitch: true })}>
                                        <View style={{ padding: 8 }}>
                                            <images.svg.twitchDark />
                                        </View>
                                        <Text style={styles.twitchSignUpText}>
                                            Continue with Twitch
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </>
                        }
                    </LinearGradient>
                </ScrollView>
                <LinkTwitchAccountModal open={this.state.showLinkWitTwitchModal}
                    onClose={this.closeTwitchLinkModal}
                    onLinkSuccessful={this.props.onSignUpSuccess}
                    // User is now logged, even if he does not link their Twitch account
                    onSkipTwitchLink={this.props.onSignUpSuccess} />
            </Modal>
        );
    }
}

SignUpModal.defaultProps = {
    gifLibrary: 'SignUp'
};

export default SignUpModal;