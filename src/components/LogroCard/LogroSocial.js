// josep.sanahuja - 26-09-2019 - us117 - Added goToSocialLink
// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer logic
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Linking } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';

const QaploinIcon = Images.svg.qaploinsIcon;

class LogroSocial extends Component {
    /**
     * Validates that the url is a valid url
     */
    urlIsValid() {
        /**
         * Reg. exp to check for valid url's
         * Lear more about reg exp in: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
         */
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(this.state.url);
    }

    /**
     * Send the user to the social link page (if app is installed then asked to open with the app)
     */
    goToSocialLink = (url) => {
        Linking.openURL(url);
    }

    render() {
        const {titulo, descripcion, qaploins, photoUrl, pageLink, totalPuntos, verified} = this.props;
        
        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.colASocialContainer}>
                        <Image style={styles.picture} source={{uri: photoUrl}} />
                    </View>
                    <View style={styles.colBSocialContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleSocial}>{titulo}</Text>
                        </View>
                        <Text style={styles.description}>{descripcion}</Text>
                    </View>
                    <View style={styles.colCSocialContainer}>
                        <View style={styles.qaploinsContainer}>
                            <QaploinIcon height={31} width={31} style={styles.qaploinIcon} />
                            <Text style={styles.qaploinsText}>{qaploins}</Text>  
                        </View>
                        <TouchableWithoutFeedback>
                            <View style={styles.redimirButton}>
                                <Text style={styles.redimirTextButton}>Redimir</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.shareContainer}>
                    <TouchableWithoutFeedback onPress={() => {this.goToSocialLink(pageLink)}}>
                        <View>
                            <Text style={styles.likeText}>Dar Like</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View>
                            <Text style={styles.uploadText}>Subir</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default LogroSocial;

