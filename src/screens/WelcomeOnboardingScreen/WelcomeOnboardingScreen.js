import React from 'react';

import {
  View, Text, SafeAreaView
} from 'react-native'

import styles from './style'

import CarouselSvg from '../../components/CarouselSvg/CarouselSvg'
import Images from '@assets/images'

export default class WelcomeOnboardingScreen extends React.Component {
  static navigationOptions = {
        header: null
  }

  render() {

    // TODO: Test image array
    const images = [
      Images.svg.welcome1,
      Images.svg.welcome2,
      Images.svg.welcome3,
      Images.svg.welcome4
    ];

  	const images3 = [
      {
        source: Images.svg.welcome1,
      },
      {
        source: Images.svg.welcome2,
      },
      {
        source: Images.svg.welcome3,
      },
      {
        source: Images.svg.welcome4,
      },
      
    ];

    const images2 = [
      {
        source: {
          uri: './icons/public-feed-match.png',
        },
      },
      {
        source: {
          uri: './icons/public-feed-match.png',
        },
      },
      {
        source: {
          uri: './icons/public-feed-match.png',
        },
      },
      {
        source: {
          uri: './icons/public-feed-match.png',
        },
      }
      
    ];

    return (
       <SafeAreaView style={styles.container} testID='welcomeonboarding-1'>
	       <View style={styles.carousel} testID='welcomeonboarding-2'>
            <CarouselSvg images={images} />
		    </View>
	    </SafeAreaView>
    );
  }
}