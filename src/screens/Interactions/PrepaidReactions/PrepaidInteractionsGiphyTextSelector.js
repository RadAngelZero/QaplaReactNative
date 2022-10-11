import React, { Component } from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import styles from './../style';
import { getScreenSizeMultiplier, widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import { listenGiphyTextSearch, removeGiphyTextRequests } from '../../../services/database';
import { GIPHY_TEXT_GENERATOR_URL } from '../../../utilities/Constants';
import images from '../../../../assets/images';

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

    componentDidMount() {
        this.onWillFocus();
    }

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
            },
            fixed_height_small: {
                ...item.images.fixed_height_small
            }
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    if (!this.props.openAsModal) {
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
                    } else {
                        this.props.onMessageSelected(giphyText);
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
        let text = '';
        if (this.props.navigation) {
            text = this.props.navigation.getParam('text', '');
        } else {
            text = this.props.message;
        }

        return (
            <SafeAreaView style={styles.container}>
                {this.props.openAsModal &&
                    <TouchableOpacity
                        onPress={this.props.onClose}
                        style={{
                            marginBottom: 20,
                            marginLeft: 16,
                        }}>
                        <images.svg.closeIcon />
                    </TouchableOpacity>
                }
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
                        source={{ uri: `${GIPHY_TEXT_GENERATOR_URL}${this.props.uid}/${text}` }} />
                }
                <NavigationEvents onWillFocus={this.onWillFocus} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(PrepaidInteractionsGiphyTextSelector);