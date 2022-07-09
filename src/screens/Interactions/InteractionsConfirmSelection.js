import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './style';
import ConfirmSelectionModal from '../../components/InteractionsModals/ConfirmSelectionModal';

class InteractionsConfirmSelection extends Component {

    state = {
        qoinsCost: 200,
    }

    yesButton = () => {
        if (this.props.navigation.dangerouslyGetParent().state.routes.length >= 5) {
            this.props.navigation.navigate('InteractionsCheckout', { hideBackButton: true });
            return;
        }
        this.props.navigation.navigate('InteractionsAddTTS');
    }

    noButton = () => {
        this.props.navigation.pop();
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('itemID', null));
        console.log(this.props.navigation.getParam('itemURL', null));
        console.log(this.props.navigation.getParam('ratio', null));
        console.log(this.props.navigation.getParam('size', null));

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.interactionSelectedScreenContainer}>
                    <View style={styles.interactionSelectedBorderRadius}>
                        <Image
                            source={{ uri: this.props.navigation.getParam('itemURL', null) }}
                            style={[styles.interactionSelectedConatiner, {
                                aspectRatio: this.props.navigation.getParam('ratio', 1),
                            }]}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <ConfirmSelectionModal yesButton={this.yesButton} noButton={this.noButton} qoinsCost={this.state.qoinsCost} />
            </View>
        );
    }
}

export default InteractionsConfirmSelection;