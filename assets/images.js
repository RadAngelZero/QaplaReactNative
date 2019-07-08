// Icons
import InstagramIcon from './icons/Instagram_logo_2016.svgx'
import FacebookIcon from './icons/F_icon.svg'
import FavouritesIcon from './icons/favorite-heart-button.svg'
import TestIcon from './icons/facebook.svg'

import PublicFeedMatchIcon from './icons/Explore.svg'
import QaploinsIcon from './icons/qaploins.svg'
import ProfileIcon from './icons/ProfileActive.svg'
import FifaIcon from './icons/Fifa.svg'
import GowIcon from './icons/Gow.svg'
import CancelIcon from './icons/qaploins.svg'

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
		} ,
		welcome4Img:{
			img: require('./images/welcome4.png'),
			uri: '@assets/icons/welcome4.png'
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
		gowIcon: GowIcon,
		fifaIcon: FifaIcon,
		cancelIcon: CancelIcon
	}
};

export default images;