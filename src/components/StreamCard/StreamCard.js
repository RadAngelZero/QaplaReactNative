import React from 'react';
import { View, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
import Images from '../../../assets/images';
import Colors from '../../utilities/Colors';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

const CalendarIcon = Images.svg.calendar;
const ClockIcon = Images.svg.clock;

const StreamCardContainer = ({ children, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}
        style={styles.container}>
        <View style={styles.container}>
            {children}
        </View>
    </TouchableWithoutFeedback>
);

class StreamCard extends React.PureComponent {
    state = {
        boost: [false, false, false, true],
        qoins: true,
        xq: true,
    };

    /**
     * Select the correct stream text content according to the language used by the user
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

    tooglestreamDetailsModalVisibility = () => {
        this.props.onPress(this.props.stream);
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

        return (
            <>
                {FirstBoostIcon &&
                    <FirstBoostIcon />
                }
                {customRewardsMultipliers.qoins > 1 &&
                    <Images.svg.qoin />
                }
                {SecondBoostIcon &&
                    <SecondBoostIcon />
                }
                {customRewardsMultipliers.xq > 1 &&
                    <Images.svg.xq />
                }
            </>
        );
    }

    render() {
        let {
            title,
            backgroundImage,
            streamerPhoto,
            streamerName,
            timestamp,
            idStreamer,
            streamerChannelLink,
            customRewardsMultipliers
        } = this.props.stream;

        const streamDate = new Date(timestamp);

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const streamDay = translate(`days.${days[streamDate.getDay()]}`);

        let day = streamDate.getDate();
        const hourSuffix = streamDate.getHours() >= 12 ? 'p.m.' : 'a.m.';
        let hour = streamDate.getHours() % 12;
        hour = hour ? hour : 12;
        let minute = streamDate.getMinutes() > 9 ? streamDate.getMinutes() : `0${streamDate.getMinutes()}`;
        const streamHour = `${hour}:${minute}`;

        let titleTranslated = this.getTextBasedOnUserLanguage(title);

        const badges = this.renderBadges(customRewardsMultipliers);

        return (
            <StreamCardContainer onPress={this.tooglestreamDetailsModalVisibility}>
                <LinearGradient
                    style={styles.backgroundImageContainer}
                    useAngle={true}
                    angle={150}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#AA16EE', '#07EAFA']}>
                    <ImageBackground
                        imageStyle={styles.backgroundImage}
                        style={styles.backgroundImageContainer}
                        source={backgroundImage ? { uri: backgroundImage } : null}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', right: 24, top: 24 }}>
                            {badges}
                        </View>
                    </ImageBackground>
                </LinearGradient>
                <View style={styles.body}>
                    <View style={styles.titleContainer}>
                        <QaplaText numberOfLines={2} style={styles.title}>
                            {titleTranslated}
                        </QaplaText>
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateSubContainer}>
                            <CalendarIcon width={22} height={22} />
                            <QaplaText style={styles.dateText}>
                                {`${streamDay} ${day}`}
                            </QaplaText>
                        </View>
                        <View
                            style={{
                                width: 22,
                            }}
                        />
                        <View style={styles.dateSubContainer}>
                            <ClockIcon width={22} height={22} />
                            <QaplaText style={styles.dateText}>
                                {`${streamHour} ${hourSuffix}`}
                            </QaplaText>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.props.onStreamerProfileButtonPress(idStreamer, streamerChannelLink)}>
                        <LinearGradient
                            style={styles.streamerDetails}
                            useAngle={true}
                            angle={95}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            colors={Colors.featuredStreamsGradients[this.props.index] || ['#141539', '#141539']}>
                            <Image
                                style={styles.streamerPhoto}
                                source={streamerPhoto ? { uri: streamerPhoto } : null} />
                            <QaplaText style={styles.streamPlatformText}>
                                {streamerName}
                            </QaplaText>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </StreamCardContainer>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        gamerTags: state.userReducer.user.gamerTags,
        discordTag: state.userReducer.user.discordTag,
        games: state.gamesReducer.games
    }
}

export default connect(mapDispatchToProps)(withNavigation(StreamCard));