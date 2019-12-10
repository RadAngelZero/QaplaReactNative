// josep.sanahuja - 26-09-2019 - us118 - Added goToSocialLink & ImagePickerModal
// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer logic
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import Images from '../../../assets/images';

import { redeemLogroCloudFunction } from '../../services/functions';
import { saveImgEvidenceUrlLogroSocial, createLogroIncompletoChild } from '../../services/database';
import { savePictureEvidenceLogroSocial } from '../../services/storage';
import { isUserLogged } from '../../services/auth';

import LogroLifeTimeBadge from './LogroLifeTimeBadge/LogroLifeTimeBadge';
import ImagePickerModal from '../../components/ImagePicker/ImagePickerModal/ImagePickerModal';
import OneTxtOneBttnModal from '../OneTxtOneBttnModal/OneTxtOneBttnModal'


const QaploinIcon = Images.svg.qaploinsIcon;

class LogroSocial extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showImgPckModal: false,
            picture: null,
            openThankyouModal: false
        };
    }

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
    goToSocialLink = () => {
        if (isUserLogged()) {
            Linking.openURL(this.props.pageLink);
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    /**
     * Sends the selected picture by ImagePickerModal and sends it to
     * Firebase Storage.
     *
     * @params {Object} picture Picture selected in ImagePickerModal
     */
    saveImage = (picture) => {
        this.setState({
            picture: picture,
            openThankyouModal: true
        });

        let evProm = savePictureEvidenceLogroSocial(picture.node.image.uri, this.props.id, this.props.userId);

        // In case the picture is successfully stored in Firebase Datastorage,
        // then an evidence of that picture will be saved in Firebase DB for
        // verification purposes.
        if (evProm !== null) {
            const dbRes = saveImgEvidenceUrlLogroSocial(this.props.id, this.props.userId);

            // After the reference to the evidence image is written to DB,
            // an entry for the logro is created to DB in logroIcompleto child,
            // to track the status of the completeness of the logro.
            if (dbRes !== null) {
                createLogroIncompletoChild(this.props.id, this.props.userId);
            }
        }
    }

    /**
     * Closes ImagePickerModal
     */
    closeImgPckModal = () => {
        this.setState({
            showImgPckModal: false
        });
    }

    /**
     * Opens ImagePickerModal
     */
    openImgPckModal = () => {
        if (isUserLogged()) {
            this.setState({
                showImgPckModal: true
            });
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    /**
     * Redeem the logro calling to the cloud function
     */
    redeemLogro = () => {
        redeemLogroCloudFunction(this.props.id, this.props.qaploins);
    }

    /**
    * Description:
    * Closes Modal that gives information to the user after
    * user redeemed the logro
    */
    toggleOpenThankyouModal = () => {
        this.setState({
          openThankyouModal: !this.state.openThankyouModal
        });
    }

    render() {
        const { titulo, descripcion, qaploins, photoUrl, puntosCompletados, totalPuntos, tiempoLimite, verified } = this.props;
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
                        <LogroLifeTimeBadge limitDate={tiempoLimite} />
                        {puntosCompletados >= totalPuntos &&
                            <TouchableWithoutFeedback
                                onPress={this.redeemLogro}
                                /**Just a double check on disabled property of the button */
                                disabled={puntosCompletados < totalPuntos}>
                                <View style={styles.redimirButton}>
                                    <Text style={styles.redimirTextButton}>Redimir</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                {/**
                    If the user don't have progress on the logro
                    or
                    If the user have progress but not enough to redeem the logro
                 */}
                {(!puntosCompletados || puntosCompletados < totalPuntos) &&
                    <View style={styles.shareContainer}>
                        <TouchableWithoutFeedback onPress={this.goToSocialLink}>
                            <View>
                                <Text style={styles.likeText}>Dar Like</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.openImgPckModal}>
                            <View>
                                <Text style={styles.uploadText}>Subir</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
                <ImagePickerModal
                      visible={this.state.showImgPckModal}
                      saveImage={this.saveImage}
                      onClose={this.closeImgPckModal} />
                <OneTxtOneBttnModal
                    visible={ this.state.openThankyouModal }
                    onClose={ this.toggleOpenThankyouModal }
                    header={ 'Felicidades!' }
                    body={ 'Tu imágen será verificada en breve y podrás redimir tu logro en breve' }
                    textButton={ 'Entendido' } />

            </View>
        );
    }
}

export default withNavigation(LogroSocial);

