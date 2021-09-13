import React from 'react';
import { Image, Text, View, Modal, FlatList, TouchableOpacity, TouchableHighlight, TextInput, Keyboard, Animated, Easing, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Images from '../../../assets/images';
import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';
import Hearts from '../UserProfileRewards/Hearts';
import ProgressBar from '../UserProfileRewards/Bar';
import { getPremiumStreamers, sendCheers, updateTwitchUsername } from '../../services/database';
import { getTwitchDataCloudFunction } from '../../services/functions';

const LeftArrowThiccIcon = Images.svg.leftArrowThiccIcon;

export default class FormularioCheers extends React.Component {
	state = {
		selectedStreamer: '',
		selectedStreamerID: '',
		message: '',
		screen: 'selection',
		sendingCheers: false,
		sendCheersButtonAnimation: new Animated.Value(0),
		streamersData: []
	};

	componentDidMount() {
		this.getStreamers();
		this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', () => {
			Animated.timing(this.state.sendCheersButtonAnimation, {
				toValue: 0,
				duration: 300,
				easing: Easing.cubic,
				useNativeDriver: false,
			}).start();
		})
		this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', () => {
			Animated.timing(this.state.sendCheersButtonAnimation, {
				toValue: 1,
				duration: 300,
				easing: Easing.cubic,
				useNativeDriver: false,
			}).start();
		})
	}

	componentWillUnmount() {
		this.keyboardWillHideListener.remove();
		this.keyboardWillShowListener.remove();
	}

	hideKeyboard = () => {
		Keyboard.dismiss;
	}

	getStreamers = async () => {
		const streamersBlackList = ['141617732', '683167758', '613408163', '180517858', '448926957', '140436068', '528477359'];
		const streamers = await getPremiumStreamers();
		if (streamers.exists()) {
			const streamersData = [];
			streamers.forEach((streamer) => {
				if (!streamersBlackList.includes(streamer.val().id)) {
					streamersData.push({
						streamer: streamer.val().displayName,
						/**
						 * If the streamer change their profile image on Twitch the link on the database
						 * will not contain any photo to show until the streamer update their information
						 * on the dashboard (this is automatically done every time the streamer SignIn on the
						 * dashboard or any time a token is refreshed)
						 */
						imgUrl: streamer.val().photoUrl,
						streamerID: streamer.key
					});
				}
			});

			this.setState({ streamersData });
		}
	}

	sendCheersButton = async () => {
		let now = new Date();
		this.setState({ sendingCheers: true });
		const twitchData = await getTwitchDataCloudFunction(this.props.twitchId);
		await updateTwitchUsername(this.props.uid, twitchData.data.display_name);
		if (this.props.qoinsToDonate > 0) {
			await sendCheers(this.props.qoinsToDonate, this.state.message, now.getTime(), this.state.selectedStreamer, this.props.uid, this.props.userName, twitchData.data.display_name, this.props.userPhotoURL, this.state.selectedStreamerID);
		}

		this.setState({ screen: 'complete' });
		Animated.timing(this.state.sendCheersButtonAnimation, {
			toValue: 0,
			duration: 300,
			easing: Easing.cubic,
			useNativeDriver: false,
		}).start();
	}

	onBackToProfile = () => {
		this.setState({ screen: 'selection', selectedStreamer: '', selectedStreamerID: '', message: '', sendingCheers: false });
		this.state.sendCheersButtonAnimation.setValue(0);
		this.props.onClose();
	}

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.streamerSelectCardView}
				onPress={() => {
					this.setState({ selectedStreamer: item.streamer, selectedStreamerID: item.streamerID });
					Animated.timing(this.state.sendCheersButtonAnimation, {
						toValue: 1,
						duration: 300,
						easing: Easing.cubic,
						useNativeDriver: false,
					}).start();
				}
				}>
				<LinearGradient
					start={{
						x: -0.05,
						y: 0.27,
					}}
					end={{
						x: 1.03,
						y: 0.75,
					}}
					locations={[0, 1]}
					colors={item.streamer === this.state.selectedStreamer ? ['rgb(64, 64, 255)', 'rgb(44, 7, 250)'] : ['rgb(20, 21, 57)', 'rgb(20, 21, 57)']}
					style={styles.streamerSlectCardLinearGradient}>
					<Image
						source={{ uri: item.imgUrl }}
						style={styles.avatarImage} />
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.streamerText}>{item.streamer}</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<Modal
				style={styles.formularioCheersView}
				animationType="slide"
				transparent={true}
				visible={this.props.open}
				onRequestClose={this.onBackToProfile}>
				<View
					style={styles.bgView} />
				<View
					pointerEvents="box-none"
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 60,
						height: 1033,
						alignItems: 'flex-start',
					}}>
					<TouchableOpacity
						onPress={() => {
							this.setState({ selectedStreamer: '', screen: 'selection' });
							this.state.sendCheersButtonAnimation.setValue(0);
							this.props.onClose();
						}}
						style={[styles.arrowLeftCircleCopyImage, {
							opacity: this.state.screen === 'complete' ? 0 : 1,
						}]}
						disabled={this.state.screen === 'complete'}>
						<View style={{
							alignSelf: 'center',
							alignItems: 'center',
							marginLeft: '-3%',
							marginTop: '-3%',
						}}>
							<LeftArrowThiccIcon />
						</View>
					</TouchableOpacity>
					<LinearGradient
						start={{
							x: this.state.screen === 'complete' ? -0.03 : 0.44,
							y: this.state.screen === 'complete' ? -0.08 : -0.04,
						}}
						end={{
							x: this.state.screen === 'complete' ? 1.00 : 0.6,
							y: this.state.screen === 'complete' ? 0.84 : 1.06,
						}}
						locations={[0, 1]}
						colors={this.state.screen === 'complete' ? ['rgb(167, 22, 238)', 'rgb(44, 7, 250)'] : ['rgb(13, 16, 34)', 'rgb(13, 16, 34)']}
						style={[styles.modalBgViewLinearGradient, { marginTop: this.state.screen === 'complete' ? getScreenSizeMultiplier() * -10 : getScreenSizeMultiplier() * 12, }]}>
						<View
							style={styles.modalBgView} />
					</LinearGradient>
				</View>
				<Animated.View
					pointerEvents="box-none"
					style={{
						position: 'absolute',
						width: '90%',
						alignSelf: 'center',
						top: getScreenSizeMultiplier() * 155,
						bottom: this.state.sendCheersButtonAnimation.interpolate({ inputRange: [0, 1], outputRange: [getScreenSizeMultiplier() * -120, getScreenSizeMultiplier() * 28] }),
					}}>
					{this.state.screen === 'complete' ?
						<View
							pointerEvents="box-none"
							style={{
								marginTop: heightPercentageToPx(-26.2),
								alignItems: 'center',
							}}>
							<Image
								source={Images.png.heartHands.img}
								style={{
									height: widthPercentageToPx(68),
									width: widthPercentageToPx(68),
									resizeMode: 'contain',
								}}
							/>
							<Text
								style={styles.graciasText}>{translate('sendCheersModal.thankYouTitle')}</Text>
							<Text
								style={styles.prizeTitleText}>{translate('sendCheersModal.sentCheersTo')}<Text style={{ color: '#00FFDD' }}>{this.state.selectedStreamer}</Text></Text>
							<View
								style={{
									backgroundColor: 'rgb(21, 20, 59)',
									borderRadius: 20,
									width: widthPercentageToPx(60),
									height: heightPercentageToPx(15),
									marginTop: getScreenSizeMultiplier() * 48,
								}}>
								<View style={{ alignSelf: 'center', width: widthPercentageToPx(50) }}>
									<View style={{
										alignSelf: 'flex-end',
										marginTop: heightPercentageToPx(2.8),
										transform: [{ scale: 0.8 }]
									}}>
										<Images.svg.lifeIcon height={24} width={24} color='rgba(255, 255, 255, .25)' />
									</View>
									<View style={{
										alignSelf: 'center',
										width: widthPercentageToPx(50),
										marginTop: heightPercentageToPx(1.2)
									}}>
										<ProgressBar
											unfilledColor="rgba(255, 255, 255, .25)"
											progress={0.2}
											color={Colors.greenQapla}
											borderWidth={0}
											height={heightPercentageToPx(0.8)} />
									</View>
									<View style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										marginLeft: widthPercentageToPx(-1.5),
										marginTop: heightPercentageToPx(2)
									}}>
										<Hearts
											hearts={2.5}
										/>
										<Text style={{
											color: '#fff',
											fontWeight: 'bold'
										}}>6/10</Text>
									</View>
								</View>
							</View>
							<View style={{
								marginTop: heightPercentageToPx(1.2)
							}}>
								<Text style={{
									fontSize: getScreenSizeMultiplier() * 14,
									color: '#00FFDD',
									textAlign: 'center'
								}}>{translate('sendCheersModal.lifesBarUpdated')}</Text>
							</View>
							<TouchableOpacity style={{
								backgroundColor: Colors.greenQapla,
								width: widthPercentageToPx(60),
								height: heightPercentageToPx(9),
								borderRadius: getScreenSizeMultiplier() * 40,
								marginTop: heightPercentageToPx(9)
							}}
								onPress={this.onBackToProfile}>
								<View style={{
									flex: 1,
									justifyContent: 'center'
								}}>
									<Text style={{
										color: Colors.backgroundColor,
										fontSize: getScreenSizeMultiplier() * 16,
										fontWeight: 'bold',
										textAlign: 'center',
									}}>{translate('sendCheersModal.backToProfile')}</Text>

								</View>
							</TouchableOpacity>
						</View>
						:
						this.state.screen === 'message' ?
							<ScrollView>
								<Text
									style={styles.titleText}>{translate('sendCheersModal.wantToSaySomething')}{'\n'}💬</Text>
								<Text
									style={styles.bodyText}>{translate('sendCheersModal.youCanTypeAnything')}</Text>
								<View style={{
									marginTop: '3%',
									width: '95%',
									backgroundColor: '#362191',
									alignSelf: 'center',
									borderRadius: getScreenSizeMultiplier() * 20,
									padding: '2%'
								}}>
									<TextInput
										style={{
											color: '#fff'
										}}
										onChangeText={(message) => this.setState({ message })}
										value={this.state.message}
										multiline={true}
										maxLength={160}
									/>
									<View>
										<Text style={{
											color: this.state.message.length === 160 ? '#c00' : this.state.message.length > 125 ? '#cc0' : '#ccc',
											alignSelf: 'flex-end',
											marginRight: '2%'
										}}>
											{this.state.message.length}/160
										</Text>
									</View>
								</View>
							</ScrollView>
							:
							<>
								<Text
									style={styles.titleText}>{translate('sendCheersModal.sendYourCheers')}{'\n'}🔥😍🔥</Text>
								<Text
									style={styles.bodyText}>{translate('sendCheersModal.selectYourStreamer')}</Text>
								<View
									pointerEvents="box-none"
									style={{
										height: '60%',
										marginTop: 30,
										flexDirection: 'row',
										alignItems: 'flex-start',
									}}>
									<FlatList
										data={this.state.streamersData}
										renderItem={this.renderItem}
										keyExtractor={item => item.streamer}
										extraData={this.state.selectedStreamer}
										numColumns={2}
										columnWrapperStyle={{ justifyContent: 'space-between', }}
										showsVerticalScrollIndicator={false}
									/>
								</View>
							</>
					}
				</Animated.View>
				{
					this.state.selectedStreamer !== '' ?
						<>
							<Animated.View
								style={[{
									position: 'absolute',
									bottom: 0,
									width: '100%',
									backgroundColor: Colors.greenQapla,
								},
								{
									transform:
										[{ translateY: this.state.sendCheersButtonAnimation.interpolate({ inputRange: [0, 1], outputRange: [heightPercentageToPx(15), 0] }) }],
								},
								]}
							>
								<TouchableHighlight
									style={{ flex: 1 }}
									underlayColor="#2aa897"
									disabled={this.state.sendingCheers}
									onPress={this.state.screen === 'selection' ? () => { this.setState({ screen: 'message' }) } : this.sendCheersButton}
								>
									<QaplaText style={styles.continueButtonText}>
										{this.state.sendingCheers ?
											translate('sendCheersModal.sending')
										:
										this.state.screen === 'message' && this.state.message.length === 0 ?
											translate('sendCheersModal.skip')
											:
											translate('sendCheersModal.next')
										}
									</QaplaText>
								</TouchableHighlight>
							</Animated.View>
						</>
						:
						<></>
				}
			</Modal >
		);
	}
}