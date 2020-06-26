import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

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
                            <QaplaText style={styles.endProcessFeedbackTitle}>
                                {translate('eventDetailsModal.awesomeTitle')}
                            </QaplaText>
                        :
                            <QaplaText style={styles.endProcessFeedbackTitle}>
                                {translate('eventDetailsModal.thankYouTitle')}
                            </QaplaText>
                        }
                        {acceptAllUsers ?
                            <QaplaText style={styles.endProcessFeedbackDescription}>
                                {translate('eventDetailsModal.alreadyAccepted')}
                            </QaplaText>
                        :
                            <>
                                <QaplaText style={styles.endProcessFeedbackDescription}>
                                    {translate('eventDetailsModal.succedRequest')}
                                    <QaplaText style={styles.streamerNameLink}>
                                        {` ${streamerName} `}
                                    </QaplaText>
                                    {translate('eventDetailsModal.nextStepsFeedback')}
                                </QaplaText>
                            </>
                        }
                    </View>
                    <Image
                        source={{ uri: this.props.event.sponsorImage }}
                        style={styles.eventSponsorImageLarge} />
                    <TouchableOpacity
                        style={styles.finishButtonContainer}
                        onPress={this.props.finishProcess}>
                        <QaplaText style={styles.finishButtonText}>
                            {translate('eventDetailsModal.finish')}
                        </QaplaText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default EventRegistrationSuccessful;
