import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity, Modal, ScrollView, Platform, Keyboard } from 'react-native';

import styles from './style';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import images from './../../../assets/images';
import { MEME } from '../../utilities/Constants';
import { searchMostViewedMemes, searchMemesWithTag, updateMemeLastViewed } from './../../services/elastic';
import { translate } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

const MEMES_TO_FETCH = 25;

class QaplaMemeSelectorModal extends Component {
    state = {
        searchQuery: '',
        gifSection: 1,
        media: [],
        cursor: '',
        fetchingMostViewedMemes: true
    };
    searchTimeout = null;

    componentDidMount() {
        this.fetchMemes(0, MEMES_TO_FETCH);

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

    fetchMemes = async (from, size) => {
        if (this.state.searchQuery === '') {
            const media = await searchMostViewedMemes(from, size);

            const mappedResults = media.hits.hits.map((hit) => ({
                    id: hit._id,
                    ...hit._source
                }
            ));

            this.setState({ media: this.state.media.concat(mappedResults) });
        } else {
            this.fetchMemesByTag(from, MEMES_TO_FETCH);
        }
    }

    fetchMemesByTag = async (from, size) => {
        const searchResult = await searchMemesWithTag(this.state.searchQuery, from, size);

        const suggestions = searchResult.hits.hits;
        const mappedResults = suggestions.map((suggestion) => ({
            id: suggestion._id,
            ...suggestion._source
        }));

        this.setState({ media: this.state.media.concat(mappedResults) });
    }

    searchHandler = (searchQuery) => {
        clearTimeout(this.fetchTimeout);
        this.setState({ searchQuery }, () => {
            if (searchQuery === '') {
                this.setState({ media: [] }, () => {
                    this.fetchMemes(0, MEMES_TO_FETCH);
                });
            } else {
                this.fetchTimeout = setTimeout(async () => {
                    const searchResult = await searchMemesWithTag(this.state.searchQuery.trimEnd(), 0, MEMES_TO_FETCH);

                    const suggestions = searchResult.hits.hits;
                    const mappedResults = suggestions.map((suggestion) => ({
                        id: suggestion._id,
                        ...suggestion._source
                    }));

                    this.setState({ media: mappedResults });
                }, 250);
            }
        });
    }

    renderImage = ({ item }) => {
        const ratio = item.width / item.height;
        const selectedMedia = {
            aspectRatio: ratio,
            data: {
                images: {
                    original: {
                        ...item
                    }
                }
            }
        };

        const onMemeSelected = (selectedMedia) => {
            this.props.onMediaSelect(selectedMedia, MEME);
            updateMemeLastViewed(item.id);
        }

        return (
            <TouchableOpacity
                onPress={() => onMemeSelected(selectedMedia)}
                style={{
                    borderRadius: 10,
                    marginBottom: 8,
                    marginHorizontal: 4,
                    overflow: 'hidden',
                    backgroundColor: '#202152',
                }}>
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
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps='never' scrollEnabled={false}
                        contentContainerStyle={[styles.memesContainer, {
                            height: (Platform.OS === 'android' && this.state.keyboardHeight) ? this.state.keyboardHeight : heightPercentageToPx(85)
                        }]}>
                        <View style={styles.gridSearchBarContainer}>
                            <TouchableOpacity onPress={this.props.onClose}>
                                <images.svg.closeIcon style={styles.closeIcon} />
                            </TouchableOpacity>
                            <View style={[styles.searchBar, styles.gridSearchBar]}>
                                <View style={{ opacity: 0.4 }}>
                                    <images.svg.searchStreamerIcon style={styles.searchIcon} />
                                </View>
                                <TextInput autoFocus
                                    value={this.state.searchQuery}
                                    onChangeText={this.searchHandler}
                                    style={styles.gridSearchBarTextInput}
                                    placeholder={translate('interactions.visual.searchByTags')}
                                    placeholderTextColor='#fff3'
                                    keyboardAppearance='dark' />
                            </View>
                        </View>
                        <View style={styles.gridMemeContainer}>
                            <RadMasonry
                                onEndReachedThreshold={0.25}
                                data={this.state.media}
                                numColumns={2}
                                renderItem={this.renderImage}
                                onEndReached={() => this.fetchMemes(this.state.media.length, MEMES_TO_FETCH)}
                                containerStyle={styles.gridMemeSubContainer}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

export default QaplaMemeSelectorModal;