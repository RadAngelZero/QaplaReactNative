// diego	      - 20-08-2019 - us89 - addQaploinsToUserCloudFunction for beta on iOS
// josep.sanahuja - 08-08-2019 - us85 - +callCloudFunction &&  +userHasQaploinsToPlayMatch
//                                      && - auth import
// diego	      - 06-08-2019 - us68 - acceptChallengeRequest with idNotification parameter changed to notification
// diego          - 05-08-2019 - us58 - File creation

import {functions} from '../utilities/firebase'

/**
 * Accept challenge for idMatch
 * @param {string} notificationObj Notification object from the challenge request
 * @param {string} idChallenged    uid from the user that receives the challenge request
 *
 * josep.sanahuja - us85: Removed auth.currentUser.uid and include it as parameter 'idChallenged',
 * this avoids dependencies between files and allows a more natural use of the method
 * by passing the info needed as argument.
 */
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
 * Add qaploins with no payment checkout process (iOS beta version)
 */
export function addQaploinsToUserCloudFunction() {
	return callCloudFunction({
		cfName: 'addQaploinsToUserBETA',
		params: {}
	});
}

/**
 * Allow the user to redeem a completed logro (completed on points)
 * @param {string} idLogro Identifier of the logro on the database
 * @param {number} qaploins Quantity of qaploins to add
 */
export function redeemLogroCloudFunction(idLogro, qaploins) {
	return callCloudFunction({
		cfName: 'redeemLogro',
		params: {
			idLogro,
			qaploins
		}
	});
}

/**
 * Description: 
 * Performs the call to the callable cloud function 
 *
 * @param {object} ctx Context object that has cloud function name and parameter object.
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
