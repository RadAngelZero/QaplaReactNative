// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native'

import styles from './style'

import { RNCamera } from 'react-native-camera';

export default class MockScreen1 extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      pictureTaken: false,
      picture: ""
    };
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log("Camera Miau: " + data.uri);
      await this.setState({
        pictureTaken: true,
        picture: data.uri
      });
    }
  };

  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
	    	<View style={styles.container}>
	        	<Text >Miau!</Text>
	        	<Text >To get started, edit App.js</Text>

     
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
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                 <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
        </View>

      {this.state.pictureTaken &&
        <Image
          source={{uri: this.state.picture}}
          style={{width: 400, height: 400}}
        /> 
      }
        
        </View>
	    </SafeAreaView>
    );
  }
}
