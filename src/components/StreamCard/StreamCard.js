import React from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
import Images from '../../../assets/images';
import Colors from '../../utilities/Colors';

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

    render() {
        const {
            title,
            backgroundImage,
            streamerPhoto,
            streamerName,
            timestamp
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
                        <View style={{ display: 'flex', width: '100%', height: '100%' }}>
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
                                    <View style={{ display: 'flex', transform: [{ scale: 0.8 }], marginHorizontal: '-2%', backgroundColor: '#ff00' }}>
                                        <Images.svg.activityQoin />
                                    </View>
                                }
                                {this.state.xq &&
                                    <View style={{ display: 'flex', transform: [{ scale: 0.8 }], marginHorizontal: '-2%', backgroundColor: '#ff00' }}>
                                        <Images.svg.activityXQ />
                                    </View>
                                }
                            </View>
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
                        <View style={styles.dateSubContainer}>
                            <ClockIcon width={22} height={22} />
                            <QaplaText style={styles.dateText}>
                                {`${streamHour} ${hourSuffix}`}
                            </QaplaText>
                        </View>
                    </View>
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