import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import SentInteractionModal from '../../components/InteractionsModals/SentInteractionModal';
import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
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
                <View style={{
                    marginTop: 100 * getScreenSizeMultiplier(),
                    alignItems: 'center',
                }}>
                    <Image source={images.png.checkCircleGlow.img}
                        style={{
                            height: 140 * getScreenSizeMultiplier(),
                        }}
                        resizeMode="contain"
                    />
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: '600',
                        lineHeight: 24,
                        letterSpacing: 0,
                        textAlign: 'center',
                        maxWidth: 204 * getScreenSizeMultiplier(),
                        marginTop: 30 * getScreenSizeMultiplier(),
                    }}>
                        {'Interacción enviada\n\n¡Ve al canal '}
                        <Text style={{
                            color: '#00FFDD',
                        }}>
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