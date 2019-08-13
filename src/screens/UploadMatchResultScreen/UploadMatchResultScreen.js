// diego          - 13-08-2019 - us77 - navigation to UploadClutchEvidenceScreen added
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


const QaploinIcon = Images.svg.favouritesIcon;

class UploadMatchResultScreen extends Component {
    
    constructor(props) {
      super(props);
    
      this.state = {
          matchResultStatus: 'none'
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
    toogleResultButton = (resultType) => {
        if (resultType === 'Won' && this.state.matchResultStatus !== 'won') {
            this.setState({
                matchResultStatus: 'won',
            }) 
        }
        else if(resultType === 'Lost' && this.state.matchResultStatus !== 'lost') {
            this.setState({
                matchResultStatus: 'lost',
            }) ;
        } else if (resultType === 'Other' && this.state.matchResultStatus !== 'other') {
            this.setState({ matchResultStatus: 'other' });
        }
    }

    /**
     * Send the user to UploadClutchEvidenceScreen
     */
    sendToUploadEvidence = () => this.props.navigation.navigate('UploadClutchEvidence');

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View style={styles.winLooseContainer}>
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, 'Won')}>
                            <View>
                                <QaploinIcon
                                    fill={this.state.matchResultStatus === 'won' ? '#36E5CE' : 'gray'} 
                                    height={100}
                                    width={100} /> 
                            </View>                       
                        </TouchableWithoutFeedback>
                        <View style={styles.winLooseSeparator} />
                        <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, 'Lost')}> 
                            <View>
                                <QaploinIcon
                                    fill={this.state.matchResultStatus === 'lost' ? '#36E5CE' : 'gray'}
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
                    <TouchableWithoutFeedback onPress={this.toogleResultButton.bind(this, 'Other')}>
                        <View style={[styles.otherResultButton, { borderColor: this.state.matchResultStatus === 'other' ? '#FF0000' : '#6D7DDE' }]}>
                            <Text style={styles.buttonText}>OTRO RESULTADO</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => console.log("mu")}>
                        <View style={styles.uploadResultButton}>
                            <Text style={styles.buttonText}>SUBIR RESULTADO</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        );
    }
}

export default UploadMatchResultScreen;
