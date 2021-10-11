import React from 'react';
import { Image, Text, View, Modal, FlatList, TouchableOpacity, TouchableHighlight, TextInput, Keyboard, Animated, Easing, ScrollView, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Images from '../../../assets/images';
import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';
import Hearts from '../UserProfileRewards/Hearts';
import ProgressBar from '../UserProfileRewards/Bar';
import ChatAnimatedDots from '../ChatAnimatedDots/ChatAnimatedDots';
import { getPremiumStreamers, sendCheers, updateTwitchUsername } from '../../services/database';
import { getTwitchDataCloudFunction } from '../../services/functions';
import images from '../../../assets/images';

const LeftArrowThiccIcon = Images.svg.leftArrowThiccIcon;
const SendChat = Images.svg.sendChat;

export default class FormularioCheers extends React.Component {

	state = {
		selectedStreamer: '',
		selectedStreamerID: '',
		message: '',
		screen: 'selection',
		sendCheersButtonAnimation: new Animated.Value(0),
		streamersData: [],
		profilePlaceholderImages: [],
		tempChatProfileImage: '',
		chatResponsePharaseP1: '',
		chatResponsePharaseP2: '',
		messageSent: false,
		chatResponse: false,
	};

	componentDidMount() {
		this.getStreamers();
		this.fetchProfilePlaceholderImages();
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
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			return this.onBackToProfile
		})
	}

	componentWillUnmount() {
		this.keyboardWillHideListener.remove();
		this.keyboardWillShowListener.remove();
		this.backHandler.remove();
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

	selectChatResponse = async () => {
		let messageLenght = this.state.message.length
		if (this.state.message.length == 1) {
			if (this.state.message == ' ') {
				messageLenght = 0
			}
		}
		let typeOfResponse = 'none'
		let chatResponsePharaseP1 = ''
		let chatResponsePharaseP2 = ''
		let emojis = ['🥰', '😉', '❤', '💞', '💓', '💗', '💖']
		let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
		if (messageLenght > 0 && messageLenght <= 54) typeOfResponse = 'short'
		if (messageLenght > 54 && messageLenght <= 108) typeOfResponse = 'medium'
		if (messageLenght > 108) typeOfResponse = 'long'
		let firsPartArr = Object.values(translate('sendCheersModal.chatResponsePharases.' + typeOfResponse))
		let secondPartArr = Object.values(translate('sendCheersModal.chatResponsePharases.secondPart'))
		let willBeSentArr = Object.values(translate('sendCheersModal.chatResponsePharases.willBeSent'))
		let randomNum = Math.floor(Math.random() * firsPartArr.length)
		if (typeof firsPartArr[0] == 'object') {
			firsPartArr.forEach(element => {
				let arr = Object.values(element)
				randomNum = Math.floor(Math.random() * arr.length)
				chatResponsePharaseP1 += arr[randomNum]
			});
		} else {
			chatResponsePharaseP1 += firsPartArr[randomNum]
		}
		randomNum = Math.floor(Math.random() * secondPartArr.length)
		chatResponsePharaseP2 += secondPartArr[randomNum] + '\n'
		randomNum = Math.floor(Math.random() * willBeSentArr.length)
		chatResponsePharaseP2 += willBeSentArr[randomNum] + ' ' + randomEmoji
		this.setState({ chatResponsePharaseP1, chatResponsePharaseP2 })
	}

	sendCheersButton = async () => {
		if (this.state.message.includes('\n')) {
			let message = this.state.message.replaceAll('\n', '')
			this.setState({ message })
		}
		if (this.state.message.includes('  ')) {
			let message = this.state.message.replaceAll('  ', ' ')
			this.setState({ message })
		}
		this.setState({ messageSent: true })
		this.selectChatResponse()
		setTimeout(() => {
			this.setState({ chatResponse: true })
		}, Math.floor(Math.random() * (2500 - 1200 + 1) + 1200))
		let now = new Date();
		const twitchData = await getTwitchDataCloudFunction(this.props.twitchId);
		await updateTwitchUsername(this.props.uid, twitchData.data.display_name);
		if (this.props.qoinsToDonate > 0) {
			await sendCheers(this.props.qoinsToDonate, this.state.message === ' ' ? '' : this.state.message, now.getTime(), this.state.selectedStreamer, this.props.uid, this.props.userName, twitchData.data.display_name, this.props.userPhotoURL, this.state.selectedStreamerID);
		}
	}

	fetchProfilePlaceholderImages = async () => {
		let profilePlaceholderImages = []
		for (let counter = 1; images.png['profileImagePlaceholder' + counter] !== undefined; counter++) {
			profilePlaceholderImages.push(images.png['profileImagePlaceholder' + counter].img)
		}
		this.setState({ profilePlaceholderImages })
	}

	onBackToProfile = () => {
		if (this.state.messageSent && !this.state.chatResponse) return true
		if (this.state.screen === 'message' && !this.state.messageSent) return this.setState({ screen: 'selection', message: '' })
		this.setState({ screen: 'selection', selectedStreamer: '', selectedStreamerID: '', message: '', messageSent: false, chatResponse: false });
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
						onPress={this.onBackToProfile}
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
						top: getScreenSizeMultiplier() * 120,
						bottom: this.state.sendCheersButtonAnimation.interpolate({ inputRange: [0, 1], outputRange: [getScreenSizeMultiplier() * -120, getScreenSizeMultiplier() * 28] }),
					}}>
					{this.state.screen === 'message' ?
						<ScrollView>
							<Text style={styles.titleText}>{translate('sendCheersModal.wantToSaySomething')}{'\n'}💬</Text>
						</ScrollView>
						:
						<>
							<Text style={styles.titleText}>{translate('sendCheersModal.sendYourCheers')}{'\n'}🔥😍🔥</Text>
							<Text style={styles.bodyText}>{translate('sendCheersModal.selectYourStreamer')}</Text>
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
					this.state.screen === 'message' &&
					<View style={{
						flex: 1,
						position: 'absolute',
						bottom: '2%',
						width: '90%',
						alignSelf: 'center',
						marginHorizontal: '1%'
					}}>
						<View style={{
							flex: 1,
							flexDirection: 'row',
							height: getScreenSizeMultiplier() * 32,
							marginBottom: getScreenSizeMultiplier() * 10
						}}>
							<LinearGradient
								style={{
									flex: 1,
									height: getScreenSizeMultiplier() * 32,
									maxWidth: getScreenSizeMultiplier() * 32,
									borderRadius: 100,
									overflow: 'hidden'
								}}
								colors={['#691FB3', '#2F2FF9']}
								locations={[0.17, .93]}
								useAngle
								angle={135}>
								<Image
									style={{
										flex: 1,
										height: getScreenSizeMultiplier() * 32,
										width: getScreenSizeMultiplier() * 32,
									}}
									source={this.state.tempChatProfileImage} />
							</LinearGradient>
							<View style={{
								flex: 1,
								justifyContent: 'center',
								marginLeft: getScreenSizeMultiplier() * 8,
							}}>
								<Text style={{
									color: 'white',
									fontSize: getScreenSizeMultiplier() * 14
								}}>Qaplita</Text>
							</View>
						</View>
						<View style={{
							marginBottom: getScreenSizeMultiplier() * 20,
							borderRadius: getScreenSizeMultiplier() * 18,
							borderTopLeftRadius: getScreenSizeMultiplier() * 4,
							paddingVertical: getScreenSizeMultiplier() * 16,
							paddingHorizontal: getScreenSizeMultiplier() * 24,
							width: '80%',
							backgroundColor: '#141539'
						}}>
							<Text style={{
								color: 'white',
								fontSize: getScreenSizeMultiplier() * 14
							}}>
								{translate('sendCheersModal.tellUs')} <Text style={{ color: '#00FFDD' }}>{this.state.selectedStreamer}</Text>?
							</Text>
						</View>
						{
							this.state.messageSent ?
								<>
									<View style={{
										alignSelf: 'flex-end',
										marginBottom: getScreenSizeMultiplier() * 20,
										borderRadius: getScreenSizeMultiplier() * 18,
										borderBottomRightRadius: getScreenSizeMultiplier() * 4,
										paddingVertical: getScreenSizeMultiplier() * 16,
										paddingHorizontal: getScreenSizeMultiplier() * 24,
										width: '80%',
										backgroundColor: '#3D42DF'
									}}>
										<Text style={{
											color: 'white',
											fontSize: getScreenSizeMultiplier() * 14
										}}>
											{this.state.message}
										</Text>
									</View>
									<View style={{
										flexDirection: 'row',
										marginBottom: getScreenSizeMultiplier() * this.state.chatResponse ? 64 : 20,
										borderRadius: getScreenSizeMultiplier() * 18,
										borderTopLeftRadius: getScreenSizeMultiplier() * 4,
										paddingVertical: getScreenSizeMultiplier() * 16,
										paddingHorizontal: getScreenSizeMultiplier() * 23,
										width: this.state.chatResponse ? '80%' : getScreenSizeMultiplier() * 96,
										backgroundColor: '#141539'
									}}>
										{
											this.state.chatResponse ?
												<Text style={{
													color: 'white'
												}}>
													{this.state.chatResponsePharaseP1}<Text style={{ color: '#00FFDD' }}>{this.state.selectedStreamer}</Text>{this.state.chatResponsePharaseP2}
												</Text>
												:
												<ChatAnimatedDots />
										}
									</View>
								</>
								:
								<>
								</>
						}
						<View style={{
							flex: 1,
							flexDirection: 'row',
						}}>
							<View style={{
								flex: 8,
								maxHeight: getScreenSizeMultiplier() * 165,
								width: '95%',
								backgroundColor: '#141539',
								alignSelf: 'center',
								borderRadius: getScreenSizeMultiplier() * 18,
							}}>
								<TextInput
									style={{
										color: '#fff',
										paddingHorizontal: '6%',
										paddingVertical: this.state.message !== '' && !this.state.messageSent ? '6%' : '2%',
										maxHeight: getScreenSizeMultiplier() * 130,
									}}
									onChangeText={(message) => {
										let toSet = message
										if (message.includes('\n')) {
											toSet = message.replace('\n', '')
										}
										if (message.includes('  ')) {
											toSet = message.replace('  ', ' ')
										}
										this.setState({ message: toSet })
									}}
									value={this.state.messageSent ? '' : this.state.message}
									multiline={true}
									maxLength={160}
									placeholder={'Opcional, pulsa enviar para saltar'}
									placeholderTextColor={'#fff4'}
									editable={!this.state.messageSent}
								/>
							</View>
							<TouchableOpacity style={{
								flex: 1,
								alignSelf: 'flex-end',
								justifyContent: 'flex-end',
								height: getScreenSizeMultiplier() * 40,
								paddingLeft: '4%',
								opacity: this.state.messageSent ? 0.4 : 1
							}}
								onPress={this.sendCheersButton}
								disabled={this.state.messageSent}>
								<View style={{
									width: getScreenSizeMultiplier() * 30,
									height: getScreenSizeMultiplier() * 30,
									flex: 1,
									justifyContent: 'center',
									alignContent: 'center',
								}}>
									<SendChat />
								</View>
							</TouchableOpacity >
						</View>
					</View>
				}
				{(this.state.selectedStreamer !== '' && this.state.screen === 'selection') || (this.state.screen === 'message' && this.state.chatResponse) ?
					<>
						<Animated.View
							style={[{
								position: 'absolute',
								bottom: 0,
								width: '100%',
								backgroundColor: Colors.greenQapla,
								borderTopLeftRadius: getScreenSizeMultiplier() * 15,
								borderTopRightRadius: getScreenSizeMultiplier() * 15,
								overflow: 'hidden'
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
								onPress={this.state.screen === 'selection' ?
									() => {
										this.setState({ screen: 'message' })
										let randomNum = Math.floor((Math.random() * this.state.profilePlaceholderImages.length))
										let tempChatProfileImage = this.state.profilePlaceholderImages[randomNum]
										return this.setState({ tempChatProfileImage })
									} : this.state.chatResponse ? this.onBackToProfile : this.sendCheersButton}
							>
								<QaplaText style={styles.continueButtonText}>
									{this.state.screen === 'message' && this.state.messageSent ?
										translate('sendCheersModal.backToProfile')
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