// josep
// diego	      - 20-09-2019 - us133 - Added VerifyIcon
// diego	      - 18-09-2019 - us109 - Added LogroIcon
// diego	      - 18-09-2019 - us109 - Added LogrosIcon
// diego	      - 06-09-2019 - us93 - Added OkIcon for checkbox
// diego	  	  - 03-09-2019 - us96 - Added close (x) icon (used on close of navigators over the main navigator)
// diego	  	  - 03-09-2019 - us92 - Added onboarding images
// diego	  	  - 13-08-2019 - us77 - Added clutch tutorial images
// diego        - 17-07-2019 - NA   - removed duplicate smash bros image

// Icons
import InstagramIcon from './icons/Instagram_logo_2016.svgx';
import FacebookIcon from './icons/F_icon.svg';
import FavouritesIcon from './icons/favorite-heart-button.svg';
import TestIcon from './icons/facebook.svg';

import PublicFeedMatchIcon from './icons/Explore.svg';
import QaploinsIcon from './icons/qaploins.svg';
import ProfileIcon from './icons/ProfileActive.svg';
import NotificationIcon from './icons/Notifications.svg';
import QaploinsPrize from './icons/QaploinsPrize.svg';
import LessQaploins from './icons/LessQaploins.svg';
import MoreQaploins from './icons/MoreQaploins.svg';
import FifaIcon from './icons/Fifa.svg';
import GowIcon from './icons/Gow.svg';
import CancelIcon from './icons/qaploins.svg';
import LightningIcon from './icons/Lighting.svg';
import SearchIcon from './icons/search.svg';
import BackIcon from './icons/back.svg';
import OkIcon from './icons/OkIcon.svg';
import CloseIcon from './icons/close.svg';
import ClashIcon from './icons/Clash.svg';
import HeartstoneIcon from './icons/Heartstone.svg';
import LOLIcon from './icons/LOL.svg';
import OverwatchIcon from './icons/Overwatch.svg';
import SmashIcon from './icons/Smash.svg';
import HaloIcon from './icons/Halo5.svg';
import WinIcon from './icons/ganado.svg';
import LostIcon from './icons/perdido.svg';
import TieIcon from './icons/empatado.svg';
import ChooseClipIcon from './icons/video-clip.svg';
import AlreadyChoosedClipIcon from './icons/video-clip-check.svg';
import LogrosIcon from './icons/LogrosActive.svg';
import VerifyIcon from './icons/verificado.svg';
import SupportIcon from './icons/support.svg';
import DiscordIcon from './icons/discord.svg';
import SettingsIcon from './icons/settings.svg';
import EditIcon from './icons/edit.svg';

// Images

const images = {
	png: {
		prueba: require("./icons/public-feed-match.png"),
		publicFeedMatchIcon:{
	    	img: require('./icons/public-feed-match.png'),
	    	uri: '@assets/icons/public-feed-match.png'
	    },
		mock1Icon:{
			img: require('./icons/instagram.png'),
			uri: '@assets/icons/instagram.png'
		},
		mock1Icon:{
			img: require('./icons/facebook.png'),
			uri: '@assets/icons/facebook.png'
		},
		instagramIcon:{
			img: require('./icons/facebook.png'),
			uri: '@assets/icons/facebook.png'
		},
		welcome1Img:{
			img: require('./images/welcome1.png'),
			uri: '@assets/icons/welcome1.png'
		},
		welcome2Img:{
			img: require('./images/welcome2.png'),
			uri: '@assets/icons/welcome2.png'
		},
		welcome3Img:{
			img: require('./images/welcome3.png'),
			uri: '@assets/icons/welcome3.png'
		},
		welcome4Img:{
			img: require('./images/welcome4.png'),
			uri: '@assets/icons/welcome4.png'
		},
		signUpControllers: {
			img: require('./images/signup.png'),
			uri: '@assets/images/signup.svg'
		},
		qaplaSignupLogo: {
			img: require('./images/QaplaSignUpLogo.png'),
			uri: '@assets/images/QaplaSignUpLogo.png'
		},
		uploadVideoClutch: {
			img: require('./images/UploadVideoClutch.jpg'),
			uri: '@assets/images/UploadVideoClutch.jpg'
		},
		shareClutchLink: {
			img: require('./images/ShareClutchLink.jpg'),
			uri: '@assets/images/ShareClutchLink.jpg'
		},
		connectOnBoarding: {
			img: require('./images/connect-onboarding.png')
		},
		compiteOnBoarding: {
			img: require('./images/compite-onboarding.png')
		},
		shareOnBoarding: {
			img: require('./images/comparte-onboarding.png')
		},
		walletOnBoarding: {
			img: require('./images/wallet-onboarding.png')
		},
		qaplaSmile: {
			img: require('./images/qapla-smile.png')
		},
		divider: {
			img: require('./images/divider-onboarding.png')
		},
		verificationProccesSuccess: {
			img: require('./images/VerificationProccesSuccess.png')
		},
		peekaImg: {
			img: require('./images/PEKKA.png'),
			uri: '@assets/images/PEKKA.png'
		},
		addButton: {
			img: require('./images/addButton.png')
		},
		qaplaAppIcon: {
			img: require('./icons/qapla-app-icon.png')
		},
		fifaXboxImg: {
			img: require('./images/FIFAXbox.png'),
			uri: '@assets/images/FIFA.png'
		},
		fifaPsImg: {
			img: require('./images/FIFAPs.png'),
			uri: '@assets/images/FIFAPs.png'
		},
		GOW4Xbox: {
			img: require('./images/GOW4Xbox.png'),
			uri: '@assets/images/GOW4Xbox.png'
		},
		HALO5Xbox: {
			img: require('./images/HALO5Xbox.png'),
			uri: '@assets/images/HALO5Xbox.png'
		},
		heartstoneImg: {
			img: require('./images/HEARTHSTONE.png'),
			uri: '@assets/images/HEARTHSTONE.png'
		},
		overwatchPsImg: {
			img: require('./images/OverwatchPs.png'),
			uri: '@assets/images/Overwatch.png'
		},
		overwatchPcImg: {
			img: require('./images/OVERWATCHPC.png'),
			uri: '@assets/images/OVERWATCHPC.png'
		},
		overwatchXboxImg: {
			img: require('./images/OVERWATCHXbox.png'),
			uri: '@assets/images/OVERWATCHXbox.png'
		},
		lolImg: {
			img: require('./images/LEAGUELEGENDS.png'),
			uri: '@assets/images/LEAGUELEGENDS.png'
		},
		smashImg: {
			img: require('./images/SAMSHBROS.png'),
			uri: '@assets/images/SAMSHBROS.png'
		}
	},
	svg: {
		instagramIcon: InstagramIcon,
		facebookIcon: FacebookIcon,
		favouritesIcon: FavouritesIcon,
		testIcon: TestIcon,
		publicFeedMatchIcon: PublicFeedMatchIcon,
		qaploinsIcon: QaploinsIcon,
		profileIcon: ProfileIcon,
		cancelIcon: CancelIcon,
		lightningIcon: LightningIcon,
		searchIcon: SearchIcon,
		backIcon: BackIcon,
		closeIcon: CloseIcon,
		notificationIcon: NotificationIcon,
		qaploinsPrize: QaploinsPrize,
		lessQaploins: LessQaploins,
		moreQaploins: MoreQaploins,
		okIcon: OkIcon,
		winIcon: WinIcon,
		lostIcon: LostIcon,
		tieIcon: TieIcon,
		chooseClipIcon: ChooseClipIcon,
		alreadyChoosedClipIcon: AlreadyChoosedClipIcon,
		logrosIcon: LogrosIcon,
		verifyIcon: VerifyIcon,
		supportIcon: SupportIcon,
		gowIcon: GowIcon,
		fifaIcon: FifaIcon,
		clashIcon: ClashIcon,
		heartstoneIcon: HeartstoneIcon,
		overwatchIcon: OverwatchIcon,
		lolIcon: LOLIcon,
		smashIcon: SmashIcon,
		haloIcon: HaloIcon,
		discordIcon: DiscordIcon,
		settingsIcon: SettingsIcon,
		editIcon: EditIcon
	}
};

export default images;
