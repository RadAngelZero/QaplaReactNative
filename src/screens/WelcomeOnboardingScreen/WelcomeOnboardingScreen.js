// diego	  	     - 11-09-2019 - us107 - Added flag to AsyncStorage to know when the user has passed
//                                          the onboarding (removed by error in us92)
// diego	  	     - 03-09-2019 - us92 - Update Welcome screen according to inVision design
// josep.sanahuja    - 05-08-2019 - us84 - Changed style from SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';

import styles from './style'

import { EVENTS_TOPIC } from './../../utilities/Constants';

import CarouselPng from '../../components/CarouselPng/CarouselPng'
import Images from '@assets/images'
import { storeData } from '../../utilities/persistance';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { subscribeUserToTopic } from './../../services/messaging';
import { saveUserSubscriptionToTopic } from '../../services/database';

class WelcomeOnboardingScreen extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	selectedIndex: 0
	    };
	}

	finishOnBoarding = () => {
		storeData('tutorial-done', 'true');
		const eventsTopic = `${EVENTS_TOPIC}_${getLocaleLanguage()}`;
		/**
         * All the logged users must be subscribed to the event topic at this point, because we want
         * all the users to receive notifications when a new event is created, we use the language suffix
         * because we want to send the notifications in different languages (based on the user cellphone
         * language)
         */
		subscribeUserToTopic(eventsTopic);
		if (this.props.uid !== '') {
			saveUserSubscriptionToTopic(this.props.uid, eventsTopic);
		}

		/**
		 * If the user has games (that means that we have a logged user)
		 * we subscribe him to all the topics related to their games
		 */
		this.props.userGames.forEach((gameKey) => {
			if (gameKey) {
				subscribeUserToTopic(gameKey);
				saveUserSubscriptionToTopic(this.props.uid, gameKey);
			}
		});

		this.props.navigation.navigate('Achievements');
	}

	setCurrentIndex = (index) => {
		this.setState({ selectedIndex: index });
	}

  render() {

    const carrouselData = [
      	{
			Image: Images.png.connectOnBoarding.img,
			description: translate('onBoardingScreen.connect.description'),
			title: translate('onBoardingScreen.connect.title')
		},
      	{
			Image: Images.png.compiteOnBoarding.img,
			description: translate('onBoardingScreen.compete.description'),
			title: translate('onBoardingScreen.compete.title')
		},
      	{
			Image: Images.png.shareOnBoarding.img,
			description: translate('onBoardingScreen.share.description'),
			title: translate('onBoardingScreen.share.title')
		},
      	{
			Image: Images.png.walletOnBoarding.img,
			description: translate('onBoardingScreen.withdraw.description'),
			title: translate('onBoardingScreen.withdraw.title')
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
					<Text onPress={this.finishOnBoarding} style={styles.finishTextButton}>
						{this.state.selectedIndex === carrouselData.length - 1 &&
							translate('onBoardingScreen.finish')
						}
					</Text>
				</View>
			</View>
	    </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
	return {
		uid: state.userReducer.user.id ? state.userReducer.user.id : '',
		userGames: state.userReducer.user.gameList ? state.userReducer.user.gameList : []
	}
}

export default connect(mapStateToProps)(WelcomeOnboardingScreen);