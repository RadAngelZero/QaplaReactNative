import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import FeaturedStreamsList from '../../components/FeaturedStreamsList/FeaturedStreamsList';
import StreamsList from '../../components/StreamsList/StreamsList';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { trackOnSegment } from '../../services/statistics';
import StreamLiveList from '../../components/StreamLiveList/StreamLiveList';

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

    onStreamerProfileButtonPress = (streamerId) => {
        this.props.navigation.navigate('StreamerProfile', { streamerId });
        trackOnSegment('User open streamr profile from card', {
            StreamerId: streamerId
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FeaturedStreamsList uid={this.props.uid}
                    loadOnlyUserStreams
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