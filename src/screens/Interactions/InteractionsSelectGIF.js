import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { generateGiphyUserRandomId, getGiphyTrending, searchGiphyMedia } from '../../services/Giphy';
import { GIPHY_GIFS } from '../../utilities/Constants';
import { getLocaleLanguage } from '../../utilities/i18';

class InteractionsSelectGIF extends Component {
    state = {
        searchQuery: '',
        keyboardOpen: false,
        gifSection: 1,
        gifs: []
    };
    searchTimeout = null;

    componentDidMount() {
        this.fetchTrendingGifs();
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

    fetchTrendingGifs = async () => {
        let giphyRandomId = '';
        if (!this.props.giphyId) {
            giphyRandomId = await generateGiphyUserRandomId();
        } else {
            giphyRandomId = this.props.giphyId;
        }

        const gifs = await getGiphyTrending(giphyRandomId, GIPHY_GIFS, 25);
        this.setState({ gifs });
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    renderImage = ({ item }) => {
        if (item.images.fixed_height_small) {
            const ratio = item.images.fixed_height_small.width / item.images.fixed_height_small.height;
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('InteractionsConfirmSelection', {
                            itemID: item.id,
                            itemURL: item.url,
                            size: { height: item.images.fixed_height_small.height, width: item.images.fixed_height_small.width },
                            ratio
                        });
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
                        source={{ uri: item.images.fixed_height_small.url }}
                        style={[
                            {
                                display: 'flex',
                                aspectRatio: ratio,
                                minWidth: '100%',
                            }
                        ]}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            );
        }
    };

    searchHandler = (e) => {
        clearTimeout(this.searchTimeout);
        this.setState({ searchQuery: e.nativeEvent.text }, () => {
            if (this.state.searchQuery !== '') {
                this.setState({ gifs: [] }, () => {
                    this.searchTimeout = setTimeout(async () => {
                            let giphyRandomId = '';
                            if (!this.props.giphyId) {
                                giphyRandomId = await generateGiphyUserRandomId();
                            } else {
                                giphyRandomId = this.props.giphyId;
                            }

                            const userLang = getLocaleLanguage();
                            const gifs = await searchGiphyMedia(giphyRandomId, this.state.searchQuery, GIPHY_GIFS, userLang, 25);

                            this.setState({ gifs });
                    }, 500);
                });
            } else {
                this.setState({ gifs: [] }, () => {
                    this.fetchTrendingGifs();
                });
            }
        });
    }

    fetchMoreGifs = async (e) => {
        let giphyRandomId = '';
        if (!this.props.giphyId) {
            giphyRandomId = await generateGiphyUserRandomId();
        } else {
            giphyRandomId = this.props.giphyId;
        }

        const actualGifsCopy = [...this.state.gifs];
        let newGifs = [];
        if (this.state.searchQuery === '') {
            newGifs = await getGiphyTrending(giphyRandomId, GIPHY_GIFS, 25, this.state.gifs.length);

        } else {
            const userLang = getLocaleLanguage();
            newGifs = await searchGiphyMedia(giphyRandomId, this.state.searchQuery, GIPHY_GIFS, userLang, 25, this.state.gifs.length);
        }

        this.setState({ gifs: actualGifsCopy.concat(newGifs) });
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
                            onEndReachedThreshold={0.25}
                            data={this.state.gifs}
                            numColumns={2}
                            renderItem={this.renderImage}
                            onEndReached={this.fetchMoreGifs}
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
                    <View style={{width: 8 * getScreenSizeMultiplier()}}/>
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

function mapStateToProps(state) {
    return {
        giphyId: state.userReducer.user.giphyId
    };
}

export default connect(mapStateToProps)(InteractionsSelectGIF);