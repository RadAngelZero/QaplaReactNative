import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import styles from './style';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import RadMasonry from '../../components/RadMasonry/RadMasonry';

const GIFsData = [
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    },
    {
        id: 'superman',
        url: 'https://media.giphy.com/media/YsTs5ltWtEhnq/giphy.gif',
    },
    {
        id: 'celebration',
        url: 'https://media4.giphy.com/media/BWR7oherCy0EHevd4w/giphy.webp?cid=6220afc6gxwtgcea3jbdsctutceaslmn8tpcaohivtu3gkv9&rid=giphy.webp&ct=g',
    },
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    },
    {
        id: 'superman',
        url: 'https://media.giphy.com/media/YsTs5ltWtEhnq/giphy.gif',
    },
    {
        id: 'celebration',
        url: 'https://media4.giphy.com/media/BWR7oherCy0EHevd4w/giphy.webp?cid=6220afc6gxwtgcea3jbdsctutceaslmn8tpcaohivtu3gkv9&rid=giphy.webp&ct=g',
    },
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    },
    {
        id: 'superman',
        url: 'https://media.giphy.com/media/YsTs5ltWtEhnq/giphy.gif',
    },
    {
        id: 'celebration',
        url: 'https://media4.giphy.com/media/BWR7oherCy0EHevd4w/giphy.webp?cid=6220afc6gxwtgcea3jbdsctutceaslmn8tpcaohivtu3gkv9&rid=giphy.webp&ct=g',
    },
];


class InteractionsSelectGIF extends Component {

    state = {
        imgSizes: {},
        searchQuery: '',
        selectedID: '',
        keyboardOpen: false,
    };

    componentDidMount() {
        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ keyboardOpen: true });
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardOpen: false });
            },
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    getImageHeight = (url, index, id) => {
        var newSizes = this.state.imgSizes;
        Image.getSize(url, (width, height) => {
            if (height !== undefined) {
                newSizes[id] = { height, width };
                this.setState({
                    ...this.state,
                    imgSizes: newSizes,
                });
            } else {
            }
        }, (error) => {
            console.log(error.message);
        });
    }

    renderImage = ({ item, i }) => {
        if (this.state.imgSizes[item.id] === undefined) {
            this.getImageHeight(item.url, i, item.id);
            return (<></>);
        }
        const ratio = this.state.imgSizes[item.id].width / this.state.imgSizes[item.id].height;
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log(item.id);
                    console.log(item.url);
                    console.log(i);
                }}
                style={{
                    borderRadius: 10 * getScreenSizeMultiplier(),
                    marginBottom: 8 * getScreenSizeMultiplier(),
                    marginHorizontal: 4 * getScreenSizeMultiplier(),
                    overflow: 'hidden',
                    backgroundColor: '#00FFDD',
                }}
            >
                <Image
                    source={{ uri: item.url }}
                    style={[
                        {
                            display: 'flex',
                            aspectRatio: ratio,
                            minWidth: '100%',
                        },
                        // this.props.selectedID === item.id ? {
                        //     borderWidth: 5,
                        //     borderColor: '#00FFDD',
                        // } : {},
                    ]}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        );
    };

    searchHandler = (e) => {
        this.setState({ searchQuery: e.nativeEvent.text });
        if (e.nativeEvent.text === '') {
            console.log('No busques');
        }
    }

    onEndReached = (e) => {
        console.log('el fin');
        // console.log(e);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    position: 'absolute',
                    backgroundColor: '#141539',
                    height: heightPercentageToPx(this.state.keyboardOpen ? 50.6 : 85),
                    bottom: 0,
                    borderTopLeftRadius: 40 * getScreenSizeMultiplier(),
                    borderTopRightRadius: 40 * getScreenSizeMultiplier(),
                    width: widthPercentageToPx(100),
                }} >
                    <View style={{
                        backgroundColor: '#0D1021',
                        flexDirection: 'row',
                        width: 343 * getScreenSizeMultiplier(),
                        height: 40 * getScreenSizeMultiplier(),
                        marginTop: 16 * getScreenSizeMultiplier(),
                        borderRadius: 50 * getScreenSizeMultiplier(),
                        paddingHorizontal: 18 * getScreenSizeMultiplier(),
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{ opacity: 0.4 }}>
                            <images.svg.searchStreamerIcon />
                        </View>
                        <View style={{ width: 10 }} />
                        <TextInput
                            value={this.state.searchQuery}
                            onChange={this.searchHandler}
                            style={{
                                color: '#fff',
                                width: '92%',
                                fontSize: 16,
                                fontWeight: '400',
                                lineHeight: 28,
                                letterSpacing: 1,
                                textAlignVertical: 'center',
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        alignSelf: 'center',
                        marginTop: 16 * getScreenSizeMultiplier(),
                        paddingHorizontal: 6 * getScreenSizeMultiplier(),
                    }}>
                        <RadMasonry
                            data={GIFsData}
                            numColumns={2}
                            renderItem={this.renderImage}
                            onEndReached={this.onEndReached}
                        />
                    </View>

                </View>
            </View>
        );
    }

}

export default InteractionsSelectGIF;