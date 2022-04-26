import React, { Component } from 'react';
import { Alert, Linking, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import FeaturedStreamsList from '../../components/FeaturedStreamsList/FeaturedStreamsList';
import StreamsList from '../../components/StreamsList/StreamsList';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { trackOnSegment } from '../../services/statistics';
import StreamLiveList from '../../components/StreamLiveList/StreamLiveList';
import { getStreamerName, getStreamerPublicProfile } from '../../services/database';
import { translate } from '../../utilities/i18';

class Mystreamsscreen extends Component {
    listsToRender = [0, 1, 2, 3, 4, 5, 6];
    state = {
        openEventDetailsModal: false,
        selectedStream: null
    };

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
                        text: 'Cancel',
                        onPress: () => trackOnSegment('User did not want to go to streamer´s Twitch', {
                            StreamerId: streamerId,
                            StreamerName: streamerName.val()
                        })
                    },
                    {
                        text: 'Ir a Twitch',
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
                    loadOnlyUserStreams
                    onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                    onCardPress={this.onStreamPress} />
                <StreamLiveList
                    uid={this.props.uid}
                    onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                    horizontal />
                {/*
                    For some reason if initialNumToRender is set to a value lower than this.listsToRender.length
                    the loadOnlyUserStreams flag is not setted correctly on the StreamsList components that are
                    loaded after the initialNumToRender value so their streams are not rendered correctly
                */}
                <FlatList initialNumToRender={this.listsToRender.length}
                    data={this.listsToRender}
                    keyExtractor={(item) => item.dia}
                    renderItem={({ item, index }) => (
                        <StreamsList index={index}
                            loadOnlyUserStreams
                            onStreamerProfileButtonPress={this.onStreamerProfileButtonPress}
                            onCardPress={this.onStreamPress}
                            uid={this.props.uid} />
                    )} />
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

export default connect(mapStateToProps)(Mystreamsscreen);