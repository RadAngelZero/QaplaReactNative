import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View, Modal, FlatList, TouchableOpacity, TouchableHighlight, Animated, Easing } from 'react-native';
import Images from '../../../assets/images';
import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';
import Hearts from '../UserProfileRewards/Hearts';
import ProgressBar from '../UserProfileRewards/Bar';

const LeftArrowThiccIcon = Images.svg.leftArrowThiccIcon;

export default class FormularioCheers extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state;
		return {
			header: null,
			headerLeft: null,
			headerRight: null,
		};
	};



	constructor(props) {
		super(props);
	}

	state = {
		selectedStreamer: '',
		screen: 'selection',
		sendCheersButtonAnimation: new Animated.Value(0),
	};

	DATA = [
		{
			streamer: 'feryfer',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/61a9ef93-445e-4e16-8758-63f4d949301f-profile_image-150x150.png',
		},
		{
			streamer: 'Zenifo720',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b36fe0ba-268e-4185-a87d-5fd8e628ac7a-profile_image-150x150.png',
		},
		{
			streamer: 'BUBBLE_KLUTZ',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4a2b0598-2546-4c46-b30e-aec153563d76-profile_image-150x150.png',
		},
		{
			streamer: 'feryfer1',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/61a9ef93-445e-4e16-8758-63f4d949301f-profile_image-150x150.png',
		},
		{
			streamer: 'Zenifo7201',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b36fe0ba-268e-4185-a87d-5fd8e628ac7a-profile_image-150x150.png',
		},
		{
			streamer: 'BUBBLE_KLUTZ1',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4a2b0598-2546-4c46-b30e-aec153563d76-profile_image-150x150.png',
		},
		{
			streamer: 'feryfer2',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/61a9ef93-445e-4e16-8758-63f4d949301f-profile_image-150x150.png',
		},
		{
			streamer: 'Zenifo7202',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b36fe0ba-268e-4185-a87d-5fd8e628ac7a-profile_image-150x150.png',
		},
		{
			streamer: 'BUBBLE_KLUTZ2',
			imgUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4a2b0598-2546-4c46-b30e-aec153563d76-profile_image-150x150.png',
		},
	]

	componentDidMount() {
	}

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.streamerSelectCardView}
				onPress={() => {
					this.setState({ selectedStreamer: item.streamer });
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
		return <Modal
			style={styles.formularioCheersView}
			animationType="slide"
			transparent={true}
			visible={this.props.open}
			onRequestClose={() => {
				this.setState({ selectedStreamer: '', screen: 'selection' });
				this.state.sendCheersButtonAnimation.setValue(0);
				this.props.onClose();
			}}>
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
					bottom: this.state.sendCheersButtonAnimation.interpolate({ inputRange: [0, 1], outputRange: [getScreenSizeMultiplier() * -76, getScreenSizeMultiplier() * 76] }),
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
							style={styles.graciasText}>¡Gracias!</Text>
						<Text
							style={styles.prizeTitleText}>Hemos enviado tus {'\n'}cheers a <Text style={{ color: '#00FFDD' }}>{this.state.selectedStreamer}</Text></Text>
						<View
							style={{
								backgroundColor: 'rgb(21, 20, 59)',
								borderRadius: 20,
								width: widthPercentageToPx(60),
								height: heightPercentageToPx(15),
								marginTop: getScreenSizeMultiplier() * 48,
							}}>
							<View>
								<ProgressBar
									unfilledColor="rgba(255, 255, 255, .25)"
									progress={0.2}
									color={Colors.greenQapla}
									borderWidth={0} />
								<Text>A</Text>
							</View>
						</View>
					</View>
					:
					<>
						<Text
							style={styles.titleText}>Envía tus cheers{'\n'}🔥😍🔥</Text>
						<Text
							style={styles.bodyText}>Tus cheers son enviados al instante, tu barra de vida subirá al terminar este paso.</Text>
						<View
							pointerEvents="box-none"
							style={{
								height: '60%',
								marginTop: 30,
								flexDirection: 'row',
								alignItems: 'flex-start',
							}}>
							<FlatList
								data={this.DATA}
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
			{this.state.selectedStreamer !== '' ?
				<>
					<Animated.View
						style={[{
							position: 'absolute',
							bottom: 0,
							width: '100%',
							backgroundColor: Colors.greenQapla,
							// height: '20%',
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
							onPress={() => {
								this.setState({ screen: 'complete' });
								Animated.timing(this.state.sendCheersButtonAnimation, {
									toValue: 0,
									duration: 300,
									easing: Easing.cubic,
									useNativeDriver: false,
								}).start();
							}
							}>
							<QaplaText style={{
								flex: 1,
								fontSize: 18,
								fontWeight: 'bold',
								color: Colors.backgroundDarkModal,
								textAlign: 'center',
								textAlignVertical: 'center',
								marginTop: 34,
								marginBottom: 34,
							}}>
								{translate('eventDetailsModal.participate')}
							</QaplaText>
						</TouchableHighlight>
					</Animated.View>
				</>
				:
				<></>
			}
		</Modal >;
	}
}

