import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
import Images from '../../../assets/images';
import Colors from '../../utilities/Colors';

const StreamCardContainer = ({ children, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}
        style={styles.liveContainer}>
        <View style={styles.liveContainer}>
            {children}
        </View>
    </TouchableWithoutFeedback>
);

class StreamCardLive extends Component {

    render() {
        return (
            <StreamCardContainer onPress={this.props.onPress}>
                <LinearGradient
                    style={styles.backgroundImageContainer}
                    useAngle={true}
                    angle={150}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#AA16EE', '#07EAFA']}>
                    <ImageBackground
                        imageStyle={styles.backgroundImage}
                        style={styles.backgroundImageContainer}
                        source={{ uri: this.props.streamImage }}>
                        <Image source={{uri: this.props.streamImage}} />
                    </ImageBackground>
                </LinearGradient>
                <View style={styles.liveBody}>
                    <LinearGradient
                        style={styles.streamerDetails}
                        useAngle={true}
                        angle={95}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        colors={this.props.featured ? Colors.featuredStreamsGradients[this.props.index] : ['#141539', '#141539']}>
                        <TouchableOpacity style={styles.streamerDetailsTouchable} onPress={() => this.props.onStreamerProfileButtonPress(idStreamer, streamerChannelLink)}>
                            <Image
                                style={styles.streamerPhoto}
                                source={{ uri: this.props.streamerPhoto }} />
                            <QaplaText style={styles.streamPlatformText} numberOfLines={1} ellipsizeMode='tail'>
                                {this.props.streamerName}
                            </QaplaText>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </StreamCardContainer>
        );
    }
}

export default StreamCardLive;