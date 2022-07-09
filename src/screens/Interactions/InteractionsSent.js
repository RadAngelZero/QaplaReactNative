import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import SentInteractionModal from '../../components/InteractionsModals/SentInteractionModal';
import styles from './style';

class InteractionsSent extends Component {
    state = {
        streamerName: 'Rad',
        totalQoins: 350,
    }

    pressHandler = () => {
        console.log('ir a twitch o a feed');
        this.props.navigation.dismiss();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sentContainer}>
                    <Image source={images.png.checkCircleGlow.img}
                        style={styles.sentCircle}
                        resizeMode="contain"
                    />
                    <Text style={[styles.whiteText, styles.sentText]}>
                        {'Interacción enviada\n\n¡Ve al canal '}
                        <Text style={styles.accentTextColor}>
                            {this.state.streamerName}
                        </Text>
                        {' para ver tu alerta en vivo!'}
                    </Text>
                </View>
                <SentInteractionModal onPress={this.pressHandler} streamerName={this.state.streamerName} qoins={this.state.totalQoins} />
            </View>
        )
    }

}

export default InteractionsSent;