import React from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { getDateElementsAsNumber, getHourElementsAsNumber, copyDataToClipboard } from '../../utilities/utils';

import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import EventDetailsModal from '../EventDetailsModal/EventDetailsModal';
import QaplaText from '../QaplaText/QaplaText';
import { trackOnSegment } from '../../services/statistics';
import Images from './../../../assets/images';

const CalendarIcon = Images.svg.calendar;
const ClockIcon = Images.svg.clock;

function EventCardContainer({ isSponsored, children, onPress, gradientColors }) {
    const validColorRegExp = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
    let validColors = false;
    if (gradientColors) {
        if (gradientColors.primary.charAt(0) !== '#') {
            gradientColors.primary = `#${gradientColors.primary}`
        }
        if (gradientColors.secondary.charAt(0) !== '#') {
            gradientColors.secondary = `#${gradientColors.secondary}`
        }
        validColors = validColorRegExp.test(gradientColors.primary) && validColorRegExp.test(gradientColors.secondary);
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}
            style={styles.container}>
            {/* <LinearGradient
                useAngle={true}
                angle={150}
                angleCenter={{ x: .5, y: .5 }}
                colors={validColors ? [gradientColors.primary, gradientColors.secondary] : [isSponsored ? '#AA16EE' : 'transparent', isSponsored ? '#07EAFA' : 'transparent']}
                style={styles.container}> */}
            <View style={styles.container}>
                {children}
            </View>
            {/* </LinearGradient> */}
        </TouchableWithoutFeedback>
    );
}

class NewEventCard extends React.PureComponent {
    currentTime = new Date().getTime();
    // 86,400,000 = 24 hours on milliseconds
    limitToShowEventAsNew = this.currentTime - 86400000;

    state = {
        showEventDetailsModal: false,
        boost: [false, false, false, true],
        qoins: true,
        xq: true,
    };

    componentDidMount() {
        if (this.props.eventToDisplay === this.props.idLogro) {
            this.setState({ showEventDetailsModal: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.eventToDisplay !== prevProps.eventToDisplay) {
            if (this.props.eventToDisplay === this.props.idLogro) {
                this.setState({ showEventDetailsModal: true });
            } else if (this.state.showEventDetailsModal) {
                this.setState({ showEventDetailsModal: false });
            }
        }
    }

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

    toogleEventDetailsModalVisibility = () => {
        trackOnSegment('User open event', {
            EventId: this.props.eventId,
            EventIsSponsored: this.props.sponsorImage ? true : false,
            featuredEvent: this.props.featured,
            EventStreamer: this.props.streamerName,
            EventGame: this.props.game
        });

        this.setState({ showEventDetailsModal: !this.state.showEventDetailsModal });
    }

    render() {
        const {
            title,
            titulo,
            backgroundImage,
            streamerPhoto,
            streamerName,
            sponsorImage,
            idLogro,
            gradientColors,
            featured,
            createdAt,
            hourUTC,
            dateUTC,
        } = this.props;

        let [day, month, year] = getDateElementsAsNumber(dateUTC);

        let [hour, minute] = getHourElementsAsNumber(hourUTC);

        const eventDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const eventDay = translate(`days.${days[eventDate.getDay()]}`);

        day = eventDate.getDate();
        const hourSuffix = eventDate.getHours() >= 12 ? 'p.m.' : 'a.m.';
        hour = eventDate.getHours() % 12;
        hour = hour ? hour : 12;
        minute = eventDate.getMinutes() > 9 ? eventDate.getMinutes() : `0${eventDate.getMinutes()}`;
        const eventHour = `${hour}:${minute}`;

        let titleTranslated = this.getTextBasedOnUserLanguage(title);

        // (01-04-2020) Events on 2019 and early 2020 used 'titulos' and 'descripcion' props,
        // as a result of a change on the events structure data in db descriptions and title
        // were added for internationalization. These two if conditions for 'descriptionTranslated'
        // and 'titleTranslated' are to check that the props exists in the db event element,
        // otherwise a fallback is used (not ideal situation, but to prevent app crashes to the
        // user)
        if (titleTranslated === '') {
            titleTranslated = titulo;
        }

        if (createdAt >= this.limitToShowEventAsNew) {
            console.log('Mostrar como nuevo', idLogro);
        }

        return (
            <EventCardContainer
                isSponsored={(sponsorImage || featured) ? true : false}
                onPress={this.toogleEventDetailsModalVisibility}
                gradientColors={gradientColors}
                style={styles.eventCardContainer}>
                <LinearGradient
                    style={styles.backgroundImageContainer}
                    useAngle={true}
                    angle={150}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#AA16EE', '#07EAFA']}
                >
                    <ImageBackground
                        imageStyle={styles.backgroundImage}
                        style={styles.backgroundImageContainer}
                        blurRadius={5}
                        //change this later
                        // source={backgroundImage ? { uri: backgroundImage } : null}
                        source={{ uri: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_zilverk-480x270.jpg' }}
                    >
                        <View style={{ display: 'flex', width: '100%', height: '100%' }}>
                            <Image source={{ uri: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_zilverk-480x270.jpg' }}
                                style={{
                                    position: 'absolute',
                                    top: 28,
                                    left: 0,
                                    right: 0,
                                    height: 160,

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
                    {/* <Image
                        style={styles.eventSponsorImage}
                        source={sponsorImage ? { uri: sponsorImage } : null} /> */}
                    <View style={{ height: 16 }} />
                    <LinearGradient
                        style={styles.streamerDetails}
                        useAngle={true}
                        angle={150}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        colors={['#141539', '#141539']}
                    >
                        <Image
                            style={styles.streamerPhoto}
                            source={streamerPhoto ? { uri: streamerPhoto } : null} />
                        <QaplaText style={styles.streamPlatformText}>
                            {streamerName}
                        </QaplaText>
                    </LinearGradient>
                </View>
                <EventDetailsModal
                    open={this.state.showEventDetailsModal}
                    onClose={this.toogleEventDetailsModalVisibility}
                    eventId={idLogro} />
            </EventCardContainer >
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

export default connect(mapDispatchToProps)(withNavigation(NewEventCard));