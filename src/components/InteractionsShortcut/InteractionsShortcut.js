import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { translate } from '../../utilities/i18';
import { getUserProfileGIFs } from '../../services/database';
import styles from './style';
import images from '../../../assets/images';

class InteractionsShortcut extends Component {

    state = {
        textRotation: 'GIF',
        textRotationState: 0,
        GIFURL: '',
    }

    texts = ['GIFs', 'Emotes', 'TTS', 'Memes']

    componentDidMount() {
        getUserProfileGIFs().then((data) => {
            const GIFsURLs = [];
            data.forEach((gif) => {
                GIFsURLs.push(gif.val().url);
            });
            const random = Math.floor(Math.random() * GIFsURLs.length);
            this.setState({ GIFURL: GIFsURLs[random] });
        });
        this.textRotator = setInterval(() => {
            if (this.state.textRotationState >= this.texts.length - 1) {
                this.setState({ textRotation: this.texts[0], textRotationState: 0 });

            } else {
                this.setState({ textRotation: this.texts[this.state.textRotationState + 1], textRotationState: this.state.textRotationState + 1 });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.textRotator);
    }

    render() {
        return (
            <View style={styles.bigMainContainer}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={images.png.InteractionGradient1.img}
                >
                    <View style={[styles.textContainer, {
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }]}>
                        <View >
                            <Text style={styles.bigTextHeader}>
                                {`${translate('interactions.feed.modal.sendA')} `}
                                <Text style={styles.textAccentColor}>
                                    {this.state.textRotation}
                                </Text>
                            </Text>
                            <Text style={[styles.textHeader, styles.textSubtitle]}>
                                {translate('interactionsShortcut.liveToYourStreamer')}
                            </Text>
                        </View>
                        <TouchableOpacity style={[styles.button, {alignSelf: 'flex-start'}]} onPress={this.props.onPress}>
                            <Text style={styles.buttonText}>
                                {translate('interactionsShortcut.send')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        style={styles.gif}
                        source={{ uri: this.state.GIFURL }}
                        resizeMode={'contain'}
                    />
                </ImageBackground >
            </View >
        );
    }
}

export default InteractionsShortcut;