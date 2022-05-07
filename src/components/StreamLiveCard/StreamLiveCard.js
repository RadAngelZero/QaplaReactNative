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
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

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

    renderBadges = (customRewardsMultipliers) => {
        let FirstBoostIcon = null;
        let SecondBoostIcon = null;

        const streamHasBoost = customRewardsMultipliers && (customRewardsMultipliers.xq > 1 || customRewardsMultipliers.qoins > 1);

        if (streamHasBoost) {
            if (customRewardsMultipliers.xq === customRewardsMultipliers.qoins) {
                switch (customRewardsMultipliers.xq) {
                    case 2:
                        FirstBoostIcon = () => <Images.svg.boostX2 />;
                        break;
                    case 3:
                        FirstBoostIcon = () => <Images.svg.boostX3 />;
                        break;
                    case 5:
                        FirstBoostIcon = () => <Images.svg.boostX5 />;
                        break;
                    case 10:
                        FirstBoostIcon = () => <Images.svg.boostX10 />;
                        break;
                    default:
                        break;
                }
            } else {
                switch (customRewardsMultipliers.qoins) {
                    case 2:
                        FirstBoostIcon = () => <Images.svg.boostX2 />;
                        break;
                    case 3:
                        FirstBoostIcon = () => <Images.svg.boostX3 />;
                        break;
                    case 5:
                        FirstBoostIcon = () => <Images.svg.boostX5 />;
                        break;
                    case 10:
                        FirstBoostIcon = () => <Images.svg.boostX10 />;
                        break;
                    default:
                        break;
                }
                switch (customRewardsMultipliers.xq) {
                    case 2:
                        SecondBoostIcon = () => <Images.svg.boostX2 />;
                        break;
                    case 3:
                        SecondBoostIcon = () => <Images.svg.boostX3 />;
                        break;
                    case 5:
                        SecondBoostIcon = () => <Images.svg.boostX5 />;
                        break;
                    case 10:
                        SecondBoostIcon = () => <Images.svg.boostX10 />;
                        break;
                    default:
                        break;
                }
            }
        }

        const ViewWithShadow = ({ children, style }) => (
            <View style={[{
                    borderRadius: 100,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }, style]}>
                {children}
            </View>
        );

        return (
            <>
                {FirstBoostIcon &&
                <ViewWithShadow style={{ marginRight: 5 }}>
                    <FirstBoostIcon />
                </ViewWithShadow>
                }
                {customRewardsMultipliers.qoins > 1 &&
                <ViewWithShadow style={{ marginRight: 5 }}>
                    <Images.svg.qoin />
                </ViewWithShadow>
                }
                {SecondBoostIcon &&
                <ViewWithShadow style={{ marginRight: 5 }}>
                    <SecondBoostIcon />
                </ViewWithShadow>
                }
                {customRewardsMultipliers.xq > 1 &&
                <ViewWithShadow>
                    <Images.svg.xq />
                </ViewWithShadow>
                }
            </>
        );
    }

    render() {
        const {
            title,
            thumbnailUrl,
            streamerPhoto,
            streamerName,
            idStreamer,
            streamerChannelLink,
            customRewardsMultipliers
        } = this.props.stream;

        let titleTranslated = this.getTextBasedOnUserLanguage(title);

        /**
         * 404 Twitch image for default (if the user does not have thumbnailUrl for any reason this prevent
         * the app from crashing)
         */
        let thumbnail = 'https://static-cdn.jtvnw.net/ttv-static/404_preview-480x270.jpg';

        if (thumbnailUrl) {
            thumbnail = thumbnailUrl.replace('{width}', '480').replace('{height}', '270');
        }

        const badges = this.renderBadges(customRewardsMultipliers);

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
                        <View style={styles.thumbnailContainer}>
                            <Image source={thumbnail ? { uri: thumbnail } : null}
                                style={styles.thumbnail}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', right: 24, top: 24 }}>
                                {badges}
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
                    <LinearGradient
                        style={styles.streamerDetails}
                        useAngle={true}
                        angle={150}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        colors={['#141539', '#141539']}>
                        <TouchableOpacity style={styles.streamerDetailsTouchable} onPress={() => this.props.onStreamerProfileButtonPress(idStreamer, streamerChannelLink)}>
                            <Image
                                style={styles.streamerPhoto}
                                source={streamerPhoto ? { uri: streamerPhoto } : null} />
                            <QaplaText style={styles.streamPlatformText}>
                                {streamerName}
                            </QaplaText>
                        </TouchableOpacity>
                    </LinearGradient>
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