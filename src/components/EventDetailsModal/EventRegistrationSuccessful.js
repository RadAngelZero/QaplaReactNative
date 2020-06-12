import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';

class EventRegistrationSuccessful extends Component {
    render() {
        const { streamerName, acceptAllUsers } = this.props.event;

        return (
            <View style={styles.fullHeightDialog}>
                <View style={styles.mainFeedbackContainer}>
                    <View>
                        <View style={styles.sentIconContainer}>
                            {acceptAllUsers ?
                                <Images.svg.highFiveIcon
                                    height={170}
                                    width={170} />
                            :
                                <Images.svg.sentIcon />
                            }
                        </View>
                        {acceptAllUsers ?
                            <Text style={styles.endProcessFeedbackTitle}>
                                {translate('eventDetailsModal.awesomeTitle')}
                            </Text>
                        :
                            <Text style={styles.endProcessFeedbackTitle}>
                                {translate('eventDetailsModal.thankYouTitle')}
                            </Text>
                        }
                        {acceptAllUsers ?
                            <Text style={styles.endProcessFeedbackDescription}>
                                {translate('eventDetailsModal.alreadyAccepted')}
                            </Text>
                        :
                            <>
                                <Text style={styles.endProcessFeedbackDescription}>
                                    {translate('eventDetailsModal.succedRequest')}
                                    <Text style={styles.streamerNameLink}>
                                        {` ${streamerName} `}
                                    </Text>
                                    {translate('eventDetailsModal.nextStepsFeedback')}
                                </Text>
                            </>
                        }
                    </View>
                    <Image
                        source={{ uri: this.props.event.sponsorImage }}
                        style={styles.eventSponsorImageLarge} />
                    <TouchableOpacity
                        style={styles.finishButtonContainer}
                        onPress={this.props.finishProcess}>
                        <Text style={styles.finishButtonText}>
                            {translate('eventDetailsModal.finish')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default EventRegistrationSuccessful;
