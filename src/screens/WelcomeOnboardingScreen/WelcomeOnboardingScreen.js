// diego	  	     - 11-09-2019 - us107 - Added back store data to know when the user has passed
//                                          the onboarding (removed by error in us92)
// diego	  	     - 03-09-2019 - us92 - Update Welcome screen according to inVision design
// josep.sanahuja    - 05-08-2019 - us84 - Changed style from SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView
} from 'react-native'

import styles from './style'

import CarouselPng from '../../components/CarouselPng/CarouselPng'
import Images from '@assets/images'
import { storeData } from '../../utilities/persistance';

export default class WelcomeOnboardingScreen extends React.Component {
	constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

	goToScreenPublicas = () => {
		storeData('tutorial-done', 'true');

		this.props.navigation.navigate('Publicas', { firstMatchCreated: true });
	}

	setCurrentIndex = (index) => {
		this.setState({ selectedIndex: index });
	}

  render() {

    const carrouselData = [
      	{
			Image: Images.png.connectOnBoarding.img,
			description: 'Conecta con otros gamers de tu nivel en competencias individuales o multijugador.',
			title: 'Conecta'
		},
      	{
			Image: Images.png.compiteOnBoarding.img,
			description: 'Compite como todo un pro, monetiza tus scrims y participa en eventos por bolsas de premios.',
			title: 'Compite'
		},
      	{
			Image: Images.png.shareOnBoarding.img,
			description: 'Comparte los clips de tus partidas, toda la comunidad podrá ver la evidencia de tus victorias.',
			title: 'Comparte'
		},
      	{
			Image: Images.png.walletOnBoarding.img,
			description:'Retira tu Saldo Qapla o úsalo para comprar productos de Amazon Prime, ¡Los enviamos gratis a tu casa!',
			title: 'Convierte'
		}
    ];

    return (
       <SafeAreaView style={styles.sfvContainer} testID='welcomeonboarding-1'>
			<CarouselPng carrouselData={carrouselData} setCurrentIndex={this.setCurrentIndex} />
			<View style={styles.progressContainer}>
				<View style={styles.progressRow}></View>
				<View style={[styles.progressRow, styles.indicatorsContainer]}>
					{carrouselData.map((slide, index) => (
						<View style={[styles.progressCircleIndicator, { backgroundColor: this.state.selectedIndex === index ? '#3DF9DF' : '#090D29' }]} />
					))}
				</View>
				<View style={styles.progressRow}>
					<Text onPress={this.goToScreenPublicas} style={styles.finishTextButton}>
						{this.state.selectedIndex === carrouselData.length - 1 &&
							'TERMINAR'
						}
					</Text>
				</View>
			</View>
	    </SafeAreaView>
    );
  }
}