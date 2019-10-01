// josep.sanahuja - 26-09-2019 - us118 - Added goToSocialLink & ImagePickerModal
// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer logic
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Linking } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import { savePictureEvidenceLogroSocial, saveImgEvidenceUrlLogroSocial } from '../../services/database';
import ImagePickerModal from '../../components/ImagePicker/ImagePickerModal/ImagePickerModal';

const QaploinIcon = Images.svg.qaploinsIcon;

class LogroSocial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showImgPckModal: false,
            picture: null
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
    goToSocialLink = (url) => {
        Linking.openURL(url);
    }

    saveImage = (picture) => {
        console.log('This is the picture Obj 2: ' + JSON.stringify(picture, null, 2));

        this.setState({
          picture: picture
        });

        let evidenceURL = savePictureEvidenceLogroSocial(picture.node.image.uri, this.props.id, this.props.userId);
        if (evidenceURL !== null) {
            saveImgEvidenceUrlLogroSocial(this.props.id, this.props.userId);
        }
    }

    closeImgPckModal = () => {
        this.setState({
            showImgPckModal: false  
        });
    }

    openImgPckModal = () => {
        this.setState({
            showImgPckModal: true  
        });
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
                    <TouchableWithoutFeedback onPress={this.openImgPckModal}>
                        <View>
                            <Text style={styles.uploadText}>Subir</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ImagePickerModal
                      visible={this.state.showImgPckModal}
                      saveImage={this.saveImage}
                      onClose={this.closeImgPckModal}/> 
            </View>
        );
    }
}

export default LogroSocial;

