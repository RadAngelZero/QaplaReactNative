import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styles from './style';
import { getStreamersPublicProfiles } from '../../services/database';
import StreamerCard from '../../components/StreamerCard/StreamerCard';

class CommunityScreen extends Component {
    state = {
        streamersData: []
    }

    componentDidMount() {
        this.getStreamers();
        this.props.navigation.addListener('didFocus', () => {
            this.getStreamers();
        });
    }

    getStreamers = async () => {
        const streamersBlackList = ['141617732', '683167758', '613408163', '180517858', '448926957', '140436068', '528477359'];
        const streamers = await getStreamersPublicProfiles();
        if (streamers.exists()) {
            const streamersData = [];
            streamers.forEach((streamer) => {
                if (!streamersBlackList.includes(streamer.val().id)) {
                    streamersData.push({
                        displayName: streamer.val().displayName,
                        /**
                         * If the streamer change their profile image on Twitch the link on the database
                         * will not contain any photo to show until the streamer update their information
                         * on the dashboard (this is automatically done every time the streamer SignIn on the
                         * dashboard or any time a token is refreshed)
                         */
                        photoUrl: streamer.val().photoUrl,
                        streamerId: streamer.key,
                        bio: streamer.val().bio,
                        backgroundUrl: streamer.val().backgroundUrl,
                        badge: streamer.val().badge,
                        tags: streamer.val().tags,
                        creatorCodes: streamer.val().creatorCodes
                    });
                }
            });

            this.setState({ streamersData });
        }
    }

    goToStreamerProfile = (streamerData) => {
        this.props.navigation.navigate('StreamerProfile', { streamerData });
    }

    renderCard = ({ item }) => (
        <StreamerCard {...item}
            onPress={() => this.goToStreamerProfile(item)} />
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.streamersData.reverse()}
                    renderItem={this.renderCard}
                    keyExtractor={item => item.streamerId}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

export default CommunityScreen;