import React, { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';

class AvatarCreationHeaderBar extends Component {
    render() {
        let edit = this.props.navigation.getParam('edit', false);
        let closeIcon =
            this.props.currentScreen === 'AvatarOnboardingScreen'
            ||
            this.props.currentScreen === 'AvatarCreatorScreen'
            ||
            this.props.currentScreen === 'AvatarReadyScreen'
            ||
            this.props.currentScreen === 'AvatarEditScreen'
            ||
            (edit
                &&
                this.props.currentScreen === 'AvatarChooseAnimationScreen'
            );
        let darkScreen = this.props.currentScreen === 'AvatarChooseAnimationScreen' || this.props.currentScreen === 'AvatarReadyScreen';

        return (
            <SafeAreaView style={{
                backgroundColor: darkScreen ? 'transparent' : '#0D1021'
            }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity
                        style={styles.backButtonContainer}
                        onPress={() => closeIcon ? this.props.navigation.dismiss() : this.props.navigation.pop()}>
                        {closeIcon ?
                            <images.svg.closeIcon style={styles.backButtonShadow} />
                            :
                            <images.svg.backIcon style={styles.backButtonShadow} />
                        }
                    </TouchableOpacity>
                    {this.props.currentScreen === 'AvatarChooseGreetingMessageScreen' &&
                        <Text style={styles.titleText}>
                            💬 Text-to-speech
                        </Text>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentScreen: state.screensReducer.currentScreenId
    };
}

export default connect(mapStateToProps)(AvatarCreationHeaderBar);