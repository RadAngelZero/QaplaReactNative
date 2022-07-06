import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import styles from './style';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import ConfirmSelectionModal from '../../components/InteractionsModals/ConfirmSelectionModal';

class InteractionsConfirmSelection extends Component {
    state = {
        loadingMedia: true
    };

    render() {
        const giphyGif = this.props.navigation.getParam('selectedGif');

        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 244 * getScreenSizeMultiplier(),
                }}>
                    <ActivityIndicator size='large'
                        color='rgb(61, 249, 223)'
                        animating={this.state.loadingMedia} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}/>
                    <Image
                        onLoadEnd={() => this.setState({ loadingMedia: false })}
                        source={{ uri: giphyGif.original.url }}
                        style={{
                            opacity: this.state.loadingMedia ? 0 : 1,
                            flex: 1,
                            aspectRatio: giphyGif.original.width / giphyGif.original.height,
                            maxHeight: heightPercentageToPx(40),
                            maxWidth: widthPercentageToPx(80),
                        }}
                        resizeMode='contain' />
                </View>
                <ConfirmSelectionModal navigation={this.props.navigation} />
            </View>
        );
    }
}

export default InteractionsConfirmSelection;