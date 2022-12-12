import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { translate } from '../../utilities/i18';

import styles from './style';
import images from '../../../assets/images';
import { getRandomGifByLibrary } from '../../services/database';

class UploadContent extends Component {
    state = {
        gif: null
    };

    componentDidMount() {
        this.getGif();
    }

    getGif = async () => {
        const gif = await getRandomGifByLibrary('UploadContent');
        this.setState({ gif: gif.val() });
    }

    goToAddTags = async () => {
        return this.props.navigation.navigate('AddTags');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={this.goToAddTags}
                >
                    <View style={styles.cardContainer}>
                        {this.state.gif &&
                            <Image
                                source={{ uri: this.state.gif }}
                                style={styles.backgroundImage} />
                        }
                        <View style={styles.backgroundAttenuation} />
                        <images.svg.fileUpload />
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitleText}>
                                {translate('uploadContent.uploadScreen.title')}
                            </Text>
                            <Text style={styles.cardSubtitleText}>
                                {translate('uploadContent.uploadScreen.subtitle')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.cardButton}
                            onPress={this.goToAddTags}
                        >
                            <Text style={styles.cardTextButton}>
                                {translate('uploadContent.uploadFile')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default UploadContent;