import {
	dbGetAppVersion
} from '../services/database';

import { version } from '../../package.json';

/**
 * Retrieve the version of the app from server
 *
 * @returns
 * SUCCESS - {string}	res version of QaplaGaming app retrieved from server
 * FAIL    - {null}  	res version was not retrieved
 */
export async function verServerVersion() {
	let res = null;

	res = await dbGetAppVersion();
	return res;
}

/**
 * Retrieve the local version of the app
 */
export function verLocalVersion() {
	return version;
}

/**
 * Retrieve the major version from versionStr
 * @param {string} 		versionStr version string containing x1.x2.x3
 * @returns {string}	major version number in string format
 */
export function verMajorVersion(versionStr) {
	return versionStr.split('.')[0];
}

/**
 * Retrieve the minor version from versionStr
 * @param {string} 		versionStr version string containing x1.x2.x3
 * @returns {string}	minor version number in string format
 */
export function verMinorVersion(versionStr) {
	return versionStr.split('.')[1];
}

/**
 * Retrieve the patch version from versionStr
 * @param {string} 		versionStr version string containing x1.x2.x3
 * @returns {string}	patch version number in string format
 */
export function verPatchVersion(versionStr) {
	return versionStr.split('.')[2];
}

/**
 * Check if major version from versionStr_1 is > than versionStr_2
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
		let maj_1 = verMajorVersion(versionStr_1);
		let maj_2 = verMajorVersion(versionStr_2);

		res = parseInt(maj_1) > parseInt(maj_2);
	} catch (error) {
		console.error(`[verIsMajorGreater] err: `, error);
	}

	return res;
}

/**
 * Check if major version from versionStr_1 is = than versionStr_2
 * @param {string} 		versionStr_1 version string containing x1.x2.x3
 * @param {string}		versionStr_2 version string containing x1.x2.x3
 *
 * @returns
 * {boolean} true if versionStr_1 = versionStr_2
 * {boolean} false if versionStr_1 != versionStr_2
 */
export function verIsMajorEqual(versionStr_1, versionStr_2) {
	let res = false;

	try {
		let maj_1 = verMajorVersion(versionStr_1);
		let maj_2 = verMajorVersion(versionStr_2);

		res = parseInt(maj_1) === parseInt(maj_2);
	} catch (error) {
		console.error(`[verIsMajorGreater] err: `, error);
	}

	return res;
}

/**
 * Check if minor version from versionStr_1 is > than versionStr_2
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
		let min_1 = verMinorVersion(versionStr_1);
		let min_2 = verMinorVersion(versionStr_2);

		res = parseInt(min_1) > parseInt(min_2);
	} catch (error) {
		console.error(error);
	}

	return res;
}

/**
 * Check if patch version from versionStr_1 is > than versionStr_2
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
		let p_1 = verPatchVersion(versionStr_1);
		let p_2 = verPatchVersion(versionStr_2);

		res = parseInt(p_1) > parseInt(p_2);
	} catch (error) {
		console.error(error);
	}

	return res;
}

/**
 * Check if app needs to update
 * @param {string} 		localVersionStr  local app version string containing x1.x2.x3
 * @param {string}		serverVersionStr server app version string containing x1.x2.x3
 *
 * @returns
 * {boolean} true 	if serverVersionStr.major > localVersionStr.major
 * {boolean} true 	if serverVersionStr.minor > localVersionStr.minor
 * {boolean} false	other combinations
 */
export function verShouldUpdateApp(localVersionStr, serverVersionStr) {
	return verIsMajorGreater(serverVersionStr, localVersionStr) || (verIsMajorEqual(serverVersionStr, localVersionStr) && verIsMinorGreater(serverVersionStr, localVersionStr));
}