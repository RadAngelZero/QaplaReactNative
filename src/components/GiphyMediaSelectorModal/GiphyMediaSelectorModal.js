import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Keyboard,
    Platform,
    ScrollView,
    Modal,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import {
    GiphyContent,
    GiphyGridView,
    GiphyRating,
} from '@giphy/react-native-sdk';

import styles from './style';
import images from '../../../assets/images';
import { GIPHY_STICKERS } from '../../utilities/Constants';
import { translate } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

class GiphyMediaSelectorModal extends Component {
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

    searchHandler = (searchQuery) => {
        this.setState({ searchQuery });
    }

    render() {
        const mediaType = this.props.mediaType;

        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps='never' contentContainerStyle={[styles.gridMainContainer, {
                        height: (Platform.OS === 'android' && this.state.keyboardHeight) ? this.state.keyboardHeight : heightPercentageToPx(85)
                    }]} >
                        <View style={styles.gridSearchBarContainer}>
                            <TouchableOpacity onPress={this.props.onClose}>
                                <images.svg.closeIcon />
                            </TouchableOpacity>
                            <View style={[styles.searchBar, styles.gridSearchBar]}>
                                <View style={{ opacity: 0.4 }}>
                                    <images.svg.searchStreamerIcon style={styles.searchIcon} />
                                </View>
                                <TextInput autoFocus
                                    value={this.state.searchQuery}
                                    onChangeText={this.searchHandler}
                                    style={styles.gridSearchBarTextInput}
                                    placeholder={`${translate('interactions.visual.searchOn')} Giphy`}
                                    placeholderTextColor='#fff3'
                                    keyboardAppearance='dark' />
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
                                onMediaSelect={(e) => this.props.onMediaSelect(e.nativeEvent.media, mediaType)}
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
                </View>
            </Modal>
        );
    }
}

export default GiphyMediaSelectorModal;