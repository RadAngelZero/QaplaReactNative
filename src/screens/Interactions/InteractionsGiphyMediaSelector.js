import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { generateGiphyUserRandomId, getGiphyTrending, searchGiphyMedia } from '../../services/Giphy';
import { GIPHY_GIFS } from '../../utilities/Constants';
import { getLocaleLanguage } from '../../utilities/i18';

class InteractionsGiphyMediaSelector extends Component {
    state = {
        searchQuery: '',
        gifSection: 1,
        media: []
    };
    searchTimeout = null;

    componentDidMount() {
        this.fetchTrendingMedia();
    }

    fetchTrendingMedia = async () => {
        let giphyRandomId = '';
        if (!this.props.giphyId) {
            giphyRandomId = await generateGiphyUserRandomId();
        } else {
            giphyRandomId = this.props.giphyId;
        }

        const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);
        const media = await getGiphyTrending(giphyRandomId, mediaType, 25);
        this.setState({ media });
    }

    searchHandler = (e) => {
        clearTimeout(this.searchTimeout);
        this.setState({ searchQuery: e.nativeEvent.text }, () => {
            if (this.state.searchQuery !== '') {
                this.setState({ media: [] }, () => {
                    this.searchTimeout = setTimeout(async () => {
                            let giphyRandomId = '';
                            if (!this.props.giphyId) {
                                giphyRandomId = await generateGiphyUserRandomId();
                            } else {
                                giphyRandomId = this.props.giphyId;
                            }

                            const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);
                            const userLang = getLocaleLanguage();
                            const media = await searchGiphyMedia(giphyRandomId, this.state.searchQuery, mediaType, userLang, 25);

                            this.setState({ media });
                    }, 500);
                });
            } else {
                this.setState({ media: [] }, () => {
                    this.fetchTrendingMedia();
                });
            }
        });
    }

    fetchMoreMedia = async (e) => {
        let giphyRandomId = '';
        if (!this.props.giphyId) {
            giphyRandomId = await generateGiphyUserRandomId();
        } else {
            giphyRandomId = this.props.giphyId;
        }

        const actualMediaCopy = [...this.state.media];
        let newMedia = [];
        if (this.state.searchQuery === '') {
            const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);
            newMedia = await getGiphyTrending(giphyRandomId, mediaType, 25, this.state.media.length);

        } else {
            const userLang = getLocaleLanguage();
            const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);
            newMedia = await searchGiphyMedia(giphyRandomId, this.state.searchQuery, mediaType, userLang, 25, this.state.media.length);
        }

        this.setState({ media: actualMediaCopy.concat(newMedia) });
    }

    renderImage = ({ item }) => {
        if (item.images.fixed_height_small) {
            const ratio = item.images.fixed_height_small.width / item.images.fixed_height_small.height;
            const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('InteractionsConfirmSelection', {
                            selectedMedia: item.images,
                            mediaType,
                            ...this.props.navigation.state.params
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

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    position: 'absolute',
                    backgroundColor: '#141539',
                    height: heightPercentageToPx(85),
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
                            data={this.state.media}
                            numColumns={2}
                            renderItem={this.renderImage}
                            onEndReached={this.fetchMoreMedia}
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

export default connect(mapStateToProps)(InteractionsGiphyMediaSelector);