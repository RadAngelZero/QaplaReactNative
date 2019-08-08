// josep.sanahuja - 08-08-2019 - us85 - +callCloudFunction
// diego	      - 06-08-2019 - us68 - acceptChallengeRequest with idNotification parameter changed to notification
// diego          - 05-08-2019 - us58 - File creation

import {functions} from '../utilities/firebase'

/**
 * Accept challenge for idMatch
 * @param {string} notificationObj Notification object from the challenge request
 * @param {string} idChallenged    uid from the user that receives the challenge request
 */

 //TODO: make modification to remove auth object. this is not good.
export function acceptChallengeRequest(notificationObj, idChallenged) {
	return callCloudFunction({
		cfName: 'acceptChallengeRequest',
		params: {
			notificationObj: notificationObj,
			idChallenged: idChallenged
		}
	})
}

/**
 * Cancel public match with id idMatch
 * @param {string} idMatch id of the match to cancel
 */
export function cancelPublicMatch(idMatch) {
	return callCloudFunction({
		cfName: 'cancelMatch',
		params: {idMatch: idMatch}
	});
}

/**
 * Description: 
 * Performs the call to the callable cloud function 
 *
 * @param {object} ctx Context object that has cloud function name and parameter object.
 *
 */
function callCloudFunction(ctx) {
	let res = null;
	let cloudFunc = functions.httpsCallable(ctx.cfName);

	try {
        res = cloudFunc(ctx.params);
	}
	catch (err) {
		console.log('[callCloudFunction] - ' + ctx.cfName + ' - Error - ' + err);
		res = err;
	}

	return res;
}
