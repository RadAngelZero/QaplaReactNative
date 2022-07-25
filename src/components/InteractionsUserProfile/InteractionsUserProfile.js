import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { translate } from '../../utilities/i18';
import { getUserProfileGIFs } from '../../services/database';
import styles from './style';
import images from '../../../assets/images';

class InteractionsUserProfile extends Component {

    state = {
        textRotation: 'GIF',
        textRotationState: 0,
        GIFURL: '',
    }

    texts = ['GIF', 'Meme', 'Sticker', translate('interactions.feed.modal.message')]

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
            <View style={styles.mainContainer}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={images.png.InteractionGradient1.img}
                >
                    <Image
                        style={styles.gif}
                        source={{ uri: this.state.GIFURL }}
                        resizeMode={'contain'}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>
                            {`${translate('interactions.feed.modal.sendA')}\n`}
                            <Text style={styles.textAccentColor}>
                                {`${this.state.textRotation}`}
                            </Text>

                        </Text>
                        <Text style={[styles.textHeader, styles.textSubtitle]}>
                            {`${translate('userProfileScreen.interactions.liveToYourStreamer')}`}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                        <Text style={styles.buttonText}>
                            {`${translate('userProfileScreen.interactions.interact')}`}
                        </Text>
                    </TouchableOpacity>
                </ImageBackground >
            </View >
        );
    }
}

export default InteractionsUserProfile;