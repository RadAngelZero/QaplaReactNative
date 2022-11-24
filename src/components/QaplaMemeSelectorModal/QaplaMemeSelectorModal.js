import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Modal } from 'react-native';

import styles from './style';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { getMemesLibrary } from '../../services/database';
import images from './../../../assets/images';
import { MEME } from '../../utilities/Constants';

class QaplaMemeSelectorModal extends Component {
    state = {
        searchQuery: '',
        gifSection: 1,
        media: [],
        cursor: ''
    };
    searchTimeout = null;

    componentDidMount() {
        this.fetchQaplaMemesLibrary();
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
            aspectRatio: ratio,
            data: {
                images: {
                    original: {
                        ...item
                    }
                }
            }
        };

        return (
            <TouchableOpacity
                onPress={() => this.props.onMediaSelect(selectedMedia, MEME)}
                style={{
                    borderRadius: 10,
                    marginBottom: 8,
                    marginHorizontal: 4,
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
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.memesContainer}>
                        <View style={styles.gridSearchBarContainer}>
                            <TouchableOpacity onPress={this.props.onClose}>
                                <images.svg.closeIcon style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.gridMemeContainer}>
                            <RadMasonry
                                onEndReachedThreshold={0.25}
                                data={this.state.media}
                                numColumns={2}
                                renderItem={this.renderImage}
                                onEndReached={this.fetchMoreMemes}
                                containerStyle={styles.gridMemeSubContainer}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default QaplaMemeSelectorModal;