// josep.sanahuja    - 30-09-2019 - us118 - File creation

import React from 'react';
import {
    Platform,
    PermissionsAndroid,
    View,
    Text,
    Image,
    ScrollView,
    CameraRoll,
    TouchableWithoutFeedback
} from 'react-native'
import styles from './style'
import { translate } from '../../utilities/i18';

export default class ImagePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      pictureSelected: false,
      pictureIndex: -1,
      numPictures: 20,
      morePictures: true,
      picture: null
    };
  }

  componentDidMount() {
      this.loadPictures();
  }

  /**
  * Gets pictures from the Cameraroll in IOS and Android,
  * in IOS what it returns is a list of phassets where we
  * can read the uri to use it in an Image component. To use
  * it for sending info to a server it is recommended to use
  * fetch to obtain a blob, and then send it to the server.
  */
  loadPictures = async () => {
      try {
            let deviceImages;
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    deviceImages = await CameraRoll.getPhotos({
                        first: this.state.numPictures,
                        assetType: 'Photos'
                    });
                }
            } else {
                deviceImages = await CameraRoll.getPhotos({
                    first: this.state.numPictures,
                    assetType: 'Photos',
                    groupTypes: 'All'
                });
            }

            this.setState({
                photos: deviceImages.edges
            });
      }
      catch (err) {
          console.log(err);
      }
  }

  /**
  * The function 'loadPictures' gets a list of this.state.numPictures
  * pictures. In case that the user wants to see more pictures from
  * his Cameraroll then getPhotos in 'loadPictures' must be called again but with a
  * larger number of pictures to retrieve.
  */
  loadMorePictures = async () => {
      if (this.state.morePictures) {
          if (this.state.numPictures <= this.state.photos.length)
          {
              this.setState({
                  numPictures: this.state.numPictures + 20
              },
              this.loadPictures);

              
          }
          else {
              this.setState({
                  morePictures: false
              });
          }
      }
  }

  /**
  * Selects a picture from a list of pictures and saves all
  * required info into the state to show the selection on screen.
  *
  * @param {Number} pictIndex Index of the picture from the list
  * @param {Object} picture   Picture object
  */
  selectPicture = (pictIndex, picture) => {
      if (!this.state.pictureSelected) {
          this.setState({
              pictureSelected: true,
              pictureIndex: pictIndex,
              picture: picture
          });
      }
  }

  /**
  * Unselects a picture from a list of pictures and saves all
  * required info into the state to apply the unselection on screen.
  */
  unselectPicture = () => {
      this.setState({
          pictureSelected: false,
          pictureIndex: -1,
          picture: null
      });
  }

  /**
  * Checks if an image is selected from a list of pictures
  *
  * @param {Number}  index      Index of the picture from the list
  * @param {Boolean} selected   Flag to check the selection state
  */
  isImageSelected = (index, selected) => {
      return (index === this.state.pictureIndex) && selected;
  }

  /**
  * Calls a method provided via props, to save the selected image,
  * what save means, is up to the parent of the ImagePicker component.
  */
  saveImage = () => {
      this.props.saveImage(this.state.picture);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            {this.state.photos.map((p, i) => (
                <TouchableWithoutFeedback onPress={() => this.selectPicture(i, p)}>
                    <View
                    style={styles.imageContainer}>
                    <Image
                        key={p.node.image.uri}
                        style={[{
                            opacity: this.isImageSelected(i, this.state.pictureSelected) ? 0.4 : 1.0
                            },
                            styles.picture
                        ]}
                        source={{ uri: p.node.image.uri }} />
                    </View>
                </TouchableWithoutFeedback>
            ))
            }
            {this.state.photos.length > 0 && this.state.morePictures && !this.state.pictureSelected &&
                <TouchableWithoutFeedback onPress={this.loadMorePictures}>
                    <View style={styles.moreButtonContainer}>
                        <Text style={styles.textStyle}>{translate('imagePicker.showMorePhotos')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            }
        </ScrollView>
        {this.state.pictureSelected &&
            <>
                <TouchableWithoutFeedback onPress={this.saveImage}>
                    <View style={styles.okButtonContainer}>
                        <Text style={styles.textStyle}>{this.props.selectImgBttnTxt}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.unselectPicture}>
                    <View style={styles.cancelButtonContainer}>
                        <Text style={styles.textStyle}>{this.props.discardImgBttnTxt}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </>
        }
      </View>
    );
  }
}

ImagePicker.defaultProps = {
    selectImgBttnTxt: translate('imagePicker.selectImage'),
    discardImgBttnTxt: translate('imagePicker.discardImage')
}