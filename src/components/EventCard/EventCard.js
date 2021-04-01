// diego           - 11-12-2019 - us165 - Validate if the user is logged before execute joinEvent
// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { getLocaleLanguage } from '../../utilities/i18';
import EventDetailsModal from '../EventDetailsModal/EventDetailsModal';
import QaplaText from '../QaplaText/QaplaText';
import { trackOnSegment } from '../../services/statistics';

function EventCardContainer({ isSponsored, children, onPress, gradientColors }) {
    if (isSponsored) {
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
            <TouchableWithoutFeedback onPress={onPress}>
                <LinearGradient
                    useAngle={true}
                    angle={150}
                    angleCenter={{ x: .5, y: .5}}
                    colors={validColors ? [gradientColors.primary, gradientColors.secondary] : ['#AA16EE', '#07EAfA']}
                    style={styles.container}>
                    {children}
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

class EventCard extends Component {
    state = {
        showEventDetailsModal: false
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
            featured
        } = this.props;

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
                gradientColors={gradientColors}>
                <ImageBackground
                    style={styles.backgroundImageContainer}
                    imageStyle={styles.backgroundImage}
                    source={{ uri: backgroundImage }}>
                    <View style={styles.titleContainer}>
                        <QaplaText numberOfLines={3} style={styles.title}>
                            {titleTranslated}
                        </QaplaText>
                    </View>
                    <View style={styles.body}>
                        <Image
                            style={styles.eventSponsorImage}
                            source={{ uri: sponsorImage }} />
                        <View style={styles.streamerDetails}>
                            <QaplaText style={styles.streamPlatformText}>
                                {streamerName}
                            </QaplaText>
                            <Image
                                style={styles.streamerPhoto}
                                source={{ uri: streamerPhoto }} />
                        </View>
                    </View>
                </ImageBackground>
                <EventDetailsModal
                    open={this.state.showEventDetailsModal}
                    onClose={this.toogleEventDetailsModalVisibility}
                    eventId={idLogro} />
            </EventCardContainer>
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

export default connect(mapDispatchToProps)(withNavigation(EventCard));