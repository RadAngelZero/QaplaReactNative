import React, { Component } from 'react';
import { Alert, Linking, ScrollView, Text, FlatList, View, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import images from '../../../assets/images';
import SearchStreamerModal from '../../components/InteractionsModals/SearchStreamerModal';
import StreamerCardSmall from '../../components/StreamerCard/StreamerCardSmall';
import StreamerCardMini from '../../components/StreamerCard/StreamerCardMini';
import StreamCardLive from '../../components/StreamCard/StreamCardLive';


const FavsData = [
    {
        streamerName: 'Madelain',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
        streamerBackground: 'https://www.creativefabrica.com/wp-content/uploads/2020/09/09/Set-of-four-illustrated-backgrounds-Graphics-5375422-1-1-580x409.jpg',
        id: 'Made-123141',
    },
    {
        streamerName: 'CaptainLunna',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d5316bfd-54d9-4de8-ac24-3f62292527c1-profile_image-70x70.png',
        streamerBackground: 'https://www.creativefabrica.com/wp-content/uploads/2020/09/09/Set-of-four-illustrated-backgrounds-Graphics-5375422-1-1-580x409.jpg',
        id: 'Cap-123141',
    },
    {
        streamerName: 'RadAngelZero',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/86cd83bb-4186-4d5d-b401-b37b37d6cb36-profile_image-70x70.png',
        streamerBackground: 'https://www.creativefabrica.com/wp-content/uploads/2020/09/09/Set-of-four-illustrated-backgrounds-Graphics-5375422-1-1-580x409.jpg',
        id: 'Rad-123141',
    },
    {
        streamerName: 'QaplaGaming',
        streamerImg: 'https://pbs.twimg.com/profile_images/1297265691901517824/ps0CZEe4_400x400.jpg',
        streamerBackground: 'https://www.creativefabrica.com/wp-content/uploads/2020/09/09/Set-of-four-illustrated-backgrounds-Graphics-5375422-1-1-580x409.jpg',
        id: 'QG-123141',
    },
    {
        streamerName: 'TestSub1',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
        streamerBackground: 'https://www.creativefabrica.com/wp-content/uploads/2020/09/09/Set-of-four-illustrated-backgrounds-Graphics-5375422-1-1-580x409.jpg',
        id: 'TS1-123141',
    },
];

const RecentsData = [
    {
        streamerName: 'Madelain',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
        id: 'Made-123141',
    },
    {
        streamerName: 'CaptainLunna',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d5316bfd-54d9-4de8-ac24-3f62292527c1-profile_image-70x70.png',
        id: 'Cap-123141',
    },
    {
        streamerName: 'RadAngelZero',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/86cd83bb-4186-4d5d-b401-b37b37d6cb36-profile_image-70x70.png',
        id: 'Rad-123141',
    },
    {
        streamerName: 'QaplaGaming',
        streamerImg: 'https://pbs.twimg.com/profile_images/1297265691901517824/ps0CZEe4_400x400.jpg',
        id: 'QG-123141',
    },
    {
        streamerName: 'TestSub1',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
        id: 'TS1-123141',
    },
    // {
    //     streamerName: 'TestSub2',
    //     streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
    //     id: 'TS2-123141',
    // },
];

const LiveData = [
    {
        streamerName: 'Cindyrocks',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8defb274-3539-47c9-b38b-2d5ed71f8875-profile_image-70x70.png',
        streamImage: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_cindyrocks-848x480.jpg',
        id: 'cindyrocks-123141',
        featured: true,
    },
    {
        streamerName: 'Emikukis',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ba54c1cf-e7b0-4ab2-8003-3bef6f4ed007-profile_image-70x70.png',
        streamImage: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_emikukis-848x480.jpg',
        id: 'Emikukis-123141',
    },
    // {
    //     streamerName: 'RadAngelZero',
    //     streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/86cd83bb-4186-4d5d-b401-b37b37d6cb36-profile_image-70x70.png',
    //     id: 'Rad-123141',
    // },
    // {
    //     streamerName: 'QaplaGaming',
    //     streamerImg: 'https://pbs.twimg.com/profile_images/1297265691901517824/ps0CZEe4_400x400.jpg',
    //     id: 'QG-123141',
    // },
    // {
    //     streamerName: 'TestSub1',
    //     streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
    //     id: 'TS1-123141',
    // },
    // {
    //     streamerName: 'TestSub2',
    //     streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/729376cb-b131-4c5c-ac4c-dc3ccbb9b96a-profile_image-70x70.png',
    //     id: 'TS2-123141',
    // },
];


export class InteractionsFeed extends Component {

    renderLiveItem = ({ item, index }) => (
        <View>
            <StreamCardLive
                streamImage={item.streamImage}
                streamerPhoto={item.streamerImg}
                streamerName={item.streamerName}
                index={index}
                featured={item.featured}
            />
        </View>
    );

    renderFavItem = ({ item, index }) => (
        <View style={{
            marginLeft: index === 0 ? 16 : 8,
            marginRight: (FavsData.length - 1) === index ? 16 : 0,
        }}>
            <StreamerCardSmall
                photoUrl={item.streamerImg}
                backgroundUrl={item.streamerBackground}
                displayName={item.streamerName}
            />
        </View>
    );

    renderRecentItem = ({ item, index }) => (
        <View style={{
            marginLeft: (index === 0 || index === Math.ceil(RecentsData.length / 2)) ? 16 : 10,
            marginRight: index === (Math.ceil(RecentsData.length / 2) - 1) ? 16 : 0,
            marginTop: index > (Math.ceil(RecentsData.length / 2) - 1) ? 10 : 0,
        }}>
            <StreamerCardMini
                streamerPhoto={item.streamerImg}
                streamerName={item.streamerName}
            />
        </View>
    );

    render() {
        return (
            <>
                <ScrollView style={styles.container}>
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
                                keyExtractor={item => item.id}
                                data={LiveData}
                                style={{
                                    width: '100%',
                                }}
                                horizontal
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
                                keyExtractor={item => item.id}
                                data={FavsData}
                                style={{
                                    width: '100%',
                                }}
                                horizontal
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
                            <ScrollView
                                horizontal
                            >
                                <FlatList
                                    renderItem={this.renderRecentItem}
                                    keyExtractor={item => item.id}
                                    data={RecentsData}
                                    style={{
                                        width: '100%',
                                    }}
                                    numColumns={Math.ceil(RecentsData.length / 2)}
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
                    top: 32,
                    right: 18,
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <View style={{
                            display: 'flex',
                            width: 40,
                            height: 40,
                        }}>
                            <images.svg.closeIcon />
                        </View>
                    </TouchableOpacity>
                </View>
                <SearchStreamerModal
                    onPress={() => this.props.navigation.navigate('InteractionsSearchStreamer')}
                />
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(InteractionsFeed);
