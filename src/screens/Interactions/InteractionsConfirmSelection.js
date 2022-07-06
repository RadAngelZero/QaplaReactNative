import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './style';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import ConfirmSelectionModal from '../../components/InteractionsModals/ConfirmSelectionModal';

class InteractionsConfirmSelection extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 244 * getScreenSizeMultiplier(),
                }}>
                    <Image
                        source={{ uri: this.props.navigation.getParam('itemURL', null) }}
                        style={{
                            display: 'flex',
                            flex: 1,
                            aspectRatio: this.props.navigation.getParam('ratio', 1),
                            maxHeight: heightPercentageToPx(40),
                            maxWidth: widthPercentageToPx(80),
                        }}
                        resizeMode="cover"
                    />
                </View>
                <ConfirmSelectionModal navigation={this.props.navigation} />
            </View>
        );
    }
}

export default InteractionsConfirmSelection;