import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './style';

class StreamerCardMini extends Component {

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onStreamerProfileButtonPress(idStreamer, streamerChannelLink)}>
                <LinearGradient
                    style={styles.streamerDetails}
                    useAngle={true}
                    angle={95}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#141539', '#141539']}>
                    <Image
                        style={styles.streamerPhoto}
                        source={streamerPhoto ? { uri: this.props.streamerPhoto } : null} />
                    <QaplaText style={styles.streamPlatformText} numberOfLines={1} ellipsizeMode='tail'>
                        {this.props.streamerName}
                    </QaplaText>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

export default StreamerCardMini;