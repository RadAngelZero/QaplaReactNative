import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import Colors from '../../utilities/Colors';
import { saveAvatarBackground } from '../../services/database';

class AvatarChooseBackgroundScreen extends Component {
    state = {
        selectedColor: Colors.avatarImagesBackgroundGradients[0],
        selectedColorIndex: 0
    };

    saveBackground = async () => {
        await saveAvatarBackground(this.props.uid, this.state.selectedColor);
        let avatarId = this.props.navigation.getParam('avatarId');
        this.props.navigation.navigate('AvatarChooseAnimationScreen', { avatarId });
    }

    render() {
        let avatarId = this.props.navigation.getParam('avatarId');
        const image = `https://api.readyplayer.me/v1/avatars/${avatarId}.png?scene=fullbody-portrait-v1-transparent`;

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.closeIcon}>
                    <images.svg.backIcon />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.spacing} />
                    <View style={styles.avatarContainer}>
                        <LinearGradient useAngle
                            angle={this.state.selectedColor.angle}
                            colors={this.state.selectedColor.colors}
                            style={{ borderRadius: 100 }}>
                            <Image style={styles.avatarImage} source={{ uri: image }} />
                        </LinearGradient>
                    </View>
                    <Text style={styles.instructions}>
                        {translate('avatarChooseBackgroundScreen.pickABackground')}
                    </Text>
                    <Text style={styles.description}>
                        {translate('avatarChooseBackgroundScreen.description')}
                    </Text>
                </View>
                <View style={styles.selectorContainer}>
                    <View style={styles.optionsContainer}>
                        <ScrollView horizontal>
                            {Colors.avatarImagesBackgroundGradients.map((background, index) => (
                                <TouchableOpacity
                                    onPress={() => this.setState({ selectedColor: background, selectedColorIndex: index })}>
                                    <LinearGradient
                                        useAngle
                                        angle={background.angle}
                                        colors={background.colors}
                                        style={[styles.optionButtonContainer, {
                                            borderWidth: this.state.selectedColorIndex === index ? 3 : 0,
                                            borderColor: '#00FFDD'
                                        }]}>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.confirmButton} onPress={this.saveBackground}>
                            <Text style={styles.confirmButtonText}>
                                {translate('avatarChooseBackgroundScreen.useBackground')}
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

export default connect(mapStateToProps)(AvatarChooseBackgroundScreen);