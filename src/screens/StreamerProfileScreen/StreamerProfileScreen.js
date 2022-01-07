import React, { Component } from 'react';
import { TouchableOpacity, Image, View, ScrollView, Linking, Text, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import QaplaChip from '../../components/QaplaChip/QaplaChip';
import SocialLinkContainedButton from '../../components/SocialLinkContainedButton/SocialLinkContainedButton';
import SupportStreamerModal from '../../components/SupportStreamerModal/SupportStreamerModal';
import { getStreamerPublicProfile, getStreamerSocialLinks, subscribeUserToStreamerProfile, unsubscribeUserToStreamerProfile, userHaveTwitchId } from '../../services/database';
import { copyDataToClipboard } from '../../utilities/utils';
import { getLocaleLanguage, translate } from './../../utilities/i18';
import styles from './style';

const socialMediaIcons = {
    Twitch: images.svg.twitchLight,
    Instagram: images.svg.instagram,
    Twitter: images.svg.twitter,
    Discord: images.svg.discordSocial,
    TikTok: images.svg.tikTok,
    Youtube: images.svg.youTube
};

class StreamerProfileScreen extends Component {
    unfollowTimer = null;
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
            creatorCodes: {},
            tags: [],
            streamerId: '',
            isUserFollowingStreamer: false
        },
        openSupportStreamerModal: false,
        openLinkTwitchAccountModal: false,
        showUnfollowConfirmation: false
    };

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.fetchStreamerData);

        this.fetchStreamerData();
    }

    fetchStreamerData = async () => {
        let streamerData = this.props.navigation.getParam('streamerData', null);
        let streamerId = '';

        if (!streamerData) {
            // If the data does not exist then the user comes from a deep link and we only have the streamerId
            streamerId = this.props.navigation.getParam('streamerId', '');

            // So we get the streamer public profile data directly from the database
            const streamerData = await getStreamerPublicProfile(streamerId);

            this.setState({ streamerData: { ...streamerData.val(), streamerId} });
        } else {
            streamerId = streamerData.streamerId;

            this.setState({ streamerData });
        }

        const userComesFromFollowingList = this.props.navigation.getParam('comesFromFollowingList', false);
        if (userComesFromFollowingList) {
            this.setState({ isUserFollowingStreamer: true });
        }

        const streamerLinks = await getStreamerSocialLinks(streamerId);

        if (streamerLinks.exists()) {
            this.setState({ socialLinks: streamerLinks.val() });
        }

        // Determine upcoming events and sort it by time
        const streamerEvents = Object.keys(this.props.logros.logrosActivos)
        .filter((eventId) => this.props.logros.logrosActivos[eventId].idStreamer && this.props.logros.logrosActivos[eventId].idStreamer === streamerId)
        .map((eventId) => this.props.logros.logrosActivos[eventId]).sort((a, b) => a.timestamp - b.timestamp);

        // Only show the 2 most upcoming streams
        this.setState({ nextStreams: streamerEvents.slice(0, 2) });
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

    followStreamer = async () => {
        if (this.props.uid) {
            this.subscribeUserToStreamer(this.props.uid);
        } else {
            this.props.navigation.navigate('SignIn', {
                    onSuccessSignIn: async (uid) => this.subscribeUserToStreamer(uid)
                }
            );
        }
    }

    subscribeUserToStreamer = async (uid) => {
        await subscribeUserToStreamerProfile(uid, this.state.streamerData.streamerId);
        this.setState({ isUserFollowingStreamer: true });
    }

    unfollowStreamer = async () => {
        if (this.state.showUnfollowConfirmation) {
            if (this.props.uid) {
                await unsubscribeUserToStreamerProfile(this.props.uid, this.state.streamerData.streamerId);
                this.setState({ isUserFollowingStreamer: false, showUnfollowConfirmation: false });
            }
        } else {
            this.setState({ showUnfollowConfirmation: true });
            unfollowTimer = setTimeout(() => {
                this.setState({ showUnfollowConfirmation: false });
            }, 3000);
        }
    }

    goToSendCheersScreen = async () => {
        if (await userHaveTwitchId(this.props.uid)) {
            this.props.navigation.navigate('WriteCheerMessage', { streamerData: this.state.streamerData, qoinsToDonate: 200 });
        } else {
            this.setState({ openSupportStreamerModal: false, openLinkTwitchAccountModal: true });
        }
    }

    onOutsidePress = () => {
        if (unfollowTimer) {
            clearTimeout(unfollowTimer);
        }

        this.setState({ showUnfollowConfirmation: false });
    }

    render() {
        const {
            displayName,
            photoUrl,
            bio,
            backgroundUrl,
            badge,
            tags
        } = this.state.streamerData;
        const userLanguage = getLocaleLanguage();

        return (
            // We don´t use SafeAreaView intentionally here, we want the cover image and TopNav to appear at the top of the screen
            <View style={styles.container}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onOutsidePress}>
                <ScrollView>
                    <View style={styles.topNav}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainBottomNavigator')}>
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
                            <TouchableOpacity onPress={!this.state.isUserFollowingStreamer ? this.followStreamer : this.unfollowStreamer}>
                                <View style={!this.state.isUserFollowingStreamer ? styles.followButton : !this.state.showUnfollowConfirmation ? styles.followingButton : styles.unfollowButton}>
                                    <Text style={!this.state.isUserFollowingStreamer ? styles.followButtonText : !this.state.showUnfollowConfirmation ? styles.followingButtonText : styles.unfollowButtonText}>
                                        {!this.state.isUserFollowingStreamer ? translate('streamerProfileScreen.follow') : !this.state.showUnfollowConfirmation ? translate('streamerProfileScreen.following') : 'Dejar de seguir'}
                                    </Text>
                                    {this.state.showUnfollowConfirmation && <images.svg.unfollow style={{ marginLeft: 6 }} />}
                                </View>
                            </TouchableOpacity>
                            {!this.state.showUnfollowConfirmation &&
                                <>
                                <TouchableOpacity onPress={() => console.log('Share Icon Press')}>
                                    <View style={styles.iconContainer}>
                                        <images.svg.share />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ openSupportStreamerModal: true })}>
                                    <View style={styles.iconContainer}>
                                        <images.svg.sendIcon />
                                    </View>
                                </TouchableOpacity>
                                </>
                            }
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.streamerName}>
                                {displayName}
                            </Text>
                            {badge &&
                                <images.svg.founderBadge style={{ marginTop: 8 }} />
                            }
                        </View>
                        <Text style={styles.bio}>
                            {bio}
                        </Text>
                        {tags && tags.length > 0 &&
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
                        {this.state.nextStreams && this.state.nextStreams.length > 0 &&
                            <View style={styles.upcomingStreamsContainer}>
                                <Text style={styles.sectionTitle}>
                                    {translate('streamerProfileScreen.upcomingStreams')}
                                </Text>
                                {this.state.nextStreams.map((nextStream) => (
                                    <>
                                        <LinearGradient useAngle={true}
                                            angle={133.34}
                                            style={styles.upcomingStreamImageLinearGradientBackground}
                                            colors={['#2C07FA', '#A716EE']}>
                                            <Image style={styles.upcomingStreamImage}
                                                source={{ uri: nextStream.backgroundImage }} />
                                        </LinearGradient>
                                        <Text style={styles.upcomingStreamTitle}>
                                            {nextStream.title[userLanguage]}
                                        </Text>
                                        <View style={styles.nextStreamTimeContainer}>
                                            <View style={styles.timeContainer}>
                                                <images.svg.calendar style={{ alignSelf: 'center' }} />
                                                <Text style={styles.timeText}>
                                                    {this.formatStreamDate(nextStream.timestamp)}
                                                </Text>
                                            </View>
                                            <View style={styles.timeContainer}>
                                                <images.svg.clock />
                                                <Text style={styles.timeText}>
                                                    {this.formatStreamHour(nextStream.timestamp)}
                                                </Text>
                                            </View>
                                        </View>
                                    </>
                                ))}
                            </View>
                        }
                        {this.state.socialLinks && this.state.socialLinks.length > 0 &&
                            <View style={styles.streamerCommunityContainer}>
                                <Text style={styles.sectionTitle}>
                                    {translate('streamerProfileScreen.myCommunity')}
                                </Text>
                                <View style={styles.socialButtonsContainer}>
                                    {this.state.socialLinks.map((socialLink) => (
                                        <SocialLinkContainedButton onPress={() => this.onSocialButtonPress(socialLink.value)}
                                            Icon={socialMediaIcons[socialLink.socialPage]}
                                            style={styles.socialButton}
                                            key={`social-${socialLink.socialPage}`}>
                                            {socialLink.socialPage}
                                        </SocialLinkContainedButton>
                                    ))}
                                </View>
                            </View>
                        }
                        {this.state.streamerData.creatorCodes && Object.keys(this.state.streamerData.creatorCodes).length > 0 &&
                            <View style={styles.creatorCodesContainer}>
                                <Text style={styles.sectionTitle}>
                                    {translate('streamerProfileScreen.creatorCodes')}
                                </Text>
                                {Object.values(this.state.streamerData.creatorCodes).map((code) => (
                                    <View style={styles.creatorCodeImage}>
                                        <Image style={styles.creatorCodeImage}
                                            source={{ uri: code.imageUrl }} />
                                            <View style={styles.createrCodeButtonContainer}>
                                                <View style={styles.creatorCodeButton}>
                                                    <TouchableOpacity onPress={() => copyDataToClipboard(code.code)}>
                                                        <View style={styles.codeButton}>
                                                            <Text style={styles.codeText} numberOfLines={1}>
                                                                {code.code}
                                                            </Text>
                                                            <View style={styles.copyCode}>
                                                                <images.svg.copyCreatorCode />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                    </View>
                                ))}
                            </View>
                        }
                    </View>
                    <View style={{ height: 40 }} />
                </ScrollView>
                </TouchableWithoutFeedback>
                <SupportStreamerModal open={this.state.openSupportStreamerModal}
                    onClose={() => this.setState({ openSupportStreamerModal: false })}
                    streamerData={this.state.streamerData}
                    sendCheers={this.goToSendCheersScreen} />
                <LinkTwitchAccountModal open={this.state.openLinkTwitchAccountModal}
                    onClose={() => this.setState({ openLinkTwitchAccountModal: false })}
                    onLinkSuccessful={this.goToSendCheersScreen} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        logros: state.logrosReducer,
        uid: state.userReducer.user.id,
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions
    };
}

export default connect(mapStateToProps)(StreamerProfileScreen);