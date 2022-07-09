import React, { Component } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './style';
import images from '../../../assets/images';

const TestData = [
    {
        id: 'rad',
        streamerName: 'RadAngelZero',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/86cd83bb-4186-4d5d-b401-b37b37d6cb36-profile_image-70x70.png',
        isLive: true,
    },
    {
        id: 'shonzo',
        streamerName: 'Shonzo',
        streamerImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3ec78fbd-4695-46ff-8577-224005f004be-profile_image-70x70.png',
    },
];

const Item = ({ streamerName, streamerImg, isLive, streamerId, navigation }) => (
    <TouchableOpacity
        onPress={() => {
            console.log(streamerName + ' pressed');
            navigation.navigate('InteractionsPersonalize', { streamerId, streamerName, streamerImg, isLive });
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
    }

    renderItem = ({ item }) => (
        <Item streamerName={item.streamerName} streamerImg={item.streamerImg} isLive={item.isLive} streamerId={item.id} navigation={this.props.navigation} />
    )

    searchHandler = (e) => {
        this.setState({ search: e.nativeEvent.text });
        if (e.nativeEvent.text === '') {
            console.log('No busques');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerConatiner}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <View style={styles.backButton}>
                                <View style={styles.backButtonIconOffset}>
                                    <images.svg.leftArrowThiccIcon />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.searchBar, styles.streamerSearchBar]}>
                            <View style={{ opacity: 0.4 }}>
                                <images.svg.searchStreamerIcon style={styles.searchIcon} />
                            </View>
                            <TextInput
                                style={styles.gridSearchBarTextInput}
                                value={this.state.search}
                                onChange={this.searchHandler}
                            />
                        </View>
                    </View>
                    <FlatList
                        data={TestData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }

}

export default InteractionsSearchStreamer;