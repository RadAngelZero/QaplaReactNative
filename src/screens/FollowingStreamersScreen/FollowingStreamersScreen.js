import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import StreamerCardsList from '../../components/StreamerCardsList/StreamerCardsList';
import { getSingleStreamerData } from '../../actions/streamersActions';
import { BOTTOM_NAVIGATION_BAR_HEIGHT, STREAMERS_BLACKLIST } from '../../utilities/Constants';

class FollowingStreamersScreen extends Component {
    loadMoreStreamers = () => {
        const streamersData = this.formatStreamers();
        const streamersAlreadyLoaded = [];
        streamersData.forEach((streamer) => {
            if (Object.keys(this.props.userSubscriptions).includes(streamer.streamerId)) {
                streamersAlreadyLoaded.push(streamer.streamerId);
            }
        });

        Object.keys(this.props.userSubscriptions).forEach((streamerId) => {
            if (!streamersAlreadyLoaded.includes(streamerId)) {
                /**
                 * We load the streamers one by one excluding the ones already loaded, this could be very
                 * expensive for user following a big number of streamers, consider paginate this queries
                 * if the screen starts showing a bad performance for the average user
                 */
                this.props.getSingleStreamerProfile(streamerId);
            }
        });
    }

    formatStreamers = () => {
        const streamersData = [];
        const streamersAlreadyLoaded = [];
        this.props.streamers.forEach((streamer) => {
            if (!STREAMERS_BLACKLIST.includes(streamer.key) && this.props.userSubscriptions[streamer.key]) {
                if ((streamer.backgroundGradient || streamer.backgroundUrl) && streamer.displayName && streamer.photoUrl && streamer.bio && streamer.tags) {
                    streamersData.push({
                        displayName: streamer.displayName,
                        /**
                         * If the streamer change their profile image on Twitch the link on the database
                         * will not contain any photo to show until the streamer update their information
                         * on the dashboard (this is automatically done every time the streamer SignIn on the
                         * dashboard or any time a token is refreshed)
                         */
                        photoUrl: streamer.photoUrl,
                        streamerId: streamer.key,
                        bio: streamer.bio,
                        backgroundUrl: streamer.backgroundUrl,
                        badge: streamer.badge,
                        tags: streamer.tags,
                        creatorCodes: streamer.creatorCodes,
                        backgroundGradient: streamer.backgroundGradient
                    });

                    streamersAlreadyLoaded.push(streamer.key);
                }
            }
        });

        if (streamersData.length === 0) {
            let streamersLoaded = 0;
            Object.keys(this.props.userSubscriptions).every((streamerId, i) => {
                if (i < 2 || streamersLoaded < 2) {
                    if (!streamersData.includes(streamerId)) {
                        /**
                         * We load the streamers one by one excluding the ones already loaded, this could be very
                         * expensive for user following a big number of streamers, consider paginate this queries
                         * if the screen starts showing a bad performance for the average user
                         */
                        this.props.getSingleStreamerProfile(streamerId);
                        streamersLoaded++;
                    }
                }
            });
        }

        return streamersData;
    }

    goToStreamerProfile = (streamerData) => {
        this.props.navigation.navigate('StreamerProfile', { streamerData, comesFromFollowingList: true });
    }

    render() {
        const streamersData = this.formatStreamers();
        return (
            <View style={styles.container}>
                <StreamerCardsList streamersData={streamersData}
                    onEndReached={this.loadMoreStreamers}
                    onCardPress={this.goToStreamerProfile} />
                {/**
                 * View with height is to avoid Bottom bar on content
                 */}
                <View style={{ marginBottom: BOTTOM_NAVIGATION_BAR_HEIGHT * 1.25 }} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        streamers: state.streamersReducer.streamers,
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions || {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStreamersProfiles: (limit, cursor) => getStreamersData(limit, cursor)(dispatch),
        getSingleStreamerProfile: (streamerId) => getSingleStreamerData(streamerId)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingStreamersScreen);