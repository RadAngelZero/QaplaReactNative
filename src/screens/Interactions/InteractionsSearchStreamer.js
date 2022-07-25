import React, { Component } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

import { getStreamersByName } from '../../services/database';
import { STREAMERS_BLACKLIST } from '../../utilities/Constants';

const Item = ({ streamerName, streamerImg, isStreaming, streamerId, onPress }) => (
    <TouchableOpacity onPress={() => onPress(streamerId, streamerName, streamerImg, isStreaming)}>
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
            {isStreaming &&
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

    renderItem = ({ item }) => {
        if (!STREAMERS_BLACKLIST.includes(item.streamerId)) {
            return (
                <Item
                    streamerName={item.displayName}
                    streamerImg={item.photoUrl}
                    isStreaming={item.isStreaming}
                    streamerId={item.streamerId}
                    onPress={this.onStreamerSelected} />
            );
        }

        return null;
    };

    searchHandler = (e) => {
        clearTimeout(this.searchTimeout);
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

    onStreamerSelected = async (streamerId, displayName, photoUrl, isStreaming) => {
        this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.innerConatiner}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <images.svg.backIcon />
                        </TouchableOpacity>
                        <View style={[styles.searchBar, styles.streamerSearchBar]}>
                            <View style={{ opacity: 0.4 }}>
                                <images.svg.searchStreamerIcon style={styles.searchIcon} />
                            </View>
                            <TextInput
                                style={styles.gridSearchBarTextInput}
                                value={this.state.search}
                                onChange={this.searchHandler}
                                autoFocus
                            />
                        </View>
                    </View>
                    <FlatList
                        style={{
                            width: '90%',
                            alignSelf: 'center',
                        }}
                        data={Object.keys(this.state.searchResults).map((streamerId) => ({ streamerId, ...this.state.searchResults[streamerId] }))}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps={'always'}
                        />
                </View>
            </SafeAreaView>
        );
    }

}

export default InteractionsSearchStreamer;