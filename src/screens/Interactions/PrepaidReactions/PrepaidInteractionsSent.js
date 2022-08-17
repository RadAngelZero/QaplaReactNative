import React, { Component } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import images from '../../../../assets/images';
import SentInteractionModal from '../../../components/InteractionsModals/SentInteractionModal';
import { translate } from '../../../utilities/i18';
import styles from '../style';

class PrepaidInteractionsSent extends Component {
    pressHandler = () => {
        const isStreaming = this.props.navigation.getParam('isStreaming', false);
        const streamerName = this.props.navigation.getParam('displayName', '');
        if (isStreaming) {
            Linking.openURL(`https://www.twitch.tv/${streamerName.toLowerCase()}`);
        }

        this.props.navigation.navigate('Timeline');
    }

    render() {
        const streamerName = this.props.navigation.getParam('displayName', '');
        // const isStreaming = this.props.navigation.getParam('isStreaming', false);
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
                            {`${translate('interactions.final.cheersSent')}\n\n`}
                            {`${translate('interactions.final.weveSentYourQoins', { qoins: donationTotal })} `}
                            <Text style={styles.accentTextColor}>
                                {streamerName}
                            </Text>
                        </Text>
                        :
                        !isStreaming ?
                            <Text style={[styles.whiteText, styles.sentText, !isStreaming ? styles.onlyQoinsText : {}]}>
                                {`${translate('interactions.final.interactionOnQueueP1')}`}
                                <Text style={styles.accentTextColor}>
                                    {streamerName}
                                </Text>
                                {` ${translate('interactions.final.interactionOnQueueP2')}`}
                            </Text>
                            :
                            <Text style={[styles.whiteText, styles.sentText]}>
                                {`${translate('interactions.final.interactionSentP1')} `}
                                <Text style={styles.accentTextColor}>
                                    {streamerName}
                                </Text>
                                {`${translate('interactions.final.interactionSentP2')} `}
                            </Text>
                    }
                </View>
                <SentInteractionModal onPress={this.pressHandler} streamerName={streamerName} qoins={donationTotal} isLive={isStreaming} goHome={() => this.props.navigation.navigate('Timeline')} />
            </View>
        )
    }

}

export default PrepaidInteractionsSent;