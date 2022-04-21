import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LevelInformationModal from '../../components/LevelInformationModal/LevelInformationModal';
import { retrieveData, storeData } from '../../utilities/persistance';
import FeaturedStreamsList from '../../components/FeaturedStreamsList/FeaturedStreamsList';
import StreamsList from '../../components/StreamsList/StreamsList';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { trackOnSegment } from '../../services/statistics';

class Mystreamsscreen extends Component {
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <FeaturedStreamsList uid={this.props.uid}
                    loadOnlyUserStreams
                    onCardPress={this.onStreamPress} />
                <FlatList initialNumToRender={2}
                    data={this.listsToRender}
                    keyExtractor={(item) => item.dia}
                    renderItem={({ item, index }) => (
                        <StreamsList index={index}
                            loadOnlyUserStreams
                            onCardPress={this.onStreamPress}
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

export default connect(mapStateToProps)(Mystreamsscreen);