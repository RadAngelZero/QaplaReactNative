import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { getStreamerPublicProfile, getStreamerPublicProfileKeyAtIndex, getStreamersPublicProfilesLength } from '../../services/database';
import { STREAMERS_BLACKLIST } from '../../utilities/Constants';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import StreamerCard from '../StreamerCard/StreamerCard';

class Randomstreamerslist extends Component {
    state = {
        scrolled: false,
        streamersToRender: []
    };

    componentDidMount() {
        this.getRandomNotFollowedStreamers();
    }

    getRandomNotFollowedStreamers = async () => {
        const streamersToLoad = 5;
        let profilesArrayLength = (await getStreamersPublicProfilesLength()).val() || 0;
        const arrayOfPossibleIndexes = [...Array(profilesArrayLength).keys()];
        const streamersToPull = [];

        for (let i = 0; i < profilesArrayLength; i++) {
            if (streamersToPull.length < streamersToLoad) {
                let max = Math.floor(arrayOfPossibleIndexes.length);
                const randomIndex = Math.floor(Math.random() * (max + 1));
                arrayOfPossibleIndexes.splice(randomIndex, 1);
                const key = await getStreamerPublicProfileKeyAtIndex(randomIndex);
                if (key.exists() && !STREAMERS_BLACKLIST.includes(key.val())) {
                    if (!this.props.uid || !this.props.userSubscriptions[key.val()]) {
                        if (!streamersToPull.includes(key.val())) {
                            streamersToPull.push(key.val());
                        }
                    }
                }
            } else {
                break;
            }
        }

        const streamersToRender = [];
        for (let i = 0; i < streamersToPull.length; i++) {
            const streamerId = streamersToPull[i];
            const streamerProfile = await getStreamerPublicProfile(streamerId);
            const streamer = streamerProfile.val();
            if (streamer && (streamer.backgroundGradient || streamer.backgroundUrl) && streamer.displayName && streamer.photoUrl && streamer.bio && streamer.tags) {
                streamersToRender.push({ ...streamer, streamerId });
            }
        }

        this.setState({ streamersToRender });
    }

    renderCard = ({ item }) => (
        <View style={{ marginRight: this.state.scrolled ? widthPercentageToPx(8) : widthPercentageToPx(2.67) }}>
            <StreamerCard {...item}
                horizontal={this.props.horizontal}
                onPress={() => this.props.navigate('StreamerProfile', item)} />
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    onScrollBeginDrag={() => this.setState({ scrolled: true })}
                    onMomentumScrollEnd={(e) => this.setState({ scrolled: e.nativeEvent.contentOffset.x >= 20 })}
                    horizontal
                    style={{ paddingHorizontal: widthPercentageToPx(4.2) }}
                    initialNumToRender={4}
                    data={this.state.streamersToRender}
                    renderItem={this.renderCard}
                    keyExtractor={item => item.streamerId}
                    numColumns={1}
                    showsVerticalScrollIndicator={false} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions || {}
    }
}

export default connect(mapStateToProps)(Randomstreamerslist);