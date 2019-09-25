// josep.sanahuja  - 22-09-2019 - us122 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';

import QGCamera from '../../components/QGCamera/QGCamera';

const Divider         = Images.png.divider.img;
const QaplaSmileIcon  = Images.png.qaplaSmile.img;

export class VerificationTakeSelfie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraVisible: false,
            picture: {uri: "", base64: ""}
        };
    }

    /**
    * Closes QGCamera by closing its modal.
    */
    closeCamera = () => {
        this.setState({
              cameraVisible: false
        });
    }

    /**
    * Opens QGCamera.
    */
    openCamera = () => {
        this.setState({
              cameraVisible: true
        });
    }

    /**
    * Closes QGCamera by closing its modal.
    * 
    * @param {object} pict Object representing a picture, with uri and base64 props
    */
    savePicture = (pict) => {
        this.setState({
            picture: {uri: pict.uri, base64: pict.base64}
        }); 
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
                           {this.state.picture.uri !== "" &&
                               <Image source={{uri: this.state.picture.uri}} style={styles.selfiePreview}/>
                           }
                        </View>
                    </TouchableWithoutFeedback> 

                    <Text style={styles.smallText}>Subir Selfie</Text>            
                </View>
                <QGCamera 
                    visible={this.state.cameraVisible} 
                    savePicture={this.savePicture}
                    cameraType={"front"}
                    onClose={this.closeCamera}/>
            </View>
        );
    }
}

export default VerificationTakeSelfie;
