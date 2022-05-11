import {functions} from '../utilities/firebase'

/**
 * @deprecated
 * Accept challenge for idMatch
 * @param {object} notificationObj Notification object from the challenge request
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
			notificationObj,
			idChallenged
		}
	})
}

/**
 * Gets the Twitch user information from the Qapla user with their TwitchId
 * @param {string} userTwitchId Twitch Id of the user
 */
export async function getTwitchDataCloudFunction(userTwitchId) {
	return await callCloudFunction({
		cfName: 'getTwitchUserData',
		params: {
			userTwitchId
		}
	});
}

export async function generateAuthTokenForTwitchSignIn(userTwitchId, displayName, email) {
	return await callCloudFunction({
		cfName: 'appTwitchSignin',
		params: {
			uid: userTwitchId,
			displayName,
			email
		}
	});
}

/**
 * Description:
 * Performs the call to the callable cloud function
 *
 * @param {object} ctx Context object that has cloud function name and parameter object.
 */
async function callCloudFunction(ctx) {
	let res = null;
	let cloudFunc = functions.httpsCallable(ctx.cfName);

	try {
		res = await cloudFunc(ctx.params);
	}
	catch (err) {
		console.log('[callCloudFunction] - ' + ctx.cfName + ' - Error - ' + err);
		res = err;
	}

	return res;
}
