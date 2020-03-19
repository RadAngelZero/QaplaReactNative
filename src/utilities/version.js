import {
	dbGetAppVersion
} from '../services/database';

import {version} from '../../package.json';

/**
 * Retrieves the version of the app from server and executes a callback onSucces
 * @param {function}	callback function to be called when retrieving a result from db
 */
export async function verServerVersionCb(callback) {
	dbGetAppVersion()
	.then((elem) => {
		callback(elem);
	})
	.catch((error) => {
		console.log(`[verServerVersionCb] err: `, error);
	});
}

/**
 * Retrieves the version of the app from server
 *
 * @returns
 * SUCCESS - {string}	res version of QaplaGaming app retrieved from server
 * FAIL    - {null}  	res version was not retrieved   
 */
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

/**
 * Retrieves the local version of the app
 */
export function verLocalVersion() {
	return version;
}

/**
 * Retrieves the major version from versionStr
 * @param {string} 		versionStr version string containing x1.x2.x3
 * @returns {string}	major version number in string format 	
 */
export function verMajorVersion(versionStr) {
	return versionStr.split('.')[0];
}

/**
 * Retrieves the minor version from versionStr
 * @param {string} 		versionStr version string containing x1.x2.x3
 * @returns {string}	minor version number in string format 	
 */
export function verMinorVersion(versionStr) {
	return versionStr.split('.')[1];
}

/**
 * Retrieves the patch version from versionStr
 * @param {string} 		versionStr version string containing x1.x2.x3
 * @returns {string}	patch version number in string format 	
 */
export function verPatchVersion(versionStr) {
	return versionStr.split('.')[2];
}

/**
 * Checks if major version from versionStr_1 is > than versionStr_2
 * @param {string} 		versionStr_1 version string containing x1.x2.x3
 * @param {string}		versionStr_2 version string containing x1.x2.x3
 * 
 * @returns 
 * {boolean} true if versionStr_1 > versionStr_2
 * {boolean} false if versionStr_1 <= versionStr_2
 */
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

/**
 * Checks if minor version from versionStr_1 is > than versionStr_2
 * @param {string} 		versionStr_1 version string containing x1.x2.x3
 * @param {string}		versionStr_2 version string containing x1.x2.x3
 * 
 * @returns 
 * {boolean} true if versionStr_1 > versionStr_2
 * {boolean} false if versionStr_1 <= versionStr_2
 */
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

/**
 * Checks if patch version from versionStr_1 is > than versionStr_2
 * @param {string} 		versionStr_1 version string containing x1.x2.x3
 * @param {string}		versionStr_2 version string containing x1.x2.x3
 * 
 * @returns 
 * {boolean} true if versionStr_1 > versionStr_2
 * {boolean} false if versionStr_1 <= versionStr_2
 */
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

/**
 * Checks if app needs to update
 * @param {string} 		localVersionStr  local app version string containing x1.x2.x3
 * @param {string}		serverVersionStr server app version string containing x1.x2.x3
 * 
 * @returns 
 * {boolean} true 	if serverVersionStr.major > localVersionStr.major
 * {boolean} true 	if serverVersionStr.minor > localVersionStr.minor
 * {boolean} false	other combinations
 */
export function verShouldUpdateApp(localVersionStr, serverVersionStr) {
	return verIsMajorGreater(serverVersionStr, localVersionStr) || verIsMinorGreater(serverVersionStr, localVersionStr);
}