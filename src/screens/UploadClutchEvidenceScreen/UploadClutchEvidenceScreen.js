// diego              - 14-11-2019 - us146 - AutoCapitalize disabled on TextInput
// diego              - 12-09-2019 - us99 - Added backToUploadMatchResultScreen to handle
//                                          the back to UploadMatchResultScreen
// diego              - 13-08-2019 - us77 - File creation

import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import i18n from 'i18n-js';

import styles from './style';
import Images from './../../../assets/images';
import TutorialCarousel from '../../components/TutorialCarousel/TutorialCarousel';

const images = [Images.png.uploadVideoClutch.img, Images.png.shareClutchLink.img];

export class UploadClutchEvidenceScreen extends Component {
    state = {
        url: '',
        showUrlError: false
    };

    /**
     * Validates that the url entered by the user is a valid url
     */
    urlIsValid() {
        /**
         * Reg. exp to check for valid url's
         * Lear more about reg exp in: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
         */
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(this.state.url);
    }

    /**
     * Set the url in state to the url writed by the user and disable the error on the TextInput
     * @param {string} url url writed by the user in the TextInput
     */
    setUrlText = (url) => this.setState({ showUrlError: false, url });

    /**
     * Send the data (url) to the UploadMatchResultScreen
     */
    submitData = () => {
        if (this.urlIsValid()) {
            this.props.sendEvidenceData(this.state.url);
        } else {
            this.setState({ showUrlError: true });
        }
    }

    /**
     * Send the user to the clutch app (if the app is not installed send it to the clutch.win web page)
     */
    linkToClutchApp = () => Linking.openURL('https://clutch.win/');

    render() {
        return (
            <View style={styles.container}>
                <TutorialCarousel
                    images={images}
                    backToUploadMatchResultScreen={this.props.backToUploadMatchResultScreen} />
                <TextInput placeholder={i18n.t('uploadClutchEvidenceScreen.insertClipPlaceholder')}
                    placeholderTextColor='#898A97'
                    keyboardType='url'
                    autoCapitalize='none'
                    onChangeText={this.setUrlText}
                    style={[styles.urlTextInput, { borderBottomColor: this.state.showUrlError ? '#FF0000' : 'transparent' }]}
                    onSubmitEditing={this.submitData} />
                <Text style={styles.instructions}>
                    {i18n.t('uploadClutchEvidenceScreen.instructions.firstPart')}
                    <Text style={styles.highlightedText}>{i18n.t('uploadClutchEvidenceScreen.instructions.highlightedText1')}</Text>
                    {i18n.t('uploadClutchEvidenceScreen.instructions.connector')}
                    <Text style={styles.highlightedText}>{i18n.t('uploadClutchEvidenceScreen.instructions.highlightedText2')}</Text>
                    {i18n.t('uploadClutchEvidenceScreen.instructions.secondPart')}
                </Text>
                <TouchableWithoutFeedback onPress={this.submitData}>
                    <View style={styles.readyButton}>
                        <Text style={styles.readyButtonText}>{i18n.t('uploadClutchEvidenceScreen.done')}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.goToClutchButtonText} onPress={this.linkToClutchApp}>{i18n.t('uploadClutchEvidenceScreen.goToClutch')}</Text>
            </View>
        );
    }
}

export default UploadClutchEvidenceScreen;
