import React from 'react';

import {
  View,
  SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';

import styles from './style'

import { EVENTS_TOPIC, GAMES_TOPICS } from './../../utilities/Constants';

import CarouselPng from '../../components/CarouselPng/CarouselPng'
import Images from '@assets/images'
import { storeData } from '../../utilities/persistance';
import { translate } from '../../utilities/i18';
import { subscribeUserToTopic } from './../../services/messaging';
import QaplaText from '../../components/QaplaText/QaplaText';

class WelcomeOnboardingScreen extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	selectedIndex: 0
	    };
	}

	finishOnBoarding = () => {
		storeData('tutorial-done', 'true');

		/**
         * All the users must be subscribed to the event topic at this point, because we want
         * all the users to receive notifications when a new event is created, we use the language suffix
         * because we want to send the notifications in different languages (based on the user cellphone
         * language)
         */
		subscribeUserToTopic(EVENTS_TOPIC, this.props.uid, EVENTS_TOPIC);

		/**
		 * If the user has games (that means that we have a logged user)
		 * we subscribe him to all the topics related to their games
		 */
		this.props.userGames.forEach((gameKey) => {
			if (gameKey) {
				subscribeUserToTopic(gameKey, this.props.uid, GAMES_TOPICS);
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
		  Image: Images.png.shareOnBoarding.img,
		  description: translate('onBoardingScreen.acquire.description'),
		  title: translate('onBoardingScreen.acquire.title')
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
					<QaplaText onPress={this.finishOnBoarding} style={styles.finishTextButton}>
						{this.state.selectedIndex === carrouselData.length - 1 &&
							translate('onBoardingScreen.finish')
						}
					</QaplaText>
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