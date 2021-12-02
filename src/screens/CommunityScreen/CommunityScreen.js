import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import { getStreamersPublicProfiles } from '../../services/database';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

const FounderBadge = Images.svg.founderBadge;

class StreamerCard extends React.Component {

    state = {
        viewMore: false
    }

    componentDidMount() {
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
                    source={this.props.coverUrl ? { uri: this.props.coverUrl } : null}
                />
                <Image
                    style={{
                        height: heightPercentageToPx(12),
                        width: heightPercentageToPx(12),
                        borderRadius: 100,
                        alignSelf: 'center',
                        marginTop: heightPercentageToPx(-6)
                    }}
                    source={ this.props.photoUrl ? { uri: this.props.photoUrl } : null}
                />
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: heightPercentageToPx(2)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: heightPercentageToPx(2.5)
                    }}>
                        {this.props.streamerName}
                    </Text>
                    <View style={{ width: widthPercentageToPx(2.6) }} />
                    <View style={{ justifyContent: 'center' }}>
                        {this.props.badge &&
                            <FounderBadge />
                        }
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
                    {this.props.bio.length > 90 && !this.state.viewMore ?
                        <>
                            {this.props.bio.slice(0, -this.props.bio.length + 90) + '...'}
                            <Text style={{
                                color: '#3366BB'
                            }}>Ver más</Text>
                        </>

                        :
                        this.props.bio
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
                        this.props.tags.map(tag => (
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
    state = {
        streamersData: []
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            console.log(this.props.navigation.getParam('streamerId', ''));
        });
        this.getStreamers();
    }

    getStreamers = async () => {
        const streamersBlackList = ['141617732', '683167758', '613408163', '180517858', '448926957', '140436068', '528477359'];
        const streamers = await getStreamersPublicProfiles();
        if (streamers.exists()) {
            const streamersData = [];
            streamers.forEach((streamer) => {
                if (!streamersBlackList.includes(streamer.val().id)) {
                    streamersData.push({
                        streamerName: streamer.val().displayName,
                        /**
                         * If the streamer change their profile image on Twitch the link on the database
                         * will not contain any photo to show until the streamer update their information
                         * on the dashboard (this is automatically done every time the streamer SignIn on the
                         * dashboard or any time a token is refreshed)
                         */
                        photoUrl: streamer.val().photoUrl,
                        streamerId: streamer.key,
                        bio: streamer.val().bio,
                        coverUrl: streamer.val().backgroundUrl,
                        badge: streamer.val().badge,
                        tags: streamer.val().tags
                    });
                }
            });
            this.setState({ streamersData });
        }
    }

    renderCard = ({ item }) => (
        <StreamerCard {...item} />
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.streamersData}
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