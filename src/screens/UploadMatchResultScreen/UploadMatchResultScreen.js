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
import styles from './style';
import Images from './../../../assets/images';
import UploadClutchEvidenceScreen from '../UploadClutchEvidenceScreen/UploadClutchEvidenceScreen';
import { uploadMatchResult } from '../../services/database';
import UploadMatchResultsModal from '../../components/UploadMatchResultsModal/UploadMatchResultsModal';
import UploadMatchEvidenceModal from '../../components/UploadMatchEvidenceModal/UploadMatchEvidenceModal';

const CloseIcon = Images.svg.closeIcon;
const QaploinIcon = Images.svg.favouritesIcon;

const WON_RESULT = '1';
const LOST_RESULT = '0';
const OTHER_RESULT = '7';

class UploadMatchResultScreen extends Component {

    constructor(props) {
      super(props);
    
      this.state = {
          matchResultStatus: null,
          evidenceUrl: '',
          uploadingEvidence: false,
          showUploadMatchResultsModal: false,
          showUploadMatchEvidenceModal: false
      };
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
     * Open the UploadClutchEvidenceScreen
     */
    sendToUploadEvidence = () => {
        this.setState({
            uploadingEvidence: true
        });
    }

    /**
     * Get the inserted url afther that was validated on UploadClutchEvidenceScreen and back to the initial screen
     * @param {string} url Url inserted by the user on the UploadClutchEvidenceScreen
     */
    getEvidenceData = (url) => {
        this.setState({
            evidenceUrl: url,
            uploadingEvidence: false
        });
    }

    /**
     * Validate the result checking if the user have uploaded evidence, if have, upload the result, if not, open the modal
     */
    validateResultToUpload = () => {
        if (this.state.evidenceUrl !== '') {
            this.uploadResult();
        } else {
            this.setState({ showUploadMatchEvidenceModal: true });
        }
    }

    /**
     * Upload user match result to firebase database
     */
    uploadResult = async () => {
        try {
            await uploadMatchResult(
                this.props.navigation.getParam('idMatch'),
                this.props.navigation.getParam('currentUserAdversary'),
                this.state.matchResultStatus,
                this.state.evidenceUrl
            );
            this.setState({ showUploadMatchResultsModal: true })
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
     * Close the UploadMatchEvidenceModal
     */
    closeUploadMatchEvidenceModal = () => {
        this.setState({ showUploadMatchEvidenceModal: false });
    }

    /**
     * Close the UploadMatchResultScreen
     */
    closeUploadMatchResultScreen = () => this.props.navigation.pop();

    /**
     * Close clutch screen and back to UploadMatchResultScreen
     */
    backToUploadMatchResultScreen = () => this.setState({ uploadingEvidence: false });

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                {this.state.uploadingEvidence ?
                    <UploadClutchEvidenceScreen
                        backToUploadMatchResultScreen={this.backToUploadMatchResultScreen}
                        sendEvidenceData={this.getEvidenceData} />
                    :
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={this.closeUploadMatchResultScreen}>
                            <View style={styles.closeIcon}>
                                <CloseIcon />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.winLooseContainer}>
                            <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, WON_RESULT)}>
                                <View>
                                    <QaploinIcon
                                        fill={this.state.matchResultStatus === WON_RESULT ? '#36E5CE' : 'gray'} 
                                        height={100}
                                        width={100} /> 
                                </View>                       
                            </TouchableWithoutFeedback>
                            <View style={styles.winLooseSeparator} />
                            <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, LOST_RESULT)}> 
                                <View>
                                    <QaploinIcon
                                        fill={this.state.matchResultStatus === LOST_RESULT ? '#FF0000' : 'gray'}
                                        height={100}
                                        width={100} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.uploadEvidence}>
                            <TouchableWithoutFeedback onPress={this.sendToUploadEvidence}>
                                <QaploinIcon height={150} width={150} />
                            </TouchableWithoutFeedback>
                        </View>
                        <Text style={styles.footerEvidence}>
                            Evidencia.                  
                        </Text>
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, OTHER_RESULT)}>
                            <View style={[styles.otherResultButton, { borderColor: this.state.matchResultStatus === OTHER_RESULT ? '#FF0000' : '#6D7DDE' }]}>
                                <Text style={styles.buttonText}>Otro Resultado</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {this.state.matchResultStatus &&
                            <TouchableWithoutFeedback onPress={this.validateResultToUpload}>
                                <View style={styles.uploadResultButton}>
                                    <Text style={styles.buttonText}>Subir Resultado</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                        <UploadMatchResultsModal
                            visible={this.state.showUploadMatchResultsModal}
                            onClose={this.closeUploadMatchResultsModal}
                            nextScreen='Publicas' />
                        <UploadMatchEvidenceModal
                            visible={this.state.showUploadMatchEvidenceModal}
                            onClose={this.closeUploadMatchEvidenceModal}
                            cb1={this.uploadResult} />
                    </View>
                }
            </SafeAreaView>
        );
    }
}

export default UploadMatchResultScreen;
