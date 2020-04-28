import { remoteConfig } from '../utilities/firebase';
import { Colors } from '../utilities/Colors';

const rcColors = Colors;

export const fetchChangesNowAndActivate = async () => {
	let result = null;

	await remoteConfig.fetch(0);
	const activated = await remoteConfig.activateFetched();

	if (activated){
        result = remoteConfig.getValue(TEST); 
    }

    return result; 
}

export const getValuesFromKeys = (keyArr) => {
	return remoteConfig.getValues(keyArr);
}

export const fetchChangesNowFromRemote = async () => {
	remoteConfig.fetch(0);
}
