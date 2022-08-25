import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './style';
import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { GIPHY_TEXT } from '../../utilities/Constants';
import { listenGiphyTextSearch, removeGiphyTextRequests } from '../../services/database';

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
                    this.props.navigation.navigate(isAddOn ? 'InteractionsConfirmSelectionAddOn' : 'InteractionsConfirmSelection', {
                        giphyText,
                        ...this.props.navigation.state.params
                    });
                }}
                style={{
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
                            <RadMasonry
                                onEndReachedThreshold={0.25}
                                onEndReached={() => {}}
                                data={this.state.media}
                                numColumns={2}
                                renderItem={this.renderImage}
                                containerStyle={styles.gridMemeSubContainer}
                            />
                            :
                            <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                        }
                    </View>
                </View>
                {this.state.fetchGiphyText &&
                    <WebView style={{ display: 'none', opacity: 0, zIndex: -9999 }}
                        source={{ uri: `http://localhost:3000/giphyTextGenerator/${this.props.uid}/${this.props.navigation.getParam('text', '')}` }} />
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

export default connect(mapStateToProps)(InteractionsGiphyTextSelector);