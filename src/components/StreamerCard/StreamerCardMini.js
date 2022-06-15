import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QaplaText from '../QaplaText/QaplaText';
import styles from './style';

class StreamerCardMini extends Component {

    render() {
        return (
            <TouchableOpacity>
                <LinearGradient
                    style={styles.streamerDetails}
                    useAngle={true}
                    angle={95}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#141539', '#141539']}>
                    <Image
                        style={styles.streamerPhoto}
                        source={{ uri: this.props.streamerPhoto }} />
                    <QaplaText style={styles.streamPlatformText} numberOfLines={1} ellipsizeMode='tail'>
                        {this.props.streamerName}
                    </QaplaText>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

export default StreamerCardMini;