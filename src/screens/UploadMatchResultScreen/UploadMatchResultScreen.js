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

class UploadMatchResultScreen extends Component {
    
    constructor(props) {
      super(props);
    
      this.state = {
          matchResultStatus: 'none',
          evidenceUrl: '',
          uploadingEvidence: false
      };
    }

    /**
     * Description:
     * Toogles and hightlight the correct match result button. If a button is activated
     * and then pressed, it won't update the state twice.
     *
     * @param {string}  resultType Match result type.
     *
     */
    toogleResultButton = (result) => {
        this.setState({
            matchResultStatus: result,
        });
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
     */
    getEvidenceData = (url) => {
        this.setState({
            evidenceUrl: url,
            uploadingEvidence: false
        });
    }

    /**
     * Upload user result to firebase
     */
    uploadResult = () => {
        if (this.state.matchResultStatus !== 'none') {
            uploadMatchResult(this.props.navigation.getParam('idMatch'), this.props.navigation.getParam('adversary'), this.state.matchResultStatus, this.state.evidenceUrl);
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
                            <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, '1')}>
                                <View>
                                    <QaploinIcon
                                        fill={this.state.matchResultStatus === '1' ? '#36E5CE' : 'gray'} 
                                        height={100}
                                        width={100} /> 
                                </View>                       
                            </TouchableWithoutFeedback>
                            <View style={styles.winLooseSeparator} />
                            <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, '0')}> 
                                <View>
                                    <QaploinIcon
                                        fill={this.state.matchResultStatus === '0' ? '#FF0000' : 'gray'}
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
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, '7')}>
                            <View style={[styles.otherResultButton, { borderColor: this.state.matchResultStatus === '7' ? '#FF0000' : '#6D7DDE' }]}>
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
