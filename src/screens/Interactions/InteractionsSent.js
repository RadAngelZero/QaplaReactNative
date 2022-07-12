import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import SentInteractionModal from '../../components/InteractionsModals/SentInteractionModal';
import styles from './style';

class InteractionsSent extends Component {
    componentDidMount() {
        const streamerName = this.props.navigation.getParam('displayName');
        const isLive = this.props.navigation.getParam('isStreaming');
        const onlyQoins = this.props.navigation.getParam('onlyQoins');
        this.setState({ streamerName });
        if (isLive) {
            this.setState({ isLive });
        }
        if (onlyQoins) {
            this.setState({ onlyQoins });
        }
    }

    pressHandler = () => {
        const isStreaming = this.props.navigation.getParam('isStreaming');
        if (isStreaming) {
            return console.log('a twitch');
        }
        this.props.navigation.dismiss();
    }

    render() {
        const streamerName = this.props.navigation.getParam('displayName', '');
        const isStreaming = this.props.navigation.getParam('isStreaming', false);
        const onlyQoins = this.props.navigation.getParam('onlyQoins', false);
        const donationTotal = this.props.navigation.getParam('donationTotal', 0);

        return (
            <View style={styles.container}>
                <View style={styles.sentContainer}>
                    <Image source={images.png.checkCircleGlow.img}
                        style={styles.sentCircle}
                        resizeMode="contain"
                    />
                    {onlyQoins ?
                        <Text style={[styles.whiteText, styles.sentText, !isStreaming ? styles.onlyQoinsText : {}]}>
                            {`Cheers enviados\n\n`}
                            <Text style={styles.accentTextColor}>
                                {streamerName}
                            </Text>
                            {` te agradece por tu apoyo 🌱`}
                        </Text>
                        :
                        !isStreaming ?
                            <Text style={[styles.whiteText, styles.sentText, !isStreaming ? styles.onlyQoinsText : {}]}>
                                {`Interacción en cola\n\n`}
                                <Text style={styles.accentTextColor}>
                                    {streamerName}
                                </Text>
                                {`  no está en vivo. Tu alerta saldrá su próximo stream`}
                            </Text>
                            :
                            <Text style={[styles.whiteText, styles.sentText]}>
                                {`Interacción enviada\n\n¡Ve al canal de `}
                                <Text style={styles.accentTextColor}>
                                    {streamerName}
                                </Text>
                                {` para ver tu alerta en vivo!`}
                            </Text>
                    }
                </View>
                <SentInteractionModal onPress={this.pressHandler} streamerName={streamerName} qoins={donationTotal} isLive={isStreaming} />
            </View>
        )
    }

}

export default InteractionsSent;