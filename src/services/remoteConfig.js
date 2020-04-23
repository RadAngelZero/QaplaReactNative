import { remoteConfig } from '../utilities/firebase';

export const fetchChangesNowAndActivate = async () => {
	let result = null;

	await remoteConfig.fetch(0);
	const activated = await remoteConfig.activateFetched();

	if (activated){
        result = remoteConfig.getValue('TEST'); 
    }

    return result; 
}

export const getValuesFromKeys = (keyArr) => {
	return remoteConfig.getValues(keyArr);
}