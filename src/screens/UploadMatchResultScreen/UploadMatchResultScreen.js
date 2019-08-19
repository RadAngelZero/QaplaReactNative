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
          uploadingEvidence: false
      };
    }

    /**
     * Description:
     * Toogles and hightlight the correct match result button. If a button is activated
     * and then pressed, it won't update the state twice.
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
     * Upload user match result to firebase database
     */
    uploadResult = () => {
        if (this.state.matchResultStatus) {
            uploadMatchResult(
                this.props.navigation.getParam('idMatch'),
                this.props.navigation.getParam('adversary'),
                this.state.matchResultStatus,
                this.state.evidenceUrl
            );
        } else {
            console.log('Here we can the modal');
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                {this.state.uploadingEvidence ?
                    <UploadClutchEvidenceScreen sendEvidenceData={this.getEvidenceData} />
                    :
                    <View style={styles.container}>
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
                            <TouchableWithoutFeedback onPress={this.sendToUploadEvidence.bind(this)}>
                                <QaploinIcon height={150} width={150} />
                            </TouchableWithoutFeedback>
                        </View>
                        <Text style={styles.footerEvidence}>
                            Evidencia.                  
                        </Text>
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, OTHER_RESULT)}>
                            <View style={[styles.otherResultButton, { borderColor: this.state.matchResultStatus === OTHER_RESULT ? '#FF0000' : '#6D7DDE' }]}>
                                <Text style={styles.buttonText}>OTRO RESULTADO</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.uploadResult}>
                            <View style={styles.uploadResultButton}>
                                <Text style={styles.buttonText}>SUBIR RESULTADO</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
            </SafeAreaView>
        );
    }
}

export default UploadMatchResultScreen;
