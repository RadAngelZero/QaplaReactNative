// diego          - 13-08-2019 - us77 - File creation

import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, Linking } from 'react-native';

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
                <TutorialCarousel images={images} />
                <TextInput placeholder='Inserta aqui el URL del clip'
                    placeholderTextColor='#898A97'
                    onChangeText={this.setUrlText}
                    style={[styles.urlTextInput, { borderBottomColor: this.state.showUrlError ? '#FF0000' : 'transparent' }]} />
                <Text style={styles.instructions}>
                    Sube tu clip a tu perfil de CLUTCH usando el <Text style={styles.highlightedText}>#qaplagaming</Text> con el <Text style={styles.highlightedText}>ID de la partida</Text> en la descripción y compártenos el link, como se muestra en la imagen de arriba ;)
                </Text>
                <TouchableWithoutFeedback onPress={this.submitData}>
                    <View style={styles.readyButton}>
                        <Text style={styles.readyButtonText}>Listo</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.goToClutchButtonText} onPress={this.linkToClutchApp} >IR A CLUTCH</Text>
            </View>
        );
    }
}

export default UploadClutchEvidenceScreen;
