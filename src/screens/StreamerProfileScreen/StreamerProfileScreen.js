import React, { Component } from 'react';
import { TouchableOpacity, Image, View, ScrollView, Linking, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import Images from '../../../assets/images';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import QaplaChip from '../../components/QaplaChip/QaplaChip';
import SocialLinkContainedButton from '../../components/SocialLinkContainedButton/SocialLinkContainedButton';
import { getStreamerPublicProfile, getStreamerSocialLinks, getStreamerStreamingStatus, getUserReactionsCount, streamersHasOverlayActive, subscribeUserToStreamerProfile, unsubscribeUserToStreamerProfile } from '../../services/database';
import { getStreamerProfilePhotoUrl } from '../../services/storage';
import { copyDataToClipboard } from '../../utilities/utils';
import { getLocaleLanguage, translate } from './../../utilities/i18';
import styles from './style';
import InteractionsShortcut from '../../components/InteractionsShortcut/InteractionsShortcut';
import { trackOnSegment } from '../../services/statistics';

const socialMediaIcons = {
    Twitch: Images.svg.twitchLight,
    Instagram: Images.svg.instagram,
    Twitter: Images.svg.twitter,
    Discord: Images.svg.discordSocial,
    TikTok: Images.svg.tikTok,
    Youtube: Images.svg.youTube,
};

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
            creatorCodes: {},
            tags: [],
            backgroundGradient: { angle: 0, colors: ['#000', '#000'] },
            isUserFollowingStreamer: false
        },
        showUnfollowConfirmation: false,
        openEventDetailsModal: false,
        selectedStream: null,
        interactButtonAnimation: new Animated.Value(0),
        showInteractModule: false
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

            this.setState({ streamerData: { ...streamerData.val(), streamerId } });
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
        let streamerEvents = Object.keys(this.props.streamsLists.featured)
            .filter((streamId) => this.props.streamsLists.featured[streamId].idStreamer && this.props.streamsLists.featured[streamId].idStreamer === streamerId)
            .map((streamId) => this.props.streamsLists.featured[streamId]);

        for (let i = 0; i < this.props.streamsLists.streams.length; i++) {
            const streamsList = this.props.streamsLists.streams[i];
            streamerEvents = streamerEvents.concat(Object.keys(streamsList)
                .filter((streamId) => streamsList[streamId].idStreamer && streamsList[streamId].idStreamer === streamerId)
                .map((streamId) => streamsList[streamId]));
        }

        streamerEvents.sort((a, b) => a.timestamp - b.timestamp);

        const isStreaming = await getStreamerStreamingStatus(streamerId);
        const hasActiveOverlay = await streamersHasOverlayActive(streamerId);
        this.setState({ showInteractModule: isStreaming && hasActiveOverlay.exists() && hasActiveOverlay.val() });

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
        let hour = streamDate.getHours() % 12;
        hour = hour ? hour : 12;
        let minute = streamDate.getMinutes() > 9 ? streamDate.getMinutes() : `0${streamDate.getMinutes()}`;

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
        }
    }

    onOutsidePress = () => {
        this.setState({ showUnfollowConfirmation: false });
    }

    getFallbackImage = async () => {
        try {
            this.setState({ streamerData: { ...this.state.streamerData, photoUrl: await getStreamerProfilePhotoUrl(this.state.streamerData.streamerId) } });
        } catch (error) {
            console.log(error);
        }
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

    onInteractionShorcut = async () => {
        if (this.props.uid) {
            const { streamerId, displayName, photoUrl, isStreaming } = this.state.streamerData;
            const numberOfReactions = await getUserReactionsCount(this.props.uid, streamerId);
            // We do not check this with exists() because the value can be 0, so it is easier to check if the snapshot has a valid value (not null, not undefined and greater than 0)
            if (numberOfReactions.val()) {
                trackOnSegment('Streamer Selected To Send Interaction From Streamer Profile', {
                    Streamer: displayName,
                    StreamerId: streamerId,
                    Category: 'Custom Search'
                });

                this.props.navigation.navigate('PrepaidInteractionsPersonlizeStack', { streamerId, displayName, photoUrl, isStreaming: true, numberOfReactions: numberOfReactions.val() });
            } else {
                trackOnSegment('Streamer Selected To Send Interaction From Streamer Profile', {
                    Streamer: displayName,
                    StreamerId: streamerId,
                    Category: 'Custom Search'
                });

                this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming: true });
            }
        } else {
            trackOnSegment('Streamer Selected To Send Interaction From Streamer Profile', {
                Streamer: displayName,
                StreamerId: streamerId,
                Category: 'Custom Search'
            });

            this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming: true });
        }
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
                                <Images.svg.backIcon />
                            </TouchableOpacity>
                        </View>
                        {backgroundUrl ?
                            <Image source={{ uri: backgroundUrl }}
                                style={styles.backgroundImage} />
                            :
                            <LinearGradient style={styles.backgroundImage}
                                useAngle
                                angle={this.state.streamerData.backgroundGradient.angle}
                                colors={this.state.streamerData.backgroundGradient.colors} />
                        }
                        <View style={styles.photoContainer}>
                            <Image source={photoUrl ? { uri: photoUrl } : null}
                                style={styles.photo}
                                onError={this.getFallbackImage} />
                        </View>
                        <View style={styles.profileContainer}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={!this.state.isUserFollowingStreamer ? this.followStreamer : this.unfollowStreamer}>
                                    <View style={!this.state.isUserFollowingStreamer ? styles.followButton : !this.state.showUnfollowConfirmation ? styles.followingButton : styles.unfollowButton}>
                                        <Text style={!this.state.isUserFollowingStreamer ? styles.followButtonText : !this.state.showUnfollowConfirmation ? styles.followingButtonText : styles.unfollowButtonText}>
                                            {!this.state.isUserFollowingStreamer ? translate('streamerProfileScreen.follow') : !this.state.showUnfollowConfirmation ? translate('streamerProfileScreen.following') : translate('streamerProfileScreen.unfollow')}
                                        </Text>
                                        {this.state.showUnfollowConfirmation && <Images.svg.unfollow style={{ marginLeft: 6 }} />}
                                    </View>
                                </TouchableOpacity>
                                {!this.state.showUnfollowConfirmation &&
                                    <>
                                        {/* Button hidden temporarily */}
                                        {/* <TouchableOpacity onPress={() => console.log('Share Icon Press')}>
                                    <View style={styles.iconContainer}>
                                        <Images.svg.share />
                                    </View>
                                </TouchableOpacity> */}
                                    </>
                                }
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.streamerName}>
                                    {displayName}
                                </Text>
                                {badge &&
                                    <Images.svg.founderBadge />
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
                                                    <Images.svg.moreCircle />
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
                                                <Images.svg.lessCircle />
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
                                        <TouchableOpacity onPress={() => this.setState({ selectedStream: nextStream }, () => this.setState({ openEventDetailsModal: true }))}>
                                            <LinearGradient useAngle={true}
                                                angle={133.34}
                                                style={styles.upcomingStreamImageLinearGradientBackground}
                                                colors={['#2C07FA', '#A716EE']}>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', right: 24, top: 24 }}>
                                                    {this.renderBadges(nextStream.customRewardsMultipliers)}
                                                </View>
                                                <Image style={styles.upcomingStreamImage}
                                                    source={{ uri: nextStream.backgroundImage }} />
                                            </LinearGradient>
                                            <Text style={styles.upcomingStreamTitle}>
                                                {nextStream.title[userLanguage]}
                                            </Text>
                                            <View style={styles.nextStreamTimeContainer}>
                                                <View style={styles.timeContainer}>
                                                    <Images.svg.calendar style={{ alignSelf: 'center' }} />
                                                    <Text style={styles.timeText}>
                                                        {this.formatStreamDate(nextStream.timestamp)}
                                                    </Text>
                                                </View>
                                                <View style={styles.timeContainer}>
                                                    <Images.svg.clock />
                                                    <Text style={styles.timeText}>
                                                        {this.formatStreamHour(nextStream.timestamp)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            }
                            {this.state.showInteractModule &&
                                <View style={{
                                    marginTop: 30,
                                }}>
                                    <InteractionsShortcut onPress={this.onInteractionShorcut} />
                                </View>
                            }
                            {this.state.socialLinks && this.state.socialLinks.length > 0 &&
                                <View style={styles.streamerCommunityContainer}>
                                    <Text style={styles.sectionTitle}>
                                        {translate('streamerProfileScreen.myCommunity')}
                                    </Text>
                                    <View style={styles.socialButtonsContainer}>
                                        {this.state.socialLinks.map((socialLink) => (
                                            socialLink.value !== '' ?
                                                <SocialLinkContainedButton onPress={() => this.onSocialButtonPress(socialLink.value)}
                                                    Icon={socialMediaIcons[socialLink.socialPage]}
                                                    style={styles.socialButton}
                                                    key={`social-${socialLink.socialPage}`}>
                                                    {socialLink.socialPage}
                                                </SocialLinkContainedButton>
                                                :
                                                null
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
                                                                <Images.svg.copyCreatorCode />
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
                <EventDetailsModal open={this.state.openEventDetailsModal}
                    onClose={() => this.setState({ openEventDetailsModal: false, selectedStream: null })}
                    stream={this.state.selectedStream} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        streamsLists: state.streamsReducer.streamsLists,
        uid: state.userReducer.user.id,
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions
    };
}

export default connect(mapStateToProps)(StreamerProfileScreen);