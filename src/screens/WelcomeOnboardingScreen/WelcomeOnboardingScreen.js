// josep.sanahuja    - 05-08-2019 - us84 - Changed style from SafeAreaView

import React from 'react';

import {
  View, Text, SafeAreaView, Image, Switch, Button
} from 'react-native'

import styles from './style'

import CarouselPng from '../../components/CarouselPng/CarouselPng'
import Images from '@assets/images'

import {storeData} from '@utilities/persistance'
import Observable     from '@utilities/Observable'

export default class WelcomeOnboardingScreen extends React.Component {
  static navigationOptions = {
        header: null
  }

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      carouselPageCount: 0,
      switch1Value: false
    }

    this.obs = new Observable();
    this.obs.subscribe(this.updatePageIndex.bind(this));
  }

  

  render() {

    // TODO: Test image array
    const img = [
      Images.png.welcome1Img.img,
      Images.png.welcome2Img.img,
      Images.png.welcome3Img.img,
      Images.png.welcome4Img.img
    ];

    return (
       <SafeAreaView style={styles.sfvContainer} testID='welcomeonboarding-1'>
	       <View style={styles.carousel} testID='welcomeonboarding-2'>
            <CarouselPng images={img} emmiter={this.obs} />
            
              <Text style={styles.text}>{this.state.carouselPageCount + 1} / {img.length}</Text>
              {
                  (this.state.carouselPageCount + 1) >= img.length
                  ?
                  (
                    <View style={styles.switchContainer}>
                      <Text style={styles.hideTutorial}>No volver a mostrar Tutorial:</Text>
                      <Switch
                        style = {styles.switch}
                        value = {true}
                        trackColor={{true: '#36E5CE', false: 'grey'}}
                        onValueChange = {this.toggleSwitch1.bind(this)}
                        value = {this.state.switch1Value}
                      /> 
                    </View>
                    
                  )
                  :
                  null
              }
             
              <Button
                  title="Empieza a Retar"
                  disabled={(this.state.carouselPageCount + 1 != img.length) ? true : false}
                  color="#36E5CE"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={this.goToScreen.bind(this, "Publicas")}
              />
            
		    </View>
	    </SafeAreaView>
    );
  }

  updatePageIndex(data) {
    console.log("Hello World: " + JSON.stringify(data));
    if (this.state != data.pageIndex) {
      this.setState({
        carouselPageCount: data.pageIndex
      });
    } 
  }

  toggleSwitch1(value) {
      this.setState({switch1Value: value})
      console.log('Switch 1 is: ' + value)
  }

  goToScreen(screenName) {
    const {navigate} = this.props.navigation;

    storeData('tutorial-done', this.state.switch1Value.toString());
    navigate(screenName, { firstMatchCreated: true });
  }
}