import {
	dbGetAppVersion
} from '../services/database';

import {version} from '../../package.json';

/**
 * Retrieves the version of the app from server
 * @param {function}	callback function to be called when retrieving a result from db
 *
 * @returns
 * SUCCESS - {string}     res version of QaplaGaming app retrieved from server
 * FAIL    - {undefined}  res version was not retrieved   
 */
export async function verServerVersionCb(callback) {
	dbGetAppMajorVersion()
	.then((elem) => {
		callback(elem);
	})
	.catch((error) => {
		console.log(`[verServerVersionCb] err: `, error);
	});
}

export async function verServerVersion() {
	let res = null;

	try {
		res = await dbGetAppVersion();
	}
	catch(error) {
		console.log(`[verServerVersion] err: `, error);
	}

	return res;
}

export function verLocalVersion() {
	return version;
}

export function verMajorVersion(versionStr) {
	return versionStr.split('.')[0];
}

export function verMinorVersion(versionStr) {
	return versionStr.split('.')[1];
}

export function verPatchVersion(versionStr) {
	return versionStr.split('.')[2];
}

export function verIsMajorGreater(versionStr_1, versionStr_2) {
	let res = false;

	try {
		let maj_1 = versionStr_1.split('.')[0];
		let maj_2 = versionStr_2.split('.')[0];

		res = parseInt(maj_1) > parseInt(maj_2);
	} catch (error) {
		console.log(`[verIsMajorGreater] err: `, error);
	}

	console.log(`[verIsMajorGreater] `,res);
	return res;
}

export function verIsMinorGreater(versionStr_1, versionStr_2) {
	let res = false;

	try {
		let min_1 = versionStr_1.split('.')[1];
		let min_2 = versionStr_2.split('.')[1];

		res = parseInt(min_1) > parseInt(min_2);
	} catch (error) {
		console.log(error);
	}

	console.log(`[verIsMinorGreater] `,res);
	return res;
}

export function verIsPatchGreater(versionStr_1, versionStr_2) {
	let res = false;

	try {
		let p_1 = versionStr_1.split('.')[2];
		let p_2 = versionStr_2.split('.')[2];

		res = parseInt(p_1) > parseInt(p_2);
	} catch (error) {
		console.log(error);
	}

	return res;
}

export function verShouldUpdateApp(localVersionStr, serverVersionStr) {
	const res =  verIsMajorGreater(serverVersionStr, localVersionStr) || verIsMinorGreater(serverVersionStr, localVersionStr);
	return res;
}