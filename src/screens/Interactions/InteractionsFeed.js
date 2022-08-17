import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import SearchStreamerModal from '../../components/InteractionsModals/SearchStreamerModal';
import StreamerCardSmall from '../../components/StreamerCard/StreamerCardSmall';
import StreamerCardMini from '../../components/StreamerCard/StreamerCardMini';
import StreamCardLive from '../../components/StreamCard/StreamCardLive';
import Colors from '../../utilities/Colors';
import { DEFAULT_404_TWITCH_PREVIEW_URL, TWITCH_AFFILIATE, TWITCH_PARTNER } from '../../utilities/Constants';

import {
    getAllStreamersStreaming,
    getRecentStreamersDonations,
    getStreamerPublicData,
    getStreamerPublicProfile,
    getUserFavsStreamers,
    getUserReactionsCount
} from '../../services/database';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { trackOnSegment } from '../../services/statistics';

const MAXIM_CARDS_LENGTH = 6;

export class InteractionsFeed extends Component {
    state = {
        liveStreamers: [],
        favStreamers: [],
        recentStreamers: [],
        dataFetched: false,
    };

    componentDidMount() {
        this.fetchStreamersData();
    }

    fetchStreamersData = async () => {
        const liveStreamers = await getAllStreamersStreaming();
        const liveData = Object.keys(liveStreamers.val())
            .filter((streamerId) => liveStreamers.val()[streamerId].isOverlayActive)
            .map((streamerId) => ({ streamerId, ...liveStreamers.val()[streamerId]}) );

        if (this.props.uid) {
            const favStreamersSnap = await getUserFavsStreamers(this.props.uid, 10);
            const favsNoLive = [];
            favStreamersSnap.forEach((fav) => {
                if (!liveStreamers.val()[fav.key]) {
                    favsNoLive.push({ streamerId: fav.key, ...favStreamersSnap.val()[fav.key] });
                }
            });

            const favStreamers = [];
            for (let i = 0; i < favsNoLive.length; i++) {
                if (favStreamers.length < MAXIM_CARDS_LENGTH) {
                    const fav = favsNoLive[i];
                    const streamerProfile = await getStreamerPublicProfile(fav.streamerId);
                    if (streamerProfile.exists() && (streamerProfile.val().broadcasterType === TWITCH_PARTNER || streamerProfile.val().broadcasterType === TWITCH_AFFILIATE)) {
                        favStreamers.push({ streamerId: fav.streamerId, ...streamerProfile.val() });
                    } else {
                        const streamerData = await getStreamerPublicData(fav.streamerId);
                        if (streamerData.exists() && streamerData.val().broadcasterType === TWITCH_PARTNER || streamerData.val().broadcasterType === TWITCH_AFFILIATE) {
                            const randomBackground = Colors.streamersProfileBackgroundGradients[Math.floor(Math.random() * Colors.streamersProfileBackgroundGradients.length)]
                            favStreamers.push({ streamerId: fav.streamerId, ...streamerData.val(), backgroundGradient: randomBackground });
                        }
                    }
                } else {
                    break;
                }
            }

            const recentStreamersSnap = await getRecentStreamersDonations(this.props.uid, 12);
            const recentStreamersNoLiveNoFav = [];
            recentStreamersSnap.forEach((recent) => {
                if (!liveStreamers.val()[recent.key] && !favStreamers.find((streamer) => streamer.streamerId === recent.key)) {
                    recentStreamersNoLiveNoFav.push({ streamerId: recent.key, ...recentStreamersSnap.val()[recent.key] });
                }
            });

            const recentStreamers = [];
            for (let i = 0; i < recentStreamersNoLiveNoFav.length; i++) {
                if (recentStreamers.length < MAXIM_CARDS_LENGTH) {
                    const recent = recentStreamersNoLiveNoFav[i];
                    const streamerData = await getStreamerPublicData(recent.streamerId);
                    if (streamerData.exists() && streamerData.val().broadcasterType === TWITCH_PARTNER || streamerData.val().broadcasterType === TWITCH_AFFILIATE) {
                        recentStreamers.push({ streamerId: recent.streamerId, ...streamerData.val() });
                    }
                } else {
                    break;
                }
            }

            this.setState({ recentStreamers, favStreamers, dataFetched: true });
        }

        if (liveStreamers.exists()) {
            this.setState({
                liveStreamers: liveData,
                dataFetched: true
            });
        }
    }

    onStreamerSelected = async (streamerId, displayName, photoUrl, isStreaming, type) => {
        if (this.props.uid) {
            const numberOfReactions = await getUserReactionsCount(this.props.uid, streamerId);
            // We do not check this with exists() because the value can be 0, so it is easier to check if the snapshot has a valid value (not null, not undefined and greater than 0)
            if (numberOfReactions.val()) {
                trackOnSegment('Streamer Selected To Send Interaction', {
                    Streamer: displayName,
                    StreamerId: streamerId,
                    Category: 'Custom Search'
                });

                this.props.navigation.navigate('PrepaidInteractionsPersonlizeStack', { streamerId, displayName, photoUrl, isStreaming });
            } else {
                trackOnSegment('Streamer Selected To Send Interaction', {
                    Streamer: displayName,
                    StreamerId: streamerId,
                    Category: type
                });

                return this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming });
            }
        } else {
            trackOnSegment('Streamer Selected To Send Interaction', {
                Streamer: displayName,
                StreamerId: streamerId,
                Category: type
            });

            return this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming });
        }
    }

    renderLiveItem = ({ item, index }) => {
        let thumbnailUrl = DEFAULT_404_TWITCH_PREVIEW_URL;
        if (item.thumbnailUrl) {
            thumbnailUrl = item.thumbnailUrl.replace('{width}', '480').replace('{height}', '270');
        }

        /**
         * This component is basically StreamLiveCard with less things, we need to make this the base of
         * StreamLiveCard
         */
        return (
            <StreamCardLive
                streamImage={thumbnailUrl}
                streamerPhoto={item.photoUrl}
                streamerName={item.displayName}
                index={index}
                featured={item.featured}
                onPress={() => this.onStreamerSelected(item.streamerId, item.displayName, item.photoUrl, true, 'Live')} />
        );
    };

    renderFavItem = ({ item, index }) => (
        <View style={{
            marginLeft: index === 0 ? 16 : 8,
            marginRight: (this.state.favStreamers.length - 1) === index ? 16 : 0,
        }}>
            <StreamerCardSmall
                photoUrl={item.photoUrl}
                backgroundUrl={item.backgroundUrl}
                backgroundGradient={item.backgroundGradient}
                displayName={item.displayName}
                onPress={() => this.onStreamerSelected(item.streamerId, item.displayName, item.photoUrl, false, 'Fav')} />
        </View>
    );

    renderRecentItem = ({ item, index }) => (
        <View style={{
            marginLeft: (index === 0 || index === Math.ceil(this.state.recentStreamers.length / 2)) ? 16 : 10,
            marginRight: index === (Math.ceil(this.state.recentStreamers.length / 2) - 1) ? 16 : 0,
            marginTop: index > (Math.ceil(this.state.recentStreamers.length / 2) - 1) ? 10 : 0,
        }}>
            <StreamerCardMini
                streamerPhoto={item.photoUrl}
                streamerName={item.displayName}
                onPress={() => this.onStreamerSelected(item.streamerId, item.displayName, item.photoUrl, false, 'Recent')} />
        </View>
    );

    render() {
        if (this.state.dataFetched) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                        <View style={[styles.feedMainContainer,
                        {
                            marginTop: heightPercentageToPx(4.67) + (Platform.OS === 'ios' ? heightPercentageToPx(5.91) : 0),
                        }
                        ]}>
                            <View style={styles.feedSectionHeaderContainer}>
                                <Text style={[styles.whiteText, styles.feedSectionHeader]}>
                                    {translate('TimelineStreams.live')}
                                </Text>
                                <View style={styles.feedLiveIcon} />
                            </View>

                            <View style={[styles.widthMax, styles.marginTop30]}>
                                <FlatList
                                    renderItem={this.renderLiveItem}
                                    keyExtractor={item => item.streamerId}
                                    data={this.state.liveStreamers}
                                    style={styles.widthMax}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                />
                            </View>
                            {this.props.uid &&
                                <>
                                    {this.state.favStreamers.length > 0 &&
                                        <>
                                            <View style={[styles.feedSectionHeaderContainer, styles.feedSectionHeaderMarginTop]}>
                                                <Text style={[styles.whiteText, styles.feedSectionHeader]}>
                                                    {translate('interactions.feed.favs')}
                                                </Text>
                                            </View>

                                            <View style={[styles.widthMax, styles.marginTop30]}>
                                                <FlatList
                                                    renderItem={this.renderFavItem}
                                                    keyExtractor={item => item.streamerId}
                                                    data={this.state.favStreamers}
                                                    style={styles.widthMax}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal
                                                />
                                            </View>
                                        </>
                                    }

                                    {this.state.recentStreamers.length > 0 &&
                                        <>
                                            <View style={styles.feedSectionHeaderContainer}>
                                                <Text style={[styles.whiteText, styles.feedSectionHeader]}>
                                                    {translate('interactions.feed.recents')}
                                                </Text>
                                            </View>

                                            <View style={[styles.marginTop30]}>
                                                <ScrollView
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                >
                                                    <FlatList
                                                        renderItem={this.renderRecentItem}
                                                        keyExtractor={item => item.streamerId}
                                                        data={this.state.recentStreamers}
                                                        numColumns={Math.ceil(this.state.recentStreamers.length / 2)}
                                                        showsVerticalScrollIndicator={false}
                                                    />
                                                </ScrollView>
                                            </View>
                                        </>
                                    }
                                    <View
                                        style={styles.feedBrowserBottomVisible}
                                    />
                                </>
                            }
                        </View>
                    </ScrollView>
                    <View style={[styles.backButton, styles.feedBackButtonPos, {
                        top: heightPercentageToPx(3.94) + (Platform.OS === 'ios' ? heightPercentageToPx(5.91) : 0),
                    }]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.pop()}>
                            <View style={styles.backButton}>
                                <images.svg.closeIcon />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <SearchStreamerModal onPress={() => this.props.navigation.navigate('InteractionsSearchStreamer')} />
                </View>
            );
        } else {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignContent: 'center' }]}>
                    <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                </View>
            );
        }
    }
}


function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
    };
}

export default connect(mapStateToProps)(InteractionsFeed);
