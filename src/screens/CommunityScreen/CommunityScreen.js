import React, { Component } from 'react';
import { Linking, ScrollView, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import Images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import { getCommunitySurvey, getPremiumStreamers } from '../../services/database';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

const FounderBadge = Images.svg.founderBadge;

const streamersData = {
    feryfer: {
        backgroundImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/73e9d01c-d608-4d36-8054-d4780ea70a6a-profile_banner-480.png',
        profileImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/61a9ef93-445e-4e16-8758-63f4d949301f-profile_image-70x70.png',
        bio: '🇲🇽 Amo los hochos 💜 Si no sabes que son hochos, ¡caéle a mi stream 😍! Creadora de SuperCell, Community Manager de Vatra Gaming y amante de los gatos en especial de Luna Arcoíris Nubecita de Vainilla de Galacticland',
        tags: ['Hochos', 'Fall Guys', 'Just Chatting', 'Anime', 'Brawl Stars', 'Clash Royale']
    },
    feryfer: {
        backgroundImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/73e9d01c-d608-4d36-8054-d4780ea70a6a-profile_banner-480.png',
        profileImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/61a9ef93-445e-4e16-8758-63f4d949301f-profile_image-70x70.png',
        bio: '🇲🇽 Amo los hochos 💜 Si no sabes que son hochos, ¡caéle a mi stream 😍! Creadora de SuperCell, Community Manager de Vatra Gaming y amante de los gatos en especial de Luna Arcoíris Nubecita de Vainilla de Galacticland',
        tags: ['Hochos', 'Fall Guys', 'Just Chatting', 'Anime', 'Brawl Stars', 'Clash Royale']
    }
}

class StreamerCard extends React.Component {

    state = {
        viewMore: false
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <TouchableOpacity style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: widthPercentageToPx(6),
                backgroundColor: '#141833',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                paddingBottom: heightPercentageToPx(4),
                marginBottom: heightPercentageToPx(6)
            }}>
                <View />
                <Image
                    style={{
                        display: 'flex',
                        height: heightPercentageToPx(12),
                    }}
                    source={{ uri: streamersData.feryfer.backgroundImg }}
                />
                <Image
                    style={{
                        height: heightPercentageToPx(12),
                        width: heightPercentageToPx(12),
                        borderRadius: 100,
                        alignSelf: 'center',
                        marginTop: heightPercentageToPx(-6)
                    }}
                    source={{ uri: streamersData.feryfer.profileImg }}
                />
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: heightPercentageToPx(2)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: heightPercentageToPx(2.5)
                    }}>feryfer</Text>
                    <View style={{ width: widthPercentageToPx(2.6) }} />
                    <View style={{ justifyContent: 'center' }}>
                        <FounderBadge />
                    </View>
                </View>
                <Text style={{
                    color: 'white',
                    fontSize: heightPercentageToPx(1.8),
                    lineHeight: heightPercentageToPx(2.6),
                    width: widthPercentageToPx(82),
                    alignSelf: 'center',
                    marginTop: heightPercentageToPx(2.4)
                }}
                >
                    {streamersData.feryfer.bio.length > 90 && !this.state.viewMore ?
                        <>
                            {streamersData.feryfer.bio.slice(0, -streamersData.feryfer.bio.length + 90) + '...'}
                            <Text style={{
                                color: '#3366BB'
                            }}>Ver más</Text>
                        </>

                        :
                        streamersData.feryfer.bio
                    }
                </Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    width: widthPercentageToPx(84),
                    marginTop: heightPercentageToPx(2)
                }}>
                    {
                        streamersData.feryfer.tags.map(tag => (
                            <View style={{
                                backgroundColor: '#4040FF4D',
                                padding: widthPercentageToPx(1.8),
                                paddingHorizontal: widthPercentageToPx(3),
                                paddingBottom: widthPercentageToPx(1.2),
                                borderRadius: 100,
                                margin: widthPercentageToPx(0.6),
                                marginVertical: heightPercentageToPx(0.6)
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: heightPercentageToPx(1.4)
                                }}>{tag}</Text>
                            </View>
                        ))
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

class CommunityScreen extends Component {
    answerSurvey = async () => {
        const url = await getCommunitySurvey();
        if (url) {
            Linking.openURL(url.val());
        }
    }

    state = {
        streamersData: []
    }

    componentDidMount() {
        this.getStreamers()
    }

    getStreamers = async () => {
        const streamersBlackList = ['141617732', '683167758', '613408163', '180517858', '448926957', '140436068', '528477359'];
        const streamers = await getPremiumStreamers();
        if (streamers.exists()) {
            const streamersData = [];
            streamers.forEach((streamer) => {
                if (!streamersBlackList.includes(streamer.val().id)) {
                    streamersData.push({
                        streamer: streamer.val().displayName,
                        /**
                         * If the streamer change their profile image on Twitch the link on the database
                         * will not contain any photo to show until the streamer update their information
                         * on the dashboard (this is automatically done every time the streamer SignIn on the
                         * dashboard or any time a token is refreshed)
                         */
                        photoUrl: streamer.val().photoUrl,
                        streamerID: streamer.key,
                        bio: streamer.val().bio,
                        coverUrl: streamer.val().coverUrl,
                        badge: streamer.val().badge,
                        tags: streamer.val().tags
                    });
                }
            });
            console.log(streamersData)
            this.setState({ streamersData });
        }
    }

    streamerCard = ({ item }) => {
        return (
            <TouchableOpacity style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: widthPercentageToPx(6),
                backgroundColor: '#141833',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                paddingBottom: heightPercentageToPx(4),
                marginBottom: heightPercentageToPx(4)
            }}>
                <Image
                    style={{
                        display: 'flex',
                        height: heightPercentageToPx(12),
                    }}
                    source={{ uri: item.coverUrl }}
                />
                <Image
                    style={{
                        height: heightPercentageToPx(12),
                        width: heightPercentageToPx(12),
                        borderRadius: 100,
                        alignSelf: 'center',
                        marginTop: heightPercentageToPx(-6)
                    }}
                    source={{ uri: item.photoUrl }}
                />
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: heightPercentageToPx(2)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: heightPercentageToPx(2.5)
                    }}>{item.streamer}</Text>
                    {item.badge ?
                        <>
                            <View style={{ width: widthPercentageToPx(2.6) }} />
                            <View style={{ justifyContent: 'center' }}>
                                <FounderBadge />
                            </View>
                        </>
                        :
                        <></>
                    }

                </View>
                {item.bio ?
                    <Text style={{
                        color: 'white',
                        fontSize: heightPercentageToPx(1.8),
                        lineHeight: heightPercentageToPx(2.6),
                        width: widthPercentageToPx(82),
                        alignSelf: 'center',
                        marginTop: heightPercentageToPx(2.4)
                    }}>
                        {item.bio.length > 90 ?
                            <>
                                {item.bio.slice(0, 90 - item.bio.length) + '...'}
                                <Text style={{
                                    color: '#3366BB'
                                }}>Ver más</Text>
                            </>

                            :
                            item.bio
                        }
                    </Text>
                    :
                    <></>
                }
                {item.tags ?
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignSelf: 'center',
                        width: widthPercentageToPx(84),
                        marginTop: heightPercentageToPx(2)
                    }}>
                        {
                            item.tags.split(',').map(tag => (
                                <View style={{
                                    backgroundColor: '#4040FF4D',
                                    padding: widthPercentageToPx(1.8),
                                    paddingHorizontal: widthPercentageToPx(3),
                                    paddingBottom: widthPercentageToPx(1.2),
                                    borderRadius: 100,
                                    margin: widthPercentageToPx(0.6),
                                    marginVertical: heightPercentageToPx(0.6)
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: heightPercentageToPx(1.4)
                                    }}>{tag}</Text>
                                </View>
                            ))
                        }
                    </View>
                    :
                    <></>
                }
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <FlatList
                    data={this.state.streamersData}
                    renderItem={this.streamerCard}
                    keyExtractor={item => item.streamer}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                /> */}
                <StreamerCard />
                {/* <View style={styles.communityIcon}>
                    <Images.svg.community3DIcon />
                </View>
                <View style={styles.bottomSheetContainer}>
                    <LinearGradient
                        useAngle
                        angle={136}
                        style={styles.bottomSheet}
                        colors={['#A716EE', '#2C07FA']}>
                        <ScrollView>
                            <View style={styles.bottomSheetBody}>
                                <QaplaText style={styles.comingSoon}>
                                    {translate('CommunityScreen.comingSoon')}
                                </QaplaText>
                                <QaplaText style={styles.description}>
                                    {translate('CommunityScreen.description')}
                                </QaplaText>
                                <QaplaText style={styles.feedbackRequest}>
                                    {translate('CommunityScreen.feedbackRequest')}
                                </QaplaText>
                                <TouchableOpacity
                                    style={styles.buttonContainer}>
                                    <QaplaText style={styles.buttonText}>
                                        {translate('CommunityScreen.answerSurvery')}
                                    </QaplaText>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </View> */}
            </View>
        );
    }
}

export default CommunityScreen;