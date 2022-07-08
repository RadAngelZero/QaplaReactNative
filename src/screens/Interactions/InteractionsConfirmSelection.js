import React, { Component } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import styles from './style';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import ConfirmSelectionModal from '../../components/InteractionsModals/ConfirmSelectionModal';
import { getMediaTypeCost } from '../../services/database';

class InteractionsConfirmSelection extends Component {
    state = {
        loadingMedia: true,
        mediaCost: null
    };

    componentDidMount() {
        this.fetchMediaCost();
    }

    fetchMediaCost = async () => {
        const mediaType = this.props.navigation.getParam('mediaType');
        const cost = await getMediaTypeCost(mediaType);
        if (cost.exists()) {
            this.setState({ mediaCost: cost.val() });
        }
    }

    onConfirmSelection = async () => {
        const mediaType = this.props.navigation.getParam('mediaType');
        const costsObject = this.props.navigation.getParam('costs', {});
        this.props.navigation.navigate('InteractionsAddTTS', {
            ...this.props.navigation.state.params,
            costs: {
                [mediaType]: this.state.mediaCost,
                ...costsObject
            }
        });
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        const media = this.props.navigation.getParam('selectedMedia');
        const mediaType = this.props.navigation.getParam('mediaType');

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
                        source={{ uri: media.original.url }}
                        style={{
                            opacity: this.state.loadingMedia ? 0 : 1,
                            flex: 1,
                            aspectRatio: media.original.width / media.original.height,
                            maxHeight: heightPercentageToPx(40),
                            maxWidth: widthPercentageToPx(80),
                        }}
                        resizeMode='contain' />
                </View>
                {this.state.mediaCost !== null &&
                    <ConfirmSelectionModal mediaType={mediaType}
                        cost={this.state.mediaCost}
                        onConfirmSelection={this.onConfirmSelection}
                        onCancel={this.onCancel} />
                }
            </View>
        );
    }
}

export default InteractionsConfirmSelection;