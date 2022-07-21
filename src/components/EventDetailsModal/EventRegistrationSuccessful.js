import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { userProfileGIFsRef, getUserProfileGIFs } from '../../services/database';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { copyDataToClipboard } from '../../utilities/utils';



class EventRegistrationSuccessful extends Component {

    state = {
        GIFURL: '',
        twitchURLCopied: false,
    }

    componentDidMount() {
        getUserProfileGIFs().then((data) => {
            const GIFsURLs = [];
            data.forEach((gif) => {
                GIFsURLs.push(gif.val().url);
            });
            const random = Math.floor(Math.random() * GIFsURLs.length);
            this.setState({ GIFURL: GIFsURLs[random] });
        });
    }

    copyStreamerTwitchURL = () => {
        const { streamerChannelLink } = this.props.event;
        copyDataToClipboard(streamerChannelLink);
        this.setState({ twitchURLCopied: true });
        setTimeout(() => {
            this.setState({ twitchURLCopied: false });
        }, 3000);
    }

    render() {
        const { streamerName, acceptAllUsers } = this.props.event;

        return (
            <View>
                <LinearGradient
                    colors={['#A716EE', '#2C07FA']}
                    angle={136}
                    useAngle
                    style={styles.successLinearGradient}
                >
                    <Image
                        source={{ uri: this.state.GIFURL }}
                        style={styles.successGIF}
                        resizeMode={'contain'}
                    />
                    <Text style={[styles.whiteText, styles.successJoinedStream]}>
                        {`${translate('eventDetailsModal.success.joinedStream')}`}
                    </Text>
                    <Text style={[styles.whiteText, styles.successSubTitle]}>
                        {`${translate('eventDetailsModal.success.remind')}`}
                        <Text style={{
                            color: '#00FFDD',
                            fontWeight: '500',
                        }}>
                            {this.props.event.streamerName}
                        </Text>
                    </Text>
                    <TouchableOpacity style={styles.successDiscoverButton}
                        onPress={this.props.finishProcess}
                    >
                        <Text style={styles.successDiscoverButtonText}>
                            {`${translate('eventDetailsModal.success.discover')}`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.shareContainer, styles.successShareContainerMarginTop]}
                        onPress={this.copyStreamerTwitchURL}
                        disabled={this.state.twitchURLCopied}
                    >
                        {this.state.twitchURLCopied ?
                            <Images.svg.tickOkTransparent style={styles.successTickIcon} />
                            :
                            <Images.svg.shareArrowTransparent />
                        }
                        <Text style={styles.successShareText}>
                            {this.state.twitchURLCopied ?
                                <>
                                    {`${translate('eventDetailsModal.linkCopied')}`}
                                </>
                                :
                                <>
                                    {`${translate('eventDetailsModal.shareWithYourFriends')}`}
                                </>
                            }
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                {/* <View style={styles.mainFeedbackContainer}>
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
                </View> */}
            </View >
        );
    }
}

export default EventRegistrationSuccessful;
