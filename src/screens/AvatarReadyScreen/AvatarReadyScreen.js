import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { getAvatarAnimationCameraAspectRatio, getUserGreetingAnimation } from '../../services/database';

class AvatarReadyScreen extends Component {
    state = {
        avatarId: '',
        animationId: '',
        cameraAspectRatio: 0,
        webViewLoaded: false
    };

    componentDidMount() {
        this.loadAnimationData();
    }

    loadAnimationData = async () => {
        const animationData = await getUserGreetingAnimation(this.props.uid);
        const cameraAspectRatio = await getAvatarAnimationCameraAspectRatio(animationData.val().animationId);
        this.setState({ ...animationData.val(), cameraAspectRatio: cameraAspectRatio.val() });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.webViewContainer}>
                    {this.state.cameraAspectRatio > 0 && this.state.avatarId !== '' && this.state.animationId !== '' &&
                        <View style={{ width: '100%', aspectRatio: this.state.cameraAspectRatio }}>
                            <WebView source={{
                                    /* TODO: Replace uri with final url */
                                    uri: `http://192.168.100.108:6969/avatar/animation/${this.state.avatarId}/${this.state.animationId}`
                                }}
                                onError={(e) => console.log(e)}
                                onLoadEnd={() => this.setState({ webViewLoaded: true })}
                                style={{ display: this.state.webViewLoaded ? 'flex' : 'none' }} />
                        </View>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.dismiss()}
                    style={styles.closeIcon}>
                    <images.svg.closeIcon />
                </TouchableOpacity>
                <LinearGradient style={styles.modal}
                    useAngle
                    angle={136.25}
                    colors={['#A716EE', '#2C07FA']}>
                    <View style={styles.modalContainer}>
                        <View>
                            <Text style={[styles.text, styles.title]}>
                                Your Avi is ready
                            </Text>
                            <Text style={[styles.text, styles.description]}>
                                Say hi from the app or the Twitch extension whenever you show up on a stream
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.props.navigation.navigate('SendGreetingStackNavigator')}>
                            <Text style={styles.confirmButtonText}>
                                Send now on Stream
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 16, marginTop: 16 }}
                            onPress={() => this.props.navigation.dismiss()}>
                            <Text style={[styles.confirmButtonText, { color: '#FFF' }]}>
                                Back to Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(AvatarReadyScreen);