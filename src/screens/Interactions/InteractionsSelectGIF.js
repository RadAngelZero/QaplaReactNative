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
        gifSection: 1,
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
                newSizes[id] = { height, width, fetching: true };
                this.setState({
                    ...this.state,
                    imgSizes: newSizes,
                });
            } else {
                newSizes[id] = { height: 0, width: 0, fetching: true };
                this.setState({
                    ...this.state,
                    imgSizes: newSizes,
                });
            }
        }, (error) => {
            console.log(error.message);
        });
    }

    renderImage = ({ item, i }) => {
        if (this.state.imgSizes[item.id] === undefined) {
            this.getImageHeight(item.url, i, item.id);
            console.log('retry');
            return (<></>);
        }
        const ratio = this.state.imgSizes[item.id].width / this.state.imgSizes[item.id].height;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('InteractionsConfirmSelection', {
                        itemID: item.id,
                        itemURL: item.url,
                        size: { height: this.state.imgSizes[item.id].height, width: this.state.imgSizes[item.id].width },
                        ratio,
                    });
                    console.log(item.id);
                    console.log(item.url);
                    console.log(i);
                }}
                style={{
                    borderRadius: 10 * getScreenSizeMultiplier(),
                    marginBottom: 8 * getScreenSizeMultiplier(),
                    marginHorizontal: 4 * getScreenSizeMultiplier(),
                    overflow: 'hidden',
                    backgroundColor: '#202152',
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 40 * getScreenSizeMultiplier(),
                        marginTop: 16 * getScreenSizeMultiplier(),
                        paddingHorizontal: 16 * getScreenSizeMultiplier(),
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            backgroundColor: '#0D1021',
                            flexDirection: 'row',
                            height: '100%',
                            width: 270 * getScreenSizeMultiplier(),
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
                        <Image source={images.png.PoweredbyGiphy.img} style={{
                            flex: 1,
                            width: 77 * getScreenSizeMultiplier(),
                            maxWidth: 77 * getScreenSizeMultiplier(),
                            height: 28 * getScreenSizeMultiplier(),
                        }} />
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
                            containerStyle={{
                                paddingBottom: 75 * getScreenSizeMultiplier(),
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#141539',
                    height: 75 * getScreenSizeMultiplier(),
                    width: '100%',
                    borderTopLeftRadius: 30 * getScreenSizeMultiplier(),
                    borderTopRightRadius: 30 * getScreenSizeMultiplier(),
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, searchQuery: '', gifSection: 0 })}
                        style={{
                            backgroundColor: !this.state.gifSection ? '#29326B' : '#0000',
                            paddingHorizontal: 13 * getScreenSizeMultiplier(),
                            paddingVertical: 6 * getScreenSizeMultiplier(),
                            borderRadius: 6 * getScreenSizeMultiplier(),
                        }}
                    >
                        <Text style={{
                            color: !this.state.gifSection ? '#FFFFFF' : '#FFFFFF99',
                            fontSize: 17 * getScreenSizeMultiplier(),
                            fontWeight: '600',
                            lineHeight: 22 * getScreenSizeMultiplier(),
                            letterSpacing: 0,
                        }}>
                            Recientes
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: 8 * getScreenSizeMultiplier() }} />
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, searchQuery: '', gifSection: 1 })}
                        style={{
                            backgroundColor: this.state.gifSection ? '#29326B' : '#0000',
                            paddingHorizontal: 13 * getScreenSizeMultiplier(),
                            paddingVertical: 6 * getScreenSizeMultiplier(),
                            borderRadius: 6 * getScreenSizeMultiplier(),
                        }}
                    >
                        <Text style={{
                            color: this.state.gifSection ? '#FFFFFF' : '#FFFFFF99',
                            fontSize: 17 * getScreenSizeMultiplier(),
                            fontWeight: '600',
                            lineHeight: 22 * getScreenSizeMultiplier(),
                            letterSpacing: 0,
                        }}>
                            Tendencia
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }

}

export default InteractionsSelectGIF;