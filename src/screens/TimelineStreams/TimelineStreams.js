import React, { Component } from 'react';
import { Alert, Linking, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import FeaturedStreamsList from '../../components/FeaturedStreamsList/FeaturedStreamsList';
import StreamsList from '../../components/StreamsList/StreamsList';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { trackOnSegment } from '../../services/statistics';
import StreamLiveList from '../../components/StreamLiveList/StreamLiveList';
import { getStreamById, getStreamerName, getStreamerPublicProfile, isUserParticipantOnEvent } from '../../services/database';
import { translate } from '../../utilities/i18';
import Randomstreamerslist from '../../components/RandomStreamersList/RandomStreamersList';
import { BOTTOM_NAVIGATION_BAR_HEIGHT } from '../../utilities/Constants';
import InteractionsShortcut from '../../components/InteractionsShortcut/InteractionsShortcut';
import GreetingsShortcut from '../../components/GreetingsShortcut/GreetingsShortcut';

export class TimelineStreams extends Component {
    listsToRender = [0, 1, 2, 3, 4, 5, 6];
    state = {
        openEventDetailsModal: false,
        selectedStream: null,
        deepLinkId: ''
    };

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.checkStreamDeepLinkData);
        this.checkStreamDeepLinkData();
    }

    checkStreamDeepLinkData = async () => {
        let streamId = this.props.navigation.getParam('streamId', null);

        // streamId !== this.state.deepLinkId Prevent the modal to open every time the screen receive the focus
        if (streamId && streamId !== this.state.deepLinkId) {
            /**
             * Because we load the data of the streams on the streams reducer in an async way and also because of
             * the way we store the data in that reducer the best approach here is to load the data directly from
             * the database, maybe we are going to duplicate the request but is the fastest and more reliable way
             * we have
             */
            const streamData = await getStreamById(streamId);
            if (streamData.exists()) {
                const isUserAParticipant = this.props.uid ? await isUserParticipantOnEvent(this.props.uid, streamId) : false;
                this.setState({ deepLinkId: streamId, selectedStream: { ...streamData.val(), isUserAParticipant, id: streamId } }, () => this.setState({ openEventDetailsModal: true }));
            }
        }
    }

    onStreamPress = (stream) => {
        this.setState({ selectedStream: stream }, () => this.setState({ openEventDetailsModal: true }));
        trackOnSegment('User open event', {
            EventId: this.props.eventId,
            EventIsSponsored: this.props.sponsorImage ? true : false,
            featuredEvent: this.props.featured,
            EventStreamer: this.props.streamerName,
            EventGame: this.props.game
        });
    }

    onStreamerProfileButtonPress = async (streamerId, streamerChannelLink) => {
        const streamerProfile = await getStreamerPublicProfile(streamerId);
        if (streamerProfile.exists()) {
            this.props.navigation.navigate('StreamerProfile', { streamerData: { ...streamerProfile.val(), streamerId } });
            trackOnSegment('User open streamr profile from card', {
                StreamerId: streamerId
            });
        } else {
            const streamerName = await getStreamerName(streamerId);
            Alert.alert(
                translate('TimelineStreams.streamerHasNoProfileTitle'),
                translate('TimelineStreams.streamerHasNoProfileDescription', { streamerName: streamerName.val() }),
                [
                    {
                        text: translate('TimelineStreams.cancel'),
                        onPress: () => trackOnSegment('User did not want to go to streamer´s Twitch', {
                            StreamerId: streamerId,
                            StreamerName: streamerName.val()
                        })
                    },
                    {
                        text: translate('TimelineStreams.goToTwitch'),
                        onPress: () => {
                            trackOnSegment('User goes to streamer´s Twitch', {
                                StreamerId: streamerId,
                                StreamerName: streamerName.val()
                            });
                            Linking.openURL(streamerChannelLink);
                        }
                    }
                ]
            );
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FeaturedStreamsList uid={this.props.uid}
                    onCardPress={this.onStreamPress}
                    onStreamerProfileButtonPress={this.onStreamerProfileButtonPress} />
                <View style={{
                    alignSelf: 'center'
                }}>
                    <InteractionsShortcut onPress={() => this.props.navigation.navigate('TweetReactionScreen')} />
                </View>
                <View style={{ height: 40 }} />
                <View style={{
                    alignSelf: 'center'
                }}>
                    <GreetingsShortcut />
                </View>
                <View style={{ height: 25 }} />
                <StreamLiveList
                    uid={this.props.uid}
                    onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                    horizontal />
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    alignItems: 'center',
                    marginBottom: 24,
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '700',
                        lineHeight: 28,
                        letterSpacing: 1,
                        textAlign: 'left',
                        color: '#fff',
                    }}>
                        {translate('TimelineStreams.qreators')}
                    </Text>
                    <TouchableOpacity style={{
                        backgroundColor: '#3B4BF9',
                        flexDirection: 'row',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => this.props.navigation.navigate('Community')}
                    >
                        <images.svg.searchStreamerIcon style={{
                            transform: [{ scale: 0.8 }],
                        }} />
                        <Text style={{
                            color: '#fff',
                            marginLeft: 4,
                            fontSize: 12,
                            fontWeight: '700',
                        }}>
                            {`Explore All`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Randomstreamerslist uid={this.props.uid} navigate={this.props.navigation.navigate} />
                <FlatList initialNumToRender={this.listsToRender.length}
                    data={this.listsToRender}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => (
                        <StreamsList index={index}
                            onCardPress={this.onStreamPress}
                            onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                            uid={this.props.uid} />
                    )} />
                {/**
                 * View with height is to avoid Bottom bar on content
                 */}
                <View style={{ marginBottom: BOTTOM_NAVIGATION_BAR_HEIGHT * 1.5 }} />
                <EventDetailsModal open={this.state.openEventDetailsModal}
                    onClose={() => this.setState({ openEventDetailsModal: false, selectedStream: null })}
                    stream={this.state.selectedStream} />
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(TimelineStreams);
