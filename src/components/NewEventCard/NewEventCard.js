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
    state = {
        showEventDetailsModal: false,
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

    toogleEventDetailsModalVisibility = () => {
        this.props.onPress(this.props.stream);
        /* trackOnSegment('User open event', {
            EventId: this.props.eventId,
            EventIsSponsored: this.props.sponsorImage ? true : false,
            featuredEvent: this.props.featured,
            EventStreamer: this.props.streamerName,
            EventGame: this.props.game
        });

        this.setState({ showEventDetailsModal: !this.state.showEventDetailsModal }); */
    }

    render() {
        const {
            title,
            titulo,
            backgroundImage,
            streamerPhoto,
            streamerName,
            sponsorImage,
            gradientColors,
            featured,
            timestamp
        } = this.props.stream;

        const eventDate = new Date(timestamp);

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const eventDay = translate(`days.${days[eventDate.getDay()]}`);

        let day = eventDate.getDate();
        const hourSuffix = eventDate.getHours() >= 12 ? 'p.m.' : 'a.m.';
        let hour = eventDate.getHours() % 12;
        hour = hour ? hour : 12;
        let minute = eventDate.getMinutes() > 9 ? eventDate.getMinutes() : `0${eventDate.getMinutes()}`;
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
                        //change this later
                        // source={backgroundImage ? { uri: backgroundImage } : null}
                        source={{ uri: 'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_Minecraft_image1600w.jpg' }}
                    >
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
                        <QaplaText numberOfLines={3} style={styles.title}>
                            {titleTranslated}
                        </QaplaText>
                    </View>
                    {/* <Image
                        style={styles.eventSponsorImage}
                        source={sponsorImage ? { uri: sponsorImage } : null} /> */}
                    <View style={styles.dateContainer}>
                        <View style={styles.dateSubContainer}>
                            <CalendarIcon width={22} height={22} />
                            <QaplaText style={styles.dateText}>
                                {`${eventDay} ${day}`}
                            </QaplaText>
                        </View>
                        <View style={styles.dateSubContainer}>
                            <ClockIcon width={22} height={22} />
                            <QaplaText style={styles.dateText}>
                                {`${eventHour} ${hourSuffix}`}
                            </QaplaText>
                        </View>
                    </View>
                    <LinearGradient
                        style={styles.streamerDetails}
                        useAngle={true}
                        angle={150}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        colors={['#AA16EE', '#07EAFA']}
                    >
                        <Image
                            style={styles.streamerPhoto}
                            source={streamerPhoto ? { uri: streamerPhoto } : null} />
                        <QaplaText style={styles.streamPlatformText}>
                            {streamerName}
                        </QaplaText>
                    </LinearGradient>
                </View>
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