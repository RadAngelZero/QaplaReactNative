import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, ScrollView, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import QaplaChip from '../../components/QaplaChip/QaplaChip';
import QaplaText from '../../components/QaplaText/QaplaText';
import SocialLinkContainedButton from '../../components/SocialLinkContainedButton/SocialLinkContainedButton';
import { getStreamerPublicProfile, getStreamerSocialLinks } from '../../services/database';
import { getLocaleLanguage, translate } from './../../utilities/i18';
import styles from './style';

const socialMediaIcons = {
    Twitch: images.svg.twitchLight,
    Instagram: images.svg.instagram,
    Twitter: images.svg.twitter,
    Discord: images.svg.discordSocial,
    TikTok: images.svg.tikTok
}

class StreamerProfileScreen extends Component {
    state = {
        showAllTags: false,
        nextStreams: [],
        socialLinks: [],
        streamerData: {
            displayName: '',
            photoUrl: '',
            streamerId: '',
            bio: '',
            backgroundUrl: '',
            badge: false,
            tags: []
        }
    };

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.loadStreamerData);

        this.loadStreamerData();
    }

    loadStreamerData = async () => {
        let streamerData = this.props.navigation.getParam('streamerData', null);
        let streamerId = '';

        if (!streamerData) {
            // If the data does not exist then the user comes from a deep link and we only have the streamerId
            streamerId = this.props.navigation.getParam('streamerId', '');

            // So we get the streamer public profile data directly from the database
            const streamerData = await getStreamerPublicProfile(streamerId);

            this.setState({ streamerData: streamerData.val() });
        } else {
            streamerId = streamerData.streamerId;

            this.setState({ streamerData });
        }

        const streamerLinks = await getStreamerSocialLinks(streamerId);

        if (streamerLinks.exists()) {
            this.setState({ socialLinks: streamerLinks.val() });
        }

        // Determine upcoming events and sort it by time
        const streamerEvents = Object.keys(this.props.logros.logrosActivos)
        .filter((eventId) => this.props.logros.logrosActivos[eventId].idStreamer && this.props.logros.logrosActivos[eventId].idStreamer === streamerId)
        .map((eventId) => this.props.logros.logrosActivos[eventId]).sort((a, b) => a.timestamp - b.timestamp);

        // Only show the 3 most upcoming streams
        this.setState({ nextStreams: streamerEvents.slice(0, 3) });
    }

    formatStreamDate = (timestamp) => {
        const today = new Date();
        const streamDate = new Date(timestamp);
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const streamDayName = today.getDate() === streamDate.getDate() ?
            translate('days.today')
            :
            today.getDate() + 1 === streamDate.getDate() ?
                translate('days.tomorrow')
                :
                translate(`days.${days[streamDate.getDay()]}`);
        let streamDayNumber = '';

        if (streamDayName !== translate('days.today') && streamDayName !== translate('days.tomorrow')) {
            streamDayNumber = streamDate.getDate() < 10 ? `0${streamDate.getDate()}` : streamDate.getDate();
        }

        return `${streamDayName} ${streamDayNumber}`;
    }

    formatStreamHour = (timestamp) => {
        const streamDate = new Date(timestamp);
        const hourSuffix = streamDate.getHours() >= 12 ? 'p.m.' : 'a.m.';
        hour = streamDate.getHours() % 12;
        hour = hour ? hour : 12;
        minute = streamDate.getMinutes() > 9 ? streamDate.getMinutes() : `0${streamDate.getMinutes()}`;

        return `${hour}:${minute} ${hourSuffix}`;
    }

    onSocialButtonPress = (url) => Linking.openURL(url);

    render() {
        const {
            displayName,
            photoUrl,
            streamerId,
            bio,
            backgroundUrl,
            badge,
            tags
        } = this.state.streamerData;
        const userLanguage = getLocaleLanguage();

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.topNav}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <images.svg.backIcon />
                        </TouchableOpacity>
                    </View>
                    <Image source={backgroundUrl ? { uri: backgroundUrl } : null}
                        style={styles.backgroundImage} />
                    <View style={styles.photoContainer}>
                        <Image source={photoUrl ? { uri: photoUrl } : null}
                            style={styles.photo} />
                    </View>
                    <View style={styles.profileContainer}>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity>
                                <View style={styles.followButton}>
                                    <QaplaText style={styles.followButtonText}>
                                        Seguir
                                    </QaplaText>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.iconContainer}>
                                <images.svg.share />
                            </View>
                            <View style={styles.iconContainer}>
                                <images.svg.sendIcon />
                            </View>
                        </View>
                        <View style={styles.nameContainer}>
                            <QaplaText style={styles.streamerName}>
                                {displayName}
                            </QaplaText>
                            {badge &&
                                <images.svg.founderBadge style={{ marginTop: 8 }} />
                            }
                        </View>
                        <QaplaText style={styles.bio}>
                            {bio}
                        </QaplaText>
                        {tags &&
                            <View style={styles.tagsContainer}>
                                {!this.state.showAllTags ?
                                <>
                                    {tags.slice(0, 5).map((tag) => (
                                        <QaplaChip style={styles.tagsMargin}>
                                            {tag}
                                        </QaplaChip>
                                    ))}
                                    {tags.length > 5 &&
                                        <TouchableOpacity onPress={() => this.setState({ showAllTags: true })}>
                                            <images.svg.moreCircle />
                                        </TouchableOpacity>
                                    }
                                </>
                                :
                                <>
                                    {tags.map((tag) => (
                                        <QaplaChip style={styles.tagsMargin}>
                                            {tag}
                                        </QaplaChip>
                                    ))}
                                    <TouchableOpacity onPress={() => this.setState({ showAllTags: false })}>
                                        <images.svg.lessCircle />
                                    </TouchableOpacity>
                                </>
                                }
                            </View>
                        }
                        {this.state.nextStreams.length > 0 &&
                            <View style={styles.upcomingStreamsContainer}>
                                <QaplaText style={styles.upcomingStreamsTitle}>
                                    Próximos streams
                                </QaplaText>
                                {this.state.nextStreams.map((nextStream) => (
                                    <>
                                        <LinearGradient useAngle={true}
                                            angle={133.34}
                                            style={styles.upcomingStreamImageLinearGradientBackground}
                                            colors={['#2C07FA', '#A716EE']}
                                            >
                                            <Image style={styles.upcomingStreamImage}
                                                source={{ uri: nextStream.backgroundImage }} />
                                        </LinearGradient>
                                        <QaplaText style={styles.upcomingStreamTitle}>
                                            {nextStream.title[userLanguage]}
                                        </QaplaText>
                                        <View style={styles.nextStreamTimeContainer}>
                                            <View style={styles.timeContainer}>
                                                <images.svg.calendar style={{ alignSelf: 'center' }} />
                                                <QaplaText style={styles.timeText}>
                                                    {this.formatStreamDate(nextStream.timestamp)}
                                                </QaplaText>
                                            </View>
                                            <View style={styles.timeContainer}>
                                                <images.svg.clock />
                                                <QaplaText style={styles.timeText}>
                                                    {this.formatStreamHour(nextStream.timestamp)}
                                                </QaplaText>
                                            </View>
                                        </View>
                                    </>
                                ))}
                            </View>
                        }
                        <View style={styles.streamerCommunityContainer}>
                            <QaplaText style={styles.streamerCommunityTitle}>
                                Mi comunidad
                            </QaplaText>
                            <View style={styles.socialButtonsContainer}>
                                {this.state.socialLinks.map((socialLink) => (
                                    <SocialLinkContainedButton onPress={() => this.onSocialButtonPress(socialLink.value)}
                                        Icon={socialMediaIcons[socialLink.socialPage]}
                                        style={styles.socialButton}>
                                        {socialLink.socialPage}
                                    </SocialLinkContainedButton>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        logros: state.logrosReducer
    };
}

export default connect(mapStateToProps)(StreamerProfileScreen);