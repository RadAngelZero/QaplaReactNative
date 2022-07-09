import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import SentInteractionModal from '../../components/InteractionsModals/SentInteractionModal';
import styles from './style';

class InteractionsSent extends Component {
    state = {
        streamerName: '',
        isLive: false,
        totalQoins: 350,
    }

    componentDidMount() {
        console.log(this.props.navigation.dangerouslyGetParent().state.routes);
        console.log();
        const streamerName = this.props.navigation.dangerouslyGetParent().state.routes[0].params.streamerName;
        const isLive = this.props.navigation.dangerouslyGetParent().state.routes[0].params.isLive;
        const onlyQoins = this.props.navigation.dangerouslyGetParent().state.routes[this.props.navigation.dangerouslyGetParent().state.index - 1].params.onlyQoins;
        this.setState({ streamerName });
        if (isLive) {
            this.setState({ isLive });
        }
        if (onlyQoins) {
            this.setState({ onlyQoins });
        }
    }

    pressHandler = () => {
        if (this.state.isLive) {
            return console.log('a twitch');
        }
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
                    {!this.state.isLive ?
                        <Text style={[styles.whiteText, styles.sentText, !this.state.isLive ? styles.onlyQoinsText : {}]}>
                            {`Interacción en cola\n\n`}
                            <Text style={styles.accentTextColor}>
                                {this.state.streamerName}
                            </Text>
                            {`  no está en vivo. Tu alerta saldrá su próximo stream`}
                        </Text>
                        :
                        <Text style={[styles.whiteText, styles.sentText]}>
                            {`Interacción enviada\n\n¡Ve al canal de `}
                            <Text style={styles.accentTextColor}>
                                {this.state.streamerName}
                            </Text>
                            {` para ver tu alerta en vivo!`}
                        </Text>
                    }
                </View>
                <SentInteractionModal onPress={this.pressHandler} streamerName={this.state.streamerName} qoins={this.state.totalQoins} isLive={this.state.isLive} />
            </View>
        )
    }

}

export default InteractionsSent;