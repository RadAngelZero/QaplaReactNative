import { remoteConfig } from '../utilities/firebase';
import { storeData, retrieveData } from '../utilities/persistance';
import { Discord } from '../utilities/Constants';

const configKeys = ['Discord'];

export default remoteConf = {
	async configure() {
		let confObj = JSON.parse(await retrieveData('remoteConf-configurationObj'));
		
		if (!confObj) {
			confObj = JSON.parse({ Discord });
		}

		remoteConfig.setDefaults(confObj);
	},
	async fetchAndActivate() {
		try {
			// fetch(0) cleans cache and gets data from server,
			// default time to fetch data again is 12h.
			await remoteConfig.fetch();
			const activated = await remoteConfig.activateFetched();

			if (activated){
			    remoteConfig.getValues(configKeys).then((objects) => {
				    let data = {};

				    Object.keys(objects).forEach((key) => {
				    	data[key] = JSON.parse(objects[key].val());
				    });

				    storeData('remoteConf-configurationObj', JSON.stringify(data));
				});
			}
		}
		catch(error) {
			console.error(`fetchAndActivate`, error);
		}
	},
	async getDataFromKey(key) {
		return JSON.parse((await remoteConfig.getValue(key)).val());
	}
}