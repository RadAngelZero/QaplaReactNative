import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './style';
import { getScreenSizeMultiplier, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { getGiphyTextRequestKey, listenGiphyTextSearch, removeGiphyTextRequests, stopListeningGiphyTextSearch } from '../../services/database';
import { GIPHY_TEXT_GENERATOR_URL } from '../../utilities/Constants';
import images from '../../../assets/images';

class InteractionsGiphyTextSelector extends Component {
    state = {
        fetchGiphyText: false,
        searchQuery: '',
        gifSection: 1,
        media: [],
        moreTexts: [],
        cursor: '',
        loading: false
    };

    onWillFocus = async () => {
        /**
         * RequestId for authenticated users are their uid so we need to clean any previous request to avoid
         * render all content, for no authenticated users this do nothing.
         * We also try to remove the reference after doing the request but we can not rely 100% on that call
         */
        await removeGiphyTextRequests(this.props.requestId);
        this.setState({ fetchGiphyText: true, media: [] }, () => {
            this.listenGiphyText();
        });
    }

    listenGiphyText = () => {
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

    renderImage = ({ item }) => {
        const isAddOn = this.props.navigation.getParam('isAddOn', false);
        const ratio = item.images.fixed_height_small.width / item.images.fixed_height_small.height;
        const giphyText = {
            original: {
                ...item.images.original
            },
            fixed_height_small: {
                ...item.images.fixed_height_small
            }
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    const text = this.props.navigation.getParam('text', '');
                    if (isAddOn) {
                        this.props.navigation.navigate('InteractionsCheckout', {
                            ...this.props.navigation.state.params,
                            giphyText,
                            message: text
                        });
                    } else {
                        this.props.navigation.navigate('InteractionsConfirmSelection', {
                            ...this.props.navigation.state.params,
                            giphyText,
                            message: text
                        });
                    }
                }}
                style={{
                    width: widthPercentageToPx(45),
                    borderRadius: 10 * getScreenSizeMultiplier(),
                    marginBottom: 8 * getScreenSizeMultiplier(),
                    marginHorizontal: 4 * getScreenSizeMultiplier(),
                    overflow: 'hidden',
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
                    resizeMode='cover' />
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.memesContainer} >
                    <View style={styles.gridMemeContainer}>
                        <Image source={images.png.PoweredbyGiphyDark.img} style={{ alignSelf: 'center', marginBottom: 16, marginTop: 24 }} />
                        {!this.state.fetchGiphyText ?
                            <FlatList data={this.state.media}
                                numColumns={2}
                                columnWrapperStyle={{justifyContent: 'space-between'}}
                                renderItem={this.renderImage}
                                containerStyle={styles.gridMemeSubContainer} />
                            :
                            <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                        }
                    </View>
                </View>
                {this.state.fetchGiphyText &&
                    <WebView style={{ display: 'none', opacity: 0, zIndex: -9999 }}
                        source={{ uri: `${GIPHY_TEXT_GENERATOR_URL}${this.props.requestId}/${this.props.navigation.getParam('text', '')}` }} />
                }
                <NavigationEvents onWillFocus={this.onWillFocus} />
            </View>
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

export default connect(mapStateToProps)(InteractionsGiphyTextSelector);