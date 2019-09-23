// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Modal
} from 'react-native'

import styles from './style'

import { RNCamera } from 'react-native-camera';
import QGCameraModal from './QGCameraModal/QGCameraModal';

export default class QGCamera extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      pictureTaken: false,
      picture: {uri: "", base64: ""}
    };
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      
      this.setState({
        pictureTaken: true,
        picture: {uri: data.uri, base64: data.base64}
      });
    }
  };

  savePicture = async() => {
    console.log("[savePicture]: " + JSON.stringify(this.state.picture, null, 2));
    if (this.state.picture.uri != "") {
      this.props.picture = {
        uri: this.state.picture.uri,
        base64: this.state.picture.base64
      }
    }

    this.closeCamera();
  }

  closeQGCameraModal = () => {
      this.setState({
          pictureTaken: false
      });
  }

  closeCamera = () => {
      this.props.visible = false;
  }

  render() {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.visible}
            onRequestClose={this.closeCamera}>
                {this.props.visible &&
                    <View style={styles.container}>
                        <RNCamera
                          ref={ref => {
                            this.camera = ref;
                          }}
                          style={styles.preview}
                          type={RNCamera.Constants.Type.back}
                          flashMode={RNCamera.Constants.FlashMode.off}
                          captureAudio={false}
                          androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                          }}
                        />
                        <TouchableWithoutFeedback onPress={this.takePicture}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.textStyle}>Tomar Foto :)</Text>
                            </View>
                        </TouchableWithoutFeedback> 
                        <QGCameraModal
                            visible={this.state.pictureTaken}
                            okTextButton={"Quiero usar esta foto!"}
                            pictureUri={this.state.picture.uri}
                            cb1={this.savePicture}
                            onClose={this.closeQGCameraModal} 
                        />
                    </View>
                }
        </Modal>
    );
  }
}

// {this.state.pictureTaken &&
//               <Image
//                 source={{uri: this.state.picture}}
//                 style={{width: 400, height: 400}}
//               /> 
//             }
