import {
	dbGetAppMinorVersion
} from '../services/database';

export async function verMinorVersion(versionObj) {
	try {
		const minorVersion = await dbGetAppMinorVersion();
		versionObj = {minVer: minorVersion};
	}
	catch(error) {
		console.log(`[verMinorVersion] err: `, error);
	}
}

export async function verMinorVersionSync(versionObj) {
	
}

export async function verMajorVersion() {

}

export async function verMajorVersionSync() {

}

export async function verMinorMajorVersion() {
	try {
		const minor = await verMinorVersion();
		const major = await verMajorVersion();
	}
	catch(error) {
		console.log('Miau');
	}
}