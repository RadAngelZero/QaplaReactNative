// josep.sanahuja    - 30-09-2019 - us118 - File creation

import React from 'react';
import {
    Platform,
    PermissionsAndroid,
    View,
    Image,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import styles from './style';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaText from '../QaplaText/QaplaText';

export default class ImagePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      pictureSelected: false,
      pictureIndex: -1,
      numPictures: 20,
      morePictures: true,
      picture: null,
      numColumns: 3,
      endFlatList: false
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
              }, this.loadPictures);
          }
          else {
              this.setState({
                  morePictures: false
              });
          }

          this.setState({ endFlatList: false })
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

    /**
     * Render function for an Image component (FlatList element)
     * @param {object} ListElementInfo Object with item and index for element to render on FlatList
     * @returns {JSX.Element} Touchable Image
     */
    renderItem = ({item, index}) => {
        const widthImg = widthPercentageToPx(100) / this.state.numColumns;

        return (
            <TouchableWithoutFeedback onPress={() => this.selectPicture(index, item)}>
                <View style={[
                    styles.imageContainer,
                    { height: widthImg, width: widthImg }
                ]}>
                    <Image
                        key={item.node.image.uri}
                        style={[{
                            opacity: this.isImageSelected(index, this.state.pictureSelected) ? 0.4 : 1.0
                            },
                            styles.picture
                        ]}
                        source={{ uri: item.node.image.uri }} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    /**
     * Callback to notify the component when reaching the end of the FlatList
    */
    reachEndOfFlatList = () => {
        this.setState({ endFlatList: true });
    }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            style={styles.imageList}
            numColumns={this.state.numColumns}
            onEndReached={this.reachEndOfFlatList}
            onEndReachedThreshold={0.1}
            data={this.state.photos}
            renderItem={this.renderItem}>
        </FlatList>
        {this.state.endFlatList && this.state.photos.length > 0 &&
        this.state.morePictures && !this.state.pictureSelected &&
            <TouchableWithoutFeedback onPress={this.loadMorePictures}>
                <View style={styles.moreButtonContainer}>
                    <QaplaText style={styles.textStyle}>{translate('imagePicker.showMorePhotos')}</QaplaText>
                </View>
            </TouchableWithoutFeedback>
        }
        {this.state.pictureSelected &&
            <>
                <TouchableWithoutFeedback onPress={this.saveImage}>
                    <View style={styles.okButtonContainer}>
                        <QaplaText style={styles.textStyle}>{this.props.selectImgBttnTxt}</QaplaText>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.unselectPicture}>
                    <View style={styles.cancelButtonContainer}>
                        <QaplaText style={styles.textStyle}>{this.props.discardImgBttnTxt}</QaplaText>
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