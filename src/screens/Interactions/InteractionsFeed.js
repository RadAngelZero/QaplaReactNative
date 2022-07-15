import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View, TouchableOpacity, ActivityIndicator, SafeAreaView, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import SearchStreamerModal from '../../components/InteractionsModals/SearchStreamerModal';
import StreamerCardSmall from '../../components/StreamerCard/StreamerCardSmall';
import StreamerCardMini from '../../components/StreamerCard/StreamerCardMini';
import StreamCardLive from '../../components/StreamCard/StreamCardLive';
import Colors from '../../utilities/Colors';
import { DEFAULT_404_TWITCH_PREVIEW_URL } from '../../utilities/Constants';

import {
    getAllStreamersStreaming,
    getRecentStreamersDonations,
    getStreamerPublicData,
    getStreamerPublicProfile,
    getUserFavsStreamers
} from '../../services/database';

const MAXIM_CARDS_LENGTH = 6;

export class InteractionsFeed extends Component {
    state = {
        liveStreamers: [],
        favStreamers: [],
        recentStreamers: [],
        dataFetched: false
    };

    componentDidMount() {
        this.fetchStreamersData();
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.dismiss();
        });
    }

    fetchStreamersData = async () => {
        const liveStreamers = await getAllStreamersStreaming();
        const liveData = liveStreamers.val();

        if (this.props.uid) {
            const favStreamersSnap = await getUserFavsStreamers(this.props.uid, 10);
            const favsNoLive = [];
            favStreamersSnap.forEach((fav) => {
                if (!liveStreamers.val()[fav.key]) {
                    favsNoLive.push({ streamerId: fav.key, ...favStreamersSnap.val()[fav.key] });
                } else {
                    if (liveData) {
                        liveData[fav.key].featured = true;
                    }
                }
            });

            const favStreamers = [];
            for (let i = 0; i < favsNoLive.length; i++) {
                if (favStreamers.length < MAXIM_CARDS_LENGTH) {
                    const fav = favsNoLive[i];
                    const streamerProfile = await getStreamerPublicProfile(fav.streamerId);
                    if (streamerProfile.exists()) {
                        favStreamers.push({ streamerId: fav.streamerId, ...streamerProfile.val() });
                    } else {
                        const streamerData = await getStreamerPublicData(fav.streamerId);
                        const randomBackground = Colors.streamersProfileBackgroundGradients[Math.floor(Math.random() * Colors.streamersProfileBackgroundGradients.length)]
                        favStreamers.push({ streamerId: fav.streamerId, ...streamerData.val(), backgroundGradient: randomBackground });
                    }
                } else {
                    break;
                }
            }

            const recentStreamersSnap = await getRecentStreamersDonations(this.props.uid, 12);
            const recentStreamersNoLiveNoFav = [];
            recentStreamersSnap.forEach((recent) => {
                if (!liveStreamers.val()[recent.key] && !favStreamers.find((streamer) => streamer.streamerId === recent.key)) {
                    recentStreamersNoLiveNoFav.push({ streamerId: recent.key, ...recentStreamersSnap.val()[recent.key]});
                } else if (liveStreamers.val()[recent.key]) {
                    liveData[recent.key].featured = true;
                }
            });

            const recentStreamers = [];
            for (let i = 0; i < recentStreamersNoLiveNoFav.length; i++) {
                if (recentStreamers.length < MAXIM_CARDS_LENGTH) {
                    const recent = recentStreamersNoLiveNoFav[i];
                    const streamerProfile = await getStreamerPublicProfile(recent.streamerId);
                    if (streamerProfile.exists()) {
                        recentStreamers.push({ streamerId: recent.streamerId, ...streamerProfile.val()});
                    }
                } else {
                    break;
                }
            }

            this.setState({ recentStreamers, favStreamers, dataFetched: true });
        }

        if (liveStreamers.exists()) {
            this.setState({
                liveStreamers: Object.keys(liveData)
                    .sort((a, b) => (Number(liveData[b].featured) || 0) - (Number(liveData[a].featured) || 0))
                    .map((streamerId) => ({ streamerId, ...liveData[streamerId] })),
                dataFetched: true
            });
        }
    }

    onStreamerSelected = async (streamerId, displayName, photoUrl, isStreaming) => {
        this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming });
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
                onPress={() => this.onStreamerSelected(item.streamerId, item.displayName, item.photoUrl, true)} />
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
                onPress={() => this.onStreamerSelected(item.streamerId, item.displayName, item.photoUrl, false)} />
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
                onPress={() => this.onStreamerSelected(item.streamerId, item.displayName, item.photoUrl, false)} />
        </View>
    );

    render() {
        if (this.state.dataFetched) {
            return (
                <>
                    <SafeAreaView style={styles.container}>
                        <ScrollView style={styles.container}>
                            <View style={styles.feedMainContainer}>
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
                                <View
                                    style={styles.feedBrowserBottomVisible}
                                />
                            </View>
                        </ScrollView>
                        <View style={[styles.backButton, styles.feedBackButtonPos]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.pop()}>
                                <View style={styles.backButton}>
                                    <images.svg.closeIcon style={styles.backButtonIconOffset} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <SearchStreamerModal onPress={() => this.props.navigation.navigate('InteractionsSearchStreamer')} />
                </>
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
