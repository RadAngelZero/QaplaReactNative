// diego          - 05-08-2019 -us    - File creation

import { functions, auth } from '../utilities/firebase';

/**
 * Accept challenge for idMatch
 * @param {string} idNotification id from the user that sends the challenge request
 */
export function acceptChallengeRequest(idNotification) {
	let cloudFunc = functions.httpsCallable('acceptChallengeRequest');
	try {
		let res = cloudFunc({idNotification: idNotification, idChallenged: auth.currentUser.uid});
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