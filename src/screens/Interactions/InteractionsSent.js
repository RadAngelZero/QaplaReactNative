import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import SentInteractionModal from '../../components/InteractionsModals/SentInteractionModal';
import { translate } from '../../utilities/i18';
import styles from './style';

class InteractionsSent extends Component {
    state = {
        streamerName: '',
        isLive: false,
        totalQoins: 350,
        onlyQoins: false,
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
                    {this.state.onlyQoins ?
                        <Text style={[styles.whiteText, styles.sentText, !this.state.isLive ? styles.onlyQoinsText : {}]}>
                            {`${translate('interactions.final.cheersSentP1')} `}
                            <Text style={styles.accentTextColor}>
                                {`${this.state.streamerName} `}
                            </Text>
                            {`${translate('interactions.final.cheersSentP2')}`}
                        </Text>
                        :
                        !this.state.isLive ?
                            <Text style={[styles.whiteText, styles.sentText, !this.state.isLive ? styles.onlyQoinsText : {}]}>
                                {`${translate('interactions.final.interactionOnQueueP1')} `}
                                <Text style={styles.accentTextColor}>
                                    {`${this.state.streamerName} `}
                                </Text>
                                {`${translate('interactions.final.interactionOnQueueP2')}`}
                            </Text>
                            :
                            <Text style={[styles.whiteText, styles.sentText]}>
                                {`${translate('interactions.final.interactionSentP1')} `}
                                <Text style={styles.accentTextColor}>
                                    {`${this.state.streamerName}`}
                                </Text>
                                {`${translate('interactions.final.interactionSentP2')} `}
                            </Text>
                    }
                </View>
                <SentInteractionModal onPress={this.pressHandler} streamerName={this.state.streamerName} qoins={this.state.totalQoins} isLive={this.state.isLive} />
            </View>
        )
    }

}

export default InteractionsSent;