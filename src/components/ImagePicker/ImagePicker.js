// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  ScrollView,
  CameraRoll,
  TouchableWithoutFeedback
} from 'react-native'

import styles from './style'

import { getDimensions } from '../../utilities/iosAndroidDim'

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
      this._handleButtonPress();
  }

  _handleButtonPress = async () => {
    CameraRoll.getPhotos({
       first: this.state.numPictures,
       assetType: 'Photos',
       groupTypes: 'All'
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
       console.log(JSON.stringify(err, null, 2));
        //Error Loading Images
     });
  };

  showMorePictures = async () => {
      if (this.state.morePictures) {
          if (this.state.numPictures <= this.state.photos.length)
          {
              await this.setState({
                  numPictures: this.state.numPictures + 20    
              });

              this._handleButtonPress();
          }
          else {
              this.setState({
                  morePictures: false
              });
          }
      }
  }

  selectPicture = async (pictIndex, picture) => {
      if (!this.state.pictureSelected) {
          this.setState({
              pictureSelected: true,
              pictureIndex: pictIndex,
              picture: picture
          });
      } 
  }

  unselectPicture = async() => {
      await this.setState({
          pictureSelected: false,
          pictureIndex: -1,
          picture: null 
      });
  }

  isImageSelected = (index, selected) => {
      let res = (index === this.state.pictureIndex) && selected;
      
      return res;
  }

  saveImage = () => {
      this.props.saveImage(this.state.picture);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <TouchableWithoutFeedback onPress={() => this.selectPicture(i, p)}>
                  <View 
                    style={{
                      justifyContent: 'flex-start',
                      alignSelf: 'center',
                      marginBottom: '2%', 
                      width: getDimensions().width * 0.95,
                      height: getDimensions().height / 2.5,
                      
                    }}>
                    
                    <Image
                     key={i}
                     style={{
                       height: getDimensions().height / 2.5,
                       width: getDimensions().width * 0.95,
                       resizeMode: 'cover',
                       opacity: this.isImageSelected(i, this.state.pictureSelected) ? 0.4 : 1.0,
                     }}
                     source={{ uri: p.node.image.uri }}
                   />
                  </View>
              </TouchableWithoutFeedback>
            );
          })}
          {this.state.photos.length > 0 && this.state.morePictures && !this.state.pictureSelected &&
              <TouchableWithoutFeedback onPress={this.showMorePictures}>
                  <View style={styles.moreButtonContainer}>
                      <Text style={styles.textStyle}>Mostrar más fotografias</Text>
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
