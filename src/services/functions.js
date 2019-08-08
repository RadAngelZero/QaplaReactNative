// diego	  - 06-08-2019 - us68 - acceptChallengeRequest with idNotification parameter changed to notification
// diego          - 05-08-2019 - us58 - File creation

import { functions, auth } from '../utilities/firebase';

/**
 * Accept challenge for idMatch
 * @param {string} notification The notification object of the accepted challenge
 */
export function acceptChallengeRequest(notification) {
	let cloudFunc = functions.httpsCallable('acceptChallengeRequest');
	try {
		let res = cloudFunc({notification, idChallenged: auth.currentUser.uid});
	}
	catch (err) {
		console.log('[functions] - acceptChallengeRequest - Error - ' + err);
	}
}

/**
 * Cancel public match with id idMatch
 * @param {string} idMatch id of the match to cancel
 */
export function cancelPublicMatch(idMatch) {
	var cloudFunc = functions.httpsCallable('cancelMatch');
	try {
        let res = cloudFunc({idMatch: idMatch});
	}
	catch (err) {
		console.log('[functions] - Error - ' + err);
	}
}
