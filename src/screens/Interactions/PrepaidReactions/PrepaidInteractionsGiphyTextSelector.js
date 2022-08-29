import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './../style';
import { getScreenSizeMultiplier, widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import { listenGiphyTextSearch, removeGiphyTextRequests } from '../../../services/database';
import { GIPHY_TEXT_GENERATOR_URL } from '../../../utilities/Constants';

class PrepaidInteractionsGiphyTextSelector extends Component {
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
        await removeGiphyTextRequests(this.props.uid);
        this.setState({ fetchGiphyText: true, media: [] }, () => {
            this.listenGiphyText();
        });
    }

    listenGiphyText = () => {
        listenGiphyTextSearch(this.props.uid, (data) => {
            if (data.exists()) {
                this.setState({ media: data.val(), fetchGiphyText: false });
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
                        this.props.navigation.navigate('PrepaidInteractionsCheckout', {
                            ...this.props.navigation.state.params,
                            giphyText,
                            message: text
                        });
                    } else {
                        this.props.navigation.navigate('PrepaidInteractionsConfirmSelection', {
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
                    resizeMode='cover'
                />
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.memesContainer} >
                    <View style={styles.gridMemeContainer}>
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
                        source={{ uri: `${GIPHY_TEXT_GENERATOR_URL}${this.props.uid}/${this.props.navigation.getParam('text', '')}` }} />
                }
                <NavigationEvents onWillFocus={this.onWillFocus} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(PrepaidInteractionsGiphyTextSelector);