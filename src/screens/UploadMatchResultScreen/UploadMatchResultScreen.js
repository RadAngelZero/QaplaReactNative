// diego          - 11-12-2019 - us160 - Updated analitycs
// diego          - 12-09-2019 - us99 - Added close icon to allow user cancelation on upload result
// diego          - 19-08-2019 - us89 - Add UploadMatchEvidenceModal and UploadMatchResultsModal
// diego          - 13-08-2019 - us77 - Added navigation to UploadClutchEvidenceScreen
// josep.sanahuja - 06-08-2019 - us78 - File creation

import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

import Images from './../../../assets/images';
import { uploadMatchResult } from '../../services/database';
import UploadMatchResultsModal from '../../components/UploadMatchResultsModal/UploadMatchResultsModal';
import { WON_RESULT, TIE_RESULT, LOST_RESULT, OTHER_RESULT } from '../../utilities/Constants';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';

const WinIcon = Images.svg.winIcon;
const LostIcon = Images.svg.lostIcon;
const TieIcon = Images.svg.tieIcon;

class UploadMatchResultScreen extends Component {

    constructor(props) {
      super(props);

      this.state = {
          matchResultStatus: null,
          showUploadMatchResultsModal: false,
          showUploadMatchEvidenceModal: false
      };
    }

    componentWillMount(){
        this.list = [
            /**
             * This event is triggered when the user enter (focus) on this screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => recordScreenOnSegment('Upload result Screen')
            )
        ];
    }
    /**
     * Description:
     * Toogles and hightlight the correct match result button. If a button is activated
     * and then pressed, it won't update the the state.
     *
     * @param {string}  result Result of the match
     *
     */
    toogleResultButton = (result) => {
        if (result != null && result !== undefined && result !== this.state.matchResultStatus) {
            this.setState({
                matchResultStatus: result
            });
        }
    }

    /**
     * Upload user match result to firebase database
     */
    uploadResult = async () => {
        try {
            let { matchResultStatus } = this.state;

            const matchData = this.props.navigation.getParam('matchData');

            await uploadMatchResult(
                matchData.idMatch,
                this.props.navigation.getParam('currentUserAdversary'),
                matchResultStatus,
                this.state.evidenceUrl
            );

            trackOnSegment('Upload result Button', {
                Game: matchData.game,
                Platform: matchData.platform,
                Bet: matchData.bet,
                UserQaploins: this.props.userQaploins,
                Result: matchResultStatus
            });
            this.setState({ showUploadMatchResultsModal: true });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Close the UploadMatchResultsModal
     */
    closeUploadMatchResultsModal = () => {
        this.setState({ showUploadMatchResultsModal: false });
    }

    /**
     * Close the UploadMatchResultScreen
     */
    closeUploadMatchResultScreen = () => this.props.navigation.pop();

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{translate('uploadMatchResultScreen.title')}</Text>
                    <View style={styles.winLooseContainer}>
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, WON_RESULT)}>
                            <View>
                                <WinIcon
                                    width={widthPercentageToPx(25)}
                                    height={heightPercentageToPx(20)}
                                    fill={this.state.matchResultStatus === WON_RESULT ? '#08D597' : '#B3B3B3'} />
                                <Text style={[styles.resultDecription, { color: this.state.matchResultStatus === WON_RESULT ? '#08D597' : '#B3B3B3' }]}>
                                    {translate('uploadMatchResultScreen.results.won')}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.winLooseSeparator} />
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, TIE_RESULT)}>
                            <View style={{ alignSelf: 'center' }}>
                                <TieIcon
                                    width={widthPercentageToPx(18)}
                                    height={heightPercentageToPx(14)}
                                    fill={this.state.matchResultStatus === TIE_RESULT ? '#6D7DDE' : '#B3B3B3'} />
                                <Text style={[styles.resultDecription, { color: this.state.matchResultStatus === TIE_RESULT ? '#6D7DDE' : '#B3B3B3' }]}>
                                    {translate('uploadMatchResultScreen.results.draw')}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.winLooseSeparator} />
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, LOST_RESULT)}>
                            <View>
                                <LostIcon
                                    width={widthPercentageToPx(25)}
                                    height={heightPercentageToPx(20)}
                                    fill={this.state.matchResultStatus === LOST_RESULT ? '#FF0000' : '#B3B3B3'} />
                                <Text style={[styles.resultDecription, { color: this.state.matchResultStatus === LOST_RESULT ? '#FF0000' : '#B3B3B3' }]}>
                                    {translate('uploadMatchResultScreen.results.lost')}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, OTHER_RESULT)}>
                        <View style={[styles.otherResultButton, { borderColor: this.state.matchResultStatus === OTHER_RESULT ? '#6D7DDE' : '#B3B3B3' }]}>
                            <Text style={styles.buttonText}>{translate('uploadMatchResultScreen.results.dontPlayed')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.matchResultStatus &&
                        <TouchableWithoutFeedback onPress={this.uploadResult}>
                            <View style={styles.uploadResultButton}>
                                <Text style={styles.buttonText}>{translate('uploadMatchResultScreen.uploadResult')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    <UploadMatchResultsModal
                        visible={this.state.showUploadMatchResultsModal}
                        onClose={this.closeUploadMatchResultsModal}
                        nextScreen='Public' />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        userQaploins: state.userReducer.user.credits
    };
}

export default connect(mapStateToProps)(UploadMatchResultScreen);