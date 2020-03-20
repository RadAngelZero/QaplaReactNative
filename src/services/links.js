import { Platform } from 'react-native';

import {
	links,
	firebaseLinks
} from '../utilities/firebase';

import {
 	ANDROID_STORE_LINK,
 	IOS_STORE_LINK,
 	APPSTORE_ID,
 	IOS_BUNDLE_ID,
 	ANDROID_PACKAGE_NAME
} from '../utilities/Constants';

import { translate } from '../utilities/i18';

/**
 * Creates a deep link for a match card
 * @param {string} matchId Match id from firebase
 * @param {object} ctx 	   Context object with extra information about the match
 */
export async function dplCreateLinkMatchCard(matchId, ctx) {
	let url = '';

	try {
		const link = new firebaseLinks.DynamicLink(
		`https://qapla.gg/?type=appDeepLink\&type2=matchCard\&matchId=${matchId}`, 
		'https://qapla.page.link')
	    .android.setPackageName(ANDROID_PACKAGE_NAME)
	    .ios.setBundleId(IOS_BUNDLE_ID)
	    .ios.setAppStoreId(APPSTORE_ID)
	    .social.setDescriptionText(translate('deepLinks.matchCard.description'))
	    .social.setImageUrl('https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1024/https://qapla.gg/wp-content/uploads/2020/03/Q-gaming-logo.png')
	    .social.setTitle(translate('deepLinks.matchCard.title', {game: ctx.game, platform: ctx.platform, bet: ctx.bet}));

		url = await links.createShortDynamicLink(link, 'UNGUESSABLE');
	}
	catch(error) {
		console.error(error);
	}

	return url;
}
