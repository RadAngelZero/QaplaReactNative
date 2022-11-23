import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard, Modal, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './style';
import images from './../../../assets/images';
import { getGiphyTextRequestKey, listenGiphyTextSearch, removeGiphyTextRequests, stopListeningGiphyTextSearch } from '../../services/database';
import { GIPHY_TEXT_GENERATOR_URL } from '../../utilities/Constants';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { translate } from '../../utilities/i18';

class Create3DTextModal extends Component {
    state = {
        fetchGiphyText: true,
        searchQuery: '',
        textToGenerate: '',
        media: [],
        keyboardHeight: 0
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

    listenGiphyText = (triggeredOnShow = false) => {
        if (triggeredOnShow && this.props.defaultMessage && this.state.textToGenerate !== this.props.defaultMessage) {
            this.searchHandler(this.props.defaultMessage);
        }

        listenGiphyTextSearch(this.props.requestId, (data) => {
            if (data.exists()) {
                this.setState({ media: data.val(), fetchGiphyText: false }, () => {
                    // After saving the data on the state remove listeners and data
                    stopListeningGiphyTextSearch(this.props.requestId);
                    removeGiphyTextRequests(this.props.requestId);
                });
            }
        });
    }

    searchHandler = (searchQuery) => {
        clearTimeout(this.searchTimeout);
        this.setState({ searchQuery, requestedStreamers: [] });
        if (searchQuery !== '') {
            this.searchTimeout = setTimeout(async () => {
                this.setState({ fetchGiphyText: true, textToGenerate: searchQuery }, this.listenGiphyText);
            }, 250);
        }
    }

    renderImage = ({ item }) => {
        let isAddOn = true;
        if (this.props.navigation) {
            isAddOn = this.props.navigation.getParam('isAddOn', false);
        } else {
            isAddOn = this.props.isAddOn
        }

        const ratio = item.images.fixed_height_small.width / item.images.fixed_height_small.height;
        const giphyText = {
            original: {
                ...item.images.original
            }
        };

        return (
            <TouchableOpacity disabled={!this.state.textToGenerate}
                onPress={() => this.props.on3DTextSelected(this.state.textToGenerate, giphyText)}
                style={{
                    width: widthPercentageToPx(45),
                    borderRadius: 10,
                    marginBottom: 8,
                    marginHorizontal: 4,
                    overflow: 'hidden',
                }}>
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
    };

    render() {
        const text = this.state.textToGenerate ? this.state.textToGenerate : 'sample';

        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                animationType='slide'
                onShow={() => this.listenGiphyText(true)}
                transparent>
                <View style={styles.container}>
                    <View style={[styles.gridMainContainer, {
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
                                    placeholder={translate('create3DTextModal.typeToCreate')}
                                    placeholderTextColor='#fff3'
                                    keyboardAppearance='dark' />
                            </View>
                        </View>
                        <View style={styles.listContainer}>
                            {!this.state.fetchGiphyText ?
                                <FlatList data={this.state.media}
                                    ListFooterComponent={() => <View style={{ height: 50 }} />}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    renderItem={this.renderImage}
                                    keyboardShouldPersistTaps='handled' />
                                :
                                <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                            }
                        </View>
                        {this.state.fetchGiphyText &&
                            <WebView containerStyle={{ position: 'absolute', width: 0, height: 0, display: 'none', zIndex: -9999 }}
                                source={{ uri: `${GIPHY_TEXT_GENERATOR_URL}${this.props.requestId}/${text}` }} />
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    /**
     * Not recommended to do this here but is the best way, if we can not access the uid (most probably that means
     * the user is not authenticated) then we generate a random firebase key for the request
     */
    let requestId = state.userReducer.user.id ? state.userReducer.user.id : getGiphyTextRequestKey();

    return {
        requestId
    };
}

export default connect(mapStateToProps)(Create3DTextModal);