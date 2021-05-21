import React from 'react';

import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import { EVENTS_TOPIC, GAMES_TOPICS } from './../../utilities/Constants';

import CarouselPng from '../../components/CarouselPng/CarouselPng';
import ProgressDotsIndicator from '../../components/ProgressDotsIndicator/ProgressDotsIndicator';
import Images from './../../../assets/images';
import { storeData } from '../../utilities/persistance';
import { translate } from '../../utilities/i18';
import { subscribeUserToTopic } from './../../services/messaging';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { userHaveTwitchId } from '../../services/database';

const BackIcon = Images.svg.backIcon;

class WelcomeOnboardingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
			openLinkWitTwitchModal: false
		};
	}

	finishOnBoarding = async () => {
		if (this.props.uid && !(await userHaveTwitchId(this.props.uid))) {
			this.setState({ openLinkWitTwitchModal: true });
		} else {
			this.setValuesToStart();
		}
	}

	setValuesToStart = () => {
		storeData('2021-tutorial-done', 'true');

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

	nextButton = () => {
		this.carrouselPng.nextImage();
	}

	render() {

		const carrouselData = [
			{
				Image: Images.png.onboardingIllustration1.img,
				description: translate('onBoardingScreen.discover.description'),
			},
			{
				Image: Images.png.onboardingIllustration2.img,
				description: translate('onBoardingScreen.follow.description'),
			},
			{
				Image: Images.png.onboardingIllustration3.img,
				description: translate('onBoardingScreen.get.description'),
			},
			{
				Image: Images.png.onboardingIllustration4.img,
				description: translate('onBoardingScreen.support.description'),
			},
			{
				Image: Images.png.onboardingIllustration5.img,
				description: translate('onBoardingScreen.highlight.description'),
			},
		];

		return (
			<SafeAreaView style={styles.sfvContainer} testID='welcomeonboarding-1'>
				<CarouselPng ref={(carrouselPng) => this.carrouselPng = carrouselPng} carrouselData={carrouselData} setCurrentIndex={this.setCurrentIndex}/>
				<View style={[styles.progressContainer, { alignContent: 'center' }]}>
					<ProgressDotsIndicator
						steps={carrouselData.length}
						selected={this.state.selectedIndex}
						color={'rgba(0, 254, 223, .54)'}
						activeColor={'#3DF9DF'}
						width={heightPercentageToPx(1.2)}
						activeWidth={heightPercentageToPx(4)}
						marginHorizontal={heightPercentageToPx(1)}
					/>
				</View>
				{this.state.selectedIndex !== carrouselData.length - 1 ?
					<View style={[styles.bottomButtons, { justifyContent: 'space-between', alignItems: 'flex-end' }]}>
						<TouchableOpacity style={styles.skipButton}
							onPress={this.finishOnBoarding}>
							<Text style={styles.skipText}>{translate('onBoardingScreen.skip')}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.nextButton}
							onPress={this.nextButton}>
							<View style={{ transform: [{ scaleX: -1 }] }}>
								<BackIcon />
							</View>
						</TouchableOpacity>
					</View>
					:
					<View style={[styles.bottomButtons, { justifyContent: 'center', alignItems: 'flex-end' }]}>
						<TouchableOpacity style={[styles.nextButton, { width: widthPercentageToPx(50), }]}
							onPress={this.finishOnBoarding}>
							<View>
								<Text style={styles.startNowText}>{translate('onBoardingScreen.startNow')}</Text>
							</View>
						</TouchableOpacity>
					</View>
				}
				<LinkTwitchAccountModal
					open={this.state.openLinkWitTwitchModal}
					onClose={() => this.setState({ openLinkWitTwitchModal: false })}
					onLinkSuccessful={this.setValuesToStart}
					onSkipTwitchLink={this.setValuesToStart} />
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
