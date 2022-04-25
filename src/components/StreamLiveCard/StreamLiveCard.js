import React from 'react';
import { View, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { getLocaleLanguage } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
import { trackOnSegment } from '../../services/statistics';
import Images from './../../../assets/images';

const StreamCardContainer = ({ children, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}
        style={styles.container}>
        <View style={styles.container}>
            {children}
        </View>
    </TouchableWithoutFeedback>
);

class StreamLiveCard extends React.PureComponent {
    state = {
        boost: [false, false, false, true],
        qoins: true,
        xq: true,
    };

    /**
     * Select the correct event text content according to the language used by the user
     * in the app.
     *
     * @param {object} textLangObj Object containing in JSON format a text content for each
     *                             language supported by the app
     */
    getTextBasedOnUserLanguage = (textLangObj) => {
        let res = '';
        const userLanguage = getLocaleLanguage();

        if (textLangObj && textLangObj[userLanguage]) {
            res = textLangObj[userLanguage];
        }

        return res;
    }

    goToStreamerChannel = () => {
        Linking.openURL(this.props.stream.streamerChannelLink);
        trackOnSegment('User press live card', {
            Streamer: this.props.stream.streamerName,
            StreamId: this.props.stream.id
        });
    }

    render() {
        const {
            title,
            thumbnailUrl,
            streamerPhoto,
            streamerName,
            idStreamer
        } = this.props.stream;

        let titleTranslated = this.getTextBasedOnUserLanguage(title);

        let thumbnail = thumbnailUrl.replace('{width}', '480').replace('{height}', '270');

        return (
            <StreamCardContainer onPress={this.goToStreamerChannel}>
                <LinearGradient
                    style={styles.backgroundImageContainer}
                    useAngle={true}
                    angle={150}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#AA16EE', '#07EAFA']}>
                    <ImageBackground
                        imageStyle={styles.backgroundImage}
                        style={styles.backgroundImageContainer}
                        blurRadius={5}
                        source={thumbnail ? { uri: thumbnail } : null}>
                        <View style={{ display: 'flex', width: '100%', height: '100%' }}>
                            <Image source={thumbnail ? { uri: thumbnail } : null}
                                style={{
                                    position: 'absolute',
                                    top: 28,
                                    left: 0,
                                    right: 0,
                                    height: 160
                                }}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f0f0', marginTop: 24, marginRight: 24, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                {this.state.boost[0] &&
                                    <View style={{ display: 'flex', transform: [{ scale: 1.1 }], marginHorizontal: '-1.4%', backgroundColor: '#ff00' }}>
                                        <Images.svg.boostX2 />
                                    </View>
                                }
                                {this.state.boost[1] &&
                                    <View style={{ display: 'flex', transform: [{ scale: 1.1 }], marginHorizontal: '-1.4%', backgroundColor: '#ff00' }}>
                                        <Images.svg.boostX3 />
                                    </View>
                                }
                                {this.state.boost[2] &&
                                    <View style={{ display: 'flex', transform: [{ scale: 1.1 }], marginHorizontal: '-1.4%', backgroundColor: '#ff00' }}>
                                        <Images.svg.boostX5 />
                                    </View>
                                }
                                {this.state.boost[3] &&
                                    <View style={{ display: 'flex', transform: [{ scale: 1.1 }], marginHorizontal: '-1.4%', backgroundColor: '#ff00' }}>
                                        <Images.svg.boostX10 />
                                    </View>
                                }
                                {this.state.qoins &&
                                    <View style={{ display: 'flex', transform: [{ scale: 1.3 }], marginHorizontal: '-1%', backgroundColor: '#ff00', marginTop: 10 }}>
                                        <Images.svg.qoin />
                                    </View>
                                }
                                {this.state.xq &&
                                    <View style={{ display: 'flex', transform: [{ scale: 1.3 }], marginLeft: '2%', marginRight: '-2%', backgroundColor: '#ff00', marginTop: 10 }}>
                                        <Images.svg.activityXQ />
                                    </View>
                                }
                            </View>
                        </View>
                    </ImageBackground>
                </LinearGradient>
                <View style={styles.body}>
                    <View style={styles.titleContainer}>
                        <QaplaText numberOfLines={3} style={styles.title}>
                            {titleTranslated}
                        </QaplaText>
                    </View>
                    <View style={{ height: 16 }} />
                    <TouchableOpacity onPress={() => this.props.onStreamerProfileButtonPress(idStreamer)}>
                        <LinearGradient
                            style={styles.streamerDetails}
                            useAngle={true}
                            angle={150}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            colors={['#141539', '#141539']}>
                            <Image
                                style={styles.streamerPhoto}
                                source={streamerPhoto ? { uri: streamerPhoto } : null} />
                            <QaplaText style={styles.streamPlatformText}>
                                {streamerName}
                            </QaplaText>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </StreamCardContainer >
        );
    }
}

function mapDispatchToProps(state) {
    return {
        uid: state.userReducer.user.id,
        games: state.gamesReducer.games
    }
}

export default connect(mapDispatchToProps)(withNavigation(StreamLiveCard));