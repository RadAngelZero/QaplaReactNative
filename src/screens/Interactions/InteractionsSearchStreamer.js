import React, { Component } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './style';
import images from '../../../assets/images';
import { getStreamersByName } from '../../services/database';

const Item = ({ streamerName, streamerImg, isLive, streamerId, navigation }) => (
    <TouchableOpacity
        onPress={() => {
            console.log(streamerId + ' pressed');
            //navigation.navigate('InteractionsPersonalize', { id: streamerId, name: streamerName, img: streamerImg });
        }}
    >
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 13,
        }}>
            <Image
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                }}
                source={{
                    uri: streamerImg,
                }} />
            <View style={{ width: 14 }} />
            <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '500',
                lineHeight: 20,
                letterSpacing: 0.5,
            }}>{streamerName}</Text>
            {isLive &&
                <View style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#FF006B',
                    borderRadius: 6,
                    marginLeft: 6,
                }} />
            }
        </View>
    </TouchableOpacity>
);

class InteractionsSearchStreamer extends Component {
    state = {
        search: '',
        searchResults: []
    };

    searchTimeout = null;

    renderItem = ({ item }) => (
        <Item
            streamerName={item.displayName}
            streamerImg={item.photoUrl} isLive={item.isStreaming}
            streamerId={item.streamerId}
            navigation={this.props.navigation} />
    );

    searchHandler = (e) => {
        const searchQuery = e.nativeEvent.text;
        this.setState({ search: searchQuery, searchResults: [] });
        if (searchQuery !== '') {
            this.searchTimeout = setTimeout(async () => {
                const streamers = await getStreamersByName(searchQuery);
                if (streamers.exists()) {
                    this.setState({ searchResults: streamers.val() });
                }
            }, 250);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#141539',
                        }}>
                            <View style={{ backgroundColor: '#f0f0', marginLeft: -4.6, marginTop: -2 }}>
                                <images.svg.leftArrowThiccIcon />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: 295,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#141539',
                        alignSelf: 'center',
                        paddingHorizontal: 18,
                        alignItems: 'center',
                    }}>
                        <View style={{ opacity: 0.4 }}>
                            <images.svg.searchStreamerIcon />
                        </View>
                        <View style={{ width: 12 }} />
                        <TextInput
                            style={{
                                backgroundColor: '#f0f0',
                                width: '90%',
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '400',
                                lineHeight: 28,
                                letterSpacing: 0.2,
                            }}
                            value={this.state.search}
                            onChange={this.searchHandler}
                        />
                    </View>
                </View>
                <FlatList
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    data={Object.keys(this.state.searchResults).map((streamerId) => ({ streamerId, ...this.state.searchResults[streamerId] }) )}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }

}

export default InteractionsSearchStreamer;