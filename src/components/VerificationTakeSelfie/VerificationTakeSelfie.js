// josep.sanahuja  - 22-09-2019 - us122 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import QGCamera from '../../components/QGCamera/QGCamera';

const Divider         = Images.png.divider.img;
const QaplaSmileIcon  = Images.png.qaplaSmile.img;

export class VerificationTakeSelfie extends Component {
    /**
    * Closes QGCamera by closing its modal.
    */
    closeCamera = () => {
        this.props.setCameraVisible(false);
    }

    /**
    * Opens QGCamera.
    */
    openCamera = () => {
        this.props.setCameraVisible(true);
    }

    /**
    * Saves the picture to the state so it can be used.
    * 
    * @param {object} pict Object representing a picture, with uri and base64 props
    */
    savePicture = (pict) => {
        this.props.savePicture(pict);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Tómate una selfie</Text>
                    <View style={styles.divider}>
                        <Image source={Divider} />
                    </View>
                </View>
                <View style={styles.selfieContainer}>
                    <TouchableWithoutFeedback onPress={this.openCamera}>
                        <View>
                           <Image source={QaplaSmileIcon} />
                           {this.props.picture.uri !== "" &&
                               <Image source={{uri: this.props.picture.uri}} style={styles.selfiePreview}/>
                           }
                        </View>
                    </TouchableWithoutFeedback> 

                    <Text style={styles.smallText}>Subir Selfie</Text>            
                </View>
                <QGCamera 
                    visible={this.props.cameraVisible} 
                    savePicture={this.savePicture}
                    cameraType={"front"}
                    onClose={this.closeCamera}/>
            </View>
        );
    }
}

export default VerificationTakeSelfie;
