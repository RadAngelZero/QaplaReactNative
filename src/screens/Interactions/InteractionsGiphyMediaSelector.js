import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Keyboard, Platform, ScrollView } from 'react-native';
import {
    GiphyContent,
    GiphyGridView,
    GiphyRating,
} from '@giphy/react-native-sdk';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { GIPHY_GIFS, GIPHY_STICKERS } from '../../utilities/Constants';
import { translate } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

class InteractionsGiphyMediaSelector extends Component {
    state = {
        searchQuery: '',
        gifSection: 1,
        keyboardHeight: 0,
        keyboardOpen: false,
    };
    searchTimeout = null;

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			this.setState({ keyboardHeight: parseInt(e.endCoordinates.height) });
		});
		this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', () => {
			this.setState({ keyboardHeight: 0 });
		});
    }

    componentWillUnmount() {
        this.keyboardWillHideListener.remove();
        this.keyboardWillShowListener.remove();
    }

    searchHandler = (e) => {
        this.setState({ searchQuery: e.nativeEvent.text });
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
                    style={[styles.gridElementContainer, {
                        backgroundColor: mediaType !== GIPHY_STICKERS ? '#202152' : 'transparent'
                    }]}
                >
                    <Image
                        source={{ uri: item.images.fixed_height_small.url }}
                        style={[
                            {
                                aspectRatio: ratio,
                                minWidth: '100%',
                            },
                        ]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            );
        }
    };

    render() {
        const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);

        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='never' contentContainerStyle={[styles.gridMainContainer, {
                    height: (Platform.OS === 'android' && this.state.keyboardHeight) ? this.state.keyboardHeight : heightPercentageToPx(85)
                }]} >
                    <View style={styles.gridSearchBarContainer}>
                        <View style={[styles.searchBar, styles.gridSearchBar]}>
                            <View style={{ opacity: 0.4 }}>
                                <images.svg.searchStreamerIcon style={styles.searchIcon} />
                            </View>
                            <TextInput
                                value={this.state.searchQuery}
                                onChange={this.searchHandler}
                                style={styles.gridSearchBarTextInput}
                                placeholder={`${translate('interactions.visual.searchOn')} Giphy`}
                                placeholderTextColor={'#fff3'}
                            />
                            {this.state.searchQuery === '' &&
                                <Image source={images.png.PoweredbyGiphyDark.img} style={styles.gridPoweredbyGiphy} />
                            }
                        </View>
                    </View>
                    <View style={styles.gridMasonryContainer}>
                        <GiphyGridView
                            content={this.state.searchQuery === '' ?
                                GiphyContent.trending({
                                    rating: GiphyRating.PG13,
                                    mediaType: mediaType,
                                })
                                :
                                GiphyContent.search({
                                    searchQuery: this.state.searchQuery,
                                    mediaType: mediaType,
                                    rating: GiphyRating.PG13,
                                })
                            }
                            cellPadding={11}
                            showCheckeredBackground={false}
                            spanCount={mediaType === GIPHY_STICKERS ? 3 : 2}
                            style={{ flex: 1 }}
                            onMediaSelect={
                                (e) => {
                                    this.props.navigation.navigate('InteractionsConfirmSelection', {
                                        selectedMedia: e.nativeEvent.media,
                                        mediaType,
                                        ...this.props.navigation.state.params,
                                    });
                                }}
                        />
                    </View>
                </ScrollView>
                {/* <View style={styles.gridBottomSectionSelector}>
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, searchQuery: '', gifSection: 0 })}
                        style={[styles.gridBottomSelectionSelectorButton, {
                            backgroundColor: !this.state.gifSection ? '#29326B' : '#0000',
                        }]}
                    >
                        <Text style={[styles.gridBottomSelectionSelectorButtonText, {
                            color: !this.state.gifSection ? '#FFFFFF' : '#FFFFFF99',
                        }]}
                        >
                            {translate('interactions.feed.recents')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, searchQuery: '', gifSection: 1 })}
                        style={[styles.gridBottomSelectionSelectorButton, {
                            backgroundColor: this.state.gifSection ? '#29326B' : '#0000',
                        }]}
                    >
                        <Text style={[styles.gridBottomSelectionSelectorButtonText, {
                            color: this.state.gifSection ? '#FFFFFF' : '#FFFFFF99',
                        }]}
                        >
                            {translate('interactions.visual.tabs.trends')}
                        </Text>
                    </TouchableOpacity>
                </View> */}
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