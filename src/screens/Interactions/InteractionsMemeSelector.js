import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { getMemesLibrary } from '../../services/database';
import { MEME } from '../../utilities/Constants';

class InteractionsMemeSelector extends Component {
    state = {
        searchQuery: '',
        gifSection: 1,
        media: [],
        cursor: ''
    };
    searchTimeout = null;

    componentDidMount() {
        this.fetchQaplaMemesLibrary()
    }

    fetchQaplaMemesLibrary = async () => {
        const media = await getMemesLibrary(25);
        const mediaArray = Object.keys(media.val()).map((id) => ({ id, ...media.val()[id]}));
        this.setState({
            media: mediaArray.sort((a, b) => b.createdAt - a.createdAt)
        });
    }

    fetchMoreMemes = async (e) => {
        const newMedia = await getMemesLibrary(this.state.media.length + 25);

        if (newMedia.exists()) {
            const newMediaArray = Object.keys(newMedia.val()).map((id) => ({ id, ...newMedia.val()[id]}));
            this.setState({
                media: newMediaArray.sort(((a, b) => b.createdAt - a.createdAt))
            });
        }
    }

    renderImage = ({ item }) => {
        const ratio = item.width / item.height;
        const selectedMedia = {
            original: {
                ...item
            }
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('InteractionsConfirmSelection', {
                        selectedMedia,
                        mediaType: MEME,
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
                    source={{ uri: item.url }}
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
                            onEndReached={this.fetchMoreMemes}
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

export default connect(mapStateToProps)(InteractionsMemeSelector);