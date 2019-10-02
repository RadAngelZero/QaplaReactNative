// josep.sanahuja    - 26-09-2019 - us118 - Added ImagePickerModal
// josep.sanahuja    - 05-08-2019 - us84  - + SafeAreaView

import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
} from 'react-native'
import styles from './style'

import ImagePickerModal from '../../components/ImagePicker/ImagePickerModal/ImagePickerModal';
import { savePictureEvidenceLogroSocial } from '../../services/database';


export default class MockScreen1 extends React.Component {
  constructor(props) {
      super(props);
  
      this.state = {
          showImgPckModal: true,
          picture: null
      };
  }

  /**
   * Sends the selected picture by ImagePickerModal and sends it to 
   * Firebase Storage.
   * 
   * @params {Object} picture Picture selected in ImagePickerModal
   */
  saveImage = (picture) => {
      console.log('This is the picture Obj 2: ' + JSON.stringify(picture, null, 2));
      
      this.setState({
          picture: picture
      });

      savePictureEvidenceLogroSocial(picture.node.image.uri, 'QdcloizcjBfPyZd3i8o5GoFD5AC3', '-LQow7xrduUSQIBYqZce');
  }

  /**
   * Closes ImagePickerModal
   */
  closeImgPckModal = () => {
      this.setState({
          showImgPckModal: false  
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.sfvContainer}>
        <View style={styles.container}>
          <ImagePickerModal
              visible={this.state.showImgPckModal}
              saveImage={this.saveImage}
              onClose={this.closeImgPckModal}
          /> 
          {this.state.picture !== null &&
              <Image style={{height: 400, width: 400}} source={{uri: this.state.picture.node.image.uri}}/>  
          }
        </View>
      </SafeAreaView>
    );
  }
}
