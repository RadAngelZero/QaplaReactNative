import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import SearchStreamerModal from '../../components/SearchStreamerModal/SearchStreamerModal';
import StreamerCardSmall from '../../components/StreamerCard/StreamerCardSmall';
import StreamerCardMini from '../../components/StreamerCard/StreamerCardMini';
import StreamCardLive from '../../components/StreamCard/StreamCardLive';

import styles from './style';
import images from '../../../assets/images';
import Colors from '../../utilities/Colors';

import {
    getAllStreamersStreaming,
    getRecentStreamersDonations,
    getStreamerPublicData,
    getStreamerPublicProfile,
    getUserFavsStreamers
} from '../../services/database';
import { DEFAULT_404_TWITCH_PREVIEW_URL } from '../../utilities/Constants';


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
    }

    fetchStreamersData = async () => {
        const liveStreamers = await getAllStreamersStreaming();
        const liveData = liveStreamers.val();

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

        if (liveStreamers.exists()) {
            this.setState({
                liveStreamers: Object.keys(liveData)
                    .sort((a, b) => (Number(liveData[b].featured) || 0) - (Number(liveData[a].featured) || 0))
                    .map((streamerId) => ({ streamerId, ...liveData[streamerId] }))
            });
        }

        this.setState({ recentStreamers, favStreamers, dataFetched: true });
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
                        <ScrollView>
                            <View style={{
                                marginTop: 38,
                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 16,
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 22,
                                        lineHeight: 28,
                                        letterSpacing: 1,
                                    }}>
                                        En vivo
                                    </Text>
                                    <View style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: '#FF006B',
                                        borderRadius: 6,
                                        marginLeft: 8,
                                        marginTop: 4,
                                    }} />
                                </View>

                                <View style={{
                                    display: 'flex',
                                    marginTop: 30,
                                    width: '100%',
                                }}>
                                    <FlatList
                                        renderItem={this.renderLiveItem}
                                        keyExtractor={item => item.streamerId}
                                        data={this.state.liveStreamers}
                                        style={{
                                            width: '100%',
                                        }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>

                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 16,
                                    marginTop: 20,
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 22,
                                        lineHeight: 28,
                                        letterSpacing: 1,
                                    }}>
                                        Tus favs
                                    </Text>
                                </View>

                                <View style={{
                                    display: 'flex',
                                    marginTop: 30,
                                    width: '100%',
                                }}>
                                    <FlatList
                                        renderItem={this.renderFavItem}
                                        keyExtractor={item => item.streamerId}
                                        data={this.state.favStreamers}
                                        style={{
                                            width: '100%',
                                        }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>

                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 16,
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 22,
                                        lineHeight: 28,
                                        letterSpacing: 1,
                                    }}>
                                        Recientes
                                    </Text>
                                </View>

                                <View style={{
                                    display: 'flex',
                                    marginTop: 30,
                                    width: '100%',
                                }}>
                                    <ScrollView horizontal
                                        showsHorizontalScrollIndicator={false}>
                                        <FlatList
                                            renderItem={this.renderRecentItem}
                                            keyExtractor={item => item.id}
                                            data={Object.keys(this.state.recentStreamers).map((streamerId) => ({ streamerId, ...this.state.recentStreamers[streamerId] }))}
                                            style={{
                                                width: '100%',
                                            }}
                                            numColumns={MAXIM_CARDS_LENGTH / 2}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    </ScrollView>
                                </View>
                                <View
                                    style={{
                                        height: 200,
                                    }}
                                />
                            </View>
                        </ScrollView>
                        <View style={{
                            display: 'flex',
                            position: 'absolute',
                            width: 40,
                            height: 40,
                            top: 80,
                            right: 18,
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                <View style={{
                                    display: 'flex',
                                    width: 40,
                                    height: 40,
                                }}>
                                    <images.svg.closeIcon />
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
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(InteractionsFeed);
