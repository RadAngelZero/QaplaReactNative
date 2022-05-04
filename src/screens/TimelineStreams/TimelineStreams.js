import React, { Component } from 'react';
import { Alert, Linking, ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LevelInformationModal from '../../components/LevelInformationModal/LevelInformationModal';
import { retrieveData, storeData } from '../../utilities/persistance';
import DiscoverStreamersScreen from '../DiscoverStreamersScreen/DiscoverStreamersScreen';
import FeaturedStreamsList from '../../components/FeaturedStreamsList/FeaturedStreamsList';
import StreamsList from '../../components/StreamsList/StreamsList';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { trackOnSegment } from '../../services/statistics';
import StreamLiveList from '../../components/StreamLiveList/StreamLiveList';
import { getStreamerName, getStreamerPublicProfile } from '../../services/database';
import { translate } from '../../utilities/i18';

export class TimelineStreams extends Component {
    listsToRender = [0, 1, 2, 3, 4, 5, 6];
    state = {
        openLevelInformationModal: false,
        openEventDetailsModal: false,
        selectedStream: null
    };

    componentDidMount() {
        this.checkLevelModalStatus();
    }

    checkLevelModalStatus = async () => {
        const isLevelModalViewed = await retrieveData('level-modal-viewed');
        if (!isLevelModalViewed) {
            this.setState({ openLevelInformationModal: true });
            storeData('level-modal-viewed', 'true');
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
                <StreamLiveList
                    uid={this.props.uid}
                    onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                    horizontal />
                <Text style={{
                    fontSize: 22,
                    fontWeight: '700',
                    lineHeight: 28,
                    letterSpacing: 1,
                    textAlign: 'left',
                    color: '#fff',
                    marginBottom: 30,
                    marginLeft: 16
                }}>
                    {translate('TimelineStreams.qreators')}
                </Text>
                <DiscoverStreamersScreen
                    horizontal
                    dynamicSeparation
                    navigation={this.props.navigation} />
                <FlatList initialNumToRender={2}
                    data={this.listsToRender}
                    keyExtractor={(item) => item.dia}
                    renderItem={({ item, index }) => (
                        <StreamsList index={index}
                            onCardPress={this.onStreamPress}
                            onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                            uid={this.props.uid} />
                    )} />
                <EventDetailsModal open={this.state.openEventDetailsModal}
                    onClose={() => this.setState({ openEventDetailsModal: false, selectedStream: null })}
                    stream={this.state.selectedStream} />
                <LevelInformationModal open={this.state.openLevelInformationModal}
                    onClose={() => this.setState({ openLevelInformationModal: false })} />
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
