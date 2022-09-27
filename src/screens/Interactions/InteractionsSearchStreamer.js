import React, { Component } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';

import { getStreamersByName, getUserReactionsCount } from '../../services/database';
import { STREAMERS_BLACKLIST, TWITCH_AFFILIATE, TWITCH_PARTNER } from '../../utilities/Constants';
import { trackOnSegment } from '../../services/statistics';

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
        searchResults: [],
    };

    searchTimeout = null;

    componentDidMount() {
        if (this.props.navigation.isFocused()) {
            this.searchBar.focus();
        }
    }

    renderItem = ({ item }) => {
        if (true) {
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
        if (this.props.uid) {
            const numberOfReactions = await getUserReactionsCount(this.props.uid, streamerId);
            // We do not check this with exists() because the value can be 0, so it is easier to check if the snapshot has a valid value (not null, not undefined and greater than 0)
            if (numberOfReactions.val()) {
                trackOnSegment('Streamer Selected To Send Interaction', {
                    Streamer: displayName,
                    StreamerId: streamerId,
                    Category: 'Custom Search'
                });

                this.props.navigation.navigate('PrepaidInteractionsPersonlizeStack', { streamerId, displayName, photoUrl, isStreaming, numberOfReactions: numberOfReactions.val() });
            } else {
                trackOnSegment('Streamer Selected To Send Interaction', {
                    Streamer: displayName,
                    StreamerId: streamerId,
                    Category: 'Custom Search'
                });

                this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming });
            }
        } else {
            trackOnSegment('Streamer Selected To Send Interaction', {
                Streamer: displayName,
                StreamerId: streamerId,
                Category: 'Custom Search'
            });

            this.props.navigation.navigate('InteractionsPersonalize', { streamerId, displayName, photoUrl, isStreaming });
        }
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
                            <TextInput autoFocus
                                style={styles.gridSearchBarTextInput}
                                value={this.state.search}
                                onChange={this.searchHandler}
                                ref={(ti) => { this.searchBar = ti; }}
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

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(InteractionsSearchStreamer);