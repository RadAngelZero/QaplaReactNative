import React, { Component } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import { translate } from '../../utilities/i18';
import Colors from '../../utilities/Colors';
import { saveAvatarBackground } from '../../services/database';
import images from '../../../assets/images';
import { retrieveData } from '../../utilities/persistance';

class AvatarChooseBackgroundScreen extends Component {
    state = {
        selectedColor: this.props.avatarBackground ? this.props.avatarBackground : Colors.avatarImagesBackgroundGradients[0],
        selectedColorIndex: 0,
        openSuccessEditionModal: false,
        imageLoaded: false,
        imageVersion: null
    };

    componentDidMount() {
        this.getColorIndex();
        this.getImageVersion();
    }

    getColorIndex = () => {
        let selectedColorIndex = 0;
        if (this.props.avatarBackground) {
            let index = Colors.avatarImagesBackgroundGradients
                .findIndex(({ colors }) => colors[0] === this.props.avatarBackground.colors[0] && colors[0] === this.props.avatarBackground.colors[0]);

            if (index) {
                selectedColorIndex = index;
            }
        }

        this.setState({ selectedColorIndex });
    }

    getImageVersion = async () => {
        let imageVersion = Number(await retrieveData('avatarImageVersion'));
        let avatarId = this.props.navigation.getParam('avatarId');

        /**
         * For the purpouse of loading images faster ready player me makes a cache of the images on their side
         * which is something great, the problem is that every time the user makes any change on the avatar
         * the image is not updated, we change the version so the cache is not a factor here (because here
         * we always have changes on the avatar).
         * It takes a while to generate the image for ready player me, so we fetch here the image to prevent a
         * timeout in the Image component
         */
        const image = `https://api.readyplayer.me/v1/avatars/${avatarId}.png?scene=fullbody-portrait-v1-transparent&version=${imageVersion}`;
        await fetch(image);

        this.setState({ imageVersion });
    }

    saveBackground = async () => {
        await saveAvatarBackground(this.props.uid, this.state.selectedColor);
        let avatarId = this.props.navigation.getParam('avatarId');
        let editingAvatar = this.props.navigation.getParam('edit', false);

        if (editingAvatar) {
            this.setState({ openSuccessEditionModal: true });
        } else {
            this.props.navigation.navigate('AvatarChooseAnimationScreen', { avatarId });
        }
    }

    closeModal = () => {
        this.setState({ openSuccessEditionModal: false });
        this.props.navigation.navigate('UserProfileModal');
    }

    render() {
        let avatarId = this.props.navigation.getParam('avatarId');
        const image = `https://api.readyplayer.me/v1/avatars/${avatarId}.png?scene=fullbody-portrait-v1-transparent&version=${this.state.imageVersion}`;

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient useAngle
                            angle={this.state.selectedColor.angle}
                            colors={this.state.selectedColor.colors}
                            style={styles.avatarImage}>
                            {!this.state.imageLoaded &&
                                <View style={styles.loader}>
                                    <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                                </View>
                            }
                            {this.state.imageVersion !== null &&
                                <Image style={[styles.avatarImage]}
                                    source={{ uri: image }}
                                    onLoadEnd={() => this.setState({ imageLoaded: true })} />
                            }
                        </LinearGradient>
                    </View>
                    {this.state.imageLoaded ?
                        <>
                        <Text style={styles.instructions}>
                            {translate('avatarChooseBackgroundScreen.pickABackground')}
                        </Text>
                        <Text style={styles.description}>
                            {translate('avatarChooseBackgroundScreen.description')}
                        </Text>
                        </>
                        :
                        <Text style={[styles.description, { color: '#FFF' }]}>
                            {translate('avatarChooseBackgroundScreen.loading')}
                        </Text>
                    }
                </View>
                <View style={styles.selectorContainer}>
                    <View style={styles.optionsContainer}>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false}>
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
                        <TouchableOpacity style={[styles.confirmButton, {
                                opacity: this.state.imageLoaded ? 1 : .4
                            }]}
                            onPress={this.saveBackground}
                            disabled={!this.state.imageLoaded}>
                            <Text style={styles.confirmButtonText}>
                                {translate('avatarChooseBackgroundScreen.useBackground')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={this.state.openSuccessEditionModal}
                    transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.closeModalIcon} onPress={this.closeModal}>
                                <images.svg.closeIcon />
                            </TouchableOpacity>
                            <Image style={styles.editedImage}
                                source={images.gif.thatsRad.img} />
                            <Text style={styles.modalTitle}>
                                {translate('avatarChooseBackgroundScreen.aviUpdated')}
                            </Text>
                            <TouchableOpacity style={styles.modalButton} onPress={this.closeModal}>
                                <Text style={styles.modalButtonText}>
                                    {translate('avatarChooseBackgroundScreen.backToProfile')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        avatarBackground: state.userReducer.user.avatarBackground
    };
}

export default connect(mapStateToProps)(AvatarChooseBackgroundScreen);