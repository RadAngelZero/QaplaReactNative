import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from './style';
import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { GIPHY_TEXT } from '../../utilities/Constants';
import { NavigationEvents } from 'react-navigation';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { listenGiphyTextSearch } from '../../services/database';

class InteractionsGiphyTextSelector extends Component {
    state = {
        fetchGiphyText: true,
        searchQuery: '',
        gifSection: 1,
        media: [],
        cursor: ''
    };

    componentDidMount() {
        let firstTime = false;
        listenGiphyTextSearch(this.props.uid, (data) => {
            if (!firstTime && data.exists()) {
                this.setState({ media: data.val(), fetchGiphyText: false });
            } else {
                firstTime = true;
            }
        });
    }

    renderImage = ({ item }) => {
        const ratio = item.images.fixed_height_small.width / item.images.fixed_height_small.height;
        const selectedMedia = {
            original: {
                ...item.images.original
            }
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('InteractionsConfirmSelection', {
                        selectedMedia,
                        mediaType: GIPHY_TEXT,
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
        console.log(`http://localhost:3000/giphyTextGenerator/${this.props.uid}/${this.props.navigation.getParam('text', '')}`)
        return (
            <View style={styles.container}>
                <View style={styles.memesContainer} >
                    <View style={styles.gridMemeContainer}>
                        <RadMasonry
                            onEndReachedThreshold={0.25}
                            data={!this.state.fetchGiphyText ? this.state.media : []}
                            numColumns={2}
                            renderItem={this.renderImage}
                            containerStyle={styles.gridMemeSubContainer}
                        />
                    </View>
                </View>
                {this.state.fetchGiphyText &&
                    <WebView style={{ display: 'none', opacity: 0, zIndex: -9999 }}
                        source={{ uri: `http://localhost:3000/giphyTextGenerator/${this.props.uid}/${this.props.navigation.getParam('text', '')}` }}
                        onLoad={(e) => console.log(e)}
                        onError={(e) => console.log(e)} />
                }
                <NavigationEvents onDidFocus={() => this.setState({ fetchGiphyText: true })}
                    onDidBlur={() => this.setState({ fetchGiphyText: false })} />
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