import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, View } from 'react-native';
import styles from './style';
import ConfirmSelectionModal from '../../components/InteractionsModals/ConfirmSelectionModal';
import { getMediaTypeCost } from '../../services/database';
import { TTS } from '../../utilities/Constants';

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
        // If the user has already added TTS to their items then go directly to checkout
        if (costsObject[TTS]) {
            this.props.navigation.navigate('InteractionsCheckout', {
                ...this.props.navigation.state.params,
                costs: {
                    [mediaType]: this.state.mediaCost,
                    ...costsObject
                }
            });
        } else {
            this.props.navigation.navigate('InteractionsAddTTS', {
                ...this.props.navigation.state.params,
                costs: {
                    [mediaType]: this.state.mediaCost,
                    ...costsObject
                }
            });
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        const media = this.props.navigation.getParam('selectedMedia');
        const mediaType = this.props.navigation.getParam('mediaType');

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.interactionSelectedScreenContainer}>
                    <View style={styles.interactionSelectedBorderRadius}>
                        <ActivityIndicator size='large'
                            color='rgb(61, 249, 223)'
                            animating={this.state.loadingMedia} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}/>
                        <Image
                            onLoadEnd={() => this.setState({ loadingMedia: false })}
                            source={{ uri: media.original.url }}
                            style={[styles.interactionSelectedConatiner, {
                                opacity: this.state.loadingMedia ? 0 : 1,
                                aspectRatio: media.original.width / media.original.height
                            }]}
                            resizeMode='contain' />
                    </View>
                </View>
                {this.state.mediaCost !== null &&
                    <ConfirmSelectionModal mediaType={mediaType}
                        onConfirmSelection={this.onConfirmSelection}
                        onCancel={this.onCancel}
                        cost={this.state.mediaCost} />
                }
            </SafeAreaView>
        );
    }
}

export default InteractionsConfirmSelection;