// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  ScrollView,
  CameraRoll
} from 'react-native'

import styles from './style'

import {getQaplaActiveLogros} from '../../services/database'

export default class MockScreen1 extends React.Component {
  // render() {
  //   return (
  //       <SafeAreaView style={styles.sfvContainer}>
	 //    	<View style={styles.container}>
	 //        	<Text >Miau!</Text>
	 //        	<Text >To get started, edit App.js</Text>
	 //      	</View>
	 //    </SafeAreaView>
  //   );
  // }
  constructor(props) {
    super(props);
  
    this.state = {
      photos: []
    };
  }

  _handleButtonPress = () => {
    console.log("Camera " + JSON.stringify(CameraRoll, null, 2));
    CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
  };

  render() {
    return (
      <SafeAreaView style={styles.sfvContainer}>
      <View style={styles.container}>
        <Button title="Load Images" onPress={this._handleButtonPress} />
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
             <Image
               key={i}
               style={{
                 width: 300,
                 height: 100,
               }}
               source={{ uri: p.node.image.uri }}
             />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
    );
  }
}
